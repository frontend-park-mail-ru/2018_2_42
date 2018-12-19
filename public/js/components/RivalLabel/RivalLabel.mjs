'use strict';

import tmpl from './RivalLabel.tmpl.xml';

export default class RivalLabelComponent {
	constructor({ el = document.body, rivalLogin = '' } = {}) {
		this._el = el;
		this._rivalLogin = rivalLogin;
	}

	render() {
		const data = {
			rivalLogin: this._rivalLogin,
		};
		const template = tmpl(data);
		let div = document.createElement('div');
		div.innerHTML = template;
		this._el.insertBefore(div.firstChild, this._el.firstChild);
	}
}