'use strict';

import { NetworkModule } from "./network.js";

const network = new NetworkModule;

export class APIModule {
    /**
     * Signs up user
     * @param {json} data request body with fields "login", "password"
     * @returns {promise}
     */
    SignUp(data = {}) {
        const url = "/api/v1/user?temporary=false";
        return network.promisePost(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    };
    
    /**
     * Signs in user
     * @param {json} data request body with fields "login", "password"
     * @returns {promise}
     */
    SignIn(data = {}) {
    	console.log(data);
        const url = "/api/v1/session";
        return network.promisePost(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    };

    /**
     * Signs out user
     * @returns {promise}
     */
    SignOut() {
        const url = "/api/v1/session";
        return network.promiseDelete(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    /**
     * Gets leader board with pagination
     * @param {number} page page number
     * @param {number} limit amount of users on single page
     * @returns {promise}
     */
    Leaders(page = 1, limit = 20) {
        const offset = (page - 1) * limit;
        const url = `/api/v1/users?limit=${limit}&offset=${offset}`;
        return network.promiseGet(url);
    }

    /**
     * Gets information about any user - login, avatar address, games played, games won
     * @param {string} login request querry parameter
     * @returns {promise}
     */
    Profile(login) {
        const url = `/api/v1/user?login=${login}`;
        return network.promiseGet(url);
    }

    /**
     * Sets new avatar for signed in user
     * @param {file} file avatar image
     * @returns {promise}
     */
    Avatar(file) {
        const url = "/api/v1/avatar";
        console.log(file);
        let formData = new FormData();
        formData.append('avatar', file);

        return network.promisePost(url, {
            body: formData
        });
    }
}
