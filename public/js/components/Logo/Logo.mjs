'use strict';

import tmpl from './Logo.tmpl.xml';
import pic from './logo.png';

export default class LogoComponent {
	constructor ({el = document.body, logo = null} = {}) {
		this._el = el;
	}
	
	render () {
		const template = tmpl(pic);
		this._el.innerHTML += template;
}