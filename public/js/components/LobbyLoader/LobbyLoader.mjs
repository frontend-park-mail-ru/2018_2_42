'use strict';

import tmpl from './LobbyLoader.tmpl.xml';

export default class LobbyLoaderComponent {
	constructor({ el = document.body } = {}) {
		this._el = el;
	}

	render() {
		const data = {};
		const template = tmpl(data);
		let div = document.createElement('div');
		div.innerHTML = template;
		this._el.appendChild(div.firstChild);
	}
}