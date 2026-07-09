async function writeToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert("sucessfully copied");
    } catch (error) {
        console.log(error);
    }
}

const copyCodeButtons = document.querySelectorAll(".copyCode");
copyCodeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        writeToClipboard(event.target.previousElementSibling.textContent);
    });
});
Notification.requestPermission().then((result) => {
    console.log(result);
});
const formElement = document.querySelector("form");
formElement.addEventListener("submit", (event) => {
    const notification = new Notification("successfully submited");
});

async function reverseGeocode(latitude, longitude, language = "en") {
    const url = new URL(
        "https://api.bigdatacloud.net/data/reverse-geocode-client"
    );
    url.searchParams.set("latitude", latitude);
    url.searchParams.set("longitude", longitude);
    url.searchParams.set("language", language);
    const res = await fetch(url.toString());
    if (!res) throw new Error(`reverse geocoding failed ${res.status}`);
    const resJson = await res.json();

    return resJson.city;
}

function success(pos) {
    const locationField = document.querySelector("#location");
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    reverseGeocode(latitude, longitude).then((city) => {
        locationField.value = city;
    });
}
function error(err) {
    alert(`please allow permission to use geolocation`);
}
navigator.geolocation.getCurrentPosition(success, error);

const shareData = {
    title: "MDN",
    text: "Learn web development on MDN!",
    url: "https://developer.mozilla.org",
};
const shareButton = document.querySelector(".share");
shareButton.addEventListener("click", async (event) => {
    let data = "hello";
    if (navigator.canShare) {
        try {
            await navigator.share({ data, title: "text data" });
        } catch (error) {
            console.log(error);
        }
    } else {
        let url = document.location.href;
        writeToClipboard(url);
    }
});
// shareButton.addEventListener("click", async () => {
//     try {
//         await navigator.share({ title: "Example Page", url: "" });
//         console.log("Data was shared successfully");
//     } catch (err) {
//         console.error("Share failed:", err.message);
//     }
// });
