'use strict';

import tmpl from './NetworkError.tmpl.xml';

export default class NetworkErrorComponent {
	constructor({ el = document.body, errorText = null, fallbackEvent = null } = {}) {
		this._el = el;
		this._errorText = errorText || 'No error description.';
		this._fallbackEvent = fallbackEvent || 'router-go-back';
	}

	render() {
		const data = {
			errorText: this._errorText,
		};
		const template = tmpl(data);
		let div = document.createElement('div');
		div.innerHTML = template;
		this._el.appendChild(div.firstChild);

		document.getElementById('error_back_btn').addEventListener('click', (event) => {
			event.preventDefault();
			window.bus.publish(this._fallbackEvent);
		});
	}
}