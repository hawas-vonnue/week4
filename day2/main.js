const containerElement = document.querySelector(".container");
async function fetchJson(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Error while fetching");
        }
        const responseJson = await response.json();

        return responseJson;
    } catch (error) {
        throw new Error(error);
    }
}

function createElement(title, body) {
    const card = document.createElement("div");
    const titleElement = document.createElement("h1");
    const bodyElement = document.createElement("p");
    titleElement.textContent = title;
    bodyElement.textContent = body;
    card.append(titleElement, bodyElement);

    return card;
}

function addDynamicContent() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetchJson(url).then((response) => {
        for (let i = 0; i < 5; i++) {
            let element = createElement(response[i].title, response[i].body);
            containerElement.appendChild(element);
        }
    });
}
addDynamicContent();

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration =
                await navigator.serviceWorker.register("/day2/sw.js");
            if (registration.installing)
                console.log("service worker installing");
            if (registration.waiting) console.log("service worker waiting");
            if (registration.active) console.log("service worker active");
        } catch (error) {
            console.log(`registration failed ${error}`);
        }
    }
};
registerServiceWorker();

const images = [
    {
        name: "image 1",
        alt: "image 1",
        url: "./jhonny-torrengo-tz7xgGRhH5c-unsplash.jpg",
    },
    {
        name: "image 2",
        alt: "image 2",
        url: "./lightman-qian-4mkFZXIZc58-unsplash.jpg",
    },
];

const getImageBlob = async (url) => {
    const imageResponse = await fetch(url);
    if (!imageResponse.ok) {
        throw new Error(
            `Image didn't load successfully; error code: ${
                imageResponse.statusText || imageResponse.status
            }`
        );
    }
    return imageResponse.blob();
};

const createGalleryFigure = async (image) => {
    try {
        const imageBlob = await getImageBlob(image.url);
        const myImage = document.createElement("img");
        myImage.src = window.URL.createObjectURL(imageBlob);
        myImage.setAttribute("alt", image.alt);
        containerElement.appendChild(myImage);
    } catch (error) {
        console.error(error);
    }
};
images.forEach((image) => {
    createGalleryFigure(image);
});
