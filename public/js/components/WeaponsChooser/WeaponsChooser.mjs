'use strict';

import "/js/components/WeaponsChooser/WeaponsChooser.tmpl.js"

export default class TeamChooserComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
        this._div = null;
    }

    render({ weapon1, weapon2 } = {}) {
        this.destroy();
        const data = {
            weapon1: {
                name: weapon1,
                id: weapon1,
            },
            weapon2: {
                name: weapon2,
                id: weapon2,
            },
        };
        const template = window.fest['js/components/WeaponsChooser/WeaponsChooser.tmpl'](data);
        this._div = document.createElement('div');
        this._div.innerHTML = template;
        this._el.appendChild(this._div.firstChild);

        document.getElementById(data.weapon1.id).addEventListener("click", (event) => {
            event.preventDefault();
            this.destroy();
            window.bus.publish("rechose-weapon", data.weapon1.name);
        });

        document.getElementById(data.weapon2.id).addEventListener("click", (event) => {
            event.preventDefault();
            this.destroy();
            window.bus.publish("rechose-weapon", data.weapon2.name);
        });
    }

    destroy() {
        const div = document.getElementsByClassName("weaponsChooser")[0];
        if (div) {
            div.remove();
        }
    }
}