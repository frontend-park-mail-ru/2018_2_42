'use strict';

import tmpl from "./WeaponsShuffler.tmpl.xml"

export default class WeaponsShufflerComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = {};
        const template = tmpl(data);
        let div = document.createElement('div');
        div.innerHTML = template;
        this._el.appendChild(div.firstChild);
    }
}