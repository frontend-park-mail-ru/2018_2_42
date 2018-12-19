'use strict';

const CACHE_NAME = new Date().toISOString();

const assets = [...global.serviceWorkerOption.assets, './', 'build.js', 'images/favicon.ico'];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(assets);
			})
			.catch((err) => {
				console.error('smth went wrong with caches.open: ', err);
			})
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
		return;
	}

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