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
        this.clientColor = null;
        this.enemyColor = null;
        this.animating = false;
        this.changeTurn = this.changeTurn.bind(this);
        this.setTeams = this.setTeams.bind(this);
        this.setAnimating = this.setAnimating.bind(this);
        this.resetAnimating = this.resetAnimating.bind(this);
        window.bus.subscribe("change-turn", this.changeTurn);
        window.bus.subscribe("animation-started", this.setAnimating);
        window.bus.subscribe("animation-finished", this.resetAnimating);
    }
    
    start() {
        this.gameCore.start();
        this.gameScene.start();
        window.bus.subscribe("team-picked", this.setTeams);
    }
    
    destroy() {
        this.gameCore.destroy();
        this.gameController.stop();
        this.gameScene.stop();
        window.bus.unsubscribe("team-picked", this.setTeams);
        window.bus.unsubscribe("change-turn", this.changeTurn);
        window.bus.unsubscribe("animation-started", this.setAnimating);
        window.bus.unsubscribe("animation-finished", this.resetAnimating);
    }

    setTeams(clientColor){
        this.clientColor = clientColor;
        this.enemyColor = (this.clientColor === TEAMS.RED) ? TEAMS.BLUE : TEAMS.RED;
        this.gameScene.setTeam(this.clientColor);
        this.gameController.setTeam(this.clientColor);
    }

    changeTurn(turn){
        if (this.clientColor == null || this.enemyColor == null) {
            throw "Cannot change turn, color not picked"
        }

        this.currentTurn = turn ? this.clientColor : this.enemyColor;

        if (!this.animating) this.resetAnimating();
    }

    setAnimating(){ this.animating = true; }

    resetAnimating(){ 
        this.animating = false;
        this.gameScene.changeTurn(this.currentTurn);
        if (this.gameScene.me === this.currentTurn) this.gameController.start()
        else this.gameController.stop();
    }
};