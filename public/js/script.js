'use strict';

import {
	BoardComponent,
	RENDER_TYPES,
} from './components/Board/Board.mjs';

const root = document.getElementById('root');
const AJAX = window.AjaxModule;

function createMenuLink () {
	const menuLink = document.createElement('a');
	menuLink.href = menuLink.dataset.href = 'menu';

	menuLink.textContent = 'Back to main menu';

	return menuLink;
}

function createMenu () {
    const menuSection = document.createElement('section');
    menuSection.dataset.sectionName = 'menu';

    const header = document.createElement('div');
    header.id = 'header';
    const login = document.createElement('a');
    login.href = login.dataset.href ='sign_in';
    login.textContent = 'Sign In';
    const registration = document.createElement('a');
    registration.href = registration.dataset.href = 'sign_up';
    registration.textContent = 'Sign Up';

    header.appendChild(login);
    header.appendChild(registration);
    menuSection.appendChild(header);

    const logo = document.createElement('div');
    logo.id = 'logo';
    const logoHeader = document.createElement('h1');
    logoHeader.textContent = 'Our Game';
    logo.appendChild(logoHeader);

    menuSection.appendChild(logo);

    const main = document.createElement('div');
    main.id = 'main';
    const mainInner = document.createElement('div');
    mainInner.id = 'menuItems';
    main.appendChild(mainInner);

    const titles = {
        singleplayer: 'Singleplayer',
        multuplayer:  'Multuplayer',
        users:      'Leaders',
        me:           'Profile'
    };

    Object.entries(titles).forEach(function (entry) {
        const href = entry[ 0 ];
        const title = entry[ 1 ];

        const button = document.createElement('div');
        button.id = 'menu-button';
        button.textContent = title;

        const a = document.createElement('a');
        a.href = a.dataset.href = href;

        a.appendChild(button);
        mainInner.appendChild(a);
    });
    
    menuSection.appendChild(main);
    root.appendChild(menuSection);
}


function createSignIn () {
	const signInSection = document.createElement('section');
	signInSection.dataset.sectionName = 'sign_in';

	const header = document.createElement('h1');
	header.textContent = 'Sign In';


	const form = document.createElement('form');

	const inputs = [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Password'
		},
		{
			name: 'submit',
			type: 'submit'
		}
	];

	inputs.forEach(function (item) {
		const input = document.createElement('input');

		input.name = item.name;
		input.type = item.type;

		input.placeholder = item.placeholder;

		form.appendChild(input);
		form.appendChild(document.createElement('br'));
	});

	signInSection.appendChild(header);
	signInSection.appendChild(form);
	signInSection.appendChild(createMenuLink());

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const password = form.elements[ 'password' ].value;

		AJAX.doPost({
			callback (xhr) {
				root.innerHTML = '';
				createProfile();
			},
			path: '/login',
			body: {
				email,
				password,
			},
		});
	});

	root.appendChild(signInSection);
}

function createSignUp () {
	const signUpSection = document.createElement('section');
	signUpSection.dataset.sectionName = 'sign_in';

	const header = document.createElement('h1');
	header.textContent = 'Sign Up';


	const form = document.createElement('form');

	const inputs = [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email'
		},
		{
			name: 'age',
			type: 'number',
			placeholder: 'Your Age'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Password'
		},
		{
			name: 'password_repeat',
			type: 'password',
			placeholder: 'Repeat Password'
		},
		{
			name: 'submit',
			type: 'submit'
		}
	];

	inputs.forEach(function (item) {
		const input = document.createElement('input');

		input.name = item.name;
		input.type = item.type;

		input.placeholder = item.placeholder;

		form.appendChild(input);
		form.appendChild(document.createElement('br'));
	});

	signUpSection.appendChild(header);
	signUpSection.appendChild(form);
	signUpSection.appendChild(createMenuLink());

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const age = parseInt(form.elements[ 'age' ].value);
		const password = form.elements[ 'password' ].value;
		const password_repeat = form.elements[ 'password_repeat' ].value;

		if (password !== password_repeat) {
			alert('Passwords is not equals');

			return;
		}

		AJAX.doPost({
			callback (xhr) {
				root.innerHTML = '';
				createProfile();
			},
			path: '/signup',
			body: {
				email,
				password,
				age,
			},
		});
	});

	root.appendChild(signUpSection);
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
