'use strict'

export class MenuComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const menu_titles = [
            { title: 'Singleplayer', url: 'singlplayer' },
            { title: 'Multuplayer', url: 'multuplayer' },
            { title: 'LeaderBoard', url: 'users' }
        ];
        const template = window.fest['js/components/Menu/Menu.tmpl'];(menu_titles);
        this._el.innerHTML = template;
    }
}