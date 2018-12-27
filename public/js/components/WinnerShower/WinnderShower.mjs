'use strict';

import tmpl from './WinnerShower.tmpl.xml';

export default class WinnerShowerComponent {
	constructor({ el = document.body } = {}) {
		this._el = el;
	}

	render(team) {
		const data = {
			team: team,
		};
		const template = tmpl(data);
		let div = document.createElement('div');
		div.innerHTML = template;
		this._el.appendChild(div.firstChild);

		document.getElementById('winner_back_btn').addEventListener('click', (event) => {
			event.preventDefault();
			window.bus.publish('draw-menu');
		});
	}
}