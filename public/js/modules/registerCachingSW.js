'use strict';
export default function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/cachingSW.js', { scope: '/' })
            .then((registration) => {
                console.log('sw registration on scope:', registration.scope);
            })
            .catch((err) => {
                console.error(err);
            });
    }
}