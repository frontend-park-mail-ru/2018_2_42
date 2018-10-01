'use strict';

export class NavbarComponent {
    constructor ({el = document.body, login = null} = {}) {
        this._el = el;
        this._login = login;
    }
    
    render () {
        if (this._login) {
            const data = {
                authButtons: [
                    { caption: this._login, url: "profile", className: "navbar__button" },
                    { caption: 'Sign Out', url: "sign_out", className: "navbar__button" },
                ]
            };
            const template = window.fest['js/components/Navbar/Navbar.tmpl'](data);
            this._el.innerHTML += template;
            return;
        } else {
            const data = {
                authButtons: [
                    { caption: "Sign Up", url: "sign_up", className: "navbar__button" },
                    { caption: 'Sign In', url: "sign_in", className: "navbar__button" },
                ]
            };
            const template = window.fest['js/components/Navbar/Navbar.tmpl'](data);
            this._el.innerHTML += template;
            return;
        }
    }
    
    
}