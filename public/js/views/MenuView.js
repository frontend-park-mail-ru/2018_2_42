import { MenuComponent } from "../components/Menu/Menu.mjs";
import BaseView from "./BaseView.js";

export default class MenuView extends BaseView {
    constructor({ el = document.body, withNavbar = true } = {}) {
        super({ el: el, withNavbar: withNavbar})
    }

    render() {
        // fetch leaders
        const menu = new MenuComponent({el: this._el});
        menu.render();
        this.hide();
    }
}