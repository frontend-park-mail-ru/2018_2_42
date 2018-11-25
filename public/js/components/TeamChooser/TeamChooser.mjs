'use strict';

import "/js/components/TeamChooser/TeamChooser.tmpl.js"

export default class TeamChooserComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = {};
        const template = window.fest['js/components/TeamChooser/TeamChooser.tmpl'](data);
        let div = document.createElement('div');
        div.innerHTML = template;
        this._el.appendChild(div.firstChild);

        document.getElementById("teamchooser_back_btn").addEventListener("click", (event) => {
            event.preventDefault();
            window.bus.publish("draw-menu");
        });
    }
}