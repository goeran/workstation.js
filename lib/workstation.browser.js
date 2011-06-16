workstation.runtime = {
	run: function() {
		for (i = 0; i < workstation.ast.length; i++) {
			lastScreen = workstation.ast[i];
			
			//render
			document.title = lastScreen.title;
		}
	}
}
