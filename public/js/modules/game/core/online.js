'use strict';
import GameCore from "./gamecore.js";

export default class OnlineGame extends GameCore {
    constructor() {
        super({ mode: "online" });
    }
}