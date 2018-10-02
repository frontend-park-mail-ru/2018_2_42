'use strict'

export class AboutComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = {
            contributors: [
                { name: 'Дикарев Андрей', gitHubUrl: 'https://github.com/DikarevAndrey', faculty: "ИУ6", position: "Frontend", avatarAddress: "" },
                { name: 'Корецкий Михаил', gitHubUrl: 'https://github.com/koretskyhub', faculty: "ИУ6", position: "Backend", avatarAddress: "" },
                { name: 'Ли Даниил', gitHubUrl: 'https://github.com/Unanoc', faculty: "ИУ6", position: "Frontend", avatarAddress: "" },
                { name: 'Семёнов Максим', gitHubUrl: 'https://github.com/OlegSchwann', faculty: "ИУ6", position: "Backend", avatarAddress: "" },
                { name: 'Морозенков Олег', gitHubUrl: 'https://github.com/reo7sp', faculty: "ИУ5", position: "Лучший ментор", avatarAddress: "" }
            ],
            fronendtUrl: "https://github.com/frontend-park-mail-ru/2018_2_42",
            backendUrl: "https://github.com/go-park-mail-ru/2018_2_42"
        };
        const template = window.fest['js/components/About/About.tmpl'](data);
        this._el.innerHTML += template;
    }
}