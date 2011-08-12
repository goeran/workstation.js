describe("abstract syntax tree", function() {
	var root, screen1;
	beforeEach(function() {
		root = workstation.ast("");
		screen1 = root.addScreen("screen 1");
	});
		
	describe("add", function() {
		it("should be possible to get root", function() {
			expect(workstation.ast().type).toEqual("app");
		});
	});
	
	describe("screens", function() {
		it("should be impossible to add sub screens", function() {
			expect(function() {
				screen1.addWidget("screen", {});
			}).toThrow("Unable to add screen to screen.");
			
		});
	});
	
	describe("widgets", function() {
		it("should throw exception when index is out of range", function() {
			var label1 = screen1.addWidget("label", { title: "my label" });

			var getWidgetFunc = function(index) {
				return function() {
					lastScreen().getWidget(index);
				}
			}  
			
			expect(getWidgetFunc(0).type === "label");
			expect(getWidgetFunc(-1)).toThrow("Index out of range.");
			expect(getWidgetFunc(100)).toThrow("Index out of range.");
		});
		
		it("should have an enumerator method", function() {
			screen1.addWidget("label", { title: "hello world" });
			screen1.addWidget("button", { title: "test" });
			
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
				screen1.addWidget("button", { title: "hello" });
				expect(lastWidget().type).toEqual("button");
			});
			
			it("should throw exception if it doesn't have any child widgets", function() {
				var errorMsg = "Widget doesn't have any child widgets";
				
				expect(function() {
					var a = lastWidget();
				}).toThrow(errorMsg);
	
				screen1.addWidget("label", { style: {} });

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
				screen1.addWidget(this, args);	
				
				expect(getWidget(0).runtime).toBeDefined();
				expect(getWidget(0).runtime.text).toThrow("not implemented");
				expect(getWidget(0).runtime.click).toThrow("not implemented");
			});
		});
	});
});