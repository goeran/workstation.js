describe("abstract syntax tree", function() {
	beforeEach(function() {
		workstation.reset();
	});
		
	describe("add", function() {
		it("should be possible to get root", function() {
			workstation.ast("app1");
			expect(workstation.ast().type).toEqual("app");
		});
	});
	
	describe("screens", function() {
		it("should be impossible to add sub screens", function() {
			workstation.ast("app1");
			var root = workstation.ast();
			var screen1 = root.addScreen("my title");
			expect(function() {
				screen1.addWidget("screen", {});
			}).toThrow("Unable to add screen to screen.");
			
		});
	});
	
	describe("widgets", function() {
		it("should throw exception when index is out of range", function() {
			app(function() {
				screen("screen 1", function() {
					label("my label");
				});
			});
			
			var getWidgetFunc = function(index) {
				return function() {
					lastScreen().getWidget(index);
				}
			}  
			
			expect(getWidgetFunc(-1)).toThrow("Index out of range.");
			expect(getWidgetFunc(100)).toThrow("Index out of range.");
		});
		
		it("should have an enumerator method", function() {
			app(function() {
				screen("screen 1", function() {
					label("hello world");
					button("test");
				});
			});
			
			var enumCodeBlockInvoked = 0;
			var aScreen = lastScreen();
			var widgets = [];
			
			aScreen.eachWidget(function(widget) {
				enumCodeBlockInvoked++;
				widgets.push(widget);
			});			
			
			expect(enumCodeBlockInvoked).toEqual(2);
			expect(widgets[0].type).toEqual("label");
			expect(widgets[1].type).toEqual("button");
		});

		describe("lastWidget", function() {
			it("should return instance of widget", function() {
				app(function() {
					console.log("appz")
					screen("screen 1", function() {
						button("hello");
					});
				});
				console.log(workstation.ast());
				expect(lastWidget().type).toEqual("button");
			});
			
			it("should throw exception if it doesn't have any child widgets", function() {
				var errorMsg = "Widget doesn't have any child widgets";
				app(function() {
					screen("screen 1");
				});
				
				expect(function() {
					var a = lastWidget();
				}).toThrow(errorMsg);
	
				lastScreen().addWidget("label", { style: {} });

				expect(function() {
					var a = lastWidget().lastWidget();
				}).toThrow(errorMsg);
			});
		});		
	});
	
	describe("runtime behaviour", function() {
		$([
			"label",
			"textbox",
			"button"
		]).each(function() {
			it("should contain runtime behaviour for " + this, function() {
				var args = { text: "hello", style: {} }; 
				app(function() {
					screen("screen 1", function() {
						lastScreen().addWidget(this, args);	
					});
				});
				
				expect(getWidget(0).runtime).toBeDefined();
				expect(getWidget(0).runtime.text).toThrow("not implemented");
				expect(getWidget(0).runtime.click).toThrow("not implemented");
			});
		});
	});
});

function lastScreen() {
	return workstation.ast().lastScreen();
}

function lastWidget() {
	return lastScreen().lastWidget();
}