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
            this.webSocket = null;
        } else {
            this.webSocket = this._initWS();
        }

        this._history = {};
        this._currentChat = null;

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
            this.sendMessage({ to: this._currentChat, text: msgInput.value });
            msgInput.value = '';
        });

        document.getElementById("new_login_btn").addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById("new_login").hidden = true;
            this.newChat(document.getElementById("new_login_input").value);
        });

        document.getElementById("new_tab").addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById("new_login").hidden = false;
        });

        window.bus.subscribe("sock-opened", () => {
            this.newChat(null);
        });
    }

    _initWS() {
        const socket = new WebSocket("ws://localhost:8080/chat/v1/");
        
        socket.onopen = () => {
            console.log("Socket opened");
            window.bus.publish("sock-opened");
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
        this.newTab(login);
    }

    requestHistory({ from = null, lastMsgId = null }) {
        const historyRequest = {
            method: "history",
            parameter: {
                from: from,
                before: lastMsgId,
            },
        };
        this.webSocket.send(JSON.stringify(historyRequest));
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
            this._drawMessage({ message: msg, history: true });
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
        this.webSocket.send(JSON.stringify(newMessage));
        if (to === "global") {
            this._history["global"].messages.push(newMessage.parameter);
        } else {
            this._history[to].messages.push(newMessage.parameter);
        }
        this._drawMessage({ message: newMessage.parameter, history: false });
    }

    receiveMessage(message) {
        if (message.from === null) {
            this._history["global"].messages.push(message);
        } else {
            if (!this._history[message.from]) {
                this._history[message.from] = {};
                this._history[message.from].lastMsgId = message.id;
                this._history[message.from].messages.push(message);
                this.newChat(message.from);
            } else {
                this._history[message.from].messages.push(message);
            }
        }
        this._drawMessage({ message: message, history: false });
    }

    _drawMessage({ message = null, history = false }) {
        message.from = message.from || "global";
        const chatBody = document.getElementById(`${message.from}_chat_body`);
        const msgDiv = document.createElement('div');
        msgDiv.classList.add("item");
        if (message.to === this._login) {
            msgDiv.classList.add("item_to_me");
        }
        msgDiv.innerText = message.text;
        if (history) {
            chatBody.insertBefore(msgDiv, chatBody.children[1]);
        } else {
            chatBody.appendChild(msgDiv);
        }
    }
}
