function getRootScreen() {
	return workstation.ast();
}

function lastScreen() {
	return workstation.ast();
}

function getWidget(index) {
	return lastScreen().getWidget(index);
}
