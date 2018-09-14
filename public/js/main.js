'use strict';

const root = document.getElementById('root');

function createMenu () {
    // <section></section>
    const menuSection = document.createElement('section');
    menuSection.dataset.sectionName = 'menu';

    // <div id="header">
    //      <a href="sign_in">Sign In</a>
    //      <a href="sign_up">Sign Up</a>
    //</div>
    const header = document.createElement('div');
    header.id = 'header';
    const login = document.createElement('a');
    login.href = 'sign_in';
    login.dataset.href = 'sign_in';
    login.textContent = 'Sign In';
    const registration = document.createElement('a');
    registration.href = 'sign_up';
    registration.dataset.href = 'sign_up';
    registration.textContent = 'Sign Up';
    header.appendChild(login);
    header.appendChild(registration);

    menuSection.appendChild(header);



    // <div id="logo">
    //      <h1>Our Game</h1>
    // </div>
    const logo = document.createElement('div');
    logo.id = 'logo';
    const logoHeader = document.createElement('h1');
    logoHeader.textContent = 'Our Game';
    logo.appendChild(logoHeader);

    menuSection.appendChild(logo);


    // <div id="main">
    //      <div id="menuItems"></div>
    // </div>
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
        const href = entry[0];
        const title = entry[1];

        const button = document.createElement('div');
        button.id = 'menu-button';
        button.textContent = title;

        const a = document.createElement('a');
        a.href = href;
        a.dataset.href = href;
        a.classList.add('menu-button');

        a.appendChild(button);
        mainInner.appendChild(a);
    });
    
    menuSection.appendChild(main);

    root.appendChild(menuSection);
}

createMenu();

