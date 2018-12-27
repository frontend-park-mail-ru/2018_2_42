'use strict';
import LeaderBoardComponent from '../components/LeaderBoard/LeaderBoard.mjs';
import BaseView from './BaseView.js';
import UserService from '../services/UserService.js';

const userService = new UserService();

export default class LeaderboardView extends BaseView {
	constructor({ el = document.body, withNavbar = true } = {}) {
		super({ el: el, withNavbar: withNavbar });
	}

	render() {
		const page = 1, limit = 5;
		userService.GetLeaders(page, limit)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Server response was not ok.');
				}
				return response.json();
			})
			.then((data) => {
				this._el.appendChild(this._section);
				const leaderBoard = new LeaderBoardComponent({ el: this._section, leaders: data, page: page, limit: limit });
				leaderBoard.render();
			})
			.catch((error) => {
				console.log(error);
                
				window.bus.publish('draw-menu');
			});
	}
}