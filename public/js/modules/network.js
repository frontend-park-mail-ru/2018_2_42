'use strict';

export class NetworkModule {
    promiseGet(url = "/", options = {}) {
        return fetch(url, {
            ...options,
            method: 'GET'
        });
    }

    promisePost(url = "/", options = {}) {
        return fetch(url, {
            ...options,
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        });
    }

    promiseDelete(url = "/", options = {}) {
        return fetch(url, {
            ...options,
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include'
        });
    }
}