'use strict';

import SignInFormComponent from "../components/Form/SignInForm.mjs";
import BaseView from "./BaseView.js";
import UserService from "../Services/UserService.js";

const userService = new UserService();

export default class SignInView extends BaseView {
    constructor({ el = document.body, withNavbar = true } = {}) {
        super({ el: el, withNavbar: withNavbar });
    }

    render() {
        if (userService.IsUserSignedIn()) {
            window.bus.publish("draw-profile");
            return "redirect";
        }
        this._el.appendChild(this._section);
        const form = new SignInFormComponent({ el: this._section });
        form.render();
    }
}