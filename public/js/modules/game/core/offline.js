'use strict';
import GameCore from "./gamecore.js";
import Unit from "./unit.js";
import TEAMS from "./teams.js";

export default class OfflineGame extends GameCore {
    constructor({ scene = null } = {}) {
        super({ mode: "offline", scene: scene });
        this.state = {};
    }
    
    start() {
        super.start();
        
        setTimeout(function () {
            window.bus.publish("start-game", this.state);
        }.bind(this));
    }
    
    onGameStarted(state) {
    }
    
    onGameUploadTeam(state) {
        this.scene.start();
    }

    onGameFinished(state) {
        bus.emit('close-game');
    }

    onGameStateChanged(state) {
        this.scene.setState(state);
    }
}