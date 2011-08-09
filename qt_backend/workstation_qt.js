workstation.runtime = {
    run: function() {
	var currentScreen = workstation.ast();
	// TODO: fix this 
	workstationQt.addScreen("dummy title");
	var lastScreen = workstationQt.lastScreen();
	currentScreen.eachWidget(function(widget) {
	    if (widget.type === "label") {
		var label = lastScreen.addWidget("label", "test", widget.style);
		label.text = widget.text;
	    } 
	    else if (widget.type === "textbox") {
		var textbox = lastScreen.addWidget("textbox", "text", widget.style);
		textbox.text = widget.text;
		widget.runtime.text = function(text) {
		    textbox.text = text;
		}
	    }
	    else if (widget.type === "button") {
		var button = lastScreen.addWidget("button", "Click me", widget.style);
		button.text = widget.text;
		if (widget.onclick) {
		    button.clicked.connect(function() {
			// TODO: implied global variable
			that = {};
			currentScreen.eachWidget(function(w) {
			    that[w.id] = w;
			});
			widget.onclick();
		    });
		}
	    }
	});
    }
}
