'use strict';

import { DrawerModule } from "./modules/drawer.js";

const drawer = new DrawerModule;

const pages = {
	menu: drawer.createMenu,
	sign_in: drawer.createSignIn,
	sign_up: drawer.createSignUp,
	users: drawer.createLeaderBoard,
	profile: drawer.createProfile
};

drawer.createMenu();

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
