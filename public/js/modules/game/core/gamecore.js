'use strict';

export default class GameCore {
    constructor({ mode = "offline", scene = null } = {}) {
        this.mode = mode;
        this.scene = scene;
        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);
        this.onGameStateChanged = this.onGameStateChanged.bind(this);
    }

    start() {
        window.bus.subscribe("start-game", this.onGameStarted);
        window.bus.subscribe("finish-game", this.onGameFinished);
        window.bus.subscribe("game-state-changed", this.onGameStateChanged);
    }

    destroy() {
        window.bus.unsubscribe("start-game", this.onGameStarted);
        window.bus.unsubscribe("finish-game", this.onGameFinished);
        window.bus.unsubscribe("game-state-changed", this.onGameStateChanged);
    }

    onGameStarted(state) {
        throw new Error('This method must be overridden');
    }

    onGameFinished(state) {
        throw new Error('This method must be overridden');
    }

    onGameStateChanged(state) {
        throw new Error('This method must be overridden');
    }
}