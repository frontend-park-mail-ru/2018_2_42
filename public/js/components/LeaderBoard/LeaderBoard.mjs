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

        this.leaderBoard.getElementsByClassName('more_button')[0].onclick = function (event) {
            event.stopPropagation();

            let that = this;

            api.Leaders(this._page + 1, this._limit)
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
                    let button = that.leaderBoard.getElementsByClassName('more_button')[0];
                    button.parentNode.removeChild(button);
                });
        }

        // let prevPageEvent = new CustomEvent('click', { detail: { page: this._page - 1, limit: this._limit } });
        // this.leaderBoard.getElementsByClassName('prev_button')[0].addEventListener('click', function () {
        //     that.leaderBoard.getElementsByClassName('prev_button')[0].dispatchEvent(prevPageEvent);
        // });
    }

    _addLeaders(leaders) {
        let table = this.leaderBoard.getElementsByTagName("table")[0];
        console.log(leaders);
        for (leader in leaders) {
            let newRow = table.insertRow();
            newRow.innerHTML = `<tr><td>${leader.login}<img src="${leader.avatarAddress}"></td><td>${leader.gamesPlayed}games played</td><td>${leader.wins}games won</td></tr>`
        }
    }
}