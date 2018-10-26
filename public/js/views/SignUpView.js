'use strict';
import SignUpFormComponent from "../components/Form/SignUpForm.mjs";
import BaseView from "./BaseView.js";

export default class SignUpView extends BaseView {
    constructor({ el = document.body, withNavbar = true } = {}) {
        super({ el: el, withNavbar: withNavbar });
    }

    render() {
        this._el.appendChild(this._section);
        const form = new SignUpFormComponent({ el: this._section });
        form.render();
    }
}