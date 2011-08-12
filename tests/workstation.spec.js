describe("workstation", function() {
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

	describe("factories", function() {
		it("should be possible to make a new label", function() {
			var newLabel = workstation.factory.newLabel("yo");
			expect(newLabel.type).toEqual("label");
			expect(newLabel.text).toEqual("yo");
			expect(newLabel.style).toEqual({});
		});
		
		it("should be possible to make a new screen", function() {
			var newScreen = workstation.factory.newScreen("login screen");
			expect(newScreen.type).toEqual("screen");
			expect(newScreen.text).toEqual("login screen");
			expect(newScreen.style).toEqual({});
		});
	});
});
