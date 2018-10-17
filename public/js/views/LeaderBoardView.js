import BaseView from './BaseView.js';
import bus from '../bus.js';

export default class LeaderBoardView extends BaseView {
	constructor(el) {
		super(el);

		this.leaders = null;
		this.page = null;
		this.limit = null;

		bus.on('leaders-loaded', this.setLeaders.bind(this));
	}

	show({ page = 1, limit = 5 }) {
		super.show();

		this.renderLeaderboard();

		this.page = page;
		this.limit = limit;

		this.fetchLeaders();
	}

	hide(){
		super.hide();
		this.el.innerHTML = '';
		this.leaders = null;
		this.page = null;
		this.limit = null;
	}

	fetchLeaders(){
		bus.emit('fetch-leaders', {page: this.page, limit: this.limit});
	}

	setLeaders(leaders) {
		this.leaders = leaders;
		console.log(leaders);
		this.render();
	}

	render () {
		if (this.leaders) {
			console.log('rendering');
			this.addLeaders(this.leaders)
		}
	}

	renderLoading () {
		const loading = document.createElement('strong');
		loading.textContent = 'Loading';
		this.el.appendChild(loading);
	}

	renderLeaderboard () {
		super.createNavbar();

		const template = window.fest['js/components/LeaderBoard/LeaderBoard.tmpl']({});
		this.el.innerHTML += template;

		this.leaderBoard = this.el.getElementsByClassName('leaderboard')[0];
		this.buttonMore = this.leaderBoard.
							getElementsByClassName('leaderboard__moreButton')[0];
		this.buttonMore.onclick = event => {
			event.preventDefault();
			event.stopPropagation();
			bus.emit('fetch-leaders', {page: ++this.page, limit: this.limit});
		}
	}

	addLeaders(leaders) {
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
