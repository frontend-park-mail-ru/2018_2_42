'use strict';

import "./WeaponsShuffler.tmpl.js"

export default class WeaponsShufflerComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = {};
        const template = window.fest['js/components/WeaponsShuffler/WeaponsShuffler.tmpl'](data);
        let div = document.createElement('div');
        div.innerHTML = template;
        this._el.appendChild(div.firstChild);
    }
}