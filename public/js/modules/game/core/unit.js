const WEAPONS = require('../conf/weapons.js');

class Unit {
	constructor(team = null, weapon = null) {
		this.team = team;
		this.weapon = weapon || WEAPONS.RandomWeapon();
	}

	static GetWinner(unit1, unit2) {
		switch (unit1.weapon) {
		case WEAPONS.PAPER:
			if (unit2.weapon === WEAPONS.SCISSORS) {
				return unit2;
			} else if (unit2.weapon === WEAPONS.ROCK) {
				return unit1;
			} else {
				return null;
			}
		case WEAPONS.ROCK:
			if (unit2.weapon === WEAPONS.PAPER) {
				return unit2;
			} else if (unit2.weapon === WEAPONS.SCISSORS) {
				return unit1;
			} else {
				return null;
			}
		case WEAPONS.SCISSORS:
			if (unit2.weapon === WEAPONS.ROCK) {
				return unit2;
			} else if (unit2.weapon === WEAPONS.PAPER) {
				return unit1;
			} else {
				return null;
			}
		default:
			break;
		}
	}
}

module.exports = Unit;