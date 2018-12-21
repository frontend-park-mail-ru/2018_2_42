'use strict';

export default class GameAudio {
	constructor() {
        // this.shuffleWeapon = this.shuffleWeapon.bind(this);
		this.playSoundMoveUnit = this.playSoundMoveUnit.bind(this);
		this.playSoundFight = this.playSoundFight.bind(this);
		// this.showTie = this.showTie.bind(this);
		// this.changeTurn = this.changeTurn.bind(this);
		// this.replaceWeapon = this.replaceWeapon.bind(this);
		// this.showGetFlag = this.showGetFlag.bind(this);
    }

    start() {
		// window.bus.subscribe('shuffle-weapons', this.bindedShuffleWeapon);
		window.bus.subscribe('move-unit', this.playSoundMoveUnit);
		window.bus.subscribe('hit', this.playSoundFight);
		// window.bus.subscribe('tie', this.showTie);
		// window.bus.subscribe('finish-game', this.showGetFlag);
	}

	destroy() {
        // window.bus.unsubscribe('shuffle-weapons', this.bindedShuffleWeapon);
		window.bus.unsubscribe('move-unit', this.playSoundMoveUnit);
		window.bus.unsubscribe('hit', this.playSoundFight);
		// window.bus.unsubscribe('tie', this.showTie);
		// window.bus.unsubscribe('finish-game', this.showGetFlag);
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
    
}