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
    createMenu(user = null) {
        const navbar = new NavbarComponent({ el: root, username: user });
        navbar.render();

        const menu = new MenuComponent({ el: root });
        menu.render();
    }

    createSignUp(user = null) {
        const navbar = new NavbarComponent({ el: root, username: user });
        navbar.render();

        const form = new SignUpFormComponent({ el: root });
        form.render();
    }

    createSignIn(user = null) {
        const navbar = new NavbarComponent({ el: root, username: user });
        navbar.render();

        const form = new SignInFormComponent({ el: root });
        form.render();
    }

    createProfile(user = null) {
        const navbar = new NavbarComponent({ el: root, username: user });
        navbar.render();

        const profile = new ProfileComponent({ el: root, username: user });
        profile.render();
    }

    createLeaderBoard(user = null, users = null) {
        if (!users) {
            api.Leaders()
            .then(function (data) {
                // Запрос успешно выполнен
                users = JSON.parse(data);
            })
            .catch(function (error) {
                // Запрос не выполнен
                createMenu(user);
            });
        }
        const navbar = new NavbarComponent({ el: root, username: user });
        navbar.render();

        const leaderBoard = new LeaderBoardComponent({ el: root, users: users })
        leaderBoard.render();
    }
}