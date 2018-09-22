'use strict'

export class MenuComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = { 
            menuTitles: [
                { caption: 'Singleplayer', url: 'singleplayer', className: "menu__navbutton" },
                { caption: 'Multiplayer', url: 'multiplayer', className: "menu__navbutton" },
                { caption: 'Leader Board', url: 'users', className: "menu__navbutton" },
                { caption: 'Settings', url: 'settings', className: "menu__navbutton" },
                { caption: 'About', url: 'about', className: "menu__navbutton" },
            ]
        };
        const template = window.fest['js/components/Menu/Menu.tmpl'](data);
        this._el.innerHTML += template;
    }
}