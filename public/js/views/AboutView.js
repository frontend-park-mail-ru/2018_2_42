'use strict';
import AboutComponent from "../components/About/About.mjs";
import BaseView from "./BaseView.js";

export default class AboutView extends BaseView {
    constructor({ el = document.body, withNavbar = true } = {}) {
        super({ el: el, withNavbar: withNavbar });
    }

    render() {
        this._el.appendChild(this._section);
        const about = new AboutComponent({ el: this._section });
        about.render();
    }
}