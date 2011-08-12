describe("script", function() {
	beforeEach(function() {
		workstation.reset();
	});
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
