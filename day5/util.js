export function register(routes, path, component) {
    routes[path] = component;
}

export function navigate(routes, path) {
    let fn = routes[path];
    console.log(path);
    console.log("function");
    console.log(fn);
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

export function createStore() {}
