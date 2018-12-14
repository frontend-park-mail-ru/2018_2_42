'use strict'

import tmpl from './About.tmpl.xml';
import andrey from './images/andrey.jpg';
import misha from './images/misha.jpg';
import daniel from './images/daniel.jpg';
import maxim from './images/maxim.jpg';
import oleg from './images/oleg.jpg';

export default class AboutComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = {
            contributors: [
                { name: 'Дикарев Андрей', gitHubUrl: 'https://github.com/DikarevAndrey', position: "Frontend", avatar: andrey },
                { name: 'Корецкий Михаил', gitHubUrl: 'https://github.com/koretskyhub', position: "Backend", avatar: misha },
                { name: 'Ли Даниил', gitHubUrl: 'https://github.com/Unanoc', position: "Frontend", avatar: daniel },
                { name: 'Семёнов Максим', gitHubUrl: 'https://github.com/OlegSchwann', position: "Backend", avatar: maxim },
                { name: 'Морозенков Олег', gitHubUrl: 'https://github.com/reo7sp', position: "Лучший ментор", avatar: oleg }
            ],
            fronendtUrl: {
                caption: "Frontend",
                url: "https://github.com/frontend-park-mail-ru/2018_2_42"
            },
            backendUrl: {
                caption: "Backend",
                url: "https://github.com/go-park-mail-ru/2018_2_42"
            },
        };
        const template = tmpl(data);
        let div = document.createElement('div');
        div.innerHTML = template;
        this._el.appendChild(div.firstChild);

        document.getElementById("about_back_btn" ).addEventListener("click", (event) => {
            event.preventDefault();
            window.bus.publish("draw-menu");
        });
    }
}