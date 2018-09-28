'use strict';

import { NetworkModule } from "./network.js";

const network = new NetworkModule;

export class APIModule {
    SignUp(data = {}) {
        // const url = "/api/v1/user?temporary=false";
        const url = "/sign_up";
        return network.promisePost(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    };
    
    SignIn(data = {}) {
        // const url = "/api/v1/session";
        const url = "/sign_in";
        return network.promisePost(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    SignOut() {
        const url = "/api/v1/session";
        return network.promiseDelete(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    // Страница таблицы лидеров, авторизация для действия не требуется..
    // GET
    // "/api/v1/users?limit=20&offset=0"

    // Профиль любого пользователя, авторизация для действия не требуется.
    // GET
    // "/api/v1/user?login=JohanDoe"

    // Измение аватара. Нужно быть залогиненным.
    // POST
    // "/api/v1/avatar"
}