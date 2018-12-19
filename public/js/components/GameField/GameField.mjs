'use strict';

import tmpl from './GameField.tmpl.xml';

export default class GameFieldComponent {
	constructor({ el = document.body } = {}) {
		this._el = el;
	}

	render() {
		const data = null;
		const template = tmpl(data);
		let div = document.createElement('div');
		div.innerHTML = template;
		this._el.appendChild(div.firstChild);

		document.getElementById('gamefield_back_btn').addEventListener('click', (event) => {
			event.preventDefault();
			window.bus.publish('destroy-game');
		});
	}

	drawLoading() {

	}

	drawField() {

	}
}