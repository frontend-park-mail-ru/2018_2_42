'use strict';
import OnlineGame from "./core/online.js";
import OfflineGame from "./core/offline.js";
import GameScene from "./scene.js";
import GameController from "./controller.js";
import TEAMS from "./core/teams.js";

export default class Game {
    constructor({ mode = "offline", gameField = document.getElementsByClassName("game")[0] }) {
        this.gameField = gameField;
        let GameConstructor = null;
        switch (mode) {
            case "offline": {
                GameConstructor = OfflineGame;
                break;
            }
            case "online": {
                GameConstructor = OnlineGame;
                break;
            }
            default:
                throw new Error('Invalid game mode ' + mode);
        }

        this.gameScene = new GameScene(this.gameField);
        this.gameController = new GameController(this.gameField);
        this.gameCore = new GameConstructor({ scene: this.gameScene });
        this.currentTurn = null;
        this.changeTurn = this.changeTurn.bind(this);
        this.animating = false;
        this.setAnimating = this.setAnimating.bind(this);
        this.resetAnimating = this.resetAnimating.bind(this);
        window.bus.subscribe("change-turn", this.changeTurn);
        window.bus.subscribe("animation-started", this.setAnimating);
        window.bus.subscribe("animation-finished", this.resetAnimating);
    }

    start() {
        this.gameCore.start();
    }

    destroy() {
        this.gameCore.destroy();
    }

    changeTurn(clr){
        switch (clr){
            case TEAMS.BLUE: this.currentTurn = clr;
            break;
            case TEAMS.RED: this.currentTurn = clr;
            break;
            default: throw "incorrect color";
        }

        if(!this.animating){ this.resetAnimating(); }
    }

    setAnimating(){ this.animating = true; }

    resetAnimating(){ 
        this.animating = false;
        this.gameScene.changeTurn(this.currentTurn);
        if (this.gameScene.me === this.currentTurn) this.gameController.start();
    }
};