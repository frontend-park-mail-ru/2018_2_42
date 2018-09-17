'use strict';

const root = document.getElementById('root');
const AJAX = window.AjaxModule;

function createMenuLink() {
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
        leaders:      'Leaders',
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

function createSignUp() {
    const signUpSection = document.createElement('section');
    signUpSection.dataset.sectionName = 'sign_up';

    const header = document.createElement('h1');
    header.textContent = 'Sign Up';

    signUpSection.appendChild(header);

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
			name: 'password_repeat',
			type: 'password',
			placeholder: 'Repeat Password'
		},
        {
            name: 'submit',
            type: 'submit',
        }
    ]

    inputs.forEach(function (item) {
        const input = document.createElement('input');

        input.name = item.name;
        input.type = item.type;
        input.placeholder = item.placeholder;

        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    });

    signUpSection.appendChild(form);
    signUpSection.appendChild(createMenuLink());
    
    form.addEventListener('submit', function (event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;

		const password = form.elements[ 'password' ].value;
		const password_repeat = form.elements[ 'password_repeat' ].value;

		if (password !== password_repeat) {
			alert('Passwords is not equals');
			return;
		}

		AJAX.doPost({
            callback: function (xhr) {
                root.innerHTML = '';
                createProfile();
            },
            path: '/signup',
            body: {
                email,
                password,
            },
        });
	});

    root.appendChild(signUpSection);
}

function createSignIn() {
    const signInSection = document.createElement('section');
    signInSection.dataset.sectionName = 'sign_in';

    const header = document.createElement('h1');
    header.textContent = 'Sign In';

    signInSection.appendChild(header);

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
            type: 'submit',
        }
    ]

    inputs.forEach(function (item) {
        const input = document.createElement('input');

        input.name = item.name;
        input.type = item.type;
        input.placeholder = item.placeholder;

        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    });

    signInSection.appendChild(form);
    signInSection.appendChild(createMenuLink());
    
    form.addEventListener('submit', function (event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const password = form.elements[ 'password' ].value;

		AJAX.doPost({
			callback: function (xhr) {
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
		div2.textContent = `Score ${me.score}`;

		p.appendChild(div1);
		p.appendChild(div2);
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

function createLeaderboard (users) {
	const leaderboardSection = document.createElement('section');
	leaderboardSection.dataset.sectionName = 'leaderboard';

	const header = document.createElement('h1');
	header.textContent = 'Leaders';

	leaderboardSection.appendChild(header);
	leaderboardSection.appendChild(createMenuLink());
	leaderboardSection.appendChild(document.createElement('br'));

	if (users) {
		const table = document.createElement('table');
		const thead = document.createElement('thead');
		thead.innerHTML = `
		<tr>
			<th>Email</th>
			<th>Age</th>
			<th>Score</th>
		</th>
		`;
		const tbody = document.createElement('tbody');

		table.appendChild(thead);
		table.appendChild(tbody);
		table.border = 1;
		table.cellSpacing = table.cellPadding = 0;

		users.forEach(function (user) {
			const email = user.email;
			const age = user.age;
			const score = user.score;

			const tr = document.createElement('tr');
			const tdEmail = document.createElement('td');
			const tdAge = document.createElement('td');
			const tdScore = document.createElement('td');

			tdEmail.textContent = email;
			tdAge.textContent = age;
			tdScore.textContent = score;

			tr.appendChild(tdEmail);
			tr.appendChild(tdAge);
			tr.appendChild(tdScore);

			tbody.appendChild(tr);

			leaderboardSection.appendChild(table);
		});
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

const pages = {
	menu: createMenu,
	sign_in: createSignIn,
	sign_up: createSignUp,
	leaders: createLeaderboard,
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