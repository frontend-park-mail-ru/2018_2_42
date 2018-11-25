'use strict';
import GameCore from "./gamecore.js";
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
    }
    
    start() {
        super.start();
        
        this.state = {
            field: [],
        };

        //createBot

        setTimeout(function () {
            window.bus.publish("start-game", this.state);
        }.bind(this));
    }
    
    onGameStarted(state) {
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

        this.changeTurn();
    }

    onGameFinished(state) {
        // window.bus.publish('close-game');
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

        // if (this.currentTurn === bot.color) {
            // bot.makemove;
            // send move
        // }
    }

    onGameUnitMoved(movement) {
        // validate move, later
        // from should contain client unit , later ??
        const toCell = this.state.field[movement.to];
        const fromCell = this.state.field[movement.from];
        
        if (toCell === null ) {
            
            if (!this.moveUnit(movement.from, movement.to)){
                throw "to cell not null";
            }

            window.bus.publish("move-unit", movement);
        } else {
    
            if (toCell.weapon == WEAPONS.FLAG) {
                console.log("unit", fromCell, "get enemy flag");
                window.bus.publish("finish-game", fromCell.team);
            } else {
                let winner = Unit.GetWinner(fromCell, toCell);
                if (winner !== null) {
                    let loser = (fromCell === winner) ? toCell : fromCell;
                    let winnerIdx = this.state.field.indexOf(winner);
                    let loserIdx = this.state.field.indexOf(loser);

                    let winnerWeapon = winner.weapon;
                    let loserWeapon = loser.weapon;

                    this.state.field[movement.from] = null;
                    this.state.field[movement.to] = winner;

                    window.bus.publish("fight", {   winner: {position: winnerIdx, weapon: winnerWeapon},
                                                    loser:  {position: loserIdx, weapon: loserWeapon}});
                } else alert("same weapons, feature in development");
            }
        }

        console.log(this.state.field);

        // this.changeTurn();
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
