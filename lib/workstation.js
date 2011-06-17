var workstation = {
	ast: [],
	runtime: {
		run: function() {}
	},
	lastScreen: function() {
		 return workstation.ast[workstation.ast.length - 1]
	}
}

//keywords
function app(title, block) {
	if (block != null) {
		block();
	}
		
	workstation.runtime.run();
}

function screen(title, block) {
	widgets = [];
	workstation.ast.push({ 
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
		}
	});

	if (block != null) {
		block();
	}
}

function label(text, style) {
	if (workstation.ast.length === 0) 
		throw "screen must be defined before label can be added";
		
	if (style == null) style = {}
	
	lastScreen = workstation.lastScreen();
	lastScreen.addWidget({
		type: "label",
		text: text,
		style: style
	});
}

function textbox(text, style) {
	lastScreen = workstation.lastScreen();
	lastScreen.addWidget({
		type: "textbox",
		text: text,
		style: style
	});
}
