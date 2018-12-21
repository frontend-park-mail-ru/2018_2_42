'use strict';

export default class GameAudio {
	constructor() {
        this.playSoundStartGame = this.playSoundStartGame.bind(this);
        this.playSoundPickUnit = this.playSoundPickUnit.bind(this);
        this.playSoundShuffleWeapon = this.playSoundShuffleWeapon.bind(this);
		this.playSoundMoveUnit = this.playSoundMoveUnit.bind(this);
		this.playSoundFight = this.playSoundFight.bind(this);
		this.playSoungTie = this.playSoungTie.bind(this);
		this.playSoungChangeTurn = this.playSoungChangeTurn.bind(this);
		this.playSoundshowGetFlag = this.playSoundshowGetFlag.bind(this);
    }

    start() {
		window.bus.subscribe('start-game', this.playSoundStartGame);
		window.bus.subscribe('pick-unit', this.playSoundPickUnit);
		window.bus.subscribe('shuffle-weapons', this.playSoundShuffleWeapon);
		window.bus.subscribe('move-unit', this.playSoundMoveUnit);
		window.bus.subscribe('hit', this.playSoundFight);
		window.bus.subscribe('tie', this.playSoungTie);
		window.bus.subscribe('change-turn', this.playSoungChangeTurn);
		window.bus.subscribe('finish-game', this.playSoundshowGetFlag);
	}

	destroy() {
        window.bus.unsubscribe('start-game', this.playSoundStartGame);
        window.bus.unsubscribe('pick-unit', this.playSoundPickUnit);
        window.bus.unsubscribe('shuffle-weapons', this.playSoundShuffleWeapon);
		window.bus.unsubscribe('move-unit', this.playSoundMoveUnit);
		window.bus.unsubscribe('hit', this.playSoundFight);
        window.bus.unsubscribe('tie', this.playSoungTie);
        window.bus.unsubscribe('change-turn', this.playSoungChangeTurn);
		window.bus.unsubscribe('finish-game', this.playSoundshowGetFlag);
    }


    playSoundStartGame() {
        let move = new Audio();
        move.src = './../../../audio/gong.mp3';
        move.autoplay = true; 
    }

    playSoundPickUnit() {
        let move = new Audio();
        move.src = './../../../audio/pick.mp3';
        move.autoplay = true; 
    }

    playSoundMoveUnit() {
        let move = new Audio();
        move.src = './../../../audio/move.mp3';
        move.autoplay = true; 
    }

    playSoundFight(obj) {
        let move = new Audio();
        if (obj.substr(obj.length - 2) == 'pr') {
            move.src = './../../../audio/winP.mp3';
        }
        else if (obj.substr(obj.length - 2) == 'sp') {
            move.src = './../../../audio/winS.mp3';
        }
        else if (obj.substr(obj.length - 2) == 'rs') {
            move.src = './../../../audio/winR.mp3';
        }
        move.autoplay = true; 
    }

    playSoundShuffleWeapon() {
        let move = new Audio();
        move.src = './../../../audio/shuffle.mp3';
        move.autoplay = true; 
    }

    playSoungTie() {
        let move = new Audio();
        move.src = './../../../audio/tie.mp3';
        move.autoplay = true; 
    }

    playSoungChangeTurn(turn) {
        let move = new Audio();
        if (turn == 'red') {
            move.src = './../../../audio/red-turn.mp3';
        } else if (turn == 'blue') {
            move.src = './../../../audio/blue-turn.mp3';
        }
        move.autoplay = true; 
    }
    
    playSoundshowGetFlag() {
        let move = new Audio();
        move.src = './../../../audio/win.mp3';
        move.autoplay = true; 
    }
}