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

class UserStore extends EventEmitter {
    constructor() {
        super();
        this.users = {};
    }
    add(id, name) {
        this.users[id] = name;
        this.emit("userAdded", id);
    }
    remove(id) {
        delete this.users.id;
        this.emit("userRemoved", id);
    }
    update(id, newName) {
        this.users[id] = newName;
        this.emit("userUpdated", id);
    }
}

const userStore = new UserStore();
userStore.on("userAdded", (id) => {
    console.log(`Added user with id:${id}`);
});
userStore.on("userRemoved", (id) => {
    console.log(`Removed user with id:${id}`);
});
userStore.on("userUpdated", (id) => {
    console.log(`Updated user with id:${id}`);
});

userStore.add(10, "hawas");
userStore.add(11, "fadhil");
userStore.remove(10);
userStore.update(11, "Hii");
const emitter = new EventEmitter();
const greet = (message) => console.log(`Greet: ${message}`);
const farewell = (message) => console.log(`Farewell: ${message}`);
const wish = (message) => console.log(`wish: ${message}`);
emitter.on("hello", greet);
emitter.once("goodbye", farewell);
emitter.on("*", wish);
emitter.emit("hello", "Hello, World!");
emitter.emit("goodbye", "Goodbye, World!");
emitter.off("hello", greet);
emitter.emit("hello", "Hello, World!");
emitter.emit("goodbye", "Goodbye, World!");
