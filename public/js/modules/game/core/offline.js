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

        this.state.field = [
            Array.from(new Array(7), () => {
                return new Unit({ team: TEAMS.RED });
            }),
            Array.from(new Array(7), () => {
                return new Unit({ team: TEAMS.RED });
            }),
            new Array(7).fill(null),
            new Array(7).fill(null),
            Array.from(new Array(7), () => {
                return new Unit({ team: TEAMS.RED });
            }),
            Array.from(new Array(7), () => {
                return new Unit({ team: TEAMS.RED });
            }),
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