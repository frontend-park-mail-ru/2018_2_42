'use strict';
import GameFieldComponent from "../components/GameField/GameField.mjs";
import TeamChooserComponent from "../components/TeamChooser/TeamChooser.mjs";
import BaseView from "./BaseView.js";
import UserService from "../services/UserService.js";
import Game from "../modules/game/game.js";
import TEAMS from "../modules/game/core/teams.js"
import WeaponsShufflerComponent from "../components/WeaponsShuffler/WeaponsShuffler.mjs";
import WeaponsChooserComponent from "../components/WeaponsChooser/WeaponsChooser.mjs";

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
        
        this._weaponsChooser = new WeaponsChooserComponent({ el: this._section });
        window.bus.subscribe("rechoose-weapon", (data) => { this._weaponsChooser.render(data); });

        this._weaponsChooser = new WeaponsChooserComponent({ el: this._section });
        window.bus.subscribe("rechoose-weapon", (data) => { this._weaponsChooser.render(data); });

        const gameFieldNode = document.getElementsByClassName("game")[0];
        this.game = new Game({ mode: this._mode, gameField: gameFieldNode });
        this.renderTeamChooser();
        this.game.start();
    }

    renderTeamChooser() {
        const teamChooser = new TeamChooserComponent({ el: this._section });
        teamChooser.render();

        document.getElementById("redTeamChooser").addEventListener("click", (event) => {
            event.preventDefault();
            this.chooseTeam({ team: TEAMS.RED });
        });

        document.getElementById("blueTeamChooser").addEventListener("click", (event) => {
            event.preventDefault();
            this.chooseTeam({ team: TEAMS.BLUE });
        });
    }

    chooseTeam({ team = null }) {
        document.getElementsByClassName("teamChooser")[0].remove();
        window.bus.publish("team-picked", team);
        this.renderShuffler();
    }

    renderShuffler() {
        const weaponsShuffler = new WeaponsShufflerComponent({ el: this._section });
        weaponsShuffler.render();
        
        document.getElementById("shuffleButton").addEventListener("click", (event) => {
            event.preventDefault();
            window.bus.publish("shuffle-weapons");
        });

        document.getElementById("startButton").addEventListener("click", (event) => {
            event.preventDefault();
            window.bus.publish("game-upload-team"); //search-game?
            document.getElementsByClassName("weaponsShuffler")[0].remove();
        });
    }

    destroy() {
        window.bus.unsubscribe("destroy-game", () => { this.destroy(); });
        window.bus.unsubscribe("rechoose-weapon", () => { this.renderWeaponsChooser(); })
        this.game.destroy();
        this._mode = null;
        super.destroy();
    }
}