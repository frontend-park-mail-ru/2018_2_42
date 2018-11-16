'use strict';
import GameFieldComponent from "../components/GameField/GameField.mjs";
import BaseView from "./BaseView.js";
import UserService from "../services/UserService.js";
import Game from "../modules/game/game.js";
import TEAMS from "../modules/game/core/teams.js"

const userService = new UserService();

export default class GameFieldView extends BaseView {
    constructor({ el = document.body, withNavbar = false } = {}) {
        super({ el: el, withNavbar: withNavbar });
        this._mode = null;
        window.bus.subscribe("destroy-game", () => { this.destroy(); })
    }
    
    render() {
        this._mode = null;
        if (window.location.pathname === '/play-online') {
            this._mode = "online";
        } else {
            this._mode = "offline";
        }

        if (this._mode === "online" && !this._login && !userService.IsUserSignedIn()) {
            window.bus.publish("draw-sign-in");
            return "redirect";
        }

        this._el.appendChild(this._section);
        const gameField = new GameFieldComponent({ el: this._section });
        gameField.render();
        // create game object
        this.game = new Game({ mode: this._mode });
        // this.game.start();
    }

    moveUnit({ from = null, to = null }) {

    }

    drawUnit({ x = null, y = null, unit = null }) {
        // let div = document.createElement('div');
        // switch (unit.team) {
        //     case TEAMS.RED:
        //         div.innerHTML = '<div class="unit red-front"></div>';
        //         break;
        //     case TEAMS.BLUE:
        //         div.innerHTML = '<div class="unit blue-front"></div>';
        //         break;
        //     default:
        //         break;
        // }
        // this._el.appendChild(div.firstChild);
    }

    destroy() {
        window.bus.unsubscribe("destroy-game", () => { this.destroy(); });
        this.game.destroy();
        this._mode = null;
        super.destroy();
    }
}