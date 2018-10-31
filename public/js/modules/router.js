'use strict';
export default class Router {
    constructor(root) {
        this.routes = {};

        this.root = root;
        this._prevPath = "";
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
        
        if (!view) {
            view = new View({el: el});
            if (view.render() === "redirect") {
                return;
            }
        }

        if (!view.active) {
            Object.values(this.routes).forEach(({ view }) => {
                if (view && view.active) {
                    view.hide();
                }
            });

            view.show();
        } else {
            view.destroyNavbar();
            view.createNavbar();
        }

        this.routes[page.path] = { View, view, el };
    }

    goBack() {
        this.open({ path: this._prevPath, params: {} });
    }

    start() {
        window.addEventListener('popstate', () => {
            const currentPath = window.location.pathname;
            this._prevPath = currentPath;
            this.open({ path: currentPath, params: {} });
        });

        const currentPath = window.location.pathname;
        this.open({ path: currentPath, params: {} });
    }

    rerenderViews(paths) {
        paths.forEach((path) => {
            const route = this.routes[path];
            if (route.view) {
                route.view.destroy();
                route.view.render();
            }
        });
    }
}