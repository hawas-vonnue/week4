class EventEmitter {
    constructor() {
        this.eventMap = new Map();
    }

    on(event, listener) {
        if (!this.eventMap.has(event)) {
            this.eventMap.set(event, []);
        }
        this.eventMap.get(event).push(listener);
    }

    off(event, listener) {
        if (this.eventMap.has(event)) {
            const listerners = this.eventMap
                .get(event)
                .filter((fn) => fn != listener);
            this.eventMap.set(event, listerners);
        }
    }

    emit(event, ...args) {
        if (this.eventMap.has(event)) {
            this.eventMap.get(event).forEach((listener) => {
                listener(...args);
            });
            if (this.eventMap.has("*")) {
                let wildcardListeners = this.eventMap.get("*");
                wildcardListeners.forEach((wildcardListener) => {
                    wildcardListener(...args);
                });
            }
        }
    }

    once(event, listener) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            listener(...args);
        };
        this.on(event, wrapper);
    }
}

async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP Error");
        }
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return Promise.reject(error);
    }
}

const emitter = new EventEmitter();
module.exports = { emitter, fetchJson };
