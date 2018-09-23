'use strict';

export class NavbarComponent {
    constructor ({el = document.body, username = null} = {}) {
        this._el = el;
        this._username = username;
    }
    
    render () {
        if (this._username) {
            const data = {
                authButtons: [
                    { caption: 'Sign Out', url: "sign_out", className: "navbar__navbutton" },
                    { caption: this._username, url: this._username, className: "navbar__navbutton" }
                ]
            };
            const template = window.fest['js/components/Navbar/Navbar.tmpl'](data);
            this._el.innerHTML += template;
            return
        } else {
            const data = {
                authButtons: [
                    { caption: "Sign Up", url: "sign_up", className: "navbar__navbutton" },
                    { caption: 'Sign In', url: "sign_in", className: "navbar__navbutton" }
                ]
            };
            const template = window.fest['js/components/Navbar/Navbar.tmpl'](data);
            this._el.innerHTML += template;
            return
        }
	}
}