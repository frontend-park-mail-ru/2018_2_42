export default class Router {
	constructor (root) {
		this.routes = {};

		this.root = root;
	}

	/**
	 * @param {string} path
	 * @param {BaseView} View
	 */
	register (path, View, callback = null ) {
			this.routes[ path ] = {
				View: View,
				view: null,
				el: null,
				callback: callback,
			};

		return this;
	}

	/**
	 * @param {path: string, params: {}} page
	 */
	open (page) {
		const route = this.routes[ page.path ];

		if (!route) {
			this.open({path: '/', params: {}});
			return;
		}

		typeof route.callback == 'function' && route.callback();

		if (route.View == null) {
			this.open({path: '/', params: {}});
			return;
		}

		if (window.location.pathname !== page.path) {
			window.history.pushState(
				null,
				'',
				page.path
			);
		}

		let {View, view, el} = route;

		if (!el) {
			el = document.createElement('section');
			this.root.appendChild(el);
		}

		if (!view) {
			view = new View(el);
			view.render()
		}

		if (!view.active) {
			Object.values(this.routes).forEach(function ({view}) {
				if (view && view.active) {
					view.hide();
				}
			});

			console.log(page);
			view.show(page.params);
		}

		this.routes[ page.path ] = {View, view, el};
	}

	start () {
		window.addEventListener('popstate', function () {
			const currentPath = window.location.pathname;

			this.open({path: currentPath, params:{}});
		}.bind(this));

		const currentPath = window.location.pathname;

		this.open({path: currentPath, params:{}});
	}
}
