'use strict';

const { assets } = global.serviceWorkerOption;

const CACHE_NAME = new Date().toISOString();

let assetsToCache = [...assets, './'];

assetsToCache = assetsToCache.map(path => {
	return new URL(path, global.location).toString();
});

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(assetsToCache);
			})
			.catch((err) => {
				console.error('smth went wrong with caches.open: ', err);
			})
	);
});

self.addEventListener('fetch', (event) => {

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