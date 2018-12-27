'use strict';

import TEAMS from '../conf/teams.js';
import WEAPONS from '../conf/weapons.js';

export default class GameCore {
	constructor({ mode = 'offline'} = {}) {
		this.mode = mode;
        
		this.onGameStarted = this.onGameStarted.bind(this);
		this.onGameFinished = this.onGameFinished.bind(this);
		this.onGameUnitMoved = this.onGameUnitMoved.bind(this);
		this.onGameRechoseWeapon = this.onGameRechoseWeapon.bind(this);
	}

	start() {
		window.bus.subscribe('start-game', this.onGameStarted);
		window.bus.subscribe('finish-game', this.onGameFinished);
		window.bus.subscribe('game-unit-moved', this.onGameUnitMoved);
		window.bus.subscribe('rechose-weapon', this.onGameRechoseWeapon);
	}
    
	destroy() {
		// this.mode = null;

		window.bus.unsubscribe('start-game', this.onGameStarted);
		window.bus.unsubscribe('finish-game', this.onGameFinished);
		window.bus.unsubscribe('game-unit-moved', this.onGameUnitMoved);
		window.bus.unsubscribe('rechose-weapon', this.onGameRechoseWeapon);
	}

	parseClientTeam(){
		let domTeam = Array.from(document.getElementsByClassName('cell')).slice(40-12);
		let uploadMap = {
			'method': 'upload_map',
			'parameter': {
				'color': null,
				'weapons': [],
			},
		};

		if (domTeam[0].firstChild.className.indexOf(TEAMS.BLUE.toLowerCase()) > 0) {
			uploadMap.parameter.color = TEAMS.BLUE;
		} else if ((domTeam[0].firstChild.className.indexOf(TEAMS.RED.toLowerCase()) > 0)) {
			uploadMap.parameter.color = TEAMS.RED;
		}

		let weapon;
		domTeam.forEach(element => {
			if (element.firstChild.firstChild !== null){
				weapon = element.firstChild.firstChild.classList[0];
				if ((!(weapon === WEAPONS.ROCK || weapon === WEAPONS.PAPER || weapon === WEAPONS.SCISSORS)) ||
                    (!(element.firstChild.className === 'unit ' + uploadMap.parameter.color + '-back'))) {
					debugger;
					throw 'incorrect unit set';
				}
				uploadMap.parameter.weapons.push(element.firstChild.firstChild.classList[0]);
			} else if (element.firstChild.className.indexOf('flag') > 0) {
				uploadMap.parameter.weapons.push('flag');
			}
		});

		return uploadMap;
	}

	onGameStarted(state) {
		throw new Error('This method must be overridden');
	}

	onGameRechoseWeapon(state) {
		throw new Error('This method must be overridden');
	}

	onGameUnitMoved(state) {
		throw new Error('This method must be overridden');
	}

	onGameFinished(state) {
		throw new Error('This method must be overridden');
	}
}