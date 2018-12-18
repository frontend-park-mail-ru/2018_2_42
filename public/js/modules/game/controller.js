'use strict';

import TEAMS from './conf/teams.js';
import WEAPONS from './conf/weapons.js';
import FIELD from './conf/field.js';

export default class GameController {
	constructor(root) {
		this.root = root;
		this.reachableCells = [];
		this.me = null;
		this.enemy = null;
		this.selectedCell = null;
        
		this._onMousedown = this._onMousedown.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
	}

	setTeam(clr) {
		this.me = clr;
		this.enemy = (this.me === TEAMS.RED) ? TEAMS.BLUE : TEAMS.RED;
	}
    
	start() {
		this.root.addEventListener('mousedown', this._onMousedown);
	}

	stop() {
		this.root.removeEventListener('mousedown', this._onMousedown);
		this.removeMarkers();
	}

	_onMousedown(event) {
		let clicked = event.target;
		if (clicked.classList.contains(WEAPONS.ROCK) ||
            clicked.classList.contains(WEAPONS.PAPER) ||
            clicked.classList.contains(WEAPONS.SCISSORS)){
			clicked = clicked.parentNode;
		}
            
		if (clicked.className.indexOf(this.enemy) > 0){
			clicked = clicked.parentNode;
		}

		if (this.reachableCells.includes(clicked)) {
			let from = +this.selectedCell.getAttribute('id');
			let to = +clicked.getAttribute('id');
			window.bus.publish('game-unit-moved', {from ,to} );
			this.stop();
		}

		this.removeMarkers();
		if (clicked.classList.contains('unit') &&
            this.containsAlly(clicked.parentElement, this.me) &&
            clicked.className.indexOf('flag') == -1) {
			const parentCell = clicked.parentElement;
			parentCell.classList.add('selected-cell');
			this.selectedCell = parentCell;
			this.markAvailableCells(clicked, this.me);
		}
	}

	removeMarkers(){
		if (this.reachableCells) {
			this.reachableCells.forEach(cell=>{
				cell.classList.remove('near-cell');
			});
		}
        
		if (this.selectedCell) {
			this.selectedCell.classList.remove('selected-cell');
		}

		this.reachableCells = [];
		this.selectedCell = null;
	}

	containsAlly(cell, allyClr){
		const cellInner = cell.firstChild;
		if (cellInner == null) return false;
		switch (allyClr){
		case TEAMS.BLUE:
			return cellInner.classList.contains('blue-back');
		case TEAMS.RED:
			return cellInner.classList.contains('red-back');
		default:
			return false;
		}
	}

	getAvailableCells(clicked, allyClr){
		const parentCell = clicked.parentElement;

		let availableCells = [];

		let upCell = this.getUpperCell(parentCell);
		if ((upCell != null) && !this.containsAlly(upCell, allyClr)) availableCells.push(upCell);

		let underCell = this.getUnderCell(parentCell);
		if ((underCell != null) && !this.containsAlly(underCell, allyClr)) availableCells.push(underCell);

		let leftCell = this.getLeftCell(parentCell);
		if ((leftCell != null) && !this.containsAlly(leftCell, allyClr)) availableCells.push(leftCell);

		let rightCell = this.getRightCell(parentCell);
		if ((rightCell != null) && !this.containsAlly(rightCell, allyClr)) availableCells.push(rightCell);

		return availableCells;
	}

	markAvailableCells(clicked, allyClr){
		this.reachableCells = this.getAvailableCells(clicked, allyClr);

		this.reachableCells.forEach(element => {
			this.markAvailableCell(element, allyClr);
		});
	}

	markAvailableCell(cell, allyClr){
		if ((cell != null) && !this.containsAlly(cell, allyClr)) {
			cell.classList.add('near-cell');
		}
	}

	getUpperCell(cell){
		return document.getElementById((+cell.getAttribute('id') - FIELD.ROW) + '');
	}

	getUnderCell(cell){
		return document.getElementById((+cell.getAttribute('id') + FIELD.ROW) + '');
	}

	getLeftCell(cell){
		if ((+cell.getAttribute('id') % FIELD.ROW) !== 0) {
			return document.getElementById((+cell.getAttribute('id') - 1) + '');
		}
	}

	getRightCell(cell){
		if (((+cell.getAttribute('id') + 1) % FIELD.ROW) !== 0) {
			return document.getElementById((+cell.getAttribute('id') + 1) + '');
		}
	}
}
