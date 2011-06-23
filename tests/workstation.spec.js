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

describe("util", function() {
	describe("newWidget", function() {
		it("should guard args", function() {
			expect(function() {	
				workstation.util.newWidget(null);				
			}).toThrow("Args can't be null.");
			
			expect(function() {
				workstation.util.newWidget({});
			}).toThrow("Type not specified.")
			
			expect(function() {
				workstation.util.newWidget({ type: "label" });
			}).toThrow("Style not specified.");
		});
	});
});