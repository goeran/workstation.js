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
	workstation.ast.push({ 
		title: title,
		views: [] 
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
	lastScreen.views.push({
		type: "label",
		text: text,
		style: style
	});
}

function textbox(text, style) {
	lastScreen = workstation.lastScreen();
	lastScreen.views.push({
		type: "textbox",
		text: text,
		style: style
	});
}
