describe("script", function() {
	it("should have a global variable called workstation", function() {
		expect(workstation).toBeDefined();
	});	
	
	it("global variable should have ast", function() {
		expect(workstation.ast).toBeDefined();
	});
	
	it("global variable should have a runtime", function() {
		expect(workstation.runtime).toBeDefined();
	});
});

describe("abstract syntax tree", function() {
	it("should throw exception when index is out of range", function() {
		screen("screen 1", function() {
			label("my label");
		});
		
		expect(getWidget(-1)).toThrow("Index out of range.");
		expect(getWidget(100)).toThrow("Index out of range.");
	});
	
	function getWidget(index) {
		return function() {
			workstation.lastScreen().getWidget(index);
		}
	}  
});

describe("keywords", function() {
	beforeEach(function() {
		workstation.ast = [];
	});
	
	function lastScreenInAst() {
		return workstation.ast[workstation.ast.length - 1];
	}
	
	describe("app", function() {
		it("should invoke runtime", function() {
			runtimeWasInvoked = false;
			workstation.runtime = {
				run: function() {
					runtimeWasInvoked = true;	
				}
			}
			app("screen 1");
			
			expect(runtimeWasInvoked).toBe(true);
		});
	});
	
	describe("screen", function() {
		it("should append to the AST", function() {
			screen("screen 1");
			screen("screen 2");
			
			expect(workstation.ast.length).toEqual(2);
			expect(workstation.ast[0].title).toEqual("screen 1");
		});
		
		it("should execute code block", function() {
			blockWasExecuted = false;
			screen("screen 1", function() {
				blockWasExecuted = true;
			});
			
			expect(blockWasExecuted).toBe(true);
		});
	});
	
	describe("label", function() {
		it("should append to the last screen in the AST", function() {
			screen("screen 1", function() {
				label("hello world");
				
			});
			
			expect(lastScreenInAst().numberOfWidgets()).toEqual(1);
			expect(lastScreenInAst().getWidget(0).type).toEqual("label");
		});
		
		it("should set properties", function() {
			screen("screen 1", function() {
				label("hello world");
				
				expect(lastScreenInAst().getWidget(0).type).toEqual("label");
				expect(lastScreenInAst().getWidget(0).text).toEqual("hello world");
				expect(lastScreenInAst().getWidget(0).style).toBeDefined();
			});	
		});
		
		it("should not be possible to call if screen keyword is used first", function() {
			expect(label).toThrow("screen must be defined before label can be added");
		});		
	});
	
	describe("textbox", function() {
		it("should be appended to the last screen in the AST", function() {
			screen("screen 1", function() {
				textbox("Username");
				textbox();
			});
			
			expect(lastScreenInAst().numberOfWidgets()).toEqual(2);
			expect(lastScreenInAst().getWidget(0).type).toEqual("textbox");
			expect(lastScreenInAst().getWidget(1).type).toEqual("textbox");
		})
	});
});
