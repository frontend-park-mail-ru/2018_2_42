'use strict';
import APIModule from "../modules/api.js";

const api = new APIModule;

export default class UserService {
    constructor() {
        if (UserService.__instance) {
            return UserService.__instance;
        }

        UserService.__instance = this;
    }

    get login() {
        return localStorage.getItem('login');
    }

    set login(login) {
        localStorage.setItem('login', login);
    }

    IsUserSignedIn() {
        return localStorage.getItem('login') !== null;
    }

    SignOut() {
        api.SignOut()
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Server response was not ok.');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.removeItem('login');
                window.bus.publish("successful_sign_out");
            })
            .catch((error) => {
                // window.bus.publish("draw-menu");
            });
    }

    SignIn({ login = null, password = null } = {}) {
        api.SignIn({ login: login, password: password })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(() => {
                localStorage.setItem("login", login);
                window.bus.publish("successful_sign_in", login);
            })
            .catch((error) => {
                // this.showServerError(error);
            });
    }

    SignUp({ login = null, password = null } = {}) {
        api.SignUp({ login: login, password: password })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Server response was not ok.');
                }
                return response.json();
            })
            .then(() => {
                localStorage.setItem("login", login);
                window.bus.publish("successful_sign_up", login);
            })
            .catch((error) => {
                // this.showServerError(error);
            });
    }

    UpdateAvatar(file) {
        api.Avatar(file)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Server response was not ok.');
                }
                return response.json();
            })
            .then((data) => {
                window.bus.publish("draw-profile", this.login);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    GetProfileData(login) {
        return api.Profile(login);
    }

    GetLeaders(page = 1, limit = 20) {
        return api.Leaders(page, limit);
    }
}