workstation.runtime = {
	run: function() {
		$("body").css({
			margin: "0px",
		});
		
		for (i = 0; i < workstation.ast.length; i++) {
			lastScreen = workstation.ast[i];
			
			//render
			document.title = lastScreen.title;
			$(lastScreen.views).each(function() {
				if (this.type === "label") {
					span = $("<span>" + this.text + "</span>");
					$("body").append(span);
				} else if (this.type === "textbox") {
					textbox = $("<input type='text'></input>");
					$("body").append(textbox);
				}

				span.css(this.style);
				span.css({
					position: "absolute"
				});
			});
		}
	}
}
