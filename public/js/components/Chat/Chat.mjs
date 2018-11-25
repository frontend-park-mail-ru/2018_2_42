'use strict';

import UserService from "../../services/UserService.js";
import "/js/components/Chat/Chat.tmpl.js"

const userService = new UserService;

export default class ChatComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;

        if (userService.IsUserSignedIn()) {
            this._login = userService.login;
        } else {
            this._login = null;
        }

        if (window.WebSocket === undefined) {
            // document.getElementById('container').append("Your browser does not support WebSockets");
            // WebSocket is not supported
            this.webSocket = null;
        } else {
            this.webSocket = this._initWS();
        }

        this._history = {};
        this._currentChat = null;
        // eventListener на вкладки

        // history = {
        //     login: {
        //         lastMsgId: Int,
        //         messages: [
        //             {
        //                 from: String,
        //                 to: String,
        //                 text: String,
        //                 id: Int,
        //                 reply: Int,
        //                 is_history: Boolean,
        //                 time: Date('05 October 2011 14:48 UTC').toISOString(),
        //             },
        //         ],
        //     },

        //     global: {
        //         lastMsgId: Int,
        //         messages: [
        //             {
        //                 from: String,
        //                 to: String,
        //                 text: String,
        //                 id: Int,
        //                 reply: Int,
        //                 is_history: Boolean,
        //                 time: Date('05 October 2011 14:48 UTC').toISOString(),
        //             },
        //         ],
        //     },
        // };
    }

    render() {
        const data = {
            leaders: this._leaders,
            page: this._page
        }
        const template = window.fest['js/components/Chat/Chat.tmpl'](data);
        let div = document.createElement('div');
        div.innerHTML = template;
        this._el.appendChild(div.firstChild);

        document.getElementById("send_btn").addEventListener('click', (event) => {
            event.preventDefault();
            const msgInput = document.getElementById("text_input");
            this.sendMessage({ to: this._currentChat, text: msgInput.innerText });
            msgInput.innerText = '';
        });
    }

    _initWS() {
        const socket = new WebSocket(`ws://chat/v1`);
        
        socket.onopen = () => {
            console.log("Socket opened");
        };
        
        socket.onmessage = (message) => {
            console.log(message);
            if (message[0].is_history) {
                this.receiveHistory(message);
            } else {
                this.receiveMessage(message);
            }
        }
        
        socket.onclose = () => {
            console.log("Socket closed");
        }
        
        return socket;
    }

    newTab(login){
        let tab = document.getElementById("tab");

        if (tab.innerHTML === this._currentChat) throw "try to recreate current";
        
        if (login === null) {
            login = "Global chat";
        }

        let prevTab = document.getElementById(`{$this._currentChat}_chat_body`);
        prevTab.setAttribute("hidden", true);
        
        this._currentChat = login;
        tab.innerHTML = login;

        let newTab = document.createElement("div");
        newTab.setAttribute("id", `{$this._currentChat}_chat_body`);

        document.getElementById("chat").appendChild(newTab);
    }

    newChat(login) {
        login = login || "global";
        this._history[login] = this._history[login] || {};
        this._history[login].lastMsgId = null;
        this._history[login].messages = [];
        this.requestHistory({ from: login, lastMsgId: this._history[login].lastMsgId });
    }

    requestHistory({ from = null, lastMsgId = null }) {
        const historyRequest = {
            method: "history",
            parameter: {
                from: from,
                before: lastMsgId,
            },
        };
        this.webSocket.send(historyRequest);
    }

    receiveHistory(history) {
        const from = null;
        if (history[0].to === null) {
            from = "global";
        } else {
            from = history[0].from;
        }
        this._history[from].lastMsgId = history[0].id;
        history.forEach(msg => {
            this._history[from].messages.unshift(msg);
            // this._drawMessage(msg);
        });
    }

    sendMessage({ to = null, text = '' }) {
        if (!text) {
            return;
        }

        const time = new Date();

        const newMessage = {
            method: "message",
            parameter: {
                from: this._login,
                to: to,
                text: text,
                // reply: null,
                time: time.toISOString(),
            }
        };
        this.webSocket.send(newMessage);
        this._history[to].messages.push(newMessage.parameter);
        this._drawMessage(newMessage.parameter);
    }

    receiveMessage(message) {
        this._history[message.from].messages.push(message);
        this._drawMessage(message);
    }

    _drawMessage(message) {
        const chatBody = document.getElementById("chat_body");
    }
}
