'use strict';

export class ProfileComponent {
    constructor ({ el = document.body, profileData = null } = {}) {
        this._el = el;
        this._profileData = profileData;
    }

    render() {
        const data = this._profileData;
        
        const template = window.fest['js/components/Profile/Profile.tmpl'](data);
        this._el.innerHTML += template;
    }
}