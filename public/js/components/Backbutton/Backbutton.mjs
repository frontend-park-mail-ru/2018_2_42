'use strict'

export class BackButtonComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = { 
            title: { caption: 'Back', url: 'menu', className: "backbutton__button" },
        };
        const template = window.fest['js/components/Backbutton/Backbutton.tmpl'](data);
        this._el.innerHTML += template;
    }
}