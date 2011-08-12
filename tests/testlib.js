function getScreen(index) {
	return workstation.ast().getScreen(index);
}

function lastScreen() {
	return workstation.ast().lastScreen();
}

function lastWidget() {
	return lastScreen().lastWidget();;
}

function getWidget(index) {
	return lastScreen().getWidget(index);
}
