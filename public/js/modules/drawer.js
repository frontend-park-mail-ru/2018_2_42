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
    /**
     * Draws main menu
     * @param {string} user currently signed in user's login.
     */
    static createMenu(user = null) {
        root.innerHTML = '';

        const navbar = new NavbarComponent({ el: root, username: user });
        navbar.render();

        const menu = new MenuComponent({ el: root });
        menu.render();
    }

    /**
     * Draws Sign Up page
     * @param {string} user currently signed in user's login.
     */
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

    /**
     * Draws Sign in page
     * @param {string} user currently signed in user's login.
     */
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

    /**
     * Draws Profile page
     * @param {string} suer currently signed in user's login.
     * @param {json} profileData user's data.
     */
    static createProfile(user = null, profileData = null) {
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

                const navbar = new NavbarComponent({ el: root, username: user });
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

    /**
     * Draws Leader board page
     * @param {string} user currently signed in user's login.
     * @param {json} users leaders.
     */
    static createLeaderBoard(user = null, page = 1, limit = 20) {
        api.Leaders(page, limit)
        .then(function (response) {
            // if (!response.ok) {
            //     throw new Error('Network response was not ok.');
            // }
        })
        .then(function (data) {
            // users = JSON.parse(data);
            root.innerHTML = '';

            const navbar = new NavbarComponent({ el: root, username: user });
            navbar.render();

            const leaderBoard = new LeaderBoardComponent({ el: root, users: {}, page: page, limit: limit })
            leaderBoard.render();

            leaderBoard.leaderBoard.getElementsByClassName('prev_button')[0].addEventListener('prev_button', function (event) {
                DrawerModule.createLeaderBoard(user, event.detail.page, event.detail.limit);
            });

            leaderBoard.leaderBoard.getElementsByClassName('next_button')[0].addEventListener('next_button', function (event) {
                DrawerModule.createLeaderBoard(user, event.detail.page, event.detail.limit);
            });
        })
        .catch(function (error) {
            console.log(error);
            DrawerModule.createMenu(user);
        });

        
    }
}