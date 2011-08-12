var workstation = {};

(function(ns) {
    var root;
    
	ns.ast = function(args) {
		if (typeof args !== "undefined") {
			var args = argsConversion(args);
			root = ns.factory.newApp(args.title);
		}
		return root;
	};
	
	ns.runtime = {
		run: function() {}
	};

	ns.factory = {
		newApp: function(name) {
			var screens = [];
			return { 
				type: "app",
			    addScreen: function(args) {
					screens.push(ns.factory.newScreen(args));
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
				}
			};
		},
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
		}
	}

	function guard(expression, message) {
    	if (!expression) {
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
		guard(args !== null, "Args can't be null.");
		guard(typeof args.type !== "undefined", "Type not specified.");
		guard(typeof args.style !== "undefined", "Style not specified.");
							
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
			guard(!(args.type === "screen" && this.type === "screen"), "Unable to add screen to screen.");
			guard(typeof args.type !== "undefined", "Type must be specified");
			
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

//keywords
function app(block) {
	workstation.ast("");
	
	if (block != null) {
		block();
	}
	workstation.runtime.run();
}

function screen(title, block) {
	workstation.ast().addScreen({ text: title });
	
	if (block != null) {
		block();
	}
}

function label(args) {
	if (workstation.ast() === null) {
		throw "screen must be defined before label can be added";
	} 
	workstation.ast().lastScreen().addWidget(
		workstation.factory.newLabel(args));
}

function textbox(args) {
	workstation.ast().lastScreen().addWidget(
		workstation.factory.newTextbox(args));
}

function passwordfield(args) {
	workstation.ast().lastScreen().addWidget(
		workstation.factory.newPasswordField(args));
}

function button(args) {
	workstation.ast().lastScreen().addWidget(
		workstation.factory.newButton(args));
}

function table(args, block) {
	if (typeof args === "function") {
		block = args;
		args = ""
	}
	
	workstation.ast().lastScreen().addWidget(
		workstation.factory.newTable(args));
	
	if (block != null) {
		block();
	}
}

function row(args) {
	workstation.ast().lastScreen().lastWidget().addWidget(
		workstation.factory.newRow(args));
}
