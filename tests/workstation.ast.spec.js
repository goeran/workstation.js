describe("abstract syntax tree", function() {
	beforeEach(function() {
		workstation.reset();
	});
		
	describe("add", function() {
		it("should only be possible to add widgets of type screen as root nodes", function() {
			var expectedErrorMsg = "Only screens can be added as root nodes.";
			var label = workstation.util.newWidget({ text: "hello", type: "label", style: {} });
			
			expect(function() {
				workstation.ast(label);
			}).toThrow(expectedErrorMsg);
			
			expect(function() {
				workstation.ast({});
			}).toThrow(expectedErrorMsg);
		});
		
		it("should be possible to get root", function() {
			var screenObj = workstation.util.newWidget({ title: "win1", type: "screen", style: {} });
			workstation.ast(screenObj);
			expect(workstation.ast().type).toEqual("screen");
		});
	});
	
	describe("screens", function() {
		it("should be possible to have sub screens", function() {
			workstation.ast({ type: "screen", style: {} });
			var root = workstation.ast();
			root.addWidget({ type: "screen", style: {} });

			expect(root.numberOfWidgets()).toEqual(1);
			expect(root.getWidget(0).type).toEqual("screen"); 
		});
	});
	
	describe("widgets", function() {
		it("should throw exception when index is out of range", function() {
			screen("screen 1", function() {
				label("my label");
			});
			
			var getWidgetFunc = function(index) {
				return function() {
					workstation.ast().getWidget(index);
				}
			}  
			
			expect(getWidgetFunc(-1)).toThrow("Index out of range.");
			expect(getWidgetFunc(100)).toThrow("Index out of range.");
		});
		
		it("should have an enumerator method", function() {
			screen("screen 1", function() {
				label("hello world");
				button("test");
			});
			
			var enumCodeBlockInvoked = 0;
			var rootScreen = workstation.ast();
			var widgets = [];
			
			rootScreen.eachWidget(function(widget) {
				enumCodeBlockInvoked++;
				widgets.push(widget);
			});			
			
			expect(enumCodeBlockInvoked).toEqual(2);
			expect(widgets[0].type).toEqual("label");
			expect(widgets[1].type).toEqual("button");
		});

		describe("lastWidget", function() {
			it("should return instance of widget", function() {
				screen("screen 1", function() {
					button("hello");
				});
				
				expect(workstation.ast().lastWidget().type).toEqual("button");
			});
			
			it("should throw exception if it doesn't have any child widgets", function() {
				var errorMsg = "Widget doesn't have any child widgets";
				screen("screen 1");
				expect(function() {
					var a = workstation.ast().lastWidget();
				}).toThrow(errorMsg);
	
				screen("root 2", function() {
					workstation.ast().addWidget({ type: "screen", style: {} });
				});
				expect(function() {
					var a = workstation.ast().lastWidget().lastWidget();
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
				var args = { text: "hello", type: this, style: {} }; 
				screen("screen 1", function() {
					workstation.ast().addWidget(args);	
				});
				
				expect(getWidget(0).runtime).toBeDefined();
				expect(getWidget(0).runtime.text).toThrow("not implemented");
				expect(getWidget(0).runtime.click).toThrow("not implemented");
			});
		});
	});
});