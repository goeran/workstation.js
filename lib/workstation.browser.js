workstation.runtime = {
	run: function() {
		$("body").css({
			margin: "0px",
		});
		
		workstation.ast().eachScreen(function(currentScreen) {
			//render
			document.title = currentScreen.title;
			currentScreen.eachWidget(function(widget) {
				if (widget.type === "label") {
					span = $("<span>" + widget.text + "</span>");
					$("body").append(span);
				} else if (widget.type === "textbox") {
					textbox = $("<input type='text'></input>");
					$("body").append(textbox);
				}

				span.css(widget.style);
				span.css({
					position: "absolute"
				});
			});
		});
	}
}
