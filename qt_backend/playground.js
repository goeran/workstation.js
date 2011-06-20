//keywords
function app(title, block) {
    if (block != null) {
	block();
    }

    workstation.run();
}

function screen(title, block) {
    widgets = [];
    workstation.addScreen(title);

    if (block != null) {
	block();
    }
}

function label(text, style) {
    if (workstation.numberOfScreens() === 0)
	throw "screen must be defined before label can be added";

    if (style == null) style = {}

    var lastScreen = workstation.lastScreen();
    lastScreen.addWidget(
	"label",
	text,
	style
    );
}

function textbox(text, style) {
    var lastScreen = workstation.lastScreen();

    if (style == null) style = {}

    lastScreen.addWidget(
	"textbox",
	text,
	style
    );
}

function run() {
    app("hello world", function() {
	screen("screen 123", function() {
	    label("testing", { top: 10, left: 20, color: "green" });
 	    textbox("", { top: 10 });

	    label("hello world", { top: 40, left: 20, color: "red" });
	    textbox();
	});
    });
};

run();