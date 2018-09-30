'use strict';

import { DrawerModule } from "./modules/drawer.js";

const pages = {
	menu: DrawerModule.createMenu,
	sign_in: DrawerModule.createSignIn,
	sign_up: DrawerModule.createSignUp,
	users: DrawerModule.createLeaderBoard,
	profile: DrawerModule.createProfile
};

DrawerModule.createMenu();

root.addEventListener('click', function (event) {
	if (!(event.target instanceof HTMLAnchorElement)) {
		return;
	}

	event.preventDefault();
	const link = event.target;

	console.log({
		href: link.href,
		dataHref: link.dataset.href
	});

	root.innerHTML = '';

	pages[ link.dataset.href ]();
});
