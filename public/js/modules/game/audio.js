'use strict';

export default class GameAudio {
	constructor() {

        // this.shuffleWeapon = this.shuffleWeapon.bind(this);
		this.playSoundMoveUnit = this.playSoundMoveUnit.bind(this);
		// this.fight = this.fight.bind(this);
		// this.showTie = this.showTie.bind(this);
		// this.changeTurn = this.changeTurn.bind(this);
		// this.replaceWeapon = this.replaceWeapon.bind(this);
		// this.showGetFlag = this.showGetFlag.bind(this);
    }

    start() {
		// window.bus.subscribe('shuffle-weapons', this.bindedShuffleWeapon);
		window.bus.subscribe('move-unit', this.playSoundMoveUnit);
		// window.bus.subscribe('fight', this.fight);
		// window.bus.subscribe('tie', this.showTie);
		// window.bus.subscribe('finish-game', this.showGetFlag);
	}

	destroy() {
        // window.bus.unsubscribe('shuffle-weapons', this.bindedShuffleWeapon);
		window.bus.unsubscribe('move-unit', this.playSoundMoveUnit);
		// window.bus.unsubscribe('fight', this.fight);
		// window.bus.unsubscribe('tie', this.showTie);
		// window.bus.unsubscribe('finish-game', this.showGetFlag);
    }

    playSoundMoveUnit() {
		let move = new Audio();
        move.src = './../../../audio/move.mp3';
        move.autoplay = true; // Автоматически запускаем
    }
    
}