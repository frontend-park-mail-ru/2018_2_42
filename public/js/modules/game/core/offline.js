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
        this.state = {
            field: [],
        };

        redTeam = Array.from(new Array(7), () => {
            return new Unit({ team: TEAMS.RED });
        });

        blueTeam = Array.from(new Array(7), () => {
            return new Unit({ team: TEAMS.BLUE });
        });

        this.state.field = [
            redTeam,
            new Array(7).fill(null),
            new Array(7).fill(null),
            new Array(7).fill(null),
            new Array(7).fill(null),
            blueTeam,
        ];

        setTimeout(function () {
            window.bus.publish("start-game", this.state);
        }.bind(this));
    }

    onGameStarted(state) {
        this.scene.init(state);
        this.scene.start();
    }

    onGameFinished(state) {
        bus.emit('close-game');
    }

    onGameStateChanged(state) {
        this.scene.setState(state);
    }
}