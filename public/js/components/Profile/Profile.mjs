'use strict';

import UserService from '../../services/UserService.js';
import tmpl  from './Profile.tmpl.xml';
import '../../../images/update_avatar.png';
import '../../../images/default.png';

const userService = new UserService;

export default class ProfileComponent {
	constructor ({ el = document.body, login = null } = {}) {
		this._el = el;
		this._login = login || localStorage.getItem('login');
		this._profileData = null;
	}
	
	render() {
		userService.GetProfileData(this._login)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Server response was not ok.');
				}
				return response.json();
			})
			.then((receivedData) => {
				this._profileData = receivedData;
				const isSignedInUsersProfile = (userService.login === this._profileData.login);
				const data = {
					profile: this._profileData,
					isSignedInUsersProfile: isSignedInUsersProfile
				};

				const template = tmpl(data);
				let div = document.createElement('div');
				div.innerHTML = template;
				this._el.appendChild(div.firstChild);

				if (isSignedInUsersProfile) {
					const fileInput = document.getElementById('profile__avatarInput');

					fileInput.addEventListener('change', () => {
						window.bus.publish('update-avatar', fileInput.files[0]);
					}, false);
				}

				document.getElementById('profile_back_btn').addEventListener('click', (event) => {
					event.preventDefault();
					window.bus.publish('draw-menu');
				});
			})
			.catch((error) => {
				console.log(error);
				window.bus.publish('draw-networkError');
			});
	}
}