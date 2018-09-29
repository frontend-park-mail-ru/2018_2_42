'use strict';

import { APIModule } from "../../modules/api.js";

const api = new APIModule;

export class LeaderBoardComponent {
    constructor({ el = document.body, users = {} } = {}) {
        this._el = el;
        this._users = users;
    }

    render() {
        const data = this._users;
        const template = window.fest['js/components/LeaderBoard/LeaderBoard.tmpl'](data);
        this._el.innerHTML += template;
    }
}