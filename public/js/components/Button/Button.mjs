'use strict'

import tmpl from "./Button.tmpl.xml"

export default class ButtonComponent {
    constructor({ el = document.body, className = null, caption = null, url = null, id = null } = {}) {
        this._el = el;
        this._className = className;
        this._caption = caption;
        this._url = url;
        this._id = id;
    }

    render() {
        const data = {
            className: this._className,
            caption: this._caption,
            url: this._url,
            id: this._id
        };
        const template = tmpl(data);
        this._el.innerHTML += template;
    }
}