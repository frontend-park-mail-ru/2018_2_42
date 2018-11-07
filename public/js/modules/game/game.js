'use strict';
import OnlineGame from "./core/online.js";
import OfflineGame from "./core/offline.js";
// import GameScene from "./core/offline.js";

export default class Game {
    constructor({ mode = "offline" }) {
        let GameConstructor = null;
        switch (mode) {
            case "offline": {
                GameConstructor = OnlineGame;
                break;
            }
            case "online": {
                GameConstructor = OfflineGame;
                break;
            }
            default:
                throw new Error('Invalid game mode ' + mode);
        }

        this.gameScene = new GameScene();

        this.gameCore = new GameConstructor({ scene: this.gameScene });
    }

    start() {
        this.gameCore.start();
    }

    destroy() {
        this.gameCore.destroy();
    }
};