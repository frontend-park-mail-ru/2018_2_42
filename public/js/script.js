'use strict';

import { DrawerModule } from "./modules/drawer.js";

import EventBus from "./modules/eventBus.js";
window.bus = new EventBus();

const pages = {
	menu: DrawerModule.createMenu,
	sign_in: DrawerModule.createSignIn,
	sign_up: DrawerModule.createSignUp,
	sign_out: DrawerModule.createMenuWithSignOut,
	users: DrawerModule.createLeaderBoard,
	profile: DrawerModule.createProfile,
	about: DrawerModule.createAbout
};

window.bus.subscribe("draw-menu", DrawerModule.createMenu);
window.bus.subscribe("successful_sign_in", DrawerModule.createProfile);
window.bus.subscribe("successful_sign_up", DrawerModule.createProfile);
window.bus.subscribe("successful_sign_out", DrawerModule.createMenuWithSignOut);

window.bus.publish("draw-menu");
// DrawerModule.createMenu();

root.addEventListener('click', event => {
	if (!(event.target instanceof HTMLAnchorElement)) {
		return;
	}

	event.preventDefault();
	const link = event.target;

	root.innerHTML = '';

	pages[ link.dataset.href ]();
});
