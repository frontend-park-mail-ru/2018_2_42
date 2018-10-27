'use strict';
import ProfileComponent from "../components/Profile/Profile.mjs";
import BaseView from "./BaseView.js";
import UserService from "../Services/UserService.js";

const userService = new UserService();

export default class ProfileView extends BaseView {
    constructor({ el = document.body, withNavbar = true, login = null } = {}) {
        super({ el: el, withNavbar: withNavbar });
        this._login = login;
    }

    render() {
        if (!this._login && !userService.IsUserSignedIn()) {
            window.bus.publish("draw-sign-in");
            return "redirect";
        }
        this._el.appendChild(this._section);
        const profile = new ProfileComponent({ el: this._section, login: this._login });
        profile.render();
    }
}