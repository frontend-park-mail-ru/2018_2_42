'use strict';

import { DrawerModule } from "./modules/drawer.js";
import UserService from "./Services/UserService.js"
import EventBus from "./modules/eventBus.js";
import Router from "./modules/router.js";
import MenuView from "./views/MenuView.js"
import LeaderboardView from "./views/LeaderboardView.js"

window.bus = new EventBus();
const userService = new UserService();
const router = new Router(document.getElementById("root"));

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
window.bus.subscribe("draw-profile", DrawerModule.createProfile);
window.bus.subscribe("draw-sign-up", DrawerModule.createSignUp);
window.bus.subscribe("draw-sign-in", DrawerModule.createSignIn);
window.bus.subscribe("draw-leaderboard", () => {router.open({ path: '/leaders' })});
window.bus.subscribe("draw-about", DrawerModule.createAbout);

window.bus.subscribe("successful_sign_in", DrawerModule.createProfile);
window.bus.subscribe("successful_sign_up", DrawerModule.createProfile);
window.bus.subscribe("successful_sign_out", DrawerModule.createMenu);

window.bus.subscribe("sign-out", userService.SignOut);
window.bus.subscribe("sign-in", userService.SignIn);
window.bus.subscribe("sign-up", userService.SignUp);
window.bus.subscribe("update-avatar", userService.UpdateAvatar);

router
	.register('/', MenuView)
	.register('/leaders', LeaderboardView)

router.start();

// window.bus.publish("draw-menu");
// DrawerModule.createMenu();

// root.addEventListener('click', event => {
// 	if (!(event.target instanceof HTMLAnchorElement)) {
// 		return;
// 	}

// 	event.preventDefault();
// 	const link = event.target;

// 	root.innerHTML = '';

// 	pages[ link.dataset.href ]();
// });
