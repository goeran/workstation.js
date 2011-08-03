workstation.runtime = {
    run: function() {
	print("RUN CALLED");

	var currentScreen = workstation.ast();
	// TODO: fix this 
	workstationQt.addScreen("dummy title");
	var lastScreen = workstationQt.lastScreen();
	currentScreen.eachWidget(function(widget) {
	    if (widget.type === "label") {
		print("ADDING LABEL");
		lastScreen.addWidget("label", "test", widget.style);
	    } else if (widget.type === "textbox") {
		print("ADDING TEXTBOX");
		lastScreen.addWidget("textbox", "text", widget.style);
		widget.runtime.text = function(text) {
		    print("Textbox Text: Not implemented yet!");
		}
	    } else if (widget.type === "button") {
		print("ADDING BUTTON IS NOT IMPLEMENTED");
	    }
	});
    }
}
