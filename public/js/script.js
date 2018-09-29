'use strict';

import { NavbarComponent } from './components/Navbar/Navbar.mjs';
import { MenuComponent } from "./components/Menu/Menu.mjs";
import { SignUpFormComponent } from "./components/Form/SignUpForm.mjs";
import { SignInFormComponent } from "./components/Form/SignInForm.mjs";
import { ProfileComponent } from "./components/Profile/Profile.mjs";

const root = document.getElementById('root');
const AJAX = window.AjaxModule;


function createMenu () {
	const navbar = new NavbarComponent({ el: root });
	navbar.render();
	
	const menu = new MenuComponent({ el: root });
	menu.render();
}

function createSignUp () {
	const navbar = new NavbarComponent({ el: root });
	navbar.render();

	const form = new SignUpFormComponent({
		el: root, 
	});
	form.render();
}

function createSignIn () {
	const navbar = new NavbarComponent({ el: root });
	navbar.render();

	const form = new SignInFormComponent({
		el: root, 
	});
	form.render();
}

function createProfile (user) {
	const navbar = new NavbarComponent({ el: root, username: user});
	navbar.render();

	const profile = new ProfileComponent({ el: root, username: user });
	profile.render();
}

function createLeaderboard (users) {
	if (users) {
		for (let i = 0; i < users.length; i++) {
			root.innerHTML += users[i].login + '<br>';
		}
	} else {
		AJAX.doGet({
			callback (xhr) {
				const users = JSON.parse(xhr.responseText);
				root.innerHTML = '';
				createLeaderboard(users);
				console.log(users);
			},
			path: '/users',
		});
	}
}


const pages = {
	menu: createMenu,
	sign_in: createSignIn,
	sign_up: createSignUp,
	users: createLeaderboard,
	profile: createProfile
};

createMenu();

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
