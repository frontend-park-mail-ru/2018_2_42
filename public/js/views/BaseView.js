'use strict;'

import Navbar from "../components/Navbar/Navbar.mjs";
import UserService from "../Services/UserService.js";

const userService = new UserService();

/**
 * @class BaseView
 * @module BaseView
 */
export default class BaseView {
    constructor({ el = document.body, withNavbar = true } = {}) {
        this._el = el;
        this._el.dataset.view = this.constructor.name;
        this._el.hidden = true;
        this._withNavbar = withNavbar;
    }

    get active() {
        return !this._el.hidden;
    }

    hide() {
        this._el.hidden = true;
        if (this._withNavbar) {
            this.destroyNavbar();
        }
    }

    show() {
        this._el.hidden = false;
        if (this._withNavbar) {
            this.createNavbar();
        }
    }

    render() {
        throw new Error("This nethod must be overridden.");
    }

    destroy() {
        this._el.innerHTML = '';
    }

    createNavbar() {
        const login = userService.login;
        const root = document.getElementById("navbar");
        root.innerHTML = '';
        const navbar = new Navbar({ el: root, login: login });
        navbar.render();
    }

    destroyNavbar() {
        document.getElementById("navbar").innerHTML = '';
    }
}
