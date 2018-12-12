'use strict';

import "./TeamChooser.tmpl.js"
import TEAMS from "../../modules/game/core/teams.js";

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
    }
}