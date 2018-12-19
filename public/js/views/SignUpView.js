'use strict';
import SignUpFormComponent from '../components/Form/SignUpForm.mjs';
import BaseView from './BaseView.js';
import UserService from '../services/UserService.js';

const userService = new UserService();

export default class SignUpView extends BaseView {
	constructor({ el = document.body, withNavbar = true } = {}) {
		super({ el: el, withNavbar: withNavbar });
	}

	render() {
		if (userService.IsUserSignedIn()) {
			window.bus.publish('draw-profile');
			return 'redirect';
		}
		this._el.appendChild(this._section);
		const form = new SignUpFormComponent({ el: this._section });
		form.render();
	}
}