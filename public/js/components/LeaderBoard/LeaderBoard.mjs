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

        this.leaderBoard.getElementsByClassName('leaderboard__moreButton')[0].onclick = event => {
            event.preventDefault();
            event.stopPropagation();

            api.Leaders(this._page + 1, this._limit)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    this._page += 1;
                    this._addLeaders(data);
                })
                .catch(error => {
                    let button = this.leaderBoard.getElementsByClassName('leaderboard__moreButton')[0];
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
            let newRow = table.insertRow();
            newRow.innerHTML = `<tr><td>${leader.login}</td><td>${leader.gamesPlayed}</td><td>${leader.wins}</td></tr>`;
        });
    }
}