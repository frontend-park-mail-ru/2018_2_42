'use strict';
import ChatComponent from "../components/Chat/Chat.mjs";
import BaseView from "./BaseView.js";

export default class ChatView extends BaseView {
    constructor({ el = document.body, withNavbar = true } = {}) {
        super({ el: el, withNavbar: withNavbar });
    }

    render() {
        this._el.appendChild(this._section);
        const chat = new ChatComponent({ el: this._section });
        chat.render();
    }

    show() {
        super.show();
        document.getElementById("chatIframe").hidden = true;
    }

    hide() {
        super.hide();
        document.getElementById("chatIframe").hidden = false;
    }
}