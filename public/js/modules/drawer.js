'use strict';

import NavbarComponent from '../components/Navbar/Navbar.mjs';
import { MenuComponent } from "../components/Menu/Menu.mjs";
import { SignUpFormComponent } from "../components/Form/SignUpForm.mjs";
import { SignInFormComponent } from "../components/Form/SignInForm.mjs";
import { ProfileComponent } from "../components/Profile/Profile.mjs";
import { LeaderBoardComponent } from "../components/LeaderBoard/LeaderBoard.mjs";
import { AboutComponent } from "../components/About/About.mjs";
import { APIModule } from "./api.js";

const root = document.getElementById('root');
const api = new APIModule;

export class DrawerModule {

    /**
     * Draws navbar with login taken from local storage if exists
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
     * Draws main menu after signing out
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
     * Draws sign up page
     */
    static createSignUp() {
        DrawerModule.createNavbar();

        const form = new SignUpFormComponent({ el: root });
        form.render();
    }

    /**
     * Draws sign in page
     */
    static createSignIn() {
        DrawerModule.createNavbar();

        const form = new SignInFormComponent({ el: root });
        form.render();
    }

    /**
     * Draws Profile page
     * @param {string} login currently signed in user's login.
     */
    static createProfile(login = null) {
        if (!login) {
            login = localStorage.getItem("login");
        }

        if (login) {
            DrawerModule.createNavbar();

            const profile = new ProfileComponent({ el: root, login: login });
            profile.render();
        } else {
            DrawerModule.createMenu();
        }
    }

    /**
     * Draws leader board page
     * @param {number} page page number
     * @param {number} limit amount of users on single page
     */
    static createLeaderBoard({ page = 1, limit = 5 } = { page: 1, limit: 5 }) {
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

    /**
     * Draws about page
     */
    static createAbout() {
        DrawerModule.createNavbar();

        const about = new AboutComponent({ el: root });
        about.render();
    }
}
