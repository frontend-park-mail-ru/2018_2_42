'use strict';

import { NavbarComponent } from '../components/Navbar/Navbar.mjs';
import { MenuComponent } from "../components/Menu/Menu.mjs";
import { SignUpFormComponent } from "../components/Form/SignUpForm.mjs";
import { SignInFormComponent } from "../components/Form/SignInForm.mjs";
import { ProfileComponent } from "../components/Profile/Profile.mjs";
import { LeaderBoardComponent } from "../components/LeaderBoard/LeaderBoard.mjs";
import { AboutComponent } from "../components/about/about.mjs";
import { APIModule } from "./api.js";

const root = document.getElementById('root');
const api = new APIModule;

export class DrawerModule {

    /**
     * Draws navbar
     */
    static createNavbar() {
        root.innerHTML = '';

        const login = localStorage.getItem("login");
        const navbar = new NavbarComponent({ el: root, login: login });
        navbar.render();
    }

    /**
     * Draws main menu
     */
    static createMenu() {
        DrawerModule.createNavbar();

        const menu = new MenuComponent({ el: root });
        menu.render();
    }

    /**
     * Draws main menu after Signing Out
     */
    static createMenuWithSignOut() {
        api.SignOut()
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Server response was not ok.');
                }
                return response.json();
            })
            .then(function (data) {
                localStorage.removeItem("login");
                DrawerModule.createMenu();
            })
            .catch(function (error) {
                DrawerModule.createMenu();
            });
    }

    /**
     * Draws Sign Up page
     */
    static createSignUp() {
        DrawerModule.createNavbar();

        const form = new SignUpFormComponent({ el: root });
        form.render();
        
        form.form.addEventListener('successful_sign_up', function (event) {
            console.log("Successful sign up for", event.detail.login);
            // DrawerModule.createMenu();
            DrawerModule.createProfile(event.detail.login);
        });

        form.form.addEventListener('unsuccessful_sign_up', function (event) {
            console.log("Unsuccessful sign up.", event.detail.login);
            form.showServerError(event.detail);
        });
    }

    /**
     * Draws Sign in page
     */
    static createSignIn() {
        DrawerModule.createNavbar();

        const form = new SignInFormComponent({ el: root });
        form.render();

        form.form.addEventListener('successful_sign_in', function (event) {
            console.log("Successful sign in for", event.detail.login);
            DrawerModule.createMenu();
        });

        form.form.addEventListener('unsuccessful_sign_in', function (event) {
            console.log("Unsuccessful sign in.", event.detail);
            form.showServerError(event.detail);
        });
    }

    /**
     * Draws Profile page
     * @param {string} login currently signed in user's login.
     */
    static createProfile(login = null) {
        if (!login) {
            login = localStorage.getItem("login");
        }


        // DrawerModule.createNavbar();
        // const profile = new ProfileComponent({ el: root, profileData: {
        //         login: "Dikarevandre",
        //         avatarAddress: "",
        //         gamesPlayed: 20,
        //         "wins": 9
        // } });
        // profile.render();


        if (login) {
            api.Profile(login)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Server response was not ok.');
                    }
                    return response.json();
                })
                .then(function (data) {
                    DrawerModule.createNavbar();

                    const profile = new ProfileComponent({ el: root, profileData: data });
                    profile.render();
                })
                .catch(function (error) {
                    console.log(error);
                    DrawerModule.createMenu();
                });
        } else {
            DrawerModule.createMenu();
        }
    }

    /**
     * Draws Leader board page
     * @param {string} user currently signed in user's login.
     * @param {json} users leaders.
     */
    static createLeaderBoard({ page = 1, limit = 3 } = { page: 1, limit: 3 }) {
        api.Leaders(page, limit)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Server response was not ok.');
            }
            return response.json();
        })
        .then(function (data) {
            DrawerModule.createNavbar();

            const leaderBoard = new LeaderBoardComponent({ el: root, leaders: data, page: page, limit: limit });
            leaderBoard.render();
        })
        .catch(function (error) {
            DrawerModule.createMenu();
        }); 
    }

    static createAbout() {
        DrawerModule.createNavbar();

        const about = new AboutComponent({ el: root });
        about.render();
    }
}