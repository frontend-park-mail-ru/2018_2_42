'use strict';

import TEAMS from '../conf/teams.js';
import WEAPONS from '../conf/weapons.js';
import FIELD from '../conf/field.js';

export default class Bot{
	constructor(field, color){
		this.field = field;
		this.botColor = color;
		this.enemyColor = (color ===  TEAMS.RED ? TEAMS.BLUE : TEAMS.RED);
		this.changeTurn = this.changeTurn.bind(this);
		this.makeMove = this.makeMove.bind(this);

		this.DELAY = 4000;
	}
    
	start(){
		window.bus.subscribe('change-turn', this.changeTurn);
	}
    
	stop(){
		window.bus.unsubscribe('change-turn', this.changeTurn);
	}

	changeTurn(clientTurn){
		if (!clientTurn) {
			let rand = Math.round(Math.random() * (this.DELAY - this.DELAY/2)) + this.DELAY/2;
			console.log(rand);
			setTimeout(this.makeMove, rand);
		}
	}

	makeMove(){
		const team = this.getTeamIndexes(this.botColor);
		let closestEnemies = [];
		team.forEach((element) => {
			if (this.field[element].weapon !== WEAPONS.FLAG){
				let enemies = this.getClosestEnemies(element);
				if (enemies.length !== 0) enemies.forEach(el => {
					el.from = element;
					closestEnemies.push(el);
				});
			}
		});

		//перемешиваем элементы в массиве
		closestEnemies.sort(() => {
			return Math.random() - 0.5;
		});

		closestEnemies.sort((a, b) => {
			return a.way - b.way;
		});

		closestEnemies = closestEnemies.slice(0, closestEnemies[0].way + 1);

		//перемешиваем элементы в массиве
		closestEnemies.sort(() => {
			return Math.random() - 0.5;
		});

		let from = closestEnemies[0].from;
		let to = this.getStepFromTo(closestEnemies[0].from, closestEnemies[0].to);

		window.bus.publish('game-unit-moved', {from, to} );
	}

	getTeamIndexes(color){
		let team = [];
		this.field.forEach((element, idx) => {
			if ((element !== null) && (element.team === color)) team.push(idx);
		});
		return team;
	}

	isAlly(cell){
		if ((this.field[cell] === null) || (this.field[cell] === 'undefined')) return false;
		else return (this.field[cell].team === this.botColor);
	}

	//не проверяет что в клетке to
	getStepFromTo(from, to){
		const fromLine = Math.floor(from / FIELD.ROW);
		const toLine = Math.floor(to / FIELD.ROW);
		const fromCol = from % FIELD.ROW;
		const toCol = to % FIELD.ROW;

		const up = this.getUpperCell(from);
		const down = this.getUnderCell(from);
		const left = this.getLeftCell(from);
		const right = this.getRightCell(from);

		//клетки на 1 вертикали
		if (fromCol === toCol){
			if ((from < to) && (!this.isAlly(down)))    return down;
			if ((from > to) &&  (!this.isAlly(up)))     return up;
			if (!this.isAlly(right))                    return right;
			if (!this.isAlly(left))                     return left;
		}

		//клетки на 1 горизонтали
		if (fromLine === toLine){
			if ((from < to) && (!this.isAlly(right)))   return right;
			if ((from > to) &&  (!this.isAlly(left)))   return left;
			if (!this.isAlly(up))                       return up;
			if (!this.isAlly(down))                     return down;
		}

		let lineDiff = fromLine - toLine;
		let colDiff = fromCol - toCol;

		if (Math.abs(lineDiff) > Math.abs(colDiff)){
			if ((lineDiff > 0) && (!this.isAlly(up)))    return up;
			if ((lineDiff < 0) && (!this.isAlly(down)))  return down;
			if (!this.isAlly(left))                      return left;
			if (!this.isAlly(right))                     return right;
		} else {
			if ((colDiff > 0) && (!this.isAlly(left)))   return left;
			if (!(colDiff > 0) && (!this.isAlly(right))) return right;
			if (!this.isAlly(up))                        return up;
			if (!this.isAlly(down))                      return down;
		}
	}

	getUpperCell(cellIdx){
		if ((this.validateAvailableCell(cellIdx)) && (cellIdx > FIELD.ROW)) {
			return cellIdx - FIELD.ROW;
		} else return null;
	}
    
	getUnderCell(cellIdx){
		if ((this.validateAvailableCell(cellIdx)) && (cellIdx < FIELD.SIZE - FIELD.ROW)) {
			return cellIdx + FIELD.ROW;
		} else return null;
	}
    
	getLeftCell(cellIdx){
		if (this.validateAvailableCell(cellIdx)) {
			if ((cellIdx % FIELD.ROW) !== 0) return cellIdx - 1;
		} else return null;
	}
    
	getRightCell(cellIdx){
		if (this.validateAvailableCell(cellIdx)) {
			if (((cellIdx + 1) % FIELD.ROW) !== 0) return cellIdx + 1;
		} else return null;
	}

	validateAvailableCell(cellIdx){
		if ((0 <= cellIdx) && (cellIdx <= FIELD.SIZE)) return true;
		else return false;
	}

	//возвращает ближайшую клетку к любому противнику
	getClosestEnemies(cellIdx){
		let reachableEnemies = new Map();
		let alreadyReached = this.getTeamIndexes(this.botColor);

		let search = (cellIdx, stepsNum)=> {
			if (stepsNum > 10) return;

			//клетки вокруг
			let cellsAround = [
				this.getUpperCell(cellIdx),
				this.getUnderCell(cellIdx),
				this.getLeftCell(cellIdx),
				this.getRightCell(cellIdx),
			];

			//непосещенные доступные к шагу клетки вокруг
			cellsAround = cellsAround.filter(element => element);

			//посещаем клетки    
			cellsAround.forEach(element => {
				if (!alreadyReached.includes(element)) {
					//если в ячейке пусто то ищем из этой ячейки
					if (this.field[element] === null){
						search(element, stepsNum + 1); 
						//если в ячеке враг записываем путь до него и завершаем цепочку рекурсивных вызовов
					} else if (this.field[element].team === this.enemyColor) {
						if ((reachableEnemies.get(element) > stepsNum) || (reachableEnemies.get(element) === undefined)) {
							reachableEnemies.set(element, stepsNum);
						}
					}
					//для ячеек с союзниками вызова поиска нет 
				}
			});
		};

		search(cellIdx, 0);

		const minWay = Math.min(...reachableEnemies.values());
		let closestEnemies = [];
		reachableEnemies.forEach((value, key) => {
			if (value === minWay) closestEnemies.push({to: key, way: value});
		});

		return closestEnemies;
	}

}