'use strict';

import { NavbarComponent } from './components/Navbar/Navbar.mjs';
import { MenuComponent } from "./components/Menu/Menu.mjs";
import { FormActions, FormComponent } from "./components/Form/Form.mjs";

const root = document.getElementById('root');
const AJAX = window.AjaxModule;

function createMenuLink () {
	const menuLink = document.createElement('a');
	menuLink.href = menuLink.dataset.href = 'menu';
	menuLink.textContent = 'Back to main menu';
	return menuLink;
}

function createMenu () {
	const navbar = new NavbarComponent({ el: root });
	navbar.render();
	
	const menu = new MenuComponent({ el: root });
	menu.render();
}

function createSignUp () {
	const navbar = new NavbarComponent({ el: root });
	navbar.render();

	const form = new FormComponent({
		el: root, 
		action: FormActions.sign_up,
	});
	form.render();
}

function createSignIn () {
	const navbar = new NavbarComponent({ el: root });
	navbar.render();

	const form = new FormComponent({
		el: root, 
		action: FormActions.sign_in,
	});
	form.render();
}


function createLeaderboard (users) {
	const leaderboardSection = document.createElement('section');
	leaderboardSection.dataset.sectionName = 'leaderboard';

	const header = document.createElement('h1');
	header.textContent = 'Leaders';

	leaderboardSection.appendChild(header);
	leaderboardSection.appendChild(createMenuLink());
	leaderboardSection.appendChild(document.createElement('br'));
	const tableWrapper = document.createElement('div');
	leaderboardSection.appendChild(tableWrapper);

	if (users) {
		const board = new BoardComponent({el: tableWrapper, type: RENDER_TYPES.STRING});
		board.data = users;
		board.render();
	} else {
		const em = document.createElement('em');
		em.textContent = 'Loading';
		leaderboardSection.appendChild(em);

		AJAX.doGet({
			callback (xhr) {
				const users = JSON.parse(xhr.responseText);
				root.innerHTML = '';
				createLeaderboard(users);
			},
			path: '/users',
		});
	}

	root.appendChild(leaderboardSection);
}

function createProfile (me) {
	const profileSection = document.createElement('section');
	profileSection.dataset.sectionName = 'profile';

	const header = document.createElement('h1');
	header.textContent = 'Profile';

	profileSection.appendChild(header);
	profileSection.appendChild(createMenuLink());

	if (me) {
		const p = document.createElement('p');

		const div1 = document.createElement('div');
		div1.textContent = `Email ${me.email}`;
		const div2 = document.createElement('div');
		div2.textContent = `Age ${me.age}`;
		const div3 = document.createElement('div');
		div3.textContent = `Score ${me.score}`;

		p.appendChild(div1);
		p.appendChild(div3);
		p.appendChild(div3);

		profileSection.appendChild(p);
	} else {
		AJAX.doGet({
			callback (xhr) {
				if (!xhr.responseText) {
					alert('Unauthorized');
					root.innerHTML = '';
					createMenu();
					return;
				}

				const user = JSON.parse(xhr.responseText);
				root.innerHTML = '';
				createProfile(user);
			},
			path: '/me',
		});
	}

	root.appendChild(profileSection);
}

const pages = {
	menu: createMenu,
	sign_in: createSignIn,
	sign_up: createSignUp,
	users: createLeaderboard,
	me: createProfile
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
