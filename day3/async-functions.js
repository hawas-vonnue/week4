async function fetchJson(url, options = { method: "POST" }) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("HTTP Error");
        }
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return Promise.reject(error);
    }
}

function debounce(func, delay = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const memoize = (func) => {
    const map = new Map();
    return (...args) => {
        let key = args.join(",");
        if (!map.has(key)) {
            console.log("adding to cache");
            let value = func.apply(this, args);
            map.set(key, value);
        } else console.log("fetching from cache");

        return map.get(key);
    };
};

module.exports = { fetchJson, debounce, memoize };
