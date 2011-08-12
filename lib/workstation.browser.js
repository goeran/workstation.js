workstation.runtime = {
	run: function() {
		$("body").css({
			margin: "0px",
		});
		
		var currentScreen = workstation.ast().lastScreen();
		document.title = currentScreen.text;
		currentScreen.eachWidget(function(widget) {
			var domObj = null;
			if (widget.type === "label") {
				domObj = $("<span>" + widget.text + "</span>");
			} else if (widget.type === "textbox") {
				domObj = $("<input type='text'/>");
				widget.runtime.text = function(text) {
					$(domObj).attr("value", text);
					return $(domObj).attr("value");
				}
			} else if (widget.type === "passwordfield") {
				domObj = $("<input type='password'/>");
				widget.runtime.text = function(text) {
					$(domObj).attr("value", text);
					return $(domObj).attr("value");
				}
			} else if (widget.type === "button") {
				domObj = $("<input type='button' value='" + widget.text + "'/>");
				domObj.bind("click", function() {
					that = {};
					currentScreen.eachWidget(function(w) {
						that[w.id] = w;
					});
					widget.onclick();
				});
				widget.runtime.click = function() {
					$(domObj).click();
				}
			}

			if (domObj != null) {
				domObj.css(widget.style);
				domObj.css({
					position: "absolute"
				});

				$("body").append(domObj);
			}
		});
	}
}
