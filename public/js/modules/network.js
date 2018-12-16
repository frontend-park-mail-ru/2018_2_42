'use strict';
export default class NetworkModule {
    /**
     * Perfoms GET request
     * @param {string} url requests's url
     * @param {json} options fetch request options
     * @returns {promise}
     */
    promiseGet(url = "/", options = {}) {
        return fetch(url, {
            ...options,
            method: 'GET'
        });
    }

    /**
     * Perfoms POST request
     * @param {string} url requests's url
     * @param {json} options fetch request options
     * @returns {promise}
     */
    promisePost(url = "/", options = {}) {
        return fetch(url, {
            ...options,
            method: 'POST',
            // mode: 'cors',
            credentials: 'include'
        });
    }

    /**
     * Perfoms DELETE request
     * @param {string} url requests's url
     * @param {json} options fetch request options
     * @returns {promise}
     */
    promiseDelete(url = "/", options = {}) {
        return fetch(url, {
            ...options,
            method: 'DELETE',
            // mode: 'cors',
            credentials: 'include'
        });
    }
}