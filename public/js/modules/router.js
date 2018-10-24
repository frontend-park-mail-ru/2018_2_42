'use strict';

export default class Router {
    constructor(root) {
        this.routes = {};

        this.root = root;
    }

	/**
	 * @param {string} path
	 * @param {BaseView} View
	 */
    register(path, View, callback = null) {
        this.routes[path] = {
            View: View,
            view: null,
            // el: null,
            el: document.getElementById("root"),
            callback: callback,
        };
        
        return this;
    }

	/**
	 * @param {path: string, params: {}} page
	 */
    open(page) {
        const route = this.routes[page.path];

        if (!route) {
            this.open({ path: '/', params: {} });
            return;
        }

        // typeof route.callback == 'function' && route.callback();

        if (route.View == null) {
            this.open({ path: '/', params: {} });
            return;
        }

        if (window.location.pathname !== page.path) {
            window.history.pushState(
                null,
                '',
                page.path
            );
        }

        let { View, view, el } = route;
        
        // if (!el) {
        //     el = document.createElement('section');
        //     this.root.appendChild(el);
        // }
        
        if (!view) {
            view = new View({el: el});
            view.render();
        }

        if (!view.active) {
            Object.values(this.routes).forEach(({ view }) => {
                if (view && view.active) {
                    view.destroy();
                }
            });

            view.show();
        }

        this.routes[page.path] = { View, view, el };
    }

    start() {
        window.addEventListener('popstate', () => {
            const currentPath = window.location.pathname;
            this.open({ path: currentPath, params: {} });
        });

        const currentPath = window.location.pathname;
        this.open({ path: currentPath, params: {} });
    }
}