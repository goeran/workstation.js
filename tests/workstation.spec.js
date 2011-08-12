describe("workstation", function() {
	var widgetFactory;
	
	widgetFactory = workstation.factory;
	
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

	describe("factories", function() {
		it("should be possible to make a new label", function() {
			var newLabel = widgetFactory.newLabel("yo");
			expect(newLabel.type).toEqual("label");
			expect(newLabel.text).toEqual("yo");
		});
		
		it("should be possible to make a new screen", function() {
			var newScreen = widgetFactory.newScreen("login screen");
			expect(newScreen.type).toEqual("screen");
			expect(newScreen.text).toEqual("login screen");
		});
		
		it("should be possible to make a new button", function() {
			var newButton = widgetFactory.newButton("Click me");
			expect(newButton.type).toEqual("button");
			expect(newButton.text).toEqual("Click me");
		});
		
		it("should be possible to make a new textbox", function() {
			var newTextBox = widgetFactory.newTextBox("text");
			expect(newTextBox.type).toEqual("textbox");
			expect(newTextBox.text).toEqual("text");
		});
		
		it("should be possible to make a new passwordField", function() {
			var newPasswordField = widgetFactory.newPasswordField("default");
			expect(newPasswordField.type).toEqual("passwordfield");
			expect(newPasswordField.text).toEqual("default");
		});
		
		it("should be possible to make a new table", function() {
			var newTable = widgetFactory.newTable();
			expect(newTable.type).toEqual("table");
		});
		
		it("should be possible to make a new row", function() {
			var newRow = widgetFactory.newRow();
			expect(newRow.type).toEqual("row");
		});
	});
});
