var workstation = {
	ast: []
}

//keywords
function screen(title, block) {
	workstation.ast.push({ 
		title: title,
		views: [] 
	});

	if (block != null) {
		block();
	}
}

function label(text) {
	if (workstation.ast.length === 0) 
		throw "screen must be defined before label can be added";
	
	lastScreen = workstation.ast[workstation.ast.length - 1];
	lastScreen.views.push({
		type: "label",
		text: text
	});
}