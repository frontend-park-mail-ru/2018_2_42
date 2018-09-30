'use strict';

export class LeaderBoardComponent {
    constructor({ el = document.body, users = {}, page = 1, limit = 20 } = {}) {
        this._el = el;
        this._users = users;
        this._page = page;
        this._limit = limit;
    }

    render() {
        // const data = this._users;
        const data = {
            users: [{
                    login: "login1",
                    avatarAddress: "",
                    gamesPlayed: 20,
                    wins: 10},
                    {
                    login: "login2",
                    avatarAddress: "",
                    gamesPlayed: 10,
                    wins: 8},
                    {
                    login: "login3",
                    avatarAddress: "",
                    gamesPlayed: 5,
                    wins: 2
            }],
            page: this._page
        }
        const template = window.fest['js/components/LeaderBoard/LeaderBoard.tmpl'](data);
        this._el.innerHTML += template;

        this.leaderBoard = this._el.getElementsByClassName('leaderboard')[0];

        let prevPageEvent = new CustomEvent('click', { detail: { page: this._page - 1, limit: this._limit } });
        this.leaderBoard.getElementsByClassName('prev_button')[0].addEventListener('click', function () {
            that.leaderBoard.getElementsByClassName('prev_button')[0].dispatchEvent(prevPageEvent);
        });
        

        let nextPageEvent = new CustomEvent('click', { detail: { page: this._page + 1, limit: this._limit } });
        this.leaderBoard.getElementsByClassName('next_button')[0].addEventListener('click', function () {
            console.log("Next Page clicked");
            that.leaderBoard.getElementsByClassName('next_button')[0].dispatchEvent(nextPageEvent);
        });
    }
}