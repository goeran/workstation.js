var workstation = (function() {
    var root;
    
    function guard(expression, message) {
    		if (!expression) {
    			throw message;
    		}
    }
    
	return {
		ast: function(args) {
			if (typeof args !== "undefined") {
				if (args.type !== "screen") {
					throw "Only screens can be added as root nodes.";
				}

				root = workstation.util.newWidget(args);
			}
			return root;
		},
		addWidget: function(type, args) {
			args = workstation.util.argsConversion(args);
			args.type = type;
			workstation.ast().addWidget(args);
		},
		runtime: {
			run: function() {}
		},
		util: {
			newWidget: function(args) {
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
					widgets.push(workstation.util.newWidget(args));
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
			},
			argsConversion: function(args) {
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
		},
		reset: function() {
			root = null;
		}
		
	};
})();

//keywords
function app(title, block) {
	if (block != null) {
		block();
	}
	workstation.runtime.run();
}

function screen(title, block) {
	var args = workstation.util.argsConversion(title);
	args.type = "screen";
	if (typeof workstation.ast() === "undefined" || workstation.ast() === null) {
		workstation.ast(args);
	} else {
		workstation.addWidget("screen", args);
	}
	
	if (block != null) {
		block();
	}
}

function label(args) {
	if (workstation.ast() === null) {
		throw "screen must be defined before label can be added";
	} 
	workstation.addWidget("label", args);
}

function textbox(args) {
	workstation.addWidget("textbox", args);
}

function passwordfield(args) {
	workstation.addWidget("passwordfield", args);
}

function button(args) {
	workstation.addWidget("button", args);
}

function table(args, block) {
	if (typeof args === "function") {
		block = args;
		args = ""
	}
	
	workstation.addWidget("table", args);
	
	if (block != null) {
		block();
	}
}

function row(args) {
	args = workstation.util.argsConversion(args);
	args.type = "row";
	workstation.ast().getWidget(workstation.ast().numberOfWidgets() - 1).addWidget(args);
}
