var workstation = (function() {
    var ast = [];
	return {
		ast: function() {
			return {
				addScreen: function(screenObj) {
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
		addWidget: function(widget) {
			widgets.push(widget);
		},
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

function label(text, style) {
	if (workstation.ast().numberOfScreens() === 0) 
		throw "screen must be defined before label can be added";
		
	if (style == null) style = {}
	
	lastScreen = workstation.ast().lastScreen();
	lastScreen.addWidget({
		type: "label",
		text: text,
		style: style
	});
}

function textbox(text, style) {
	lastScreen = workstation.ast().lastScreen();
	lastScreen.addWidget({
		type: "textbox",
		text: text,
		style: style
	});
}
