export default class EventBus {
	constructor() {
		if (EventBus.__instance) {
			return EventBus.__instance;
		}

		this.listeners = {};

		EventBus.__instance = this;
	}

	subscribe (event, callback) {    // подписываемся на событие
		this.listeners[ event ] = this.listeners[ event ] || [];
		this.listeners[ event ].push(callback);
	}

	unsubscribe (event, callback) {   // отписываемся от события
		this.listeners[ event ] = this.listeners[ event ]
			.filter(listener => {
				return listener !== callback;
			});
	}

	publish (event, data) {      // публикуем (диспатчим, эмитим) событие
		this.listeners[ event ].forEach(listener => {
			listener(data);
		});
	}

}
