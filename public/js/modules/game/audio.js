'use strict';

import './../../../audio/move.mp3';
import './../../../audio/gong.mp3';
import './../../../audio/lost.mp3';
import './../../../audio/pum.mp3';
import './../../../audio/sound.mp3';
import './../../../audio/tick.mp3';
import './../../../audio/tieP.mp3';
import './../../../audio/tieR.mp3';
import './../../../audio/tieS.mp3';
import './../../../audio/win.mp3';
import './../../../audio/winP.mp3';
import './../../../audio/winR.mp3';
import './../../../audio/winS.mp3';

export default class Audio {
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

    playSoundMoveUnit({from, to, callback}) {
        var audio = new Audio(); // Создаём новый элемент Audio
        audio.src = './../../../audio/move.mp3'; // Указываем путь к звуку "клика"
        audio.autoplay = true; // Автоматически запускаем
        console.log(from, to, callback)
    }
    
}