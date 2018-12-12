'use strict';

import "./WeaponsChooser.tmpl.js"
import WEAPONS from "../../modules/game/core/weapons.js";

export default class TeamChooserComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
        this._div = null;
    }

    render() {
        this.destroy();
        const data = {
            weapons: [
                {
                    name: WEAPONS.ROCK,
                    id: WEAPONS.ROCK,
                },
                {
                    name: WEAPONS.SCISSORS,
                    id: WEAPONS.SCISSORS,
                },
                {
                    name: WEAPONS.PAPER,
                    id: WEAPONS.PAPER,
                },
            ],
        };
        const template = window.fest['js/components/WeaponsChooser/WeaponsChooser.tmpl'](data);
        this._div = document.createElement('div');
        this._div.innerHTML = template;
        this._el.appendChild(this._div.firstChild);

        document.getElementById(data.weapons[0].id).addEventListener("click", (event) => {
            event.preventDefault();
            this.destroy();
            window.bus.publish("rechose-weapon", data.weapons[0].name);
        });

        document.getElementById(data.weapons[1].id).addEventListener("click", (event) => {
            event.preventDefault();
            this.destroy();
            window.bus.publish("rechose-weapon", data.weapons[1].name);
        });

        document.getElementById(data.weapons[2].id).addEventListener("click", (event) => {
            event.preventDefault();
            this.destroy();
            window.bus.publish("rechose-weapon", data.weapons[2].name);
        });
    }

    destroy() {
        const div = document.getElementsByClassName("weaponsChooser")[0];
        if (div) {
            div.remove();
        }
    }
}