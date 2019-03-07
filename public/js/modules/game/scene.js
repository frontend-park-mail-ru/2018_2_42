const TEAMS = require('./conf/teams.js');
const FIELD = require('./conf/field.js');
const WEAPONS = require('./conf/weapons.js');

class GameScene {
	constructor() {
		this.me = null;
		this.enemy = null;
        
		this.shuffleWeapon = this.shuffleWeapon.bind(this);
		this.moveUnit = this.moveUnit.bind(this);
		this.fight = this.fight.bind(this);
		this.showTie = this.showTie.bind(this);
		this.changeTurn = this.changeTurn.bind(this);
		this.replaceWeapon = this.replaceWeapon.bind(this);
		this.showGetFlag = this.showGetFlag.bind(this);

		window.bus.subscribe('shuffle-weapons', this.shuffleWeapon);
	}

	start() {
		window.bus.unsubscribe('shuffle-weapons', this.bindedShuffleWeapon);
		window.bus.subscribe('move-unit', this.moveUnit);
		window.bus.subscribe('fight', this.fight);
		window.bus.subscribe('tie', this.showTie);
		window.bus.subscribe('finish-game', this.showGetFlag);
		window.bus.subscribe('change-weapon', this.replaceWeapon);
	}

	destroy() {
		this.me = null;
		this.enemy = null;
		window.bus.unsubscribe('move-unit', this.moveUnit);
		window.bus.unsubscribe('fight', this.fight);
		window.bus.unsubscribe('tie', this.showTie);
		window.bus.unsubscribe('finish-game', this.showGetFlag);
		window.bus.unsubscribe('change-weapon', this.replaceWeapon);
	}

	setTeam(clr) {
		this.me = clr;
		this.enemy = (this.me === TEAMS.RED) ? TEAMS.BLUE : TEAMS.RED;
		this.fillScene();
		this.shuffleWeapon();
	}

	changeTurn(clr){
		let indicatorClasses = document.getElementById('indicator').classList;
		indicatorClasses.remove('red-turn', 'blue-turn');
		switch (clr){
		case TEAMS.BLUE: indicatorClasses.add('blue-turn');
			window.bus.publish('change-turn-sound', 'blue')
			break;
		case TEAMS.RED: indicatorClasses.add('red-turn');
			window.bus.publish('change-turn-sound', 'red')
			break;
		default: throw 'incorrect color';
		}
	}
    
	fillScene(){
		if (this.me == null) {
			throw 'Player team not chosen';
		}

		let myUnit = document.createElement('div');
		let enemyUnit = document.createElement('div');
        
		switch (this.me){
		case TEAMS.BLUE:
			myUnit.className = 'unit blue-back';
			enemyUnit.className = 'unit red-front';
			break;
		case TEAMS.RED: 
			myUnit.className = 'unit red-back';
			enemyUnit.className = 'unit blue-front';
			break; 
		}

		for (let i = 0; i < FIELD.ROW*2; i++) {
			document.getElementById(FIELD.SIZE - i).innerHTML = '';
			document.getElementById(FIELD.SIZE - i).appendChild(myUnit.cloneNode(false));
			document.getElementById(i).innerHTML = '';
			document.getElementById(i).appendChild(enemyUnit.cloneNode(false));
		}
	}
    
	shuffleWeapon(){
		for (let i = 0; i < FIELD.ROW*2; i++) {
			let weapon = document.createElement('div');
			weapon.classList.add(WEAPONS.RandomWeapon());
			let targetUnit = document.getElementById(FIELD.SIZE - i).firstChild;
			if (!targetUnit) throw 'units not in start position';
			targetUnit.className = 'unit ' + this.me + '-back';
			targetUnit.innerHTML = '';
			targetUnit.appendChild(weapon);
		}
        
		const flagPos = FIELD.SIZE - Math.floor(Math.random() * FIELD.ROW*2);
		document.getElementById(flagPos).firstChild.innerHTML = '';
		document.getElementById(flagPos).firstChild.classList.add(this.me + '-flag');
	}

	moveUnit({from, to, callback}){
		let unitFrom = null;
		if (this.validatePositionId(from)) {
			unitFrom = document.getElementById(from).firstChild;
			if (!unitFrom.classList.contains('unit')) {
				throw 'no unit in from-cell';
			}
			if (unitFrom.classList.contains(this.me + '-flag')) {
				throw 'cannot move flag unit';
			}
		}

		let cellTo = null;
		if (this.validatePositionId(to)) {
			cellTo = document.getElementById(to);
		}

		let moveAnimationClass = 'animate-' + this.validateAvailableCells(from, to);
		if (moveAnimationClass == 'animate-0') throw 'unreachable cell';

		let weapon = null;
		weapon = unitFrom.firstChild;
		if (weapon) weapon.classList.add('animate-jump');

		function afterMove(){
			unitFrom.classList.remove(moveAnimationClass);
			if (weapon) weapon.classList.remove('animate-jump');
			unitFrom.removeEventListener('webkitAnimationEnd', afterMove);
			window.bus.publish('animation-finished');
			if (typeof callback !== 'undefined') callback();
		}
        
		window.bus.publish('animation-started');
		unitFrom.classList.add(moveAnimationClass);
		document.getElementById(to).appendChild(unitFrom);
		unitFrom.addEventListener('webkitAnimationEnd', afterMove, false);
	}
    
	fight({	winner = {position, weapon}, loser = {position, weapon}}){
		if (!(this.validateUnit(winner) && this.validateUnit(loser))) return;

		const winnerCell = document.getElementById(winner.position);
		const loserCell = document.getElementById(loser.position);

		const winnerUnit = winnerCell.firstChild;
		const loserUnit = loserCell.firstChild;

		if (((winnerUnit.className.indexOf(this.me) > 0) &&	(loserUnit.className.indexOf(this.me) > 0)) ||
            ((winnerUnit.className.indexOf(this.enemy) > 0) && (loserUnit.className.indexOf(this.enemy) > 0))) {
			throw 'fight between teammates';
		}

		let allyCell = null;
		let enemyCell = null;

		let fightAnimationClass = null;
		//определение команды победителя
		if (winnerUnit.className.indexOf(this.me) > 0) {
			allyCell = winnerCell;
			enemyCell = loserCell;
			this.replaceWeapon({ positionId: allyCell.getAttribute('id'), weaponName: winner.weapon});
			if (enemyCell.firstChild.firstChild) this.replaceWeapon({ positionId: enemyCell.getAttribute('id'), weaponName: loser.weapon});
			fightAnimationClass = this.fightAnimationClassBuilder(this.me, winner.weapon, loser.weapon);
		} else {
			allyCell = loserCell;
			enemyCell = winnerCell;
			this.replaceWeapon({ positionId: allyCell.getAttribute('id'), weaponName: loser.weapon});
			if (enemyCell.firstChild.firstChild) this.replaceWeapon({ positionId: enemyCell.getAttribute('id'), weaponName: winner.weapon});
			fightAnimationClass = this.fightAnimationClassBuilder(this.enemy, winner.weapon, loser.weapon);
		}

        
		let fightCell = null;
		let attackerCell = null;

		//определение атаковавшего юнита
		if (document.getElementById('indicator').classList.contains(this.me + '-turn')) {
			fightCell = enemyCell;
			attackerCell = allyCell;
		} else {
			fightCell = allyCell;
			attackerCell = enemyCell;
		}

		let moveAnimationClass = 'animate-' + this.validateAvailableCells(+attackerCell.getAttribute('id'),
			+fightCell.getAttribute('id'));
		if (moveAnimationClass == 'animate-0') {
			throw 'unreachable cell';
		}

		this.doFight(fightCell, attackerCell, winnerUnit, winner, moveAnimationClass, fightAnimationClass);
	}

	doFight(fightCell, attackerCell, winnerUnit, winner, moveAnimationClass, fightAnimationClass){
		let fightDiv = document.createElement('div');
		let eventDiv = document.getElementById('game-event');
		let attacker = attackerCell.firstChild;
		let weapon = attackerCell.firstChild.firstChild;

		var afterAttackMove = ()=>{
			window.bus.publish('hit', fightAnimationClass);
			eventDiv.innerHTML = '';
			eventDiv.append(fightDiv);
			fightDiv.classList.add('animate-fight-' + fightAnimationClass);
			fightDiv.addEventListener('webkitAnimationEnd', afterAttackEvent, false);
			attacker.removeEventListener('webkitAnimationEnd', afterAttackMove);
		};

		var afterAttackEvent = () => {
			if (weapon) weapon.classList.remove('animate-jump');
			attacker.classList.remove(moveAnimationClass);		
			eventDiv.innerHTML = '';
			attackerCell.innerHTML = '';
			fightCell.innerHTML = '';
			fightCell.appendChild(winnerUnit);
			this.replaceWeapon({ positionId: fightCell.getAttribute('id'), weaponName: winner.weapon});
			fightDiv.removeEventListener('webkitAnimationEnd', afterAttackEvent);
			window.bus.publish('animation-finished');
		};
        
		window.bus.publish('animation-started');
		attacker.classList.add(moveAnimationClass);
		fightCell.appendChild(attacker);
		if (weapon) weapon.classList.add('animate-jump');
		attacker.addEventListener('webkitAnimationEnd', afterAttackMove, false);
	}

	showTie(cell){
		let unit = null;
		if (this.validatePositionId(cell)) {
			unit = document.getElementById(cell).firstChild;
			if (!unit.classList.contains('unit')) {
				throw 'no unit in from-cell';
			}
		}

		let weapon = unit.firstChild.className;
		if (weapon.indexOf(' ') != -1) weapon = weapon.substring(0, weapon.indexOf(' '));
		this.validateWeapon(weapon);

		let animationClass;

		switch (weapon) {
		case WEAPONS.ROCK:
			animationClass = 'animate-tie-r';
			break;
		case WEAPONS.PAPER:
			animationClass = 'animate-tie-p';
			break;
		case WEAPONS.SCISSORS:
			animationClass = 'animate-tie-s';
			break;
		default:
			throw 'incorrect weapon';
		}

		let tieDiv = document.createElement('div');
		let eventDiv = document.getElementById('game-event');
		eventDiv.innerHTML = '';

		let afterTieEvent = () => {
			tieDiv.removeEventListener('webkitAnimationEnd', afterTieEvent);
			window.bus.publish('animation-finished');
			window.bus.publish('rechoose-weapon');
		};

		window.bus.publish('animation-started');
		eventDiv.appendChild(tieDiv);
		tieDiv.classList.add(animationClass);
		tieDiv.addEventListener('webkitAnimationEnd', afterTieEvent, false);
	}

	replaceWeapon({positionId, weaponName}){
		if (this.validateWeapon(weaponName)) {
			if (this.validatePositionId(positionId)) {
				let unit = document.getElementById(positionId).firstChild;
				let weapon = document.createElement('div');
				weapon.classList.add(weaponName.toLowerCase());
				unit.innerHTML = '';
				unit.appendChild(weapon);
			} else throw 'not valid position';
		}
	}

	showGetFlag({winner, from, to}){
		let getFlag = ()=>{
			let winnerClr = winner ? this.me : this.enemy;
			let eventDiv = document.getElementById('game-event');
			let getFlagDiv = document.createElement('div');
			eventDiv.innerHTML = '';
			eventDiv.append(getFlagDiv);
			getFlagDiv.classList.add('animate-' + winnerClr + '-get-flag');
			setTimeout(()=>{
				window.bus.publish('show-winner', winner ? this.me : this.enemy);
			}, 3000);
		};

		this.moveUnit({ from: from, to: to, callback: getFlag});
	}

	validateAvailableCells(cell1, cell2){
		switch (cell1 - cell2) {
		case FIELD.ROW:
			return 'up';
            
		case -FIELD.ROW:
			return 'down';
        
		case 1:
			if (cell1 % FIELD.ROW !== 0){
				return 'left';
			} else {
				return 0;
			}
        
		case -1:
			if ((cell1 + 1) % FIELD.ROW !== 0){
				return 'right';
			} else {
				return 0;
			}
        
		default:
			return 0;
		}
	}

	validateUnit(inUnit){
		if (!(this.validatePositionId(inUnit.position))) return false;

		let unitCell = document.getElementById(inUnit.position);

		if (!(unitCell)) {
			console.log('cell does not exist');
			return false;
		}

		let unit = unitCell.firstChild;

		if (!(unit)) {
			console.log('empty cell');
			return false;
		}
        
		if (!this.validateWeapon(inUnit.weapon)) return false;

		let unitWeapon = unit.firstChild; 

		if (unit.className.indexOf(this.me) > 0) {
			if (!unitWeapon) {
				console.log('unit have no weapon');
				return false;
			} 
		}
		return true;
	}

	validateWeapon(weaponName){
		if (weaponName == WEAPONS.ROCK || weaponName == WEAPONS.PAPER || weaponName == WEAPONS.SCISSORS){
			return true;
		} else {
			console.log('incorrect weapon');
			return false;
		}
	}

	validatePositionId(positionId){
		if ((0 <= positionId) && (positionId <= FIELD.SIZE)) {
			return true;
		} else {
			console.log('incorrect positionId');
			return false;
		}
	}

	fightAnimationClassBuilder(winnerColor, winnerWeapon, loserWeapon){
		let fightAnimationClass = winnerColor;
		switch (winnerWeapon + loserWeapon) {
		case 'rockscissors':
			fightAnimationClass += '-rs';
			break;
		case 'paperrock':
			fightAnimationClass += '-pr';
			break;
		case 'scissorspaper':
			fightAnimationClass += '-sp';
			break;
		default:
			throw 'incorrect combination of weapon and fiht result';
		}
		return fightAnimationClass;
	}
}

module.exports = GameScene;