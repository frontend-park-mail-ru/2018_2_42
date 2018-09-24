'use strict'

export class MenuComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = { 
            menuTitles: [
                { caption: 'Singleplayer', url: 'singleplayer', className: "menu__button" },
                { caption: 'Multiplayer', url: 'multiplayer', className: "menu__button" },
                { caption: 'Leader Board', url: 'users', className: "menu__button" },
                { caption: 'Settings', url: 'settings', className: "menu__button" },
                { caption: 'About', url: 'about', className: "menu__button" },
            ]
        };
        const template = window.fest['js/components/Menu/Menu.tmpl'](data);
        this._el.innerHTML += template;
    }
}