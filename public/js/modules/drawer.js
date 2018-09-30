'use strict';

import { NavbarComponent } from '../components/Navbar/Navbar.mjs';
import { MenuComponent } from "../components/Menu/Menu.mjs";
import { SignUpFormComponent } from "../components/Form/SignUpForm.mjs";
import { SignInFormComponent } from "../components/Form/SignInForm.mjs";
import { ProfileComponent } from "../components/Profile/Profile.mjs";
import { LeaderBoardComponent } from "../components/LeaderBoard/LeaderBoard.mjs";
import { APIModule } from "./api.js";

const root = document.getElementById('root');
const api = new APIModule;

export class DrawerModule {
    static createMenu(user = null) {
        root.innerHTML = '';

        const navbar = new NavbarComponent({ el: root, username: user });
        navbar.render();

        const menu = new MenuComponent({ el: root });
        menu.render();
    }
    
    static createSignUp(user = null) {
        root.innerHTML = '';

        const navbar = new NavbarComponent({ el: root, username: user });
        navbar.render();

        const form = new SignUpFormComponent({ el: root });
        form.render();
        
        form.form.addEventListener('successful_sign_up', function (event) {
            console.log("Successful sign up for", event.detail);
            DrawerModule.createProfile();
        });

        form.form.addEventListener('unsuccessful_sign_up', function (event) {
            console.log("Unsuccessful sign up.", event.detail);
            form.showServerError(event.detail);
        });
    }

    static createSignIn(user = null) {
        root.innerHTML = '';

        const navbar = new NavbarComponent({ el: root, username: user });
        navbar.render();

        const form = new SignInFormComponent({ el: root });
        form.render();

        form.form.addEventListener('successful_sign_in', function (event) {
            console.log("Successful sign in for", event.detail);
            DrawerModule.createMenu(user);
        });

        form.form.addEventListener('unsuccessful_sign_in', function (event) {
            console.log("Unsuccessful sign in.", event.detail);
            form.showServerError(event.detail);
        });
    }

    static createProfile(profileData = null) {
        root.innerHTML = '';

        if (!profileData) {
            api.Profile()
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(function (data) {
                // Запрос успешно выполнен
                profileData = JSON.parse(data);

                const navbar = new NavbarComponent({ el: root, username: profileData.login });
                navbar.render();

                const profile = new ProfileComponent({ el: root, profile: profileData });
                profile.render();
            })
            .catch(function (error) {
                // Запрос не выполнен
                console.log(error);
                DrawerModule.createMenu(profile.login);
            });
        }
    }

    static createLeaderBoard(user = null, users = null) {
        root.innerHTML = '';

        if (!users) {
            api.Leaders()
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(function (data) {
                // Запрос успешно выполнен
                users = JSON.parse(data);

                const navbar = new NavbarComponent({ el: root, username: user });
                navbar.render();

                const leaderBoard = new LeaderBoardComponent({ el: root, users: users })
                leaderBoard.render();
            })
            .catch(function (error) {
                // Запрос не выполнен
                console.log(error);
                DrawerModule.createMenu(user);
            });
        }
    }
}