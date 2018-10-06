'use strict';

import { APIModule } from "../../modules/api.js";

const api = new APIModule;

export class LeaderBoardComponent {
    constructor({ el = document.body, leaders = [], page = 1, limit = 20 } = {}) {
        this._el = el;
        this._leaders = leaders;
        this._page = page;
        this._limit = limit;
    }

    render() {
        const data = {
            leaders: this._leaders,
            page: this._page
        }
        const template = window.fest['js/components/LeaderBoard/LeaderBoard.tmpl'](data);
        this._el.innerHTML += template;

        this.leaderBoard = this._el.getElementsByClassName('leaderboard')[0];

        let that = this;
        this.leaderBoard.getElementsByClassName('leaderboard__moreButton')[0].onclick = function (event) {
            event.preventDefault();
            event.stopPropagation();

            api.Leaders(that._page + 1, that._limit)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Server response was not ok.');
                    }
                    return response.json();
                })
                .then(function (data) {
                    that._page += 1;
                    that._addLeaders(data);
                })
                .catch(function (error) {
                    let button = that.leaderBoard.getElementsByClassName('leaderboard__moreButton')[0];
                    button.parentNode.removeChild(button);
                });
        }
    }

    _addLeaders(leaders) {
        if (!leaders) {
            throw new Error('No more leaders.');
        }
        let table = this.leaderBoard.getElementsByTagName("table")[0];
        leaders.forEach(leader => {
            console.log(leader);
            let newRow = table.insertRow();
            newRow.innerHTML = `<tr><td>${leader.login}</td><td>${leader.gamesPlayed}</td><td>${leader.wins}</td></tr>`;
        });
    }
}