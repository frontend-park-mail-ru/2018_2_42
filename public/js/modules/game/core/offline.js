'use strict';
import GameCore from "./gamecore.js";
import Bot from "./bot.js";
import Unit from "./unit.js";
import TEAMS from "./teams.js";
import WEAPONS from "./weapons.js";

export default class OfflineGame extends GameCore {
    constructor({ scene = null } = {}) {
        super({ mode: "offline", scene: scene });
        this.state = {};
        this.currentTurn = null;
        this.clientColor = null;
        this.botColor = null;
        this.bot = null;
        this.tie = null;
    }
    
    start() {
        super.start();
        
        this.state = {
            field: [],
        };
    }
    
    onGameStarted(state) {
        this.bot.start();
    }
    
    onGameUploadTeam(state) {
        //парсим команду клиента
        let uploadMap = super.parseClientTeam();
        console.log(uploadMap);

        //определяем цвет команды клиента и бота
        if (uploadMap.parameter.color === TEAMS.BLUE) {
            this.botColor = TEAMS.RED;
            this.clientColor = TEAMS.BLUE; 
        } else if (uploadMap.parameter.color === TEAMS.RED) {
            this.botColor = TEAMS.BLUE;
            this.clientColor = TEAMS.RED;
        } else throw "incorrect color";

        this.bot = new Bot(this.state.field, this.botColor);

        //рандомно заполняем часть поля бота 
        uploadMap.parameter.weapons.forEach(element => {
            let u = new Unit(this.botColor);
            this.state.field.push(u);
        });

        //заполянем нейтральную территорию игрового поля
        for (let index = 0; index < 14; index++) {
            this.state.field.push(null);
        }

        //переносим полученную от клиента расстановку юнитов в стейт игры 
        uploadMap.parameter.weapons.forEach(element => {
            let u = new Unit(this.clientColor, element);
            this.state.field.push(u);
        });

        //вставляем флаг в рандомного юнита бота
        const botFlagPos = Math.floor(Math.random() * 12);
        this.state.field[botFlagPos].weapon = "flag";

        this.scene.start();

        window.bus.publish("start-game", this.state);

        this.changeTurn();
    }

    onGameFinished(state) {
    }

    changeTurn(){
        switch (this.currentTurn){
            case TEAMS.BLUE: this.currentTurn = TEAMS.RED;
            break;
            case TEAMS.RED:  this.currentTurn = TEAMS.BLUE;
            break;
            default: this.currentTurn = TEAMS.BLUE;
        }
        window.bus.publish("change-turn", this.currentTurn);
    }

    onGameUnitMoved(movement) {
        // validate move, later
        console.log(this.state.field);
        console.log(movement);
        const toCell = this.state.field[movement.to];
        const fromCell = this.state.field[movement.from];
        
        if (toCell === null ) {
            if (!this.moveUnit(movement.from, movement.to)){
                throw "to cell not null";
            }
            window.bus.publish("move-unit", movement);
        } else {
            if ((toCell.weapon == WEAPONS.FLAG) && (fromCell.team !== toCell.team)) {
                window.bus.publish("get-flag", fromCell.team);
            } else {
                this.handleFight(movement.from, movement.to);
            }
        }
        if (!this.tie) this.changeTurn();
    }

    handleFight(from, to){
        const toCell = this.state.field[to];
        const fromCell = this.state.field[from];
        
        let winner = Unit.GetWinner(fromCell, toCell);
        if (winner !== null) {
            let loser = (fromCell === winner) ? toCell : fromCell;
            let winnerIdx = this.state.field.indexOf(winner);
            let loserIdx = this.state.field.indexOf(loser);

            let winnerWeapon = winner.weapon;
            let loserWeapon = loser.weapon;

            this.state.field[from] = null;
            this.state.field[to] = winner;

            window.bus.publish("fight", {   winner: {position: winnerIdx, weapon: winnerWeapon},
                                            loser:  {position: loserIdx, weapon: loserWeapon}});

            if (this.tie) {
                this.tie = null;
                this.bot.start();
                this.changeTurn();
            }
                                            
        } else {
                this.handleTie(from, to);
        }
    }

    handleTie(from, to) {
        const toCell = this.state.field[to];
        const fromCell = this.state.field[from];

        window.bus.publish("tie", fromCell.weapon);
        this.bot.stop();

        let newWeapon = WEAPONS.RandomWeapon();
        while (fromCell.weapon === newWeapon){
            newWeapon = WEAPONS.RandomWeapon();
        }

        this.tie =  {
            botUnitPos: null,
            clientUnitPos: null,
            from: null,
            to: null,
        };

        this.tie.to = to;
        this.tie.from = from;

        if (fromCell.team === this.botColor) {
            fromCell.weapon = newWeapon;
            this.tie.clientUnitPos = to;
            this.tie.botUnitPos = from;
        }
        else {
            toCell.weapon = newWeapon;
            this.tie.clientUnitPos = from;
            this.tie.botUnitPos = to;
        }
    }

    onGameRechoseWeapon(newWeapon){
        this.state.field[this.tie.clientUnitPos].weapon = newWeapon;
        this.handleFight(this.tie.from, this.tie.to);
    }

    moveUnit(fromIdx, toIdx){
        let from = this.state.field[fromIdx];
        let to = this.state.field[toIdx];

        if ((from !== null) && (to == null)) {
            this.state.field[toIdx] = from;
            this.state.field[fromIdx] = null;
            return true;
        } else return false;
    }

}
