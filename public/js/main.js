'use strict';

const root = document.getElementById('root');

function createMenu () {
    // <section></section>
    const menuSection = document.createElement('section');
    menuSection.dataset.sectionName = 'menu';

    // <div id="logo">
    //      <h1>Our Game</h1>
    // </div>
    const logo = document.createElement('div');
    logo.id = 'logo';
    const logoHeader = document.createElement('h1');
    logoHeader.textContent = 'Our Game';
    logo.appendChild(logoHeader);

    // <div id="main">
    //      <div id="menuItems"></div>
    // </div>
    const main = document.createElement('div');
    main.id = 'main';
    const mainInner = document.createElement('div');
    mainInner.id = 'menuItems';
    main.appendChild(mainInner);

    const titles = {
        sign_in: 'Sign In',
        sign_up: 'Sign Up',
        leaders: 'Leaders',
        me: 'Profile'
    };

    Object.entries(titles).forEach(function (entry) {
        const href = entry[0];
        const title = entry[1];

        const a = document.createElement('a');
        a.href = href;
        a.dataset.href = href;
        a.textContent = title;
        a.classList.add('menu-button');

        mainInner.appendChild(a);
    });
    
    menuSection.appendChild(logo);
    menuSection.appendChild(main);

    root.appendChild(menuSection);
}

createMenu();