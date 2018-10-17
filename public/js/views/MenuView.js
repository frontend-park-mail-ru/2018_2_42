import BaseView from './BaseView.js';

export default class MenuView extends BaseView {
	constructor(el) {
		super(el);
	}

	render() {
		super.createNavbar();

		const data = {
			menuTitles: [
				{ caption: 'Singleplayer', url: 'singleplayer', className: "menu__button" },
				{ caption: 'Multiplayer', url: 'multiplayer', className: "menu__button" },
				{ caption: 'Leaderboard', url: 'users', className: "menu__button" },
				{ caption: 'About', url: 'about', className: "menu__button" },
			]
		};
		const template = window.fest['js/components/Menu/Menu.tmpl'](data);
		this.el.innerHTML += template;
	}
}
