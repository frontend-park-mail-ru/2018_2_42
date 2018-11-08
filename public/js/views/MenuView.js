'use strict';
import MenuComponent from "../components/Menu/Menu.mjs";
import BaseView from "./BaseView.js";

export default class MenuView extends BaseView {
    constructor({ el = document.body, withNavbar = true } = {}) {
        super({ el: el, withNavbar: withNavbar});
    }

    render() {
        this._el.appendChild(this._section);
        const menu = new MenuComponent({el: this._section});
        menu.render();
    }
}