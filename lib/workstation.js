var workstation = {};

(function(ns) {
    var root;
	var currentScope; //used by the parser

	ns.ast = function(args) {
		if (typeof args !== "undefined") {
			var args = argsConversion(args);
			root = ns.factory.newApp(args.title);
		}
		return root;
	};
	
	ns.runtime = {
		run: function() {},
		openScreen: function(id, data) {
			console.log("Runtime openscreenn called: "+id);
			//1. find screen
			theScreen = workstation.ast().getScreenById(id);
			//2. invoke beforeOpen on screen
            theScreen.beforeOpen(data);
			//3  RUNTIME specific open of screen (not here)
			
			
		}
	};

	ns.factory = {
		newApp: function(name) {
			var screens = [];
			return { 
				type: "app",
			    addScreen: function(widget) {
					guard(widget.type !== "screen", "It's only possible to add widgets of type screen. Use factory to add them.");
					
					//screens.push(ns.factory.newScreen(args));
					screens.push(widget);
					return this.lastScreen();
				},
				lastScreen: function() {
					return screens[screens.length - 1];
				},
				getScreen: function(index) {
					return screens[index];
				},
				numberOfScreens: function() {
					return screens.length;
				},
				eachScreen: function(block) {
					for (var i = 0; i < screens.length; i++) {
						block(screens[i]);
					}
				},
				getScreenById: function(id) {
					var theScreen = null;
					this.eachScreen(function (s) {
						console.log("screen: "+s.id)
						if (s.id === id) {
							theScreen = s;
						}
					});
					return theScreen;
				}
			};
		},
		//TODO: figure out if we really need these, after we have 
		//implemented the parser module
		newScreen: function(args) {
			return newWidget(argsConversionType(args, "screen"));
		},
		newLabel: function(args) {
			return newWidget(argsConversionType(args, "label"));
		},
		newButton: function(args) {
			return newWidget(argsConversionType(args, "button"));
		},
		newTextBox: function(args) {
			return newWidget(argsConversionType(args, "textbox"));
		},
		//alias for newTextBox
		newTextbox: function(args) { 
			return this.newTextBox(args);
		},
		newPasswordField: function(args) {
			return newWidget(argsConversionType(args, "passwordfield"));
		},
		newTable: function(args) {
			return newWidget(argsConversionType(args, "table"));
		},
		newRow: function(args) {
			return newWidget(argsConversionType(args, "row"));
		},
		newHeader: function(args) {
			return newWidget(argsConversionType(args, "header"));
		}
	}

	ns.reset = function() {
		root = null;
	};
	
	ns.dsl = {};
	ns.dsl.parser = function() {
		return {
			parseScreen: function(args, block) {
				var newScreen;
				newScreen = workstation.factory.newScreen(args);
				ns.ast().addScreen(newScreen);
				currentScope = newScreen;

				if (block != null) {
					block();
				}
			},
			parseWidget: function(type, args) {
				var widget;
				widget = newWidget(argsConversionType(args, type));
				currentScope.addWidget(widget);
				return widget;
			},
			parseCompositeWidget: function(type, args, block) {
				var widget;
				var oldScope;
				
				if (typeof args === "function") {
					block = args;
					args = ""
				}

				widget = newWidget(argsConversionType(args, type));
				currentScope.addWidget(widget);
				
				oldScope = currentScope;
				currentScope = widget;

				if (block != null) {
					block();
				}	
				
				currentScope = oldScope;
				return widget;
			}
		}
	}

	function guard(expression, message) {
    	if (expression) {
    		throw message;
    	}
    }

	function argsConversion(args) {
		var result;
		if (typeof args === "undefined" ||
		 	typeof args === "string") {
			result = {
				text: args
			};
		} else {
			result = args;
		}
		
		if (typeof result.id === "undefined") {
			result.id = "";
		}
		if (typeof result.text === "undefined") {
			result.text = "";
		}
		if (typeof result.style === "undefined") {
			result.style = {}
		}
		
		return result;
	}
	
	function argsConversionType(args, type) {
		var result = argsConversion(args);
		result.type = type;
		return result;
	}
	
	function newWidget(args) {
		guard(args === null, "Args can't be null.");
		guard(typeof args.type === "undefined", "Type not specified.");
		guard(typeof args.style === "undefined", "Style not specified.");
							
		var widgets = [];
		if (typeof args.widgets !== "undefined") {
			widgets = args.widgets;
		}
		
		var widget = args;
		
		if (widget.id === "") {
			widget.id = widget.type + widget.text.replace(/\s/, "");
		}
		
		widget.runtime = {
			text: function(text) {
				throw "not implemented";
			},
			click: function() {
				throw "not implemented";
			}
		}
		widget.addWidget = function(args) {
			guard(args.type === "screen" && this.type === "screen", "Unable to add screen to screen.");
			guard(typeof args.type === "undefined", "Type must be specified");
			
			widgets.push(newWidget(args));
		};
		widget.getWidget = function(index) {
			if (index < 0 || index > widgets.length)
				throw "Index out of range.";
			return widgets[index];
		};
		widget.numberOfWidgets = function() {
			return widgets.length;
		};
		widget.lastWidget = function() {
			if (widgets.length === 0) {
				throw "Widget doesn't have any child widgets";
			}
			return widgets[widgets.length - 1];	
		};
		widget.eachWidget = function(codeBlock) {
			for (var i = 0; i < widgets.length; i++) {
				codeBlock(widgets[i]);
			}
		}
		
		return widget;
	}
	
})(workstation);


//TODO: figure out to do with this global variable
var dslParser = workstation.dsl.parser();

//keywords
function app(block) {
	workstation.ast("");
	
	if (block != null) {
		block();
	}
	workstation.runtime.run();
}

function screen(args, block) {
	dslParser.parseScreen(args, block);
}

function label(args) {
	if (workstation.ast() === null) {
		throw "screen must be defined before label can be added";
	} 
	
	dslParser.parseWidget("label", args);
}

function textbox(args) {
	dslParser.parseWidget("textbox", args);
}

function passwordfield(args) {
	dslParser.parseWidget("passwordfield", args);
}

function button(args) {
	dslParser.parseWidget("button", args);
}

function table(args, block) {
	dslParser.parseCompositeWidget("table", args, block);
}

function row(args) {
	dslParser.parseWidget("row", args);
}

function header(args, block) {
	dslParser.parseCompositeWidget("header", args, block);
}

function slider(args, block) {
	var widget = dslParser.parseWidget("slider", args, block);
	
	if (typeof args === "object") {
		if (typeof widget.value === "undefined") {
			widget.value = 0;

		}
	}
}

function beforeOpen(id, block) {
	console.log("opened");
	var screen = workstation.ast().getScreenById(id);
	screen.beforeOpen = block;
}

function openScreen(id, data) {
	console.log("Open screen called");
	workstation.runtime.openScreen(id, data);
	
}
