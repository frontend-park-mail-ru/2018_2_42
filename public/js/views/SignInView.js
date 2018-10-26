'use strict';
import SignInFormComponent from "../components/Form/SignInForm.mjs";
import BaseView from "./BaseView.js";

export default class SignInView extends BaseView {
    constructor({ el = document.body, withNavbar = true } = {}) {
        super({ el: el, withNavbar: withNavbar });
    }

    render() {
        this._el.appendChild(this._section);
        const form = new SignInFormComponent({ el: this._section });
        form.render();
    }
}