import bus from '../bus.js';

/**
 * @class BaseView
 * @module BaseView
 */
export default class BaseView {
	constructor (el) {
		this.el = el;
		this.el.dataset.view = this.constructor.name;
		this.el.hidden = true;
	}

	get active() {
		return !this.el.hidden;
	}

	hide () {
		this.el.hidden = true;
	}

	show () {
		this.el.hidden = false;
	}

	render() {

	}

	createNavbar() {
		const login = localStorage.getItem('login');
		if (login) {
			const data = {
				authButtons: [
					{ caption: login, url: "profile", className: "navbar__button" },
					{ caption: 'Sign Out', url: "sign_out", className: "navbar__button" },
				]
			};
			this.el.innerHTML += window.fest['js/components/Navbar/Navbar.tmpl'](data);

		} else {
			const data = {
				authButtons: [
					{ caption: "Sign Up", url: "sign_up", className: "navbar__button" },
					{ caption: 'Sign In', url: "sign_in", className: "navbar__button" },
				]
			};
			this.el.innerHTML += window.fest['js/components/Navbar/Navbar.tmpl'](data);
		}
	}

}
