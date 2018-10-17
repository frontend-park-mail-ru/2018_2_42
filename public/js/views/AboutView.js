import BaseView from './BaseView.js';

export default class AboutView extends BaseView {
	constructor(el) {
		super(el);
	}

	render() {
		this.el.innerHTML = '';
		super.createNavbar();

		const data = {
			contributors: [
				{ name: 'Дикарев Андрей', gitHubUrl: 'https://github.com/DikarevAndrey', position: "Frontend", avatar: "../../images/about/andrey.jpg" },
				{ name: 'Корецкий Михаил', gitHubUrl: 'https://github.com/koretskyhub', position: "Backend", avatar: "../../images/about/misha.jpg" },
				{ name: 'Ли Даниил', gitHubUrl: 'https://github.com/Unanoc', position: "Frontend", avatar: "../../images/about/daniel.jpg" },
				{ name: 'Семёнов Максим', gitHubUrl: 'https://github.com/OlegSchwann', position: "Backend", avatar: "../../images/about/maxim.jpg" },
				{ name: 'Морозенков Олег', gitHubUrl: 'https://github.com/reo7sp', position: "Лучший ментор", avatar: "../../images/about/oleg.jpg" }
			],
			frontendUrl: {
				caption: "Frontend",
				url: "https://github.com/frontend-park-mail-ru/2018_2_42"
			},
			backendUrl: {
				caption: "Backend",
				url: "https://github.com/go-park-mail-ru/2018_2_42"
			},
		};
		const template = window.fest['js/components/About/About.tmpl'](data);
		this.el.innerHTML += template;
	}
}
