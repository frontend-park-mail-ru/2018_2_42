'use strict'

export class MenuComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const menuTitles = [
            { title: 'Singleplayer', url: 'singelplayer' },
            { title: 'Multiplayer', url: 'multiplayer' },
            { title: 'LeaderBoard', url: 'users' }
        ];
        const template = window.fest['js/components/Menu/Menu.tmpl'](menuTitles);
        this._el.innerHTML += template;
    }
}