'use strict';
const CACHE_NAME = 'offline-files-cache';
const cacheUrls = [
    '/',

    '/css/main.css',
    '/css/fontsKit.css',
    '/css/animation.css',
    '/css/sprites.css',

    '/fonts/37DEB7_0_0.eot',
    '/fonts/37DEB7_0_0.svg',
    '/fonts/37DEB7_0_0.ttf',
    '/fonts/37DEB7_0_0.woff',
    '/fonts/37DEB7_0_0.woff',

    '/images/about/andrey.jpg',
    '/images/about/daniel.jpg',
    '/images/about/maxim.jpg',
    '/images/about/misha.jpg',
    '/images/about/oleg.jpg',
    '/images/default.png',
    '/images/icon.png',
    '/images/update_avatar.png',

    '/js/components/About/About.tmpl.js',
    '/js/components/About/About.mjs',
    '/js/components/About/About.css',
    '/js/components/Button/Button.tmpl.js',
    '/js/components/Button/Button.mjs',
    '/js/components/Button/Button.css',
    '/js/components/Form/Form.tmpl.js',
    '/js/components/Form/SignInForm.mjs',
    '/js/components/Form/SignUpForm.mjs',
    '/js/components/Form/Form.css',
    '/js/components/LeaderBoard/LeaderBoard.tmpl.js',
    '/js/components/LeaderBoard/LeaderBoard.mjs',
    '/js/components/LeaderBoard/LeaderBoard.css',
    '/js/components/Logo/Logo.tmpl.js',
    '/js/components/Logo/Logo.mjs',
    '/js/components/Logo/Logo.css',
    '/js/components/Menu/Menu.tmpl.js',
    '/js/components/Menu/Menu.mjs',
    '/js/components/Menu/Menu.css',
    '/js/components/Navbar/Navbar.tmpl.js',
    '/js/components/Navbar/Navbar.mjs',
    '/js/components/Navbar/Navbar.css',
    '/js/components/Profile/Profile.tmpl.js',
    '/js/components/Profile/Profile.mjs',
    '/js/components/Profile/Profile.css',
    '/js/components/NetworkError/NetworkError.tmpl.js',
    '/js/components/NetworkError/NetworkError.mjs',
    '/js/components/NetworkError/NetworkError.css',
    '/js/components/GameField/GameField.tmpl.js',
    '/js/components/GameField/GameField.mjs',
    '/js/components/GameField/GameField.css',

    '/js/modules/api.js',
    '/js/modules/eventBus.js',
    '/js/modules/network.js',
    '/js/modules/router.js',
    '/js/modules/validation.js',
    '/js/modules/registerCachingSW.js',
    '/js/modules/game/game.js',
    '/js/modules/game/core/gamecore.js',
    '/js/modules/game/core/offline.js',
    '/js/modules/game/core/teams.js',
    '/js/modules/game/core/unit.js',
    '/js/modules/game/core/weapons.js',

    '/js/services/UserService.js',

    '/js/views/MenuView.js',
    '/js/views/AboutView.js',
    '/js/views/BaseView.js',
    '/js/views/LeaderboardView.js',
    '/js/views/ProfileView.js',
    '/js/views/SignInView.js',
    '/js/views/SignUpView.js',
    '/js/views/NetworkErrorView.js',
    '/js/views/GameFieldView.js',
    
    '/js/main.js',    
    '/cachingSW.js',    
    '/index.html',    
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.open: ', err);
            })
    );
});

this.addEventListener('fetch', (event) => {

    /** online first */
    if (navigator.onLine) {
        return fetch(event.request);
    }

    /** cache first */
    event.respondWith(
        caches
            .match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.match: ', err, event.request);
            })
    );
});