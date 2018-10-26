'use strict';
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
        this._withNavbar = withNavbar;
        
        this._section = document.createElement("section");
        this._section.dataset.view = this.constructor.name;
        this._section.id = this.constructor.name;
        this._section.hidden = true;
    }

    get active() {
        return !this._section.hidden;
    }

    get rendered() {
        return this._section.innerHTML === '';
    }

    hide() {
        this._section.hidden = true;
        if (this._withNavbar) {
            this.destroyNavbar();
        }
    }

    show() {
        this._section.hidden = false;
        if (this._withNavbar) {
            this.createNavbar();
        }
    }

    render() {
        throw new Error("This nethod must be overridden.");
    }

    destroy() {
        document.getElementById(this.constructor.name).innerHTML = '';
    }

    createNavbar() {
        const login = userService.login;

        const section = document.createElement("section");
        section.dataset.view = "navbar";
        section.id = "navbar";
        section.innerHTML = '';

        const root = document.getElementById("root");
        root.insertBefore(section, root.firstChild);

        const navbar = new Navbar({ el: section, login: login });
        navbar.render();
    }

    destroyNavbar() {
        document.getElementById("navbar").remove();
    }
}
