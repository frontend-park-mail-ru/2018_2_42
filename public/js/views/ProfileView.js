import BaseView from './BaseView.js';
import bus from '../bus.js';

export default class ProfileView extends BaseView {
	constructor(el) {
		super(el);

		this.profile = null;

		bus.on('profile-loaded', this.setProfile.bind(this));
	}

	setProfile(profile) {
		this.profile = profile;

		this.render()
	}

	show(params) {
		super.show();

		//check empty object
		if ((Object.keys(params).length === 0 && params.constructor === Object) && (localStorage.getItem('login') != null)) {
			this.targetLogin = localStorage.getItem('login');
		} else {
			this.targetLogin = params.login;
		}

		console.log(this.targetLogin);
		bus.emit('fetch-profile', this.targetLogin);
	}

	render() {
		this.el.innerHTML = '';

		if (this.profile) {
			this.renderProfile();
		}
	}

	renderProfile() {
		super.createNavbar();
		console.log(this.profile);
		const isSignedInUsersProfile = (localStorage.getItem('login') === this.profile.login);
		const data = {
			profile: this.profile,
			isSignedInUsersProfile: isSignedInUsersProfile
		};

		this.el.innerHTML += window.fest['js/components/Profile/Profile.tmpl'](data);
	}
}
