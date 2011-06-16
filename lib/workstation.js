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
	last = workstation.ast.length - 1;
	workstation.ast[last].views.push({
		type: "label",
		text: text
	});
}
