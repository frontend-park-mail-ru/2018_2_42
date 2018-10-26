'use strict';
import ProfileComponent from "../components/Profile/Profile.mjs";
import BaseView from "./BaseView.js";

export default class ProfileView extends BaseView {
    constructor({ el = document.body, withNavbar = true, login = null } = {}) {
        super({ el: el, withNavbar: withNavbar });
        this._login = login;
    }

    render() {
        this._el.appendChild(this._section);
        const profile = new ProfileComponent({ el: this._section, login: this._login });
        profile.render();
    }
}