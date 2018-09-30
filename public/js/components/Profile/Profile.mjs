'use strict';

export class ProfileComponent {
    constructor ({ el = document.body, profile = null } = {}) {
        this._el = el;
        this._profile = profile;
    }

    render() {
        const data = this._profile;
        const template = window.fest['js/components/Profile/Profile.tmpl'](data);
        this._el.innerHTML += template;
    }
}