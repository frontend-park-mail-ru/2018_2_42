'use strict';

export class ProfileComponent {
    constructor ({ el = document.body, username = null } = {}) {
        this._el = el;
        this._username = username;
    }

    render() {
        const data = {
            username: this._username,
        };
        const template = window.fest['js/components/Profile/Profile.tmpl'](data);
        this._el.innerHTML += template;
    }
}