import { LeaderBoardComponent } from "../components/LeaderBoard/LeaderBoard.mjs";
import BaseView from "./BaseView.js";

export default class LeaderboardView extends BaseView {
    constructor({ el = document.body, withNavbar = true } = {}) {
        super({ el: el, withNavbar: withNavbar })
    }

    render() {
        const leaderBoard = new LeaderBoardComponent({ el: this._el });
        leaderBoard.render();
        this.hide();
    }
}