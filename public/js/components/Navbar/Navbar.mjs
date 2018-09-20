'use strict';

export class NavbarComponent {
    constructor ({el = document.body, username = null} = {}) {
        this._el = el;
        this._username = username;
    }
    
    render () {
		if (this._username) {
            const authButtons = [
                {title: 'Sign Out', url: "sign_out"},
                {title: this._username, url: this._username},
            ];
            const template = window.fest['js/components/Navbar/Navbar.tmpl'](authButtons);
            this._el.innerHTML = template;
            return
		} else {
            const authButtons = [
                {title: "Sign Out", url: "sign_up"},
                {title: 'Sign In', url: "sign_in"},
            ];
            const template = window.fest['js/components/Navbar/Navbar.tmpl'](authButtons);
            this._el.innerHTML = template;
            return
        }
	}
}