'use strict';

import tmpl from './Logo.tmpl.xml';

export default class LogoComponent {
	constructor ({el = document.body, logo = null} = {}) {
		this._el = el;
		this._logo = logo;
	}
	
	render () {
		if (this._logo) {
			const template = tmpl(this._logo);
			this._el.innerHTML += template;
			return;
		} else {
			this._el.innerHTML += '';
			return;
		}
	}
}