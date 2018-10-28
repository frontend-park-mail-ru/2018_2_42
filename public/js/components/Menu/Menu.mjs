'use strict'

import "/js/components/Menu/Menu.tmpl.js"

export default class MenuComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = { 
            menuTitles: [
                { caption: 'Singleplayer', url: 'singleplayer', className: "menu__button", id: "" },
                { caption: 'Multiplayer', url: 'multiplayer', className: "menu__button", id: "" },
                { caption: 'Leaderboard', url: 'users', className: "menu__button", id: "leaderboard_btn" },
                { caption: 'About', url: 'about', className: "menu__button", id: "about_btn" },
            ]
        };
        const template = window.fest['js/components/Menu/Menu.tmpl'](data);
        let div = document.createElement('div');
        div.innerHTML = template;
        this._el.appendChild(div.firstChild);

        document.getElementById("leaderboard_btn").addEventListener("click", (event) => {
            event.preventDefault();
            window.bus.publish("draw-leaderboard");
        });

        document.getElementById("about_btn").addEventListener("click", (event) => {
            event.preventDefault();
            window.bus.publish("draw-about");
        });

        // Добавить листенеры для мультиплеера и синглплеера
    }
}