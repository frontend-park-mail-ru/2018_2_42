'use strict';

import { APIModule } from "../../modules/api.js";
import { DrawerModule } from "../../modules/drawer.js";

const api = new APIModule;

export class ProfileComponent {
    constructor ({ el = document.body, profileData = null } = {}) {
        this._el = el;
        this._profileData = profileData;
    }

    render() {
        const isSignedInUsersProfile = (localStorage.getItem('login') === this._profileData.login)
        const data = {
            profile: this._profileData,
            isSignedInUsersProfile: isSignedInUsersProfile
        };
        const template = window.fest['js/components/Profile/Profile.tmpl'](data);
        this._el.innerHTML += template;

        if (isSignedInUsersProfile) {
            const fileInput = document.getElementById('profile__avatarInput');

            fileInput.addEventListener('change', function () {
                api.Avatar(fileInput.files[0])
                    .then(function (response) {
                        if (!response.ok) {
                            throw new Error('Server response was not ok.');
                        }
                        return response.json();
                    })
                    .then(function (data) {
                        DrawerModule.createProfile();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }, false);
        }
    }
}