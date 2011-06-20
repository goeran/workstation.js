var workstation = (function() {
    var ast = [];
	return {
		ast: function() {
			return {
				addScreen: function(screenObj) {
					screenObj.newWidget = function(args, type) {
						var widget = workstation.util.newWidget(args);
						widget.type = type;
						widget.applyIdConvention();	
						widgets.push(widget);
					};
					
					ast.push(screenObj);
				},
				getScreen: function(index) {
					return ast[index];
				},
				numberOfScreens: function() {
					return ast.length;
				},	
				lastScreen: function() {
					 return ast[ast.length - 1]
				},
				clear: function() {
					ast = [];
				},
				eachScreen: function(block) {
					for (i = 0; i < ast.length; i++) {
						block(this.getScreen(i));
					}
				}
			}
		},
		runtime: {
			run: function() {}
		},
		util: {
			newWidget: function(args) {
				var result;
				
				if (args == null) {
					result = {};
				}
				else if (typeof args === "string") {
					result = {
						id: "",
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

				result.applyIdConvention = function() {
					if (this.id === "") {
						this.id = this.type + this.text.replace(/\s/, "");
					}
				}
				
				return result;
			}
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
	widgets = [];
	workstation.ast().addScreen({ 
		title: title,
		getWidget: function(index) {
			if (index < 0 || index > widgets.length)
				throw "Index out of range.";
			return widgets[index];
		},
		numberOfWidgets: function() {
			return widgets.length;
		},
		eachWidget: function(block) {
			for (i =  0; i < widgets.length; i++) {
				block(widgets[i]);
			}
		}
	});

	if (block != null) {
		block();
	}
}

function label(args) {
	if (workstation.ast().numberOfScreens() === 0) 
		throw "screen must be defined before label can be added";

	workstation.ast().lastScreen().newWidget(args, "label")	
}

function textbox(args) {
	workstation.ast().lastScreen().newWidget(args, "textbox");
}

function button(args) {
	workstation.ast().lastScreen().newWidget(args, "button");
}
