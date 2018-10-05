'use strict'

export class AboutComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = {
            contributors: [
                { name: 'Дикарев Андрей', gitHubUrl: 'https://github.com/DikarevAndrey', position: "Frontend", avatar: "../../images/about/lee.png" },
                { name: 'Корецкий Михаил', gitHubUrl: 'https://github.com/koretskyhub', position: "Backend", avatar: "../../images/about/lee.png" },
                { name: 'Ли Даниил', gitHubUrl: 'https://github.com/Unanoc', position: "Frontend", avatar: "../../images/about/lee.png" },
                { name: 'Семёнов Максим', gitHubUrl: 'https://github.com/OlegSchwann', position: "Backend", avatar: "../../images/about/lee.png" },
                { name: 'Морозенков Олег', gitHubUrl: 'https://github.com/reo7sp', position: "Лучший ментор", avatar: "../../images/about/lee.png" }
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