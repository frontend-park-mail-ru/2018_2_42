'use strict'

export class AboutComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = {
            contributors: [
                { name: 'Дикарев Андрей', gitHubUrl: 'https://github.com/DikarevAndrey', position: "Frontend", avatar: "../../images/about/andrey.jpg" },
                { name: 'Корецкий Михаил', gitHubUrl: 'https://github.com/koretskyhub', position: "Backend", avatar: "../../images/default.png" },
                { name: 'Ли Даниил', gitHubUrl: 'https://github.com/Unanoc', position: "Frontend", avatar: "../../images/about/daniel.jpg" },
                { name: 'Семёнов Максим', gitHubUrl: 'https://github.com/OlegSchwann', position: "Backend", avatar: "../../images/default.png" },
                { name: 'Морозенков Олег', gitHubUrl: 'https://github.com/reo7sp', position: "Лучший ментор", avatar: "../../images/default.png" }
            ],
            fronendtUrl: {
                className: "repo_button",
                caption: "Frontend",
                url: "https://github.com/frontend-park-mail-ru/2018_2_42"
            },
            backendUrl: {
                className: "repo_button",
                caption: "Backend",
                url: "https://github.com/go-park-mail-ru/2018_2_42"
            },
        };
        const template = window.fest['js/components/About/About.tmpl'](data);
        this._el.innerHTML += template;
    }
}