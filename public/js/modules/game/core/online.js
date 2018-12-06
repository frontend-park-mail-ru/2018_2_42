'use strict';
import GameCore from "./gamecore.js";

export default class OnlineGame extends GameCore {
    constructor() {
        super({ mode: "online" });
        this.socket = null;
        this.tiePos = null;
    }

    start(){
        super.start();
        this.socket = new WebSocket("ws://localhost:8080/game/v1/entrypoint");
        this.socket.onopen = ()=> {
            console.log("Соединение установлено.");
        };

        this.socket.onmessage = (event)=> {
            console.log("Получено сообщение от сервера.");
            console.log(event);
            console.log(event.data);
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message.method){
                case "your_turn": 
                    window.bus.publish("change-turn", message.parameter);
                    break;
                case "move_character": 
                    window.bus.publish("move-unit", message.parameter);
                    break;
                case "attack":
                    message.parameter.winner["position"] = message.parameter.winner["coordinates"];
                    message.parameter.loser["position"] = message.parameter.loser["coordinates"];
                    delete message.parameter.winner["coordinates"];
                    delete message.parameter.loser["coordinates"];
                    window.bus.publish("fight", message.parameter);
                    break;
                case "weapon_change_request":
                    this.tiePos = message.parameter.character_position;
                    window.bus.publish("tie", message.parameter.character_position);
            }
        };
        
        this.socket.onerror = (error)=> {
            alert("Ошибка " + error.message);
        };
    }

    onGameUploadTeam(state){
        console.log("Отправка команды на сервер.")
        const uploadMap = super.parseClientTeam();
        this.socket.send(JSON.stringify(uploadMap));
    }
    
    onGameUnitMoved(movement){
        console.log("Отправка шага на сервер.");
        console.log(movement);
        const msg = {
            "method": "attempt_go_to_cell",
            "parameter": {
                "from": movement.from,
                "to": movement.to,
            }
        }
        this.socket.send(JSON.stringify(msg));
    }

    onGameRechoseWeapon(newWeapon){
        console.log("Отправка выбранного оружия на сервер.");
        console.log(newWeapon);
        const msg = {
            "method": "reassign_weapons",
            "parameter": {
                "character_position": this.tiePos,
                "new_weapon": newWeapon,
            }
        }
        console.log(JSON.stringify(msg));
        this.socket.send(JSON.stringify(msg));
        this.tiePos = null;
    }
}