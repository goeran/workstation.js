function run() {
    app("hello world", function() {
	screen("screen 123", function() {
	    label({ text: "Username", style: { top: 10, left: 20 } });
	    textbox({ id: "txtUsername", style: { top: 8, left: 100 } });

	    label({ text: "Password", style: { top: 40, left: 20 } });
	    textbox({ id: "txtPassword", style: { top: 38, left: 100 } });

	    button({
		text: "Login",
		style: { top: 70, left: 178 },
		onclick: function() {
		    alert("hello world");
		} });
	    button({
		text: "Cancel",
		style: { top: 70, left: 120 },
		onclick: function() {
		    that.txtUsername.runtime.text("");
		    that.txtPassword.runtime.text("");
		} });
	});
    });
};

run();