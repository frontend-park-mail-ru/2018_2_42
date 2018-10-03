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

    Leaders(page = 1, limit = 20) {
        const offset = (page - 1) * limit;
        const url = `/api/v1/users?limit=${limit}&offset=${offset}`;
        return network.promiseGet(url);
    }

    Profile(username) {
        const url = `/api/v1/user?login=${username}`;
        return network.promiseGet(url);
    }

    Avatar(file) {
        const url = "/api/v1/avatar";
        console.log(file);
        return network.promisePost(url, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: file
        });
    }
}