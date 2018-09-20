'use strict';

export class LogoComponent {
    constructor ({el = document.body, logo = null} = {}) {
        this._el = el;
        this._logo = logo;
    }
    
    render () {
		if (this._logo) {
            const template = window.fest['js/components/Logo/Logo.tmpl'](this._logo);
            this._el.innerHTML += template;
        return
		} else {
            this._el.innerHTML += "";
            return
        }
	}
}