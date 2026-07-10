export class IndexedDB {
    constructor(dbName, version) {
        this.indexedDB = window.indexedDB;
        this.request = this.indexedDB.open(dbName, version);
        this.request.onerror = (event) => {
            console.log("An error occured");
            console.log(event);
        };
        this.objectStore;
        this.db;
        this.store;
    }
    openDB(objectStore, keyOptions) {
        return new Promise((resolve, reject) => {
            this.objectStore = objectStore;
            this.request.onupgradeneeded = (event) => {
                this.db = this.request.result;
                const store = this.db.createObjectStore(
                    objectStore,
                    keyOptions
                );
            };
            this.request.onsuccess = () => {
                this.db = this.request.result;
                resolve();
            };
        });
    }
    addRecord(record) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(
                this.objectStore,
                "readwrite"
            );
            let store = transaction.objectStore(this.objectStore);
            store.add(record);

            resolve();
        });
    }
    getRecord(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(
                this.objectStore,
                "readwrite"
            );
            let store = transaction.objectStore(this.objectStore);
            const record = store.get(id);
            record.onsuccess = () => {
                resolve(record.result);
            };
        });
    }
    getAllRecords() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(
                this.objectStore,
                "readwrite"
            );
            let store = transaction.objectStore(this.objectStore);
            const records = store.getAll();
            records.onsuccess = () => {
                resolve(records.result);
            };
        });
    }
    deleteRecord(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(
                this.objectStore,
                "readwrite"
            );
            let store = transaction.objectStore(this.objectStore);
            let req = store.delete(id);
            req.onsuccess = () => {
                console.log("sucessfuly deleted");

                resolve("deleted");
            };
        });
    }
    updateRecord(record) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(
                this.objectStore,
                "readwrite"
            );
            let store = transaction.objectStore(this.objectStore);
            store.put(record);

            resolve();
        });
    }
}
