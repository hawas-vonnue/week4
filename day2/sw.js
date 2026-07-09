async function networkFirst(request) {
    try {
        const responseFromNetwork = await fetch(request);
        if (responseFromNetwork.ok) {
            const cache = await caches.open("v1");
            await cache.put(request, responseFromNetwork.clone());

            return responseFromNetwork;
        }
    } catch (error) {
        console.log(error);
    }
    const responseFromCache = await caches.match(request);

    return responseFromCache;
}

async function cacheFirst(request) {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) return responseFromCache;
    try {
        const responseFromNetwork = await fetch(request);
        const cache = await caches.open("v1");
        await cache.put(request, responseFromNetwork.clone());

        return responseFromNetwork;
    } catch (error) {
        console.log(`error in network:${error}`);
    }
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("v1").then((cache) => {
            cache.addAll([
                "/",
                "./sw.html",
                "./main.js",
                "./sw.css",
                "./jhonny-torrengo-tz7xgGRhH5c-unsplash.jpg",
                "./lightman-qian-4mkFZXIZc58-unsplash.jpg",
            ]);
        })
    );
});
self.addEventListener("activate", (event) => {
    const cacheAllowlist = ["v1"];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheAllowlist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                    return undefined;
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.destination === "")
        event.respondWith(networkFirst(event.request));
    else event.respondWith(cacheFirst(event.request));
    // event.respondWith(caches.match(event.request));
});
