describe("script", function() {
	it("should have a global variable called workstation", function() {
		expect(workstation.ast).toBeDefined();
	});	
});

describe("keywords", function() {
	beforeEach(function() {
		workstation.ast = [];
	});
	
	function lastScreenInAst() {
		return workstation.ast[workstation.ast.length - 1];
	}
	
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
				
				expect(lastScreenInAst().views.length).toEqual(1);
				expect(lastScreenInAst().views[0].type).toEqual("label");
			});
		});
		
		it("should set properties", function() {
			screen("screen 1", function() {
				label("hello world");
				
				expect(lastScreenInAst().views[0].type).toEqual("label");
				expect(lastScreenInAst().views[0].text).toEqual("hello world");
			});	
		});
		
		it("should not be possible to call if screen keyword is used first", function() {
			expect(label).toThrow("screen must be defined before label can be added");
		});		
	});
});
