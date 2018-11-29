'use strict';

import TEAMS    from "./core/teams.js";
import WEAPONS  from "./core/weapons.js";

export default class GameScene {
    constructor() {
        this.me = null;
        this.enemy = null;
        
        this.setTeam = this.setTeam.bind(this);
        this.shuffleWeapon = this.shuffleWeapon.bind(this);
        this.moveUnit = this.moveUnit.bind(this);
        this.fight = this.fight.bind(this);
        this.showTie = this.showTie.bind(this);
        this.showGetFlag = this.showGetFlag.bind(this);
        this.changeTurn = this.changeTurn.bind(this);

        window.bus.subscribe("team-picked", this.setTeam);
        window.bus.subscribe("shuffle-weapons", this.shuffleWeapon);
    }

    setTeam(clr) {
        switch (clr){
            case TEAMS.BLUE: 
                this.me = TEAMS.BLUE;
                this.enemy = TEAMS.RED;
            break;
            case TEAMS.RED: 
                this.me = TEAMS.RED;
                this.enemy = TEAMS.BLUE;
            break;
            default: 
                throw "Incorrect color";
                return; 
        }
        window.bus.unsubscribe("team-picked", this.bindedSetTeam);
        this.fillScene();
        this.shuffleWeapon();
    }

    start() {
        window.bus.unsubscribe("shuffle-weapons", this.bindedShuffleWeapon);
        window.bus.subscribe("move-unit", this.moveUnit);
        window.bus.subscribe("fight", this.fight);
        window.bus.subscribe("tie", this.showTie);
        window.bus.subscribe("finish-game", this.showGetFlag);
    }

    stop() {
        window.bus.unsubscribe("move-unit", this.moveUnit);
        window.bus.unsubscribe("fight", this.fight);
        window.bus.unsubscribe("finish-game", this.showGetFlag);
    }

    changeTurn(clr){
        let indicatorClasses = document.getElementById("indicator").classList;
        indicatorClasses.remove("red-turn", "blue-turn");
        switch (clr){
            case TEAMS.BLUE: indicatorClasses.add("blue-turn");
            break;
            case TEAMS.RED: indicatorClasses.add("red-turn");
            break;
            default: throw "incorrect color";
        }
    }
    
    fillScene(){
        if (this.me == null) {
            throw "Player team not chosen";
            return;
        }

        let myUnit = document.createElement("div");
        let enemyUnit = document.createElement("div");
        
        switch (this.me){
            case TEAMS.BLUE:
                myUnit.className = "unit blue-back";
                enemyUnit.className = "unit red-front";
            break;
            case TEAMS.RED: 
                myUnit.className = "unit red-back";
                enemyUnit.className = "unit blue-front";
            break; 
        }

        for (let i = 0; i < 14; i++) {
            document.getElementById(41 - i).innerHTML = "";
            document.getElementById(41 - i).appendChild(myUnit.cloneNode(false));
            document.getElementById(i).innerHTML = "";
            document.getElementById(i).appendChild(enemyUnit.cloneNode(false));
        }
    }
    
    shuffleWeapon(){
        for (let i = 0; i < 14; i++) {
            let weapon = document.createElement("div");
            weapon.classList.add(WEAPONS.RandomWeapon());
            let targetUnit = document.getElementById(41 - i).firstChild;
            if (!targetUnit) throw "units not in start position";
            targetUnit.classList.remove(this.me + '-flag');
            targetUnit.innerHTML = "";
            targetUnit.appendChild(weapon);
        }
        
        const flagPos = 41 - Math.floor(Math.random() * 14);
        document.getElementById(flagPos).firstChild.innerHTML = "";
        document.getElementById(flagPos).firstChild.classList.add(this.me + '-flag');
    }

    moveUnit({from, to}){
        let unitFrom = null;
        if (this.validatePositionId(from)) {
            unitFrom = document.getElementById(from).firstChild;
            if (!unitFrom.classList.contains("unit")) {
                throw "no unit in from-cell";
            }
            if (unitFrom.classList.contains(this.me + "-flag")) {
                throw "cannot move flag unit";
            }
        }

        let cellTo = null;
        if (this.validatePositionId(to)) {
            cellTo = document.getElementById(to);
            if (cellTo.innerHTML !== "") {
                throw "not emty to-cell";
            }
        }

        let moveAnimationClass = "animate-" + this.validateAvailableCells(from, to);
        if (moveAnimationClass == "animate-0") throw "unreachable cell";
        

        let weapon = null;
        weapon = unitFrom.firstChild;
        if (weapon) weapon.classList.add("animate-jump");

        function afterMove(){
            document.getElementById(to).appendChild(unitFrom);
            unitFrom.classList.remove(moveAnimationClass);
            if (weapon) weapon.classList.remove("animate-jump");
            unitFrom.removeEventListener("webkitAnimationEnd", afterMove);
            window.bus.publish("animation-finished");
        }
        
        window.bus.publish("animation-started");
        unitFrom.classList.add(moveAnimationClass);
        unitFrom.addEventListener("webkitAnimationEnd", afterMove, false);
    }
    
    fight({	winner = {position, weapon}, loser = {position, weapon}}){
        if (!(this.validateUnit(winner) && this.validateUnit(loser))) return;

        const winnerCell = document.getElementById(winner.position);
        const loserCell = document.getElementById(loser.position);

        const winnerUnit = winnerCell.firstChild;
        const loserUnit = loserCell.firstChild;

        if (((winnerUnit.className.indexOf(this.me) > 0) &&	(loserUnit.className.indexOf(this.me) > 0)) ||
            ((winnerUnit.className.indexOf(this.enemy) > 0) && (loserUnit.className.indexOf(this.enemy) > 0))) {
            throw "fight between teammates";
            return;
        }

        let allyCell = null;
        let enemyCell = null;

        let fightAnimationClass = null;
        //определение команды победителя
        if (winnerUnit.className.indexOf(this.me) > 0) {
            allyCell = winnerCell;
            enemyCell = loserCell;
            this.replaceWeapon(allyCell.getAttribute("id"), winner.weapon);
            if (enemyCell.firstChild.firstChild) this.replaceWeapon(enemyCell.getAttribute("id"), loser.weapon);
            fightAnimationClass = this.fightAnimationClassBuilder(this.me, winner.weapon, loser.weapon)
        } else {
            allyCell = loserCell;
            enemyCell = winnerCell;
            this.replaceWeapon(allyCell.getAttribute("id"), loser.weapon);
            if (enemyCell.firstChild.firstChild) this.replaceWeapon(enemyCell.getAttribute("id"), winner.weapon);
            fightAnimationClass = this.fightAnimationClassBuilder(this.enemy, winner.weapon, loser.weapon)
        }

        
        let fightCell = null;
        let attackerCell = null;

        //определение атаковавшего юнита
        if (document.getElementById('indicator').classList.contains(this.me + "-turn")) {
            fightCell = enemyCell;
            attackerCell = allyCell;
        } else {
            fightCell = allyCell;
            attackerCell = enemyCell;
        }

        let moveAnimationClass = "animate-" + this.validateAvailableCells(+attackerCell.getAttribute("id"),
        +fightCell.getAttribute("id"));
        if (moveAnimationClass == "animate-0") {
            throw "unreachable cell";
        }

        this.doFight(fightCell, attackerCell, winnerUnit, winner, moveAnimationClass, fightAnimationClass);
    }

    doFight(fightCell, attackerCell, winnerUnit, winner, moveAnimationClass, fightAnimationClass){
        let fightDiv = document.createElement("div");
        let eventDiv = document.getElementById("game-event");
        let weapon = attackerCell.firstChild.firstChild;

        var afterAttackMove = ()=>{
            eventDiv.innerHTML = "";
            eventDiv.append(fightDiv);
            fightDiv.classList.add('animate-fight-' + fightAnimationClass);
            fightDiv.addEventListener("webkitAnimationEnd", afterAttackEvent, false);
            attackerCell.firstChild.removeEventListener("webkitAnimationEnd", afterAttackMove);
        }

        var afterAttackEvent = () => {
            if (weapon) weapon.classList.remove("animate-jump");
            attackerCell.firstChild.classList.remove(moveAnimationClass);		
            eventDiv.innerHTML = "";
            attackerCell.innerHTML = "";
            fightCell.innerHTML = "";
            fightCell.appendChild(winnerUnit);
            this.replaceWeapon(fightCell.getAttribute("id"), winner.weapon);
            fightDiv.removeEventListener("webkitAnimationEnd", afterAttackEvent);
            window.bus.publish("animation-finished");
        }
        
        window.bus.publish("animation-started");
        attackerCell.firstChild.classList.add(moveAnimationClass);
        if (weapon) weapon.classList.add("animate-jump");
        attackerCell.firstChild.addEventListener("webkitAnimationEnd", afterAttackMove, false);
    }

    showTie(weapon){

        let otherWeapons = {
            weapon1: null,
            weaponw: null,
        };

        let animationClass;

        switch (weapon) {
            case WEAPONS.ROCK:
                animationClass = "animate-tie-r";
                otherWeapons.weapon1 = WEAPONS.PAPER;
                otherWeapons.weapon2 = WEAPONS.SCISSORS;
            break;
            case WEAPONS.PAPER:
                animationClass = "animate-tie-p";
                otherWeapons.weapon1 = WEAPONS.ROCK;
                otherWeapons.weapon2 = WEAPONS.SCISSORS;
            break;
            case WEAPONS.SCISSORS:
                animationClass = "animate-tie-s";
                otherWeapons.weapon1 = WEAPONS.PAPER;
                otherWeapons.weapon2 = WEAPONS.ROCK;
            break;
            default:
                throw "incorrect weapon";
            break;
        }

        let tieDiv = document.createElement("div");
        let eventDiv = document.getElementById("game-event");
        eventDiv.innerHTML = "";

        let afterTieEvent = () => {
            // eventDiv.innerHTML = "";
            tieDiv.removeEventListener("webkitAnimationEnd", afterTieEvent);
            window.bus.publish("animation-finished");
            window.bus.publish("rechoose-weapon", otherWeapons);
        }

        window.bus.publish("animation-started");
        eventDiv.appendChild(tieDiv);
        tieDiv.classList.add(animationClass);
        tieDiv.addEventListener("webkitAnimationEnd", afterTieEvent, false);
    }

    replaceWeapon(positionId, weaponName){
        if (this.validateWeapon(weaponName)) {
            if (this.validatePositionId(positionId)) {
                    let unit = document.getElementById(positionId).firstChild;
                    let weapon = document.createElement("div");
                    weapon.classList.add(weaponName.toLowerCase());
                    unit.innerHTML = "";
                    unit.appendChild(weapon);
                } else throw "not valid position";
            }
    }

    showGetFlag(clr){
        let eventDiv = document.getElementById("game-event");
        let getFlagDiv = document.createElement("div");
        eventDiv.innerHTML = "";
        eventDiv.append(getFlagDiv);
        getFlagDiv.classList.add("animate-" + clr + "-get-flag");
    }

    validateAvailableCells(cell1, cell2){
        switch (cell1 - cell2) {
            case 7:
                return "up";
            break;
            
            case -7:
                return "down";
            break;
        
            case 1:
                if (cell1 % 7 !== 0){
                    return "left";
                } else {
                    return 0;
                }
            break;
        
            case -1:
                if ((cell1 + 1) % 7 !== 0){
                    return "right";
                } else {
                    return 0;
                }
            break;
        
            default:
                return 0;
        }
    }

    validateUnit(inUnit){
        if (!(this.validatePositionId(inUnit.position))) return false;

        let unitCell = document.getElementById(inUnit.position);

        if (!(unitCell)) {
            throw "cell does not exist";
            return false;
        }

        let unit = unitCell.firstChild;

        if (!(unit)) {
            throw "empty cell";
            return false;
        }
        
        if (!this.validateWeapon(inUnit.weapon)) return false;

        let unitWeapon = unit.firstChild; 

        if (unit.className.indexOf(this.me) > 0) {
            if (!unitWeapon) {
                throw "unit have no weapon";
                return false;
            } 
        }
        return true;
    }

    validateWeapon(weaponName){
        if (weaponName == WEAPONS.ROCK || weaponName == WEAPONS.PAPER || weaponName == WEAPONS.SCISSORS){
            return true;
        } else {
            throw "incorrect weapon";	
            return false;
        }
    }

    validatePositionId(positionId){
        if ((0 <= positionId) && (positionId <= 41)) {
            return true;
        } else {
            throw "incorrect positionId";	
            return false;
        }
    }

    fightAnimationClassBuilder(winnerColor, winnerWeapon, loserWeapon){
        let fightAnimationClass = winnerColor;
        switch (winnerWeapon + loserWeapon) {
            case "rockscissors":
                fightAnimationClass += "-rs";
                break;
            case "paperrock":
                fightAnimationClass += "-pr";
                break;
            case "scissorspaper":
                fightAnimationClass += "-sp";		
                break;
            default:
                throw "incorrect combination of weapon and fiht result"
        }
        return fightAnimationClass;
    }
}
