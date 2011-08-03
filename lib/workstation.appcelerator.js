workstation.runtime = {
	run: function() {
		// this sets the background color of the master UIView (when there are no windows/tab groups on it)
		Titanium.UI.setBackgroundColor('#000');
		
		var currentScreen = workstation.ast();		
		
		//
		// create base UI tab and root window
		//
		var win1 = Titanium.UI.createWindow({  
		    title: currentScreen.title,
		    backgroundColor: "#fff"
		});
		
		currentScreen.eachWidget(function(widget) {
			var uiObj = null;
			if (widget.type === "label") {
				uiObj = Titanium.UI.createLabel({
					color: "#999",
					text: widget.text,
					font: { fontFamily: "Helvetica Neue" },
					height: "auto"
				});
			} else if (widget.type === "textbox") {
				uiObj = Ti.UI.createTextField({
					font: { fontFamily: "Helvetica Neue" },
					borderColor: "#999",
					height: 20,
					width: 150
				});
				widget.runtime.text = function(text) {
					uiObj.value = text;
					return uiObj.value;
				}

			} else if (widget.type === "button") {
				uiObj = Ti.UI.createButton({
					title: widget.text,
					height: 30,
					width: 50
				});
				uiObj.addEventListener("click", function() {
					that = {};
					currentScreen.eachWidget(function(w) {
						that[w.id] = w;
					});
					widget.onclick();
				});
				widget.runtime.click = function() {
					uiObj.click();
				}
			} else if (widget.type === "table") {
				var tableData = [];
				widget.eachWidget(function(w) {
					if (w.type === "row") {
						var row = Ti.UI.createTableViewRow({
							title: w.text
						});
						if (typeof w.onclick !== "undefined") {
							row.addEventListener("click", function() {
								w.onclick();
							});
						}
						w.runtime.click = function() {
							row.click();
						}
						tableData.push(row);
					}
				});

				uiObj = Ti.UI.createTableView({
					data: tableData
				});
			}
			
			if (uiObj !== null) {
				uiObj.left = widget.style.left;
				uiObj.top = widget.style.top;
				win1.add(uiObj);
			}
		});
		
		win1.open();
	}
}
