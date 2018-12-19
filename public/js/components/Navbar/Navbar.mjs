'use strict';

import tmpl from './Navbar.tmpl.xml';

export default class NavbarComponent {
	constructor({el = document.body, login = null} = {}) {
		this._el = el;
		this._login = login;
	}
	
	render() {
		if (this._login) {
			const data = {
				authButtons: [
					{ caption: this._login, url: "profile", className: "navbar__button", id: "profile_btn" },
					{ caption: 'Sign Out', url: "sign_out", className: "navbar__button", id: "sign_out_btn" },
				]
			};
			const template = tmpl(data);
			let div = document.createElement('div');
			div.innerHTML = template;
			this._el.appendChild(div.firstChild);
			
			document.getElementById("profile_btn").addEventListener("click", (event) => {
				event.preventDefault();
				window.bus.publish("draw-profile", );
			});

			document.getElementById("sign_out_btn").addEventListener("click", (event) => {
				event.preventDefault();
				window.bus.publish("sign-out");
			});

			return;
		} else {
			const data = {
				authButtons: [
					{ caption: "Sign Up", url: "sign_up", className: "navbar__button", id: "sign_up_btn" },
					{ caption: 'Sign In', url: "sign_in", className: "navbar__button", id: "sign_in_btn" },
				]
			};
			const template = tmpl(data);
			let div = document.createElement('div');
			div.innerHTML = template;
			this._el.appendChild(div.firstChild);

			document.getElementById("sign_up_btn").addEventListener("click", (event) => {
				event.preventDefault();
				window.bus.publish("draw-sign-up");
			});

			document.getElementById("sign_in_btn").addEventListener("click", (event) => {
				event.preventDefault();
				window.bus.publish("draw-sign-in");
			});

			return;
		}
	}
}