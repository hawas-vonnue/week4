export function register(routes, path, component) {
    routes[path] = component;
}

export function navigate(routes, path) {
    let fn = routes[path];
    fn();
}

export function createButton() {}

export function createCard() {}

export function createModal() {}

export async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Http Error");
        }
        const responseJson = await response.json();

        return responseJson;
    } catch (error) {
        throw new Error(error);
    }
}

// Reducer
export function reducer(state, action) {
    switch (action.type) {
        case "ROUTE_CHANGED":
            return {
                ...state,
                route: action.payload,
            };

        default:
            return state;
    }
}

// Create Store
export function createStore(initialState, reducer) {
    let state = initialState;
    const listeners = new Set();

    return {
        getState() {
            return state;
        },

        dispatch(action) {
            // Update state
            state = reducer(state, action);

            // Notify subscribers
            listeners.forEach((listener) => listener(state));
        },

        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
}
