describe("workstation parser", function() {
	describe("parseCompositeWidget", function() {
		it("will return the parsed widget", function() {
			var parser = workstation.dsl.parser();
			var widget = parser.parseCompositeWidget("header", {});
			expect(widget).toBeDefined();
		});
	});
	
	describe("parseWidget", function() {
		it("will return the parsed widget", function() {
			var parser = workstation.dsl.parser();
			var widget = parser.parseWidget("label", {});
			expect(widget).toBeDefined();
		});
	});
});
