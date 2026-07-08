localStorage.setItem("key", "value");
sessionStorage.setItem("key2", "value2");

function storageManager() {
    return {
        get(key) {
            if (localStorage.getItem(key)) {
                let obj = JSON.parse(localStorage.getItem(key));
                if (obj.expiredAt - Date.now() > 0) return obj.value;
                localStorage.removeItem(key);
            }
            return null;
        },
        set(key, value, ttl) {
            let expiredAt = Date.now() + ttl;
            let obj = {
                value,
                expiredAt,
            };
            localStorage.setItem(key, JSON.stringify(obj));
        },
        delete(key) {
            localStorage.removeItem(key);
        },
        clear() {
            localStorage.clear();
        },
    };
}
let customer = {
    id: 1,
    name: "hello",
};
const request = window.indexedDB.open("databse", 1);
request.onupgradeneeded = (event) => {
    const db = request.result;
    const objectStore = db.createObjectStore("customer", { keyPath: "id" });
};
request.onsuccess = (event) => {
    const db = request.result;
    const transaction = db.transaction("customer", "readwrite");
    const objectStore = transaction.objectStore("customer");
    objectStore.put(customer);
    const query = objectStore.get(1);
    query.onsuccess = (event) => {
        console.log(query.result);
    };
};
