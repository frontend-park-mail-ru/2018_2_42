'use strict';
import NetworkErrorComponent from '../components/NetworkError/NetworkError.mjs';
import BaseView from './BaseView.js';

export default class NetworkErrorView extends BaseView {
	constructor({ el = document.body, withNavbar = false, errorText = null, fallbackEvent = null } = {}) {
		super({ el: el, withNavbar: withNavbar });
		this._errorText = errorText;
		this._fallbackEvent = fallbackEvent;
	}

	render() {
		this._el.appendChild(this._section);
		const profile = new NetworkErrorComponent({ el: this._section, fallbackEvent: this._fallbackEvent, errorText: this._errorText });
		profile.render();
	}
}