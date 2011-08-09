workstation.runtime = {
    run: function() {
	var setPosition = function(widget, style) {
	    widget.pos = new QPoint(style["left"], style["top"]); 
	};

	var currentScreen = workstation.ast();
	// TODO: fix this 
	workstationQt.addScreen("dummy title");
	var lastScreen = workstationQt.lastScreen();
	currentScreen.eachWidget(function(widget) {
	    if (widget.type === "label") {
		var label = lastScreen.addWidget("label");
		label.text = widget.text;
		setPosition(label, widget.style);
	    } 
	    else if (widget.type === "textbox") {
		var textbox = lastScreen.addWidget("textbox");
		textbox.text = widget.text;
		widget.runtime.text = function(text) {
		    textbox.text = text;
		}
		setPosition(textbox, widget.style);
	    }
	    else if (widget.type === "button") {
		var button = lastScreen.addWidget("button");
		button.text = widget.text;
		if (widget.onclick) {
		    button.clicked.connect(function() {
			// TODO: remove "that" implied global variable
			that = {};
			currentScreen.eachWidget(function(w) {
			    that[w.id] = w;
			});
			widget.onclick();
		    });
		}
		setPosition(button, widget.style);
	    }
	});
    }
}
