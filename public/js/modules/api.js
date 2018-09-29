'use strict';

import { NetworkModule } from "./network.js";

const network = new NetworkModule;

export class APIModule {
    SignUp(data = {}) {
        const url = "/api/v1/user";
        return network.promisePost(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    };
    
    SignIn(data = {}) {
        const url = "/api/v1/session";
        return network.promisePost(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    };

    SignOut() {
        const url = "/api/v1/session";
        return network.promiseDelete(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    Leaders() {
        const url = "/api/v1/users?limit=20&offset=0";
        return network.promiseGet(url);
    }

    Profile(username) {
        const url = "/api/v1/user?login=" + username;
        return network.promiseGet(url);
    }

    // Avatar() {
    //     const url = "/api/v1/avatar";
    //     return network.promisePost(url)
    // }
}