'use strict';
import APIModule from '../modules/api.js';

const api = new APIModule;

export default class UserService {
	constructor() {
		if (UserService.__instance) {
			return UserService.__instance;
		}

		UserService.__instance = this;
	}

	get login() {
		api.CheckCookie()
			.then((response) => {
				if (response.status === 400 || response.status === 404 || response.status === 200) {
					return response.json();
				} else {
					throw new Error('Server response was not ok.');
				}
			})
			.then((data) => {
				if (data.status != 'OK') {
					localStorage.removeItem('login');
				} else {
					localStorage.setItem('login', data.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		return localStorage.getItem('login');
	}

	set login(login) {
		localStorage.setItem('login', login);
	}

	IsUserSignedIn() {
		return localStorage.getItem('login') !== null;
	}

	SignOut() {
		api.SignOut()
			.then((response) => {
				if (!response.ok) {
					throw new Error('Server response was not ok.');
				}
				return response.json();
			})
			.then((data) => {
				localStorage.removeItem('login');
				window.bus.publish('successful_sign_out');
			})
			.catch((error) => {
				window.bus.publish('draw-networkError');
			});
	}

	SignIn({ login = null, password = null } = {}) {
		api.SignIn({ login: login, password: password })
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok.');
				}
				return response.json();
			})
			.then(() => {
				localStorage.setItem('login', login);
				window.bus.publish('successful_sign_in', login);
			})
			.catch((error) => {
				window.bus.publish('draw-networkError');
			});
	}

	SignUp({ login = null, password = null } = {}) {
		api.SignUp({ login: login, password: password })
			.then((response) => {
				if (!response.ok) {
					throw new Error('Server response was not ok.');
				}
				return response.json();
			})
			.then(() => {
				localStorage.setItem('login', login);
				window.bus.publish('successful_sign_up', login);
			})
			.catch((error) => {
				window.bus.publish('draw-networkError');
			});
	}

	UpdateAvatar(file) {
		api.Avatar(file)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Server response was not ok.');
				}
				return response.json();
			})
			.then((data) => {
				window.bus.publish('successful_avatar_update', this.login);
			})
			.catch((error) => {
				window.bus.publish('draw-networkError');
			});
	}

	GetProfileData(login) {
		return api.Profile(login);
	}

	GetLeaders(page = 1, limit = 20) {
		return api.Leaders(page, limit);
	}
}