import { parseCSV } from "../util.js";
import { createCard } from "../util.js";

export async function renderHomePage() {
    const documentFragment = document.createElement("div");
    const heroElement = document.createElement("div");
    const imageElement = document.createElement("img");
    const overlayElement = document.createElement("div");
    const headingElement = document.createElement("div");
    const topElement = document.createElement("div");
    const h3Element = document.createElement("h3");
    const topCardContainer = document.createElement("div");

    documentFragment.classList.add("home");
    heroElement.classList.add("hero");
    overlayElement.classList.add("overlay");
    headingElement.classList.add("heading");
    imageElement.src =
        "https://assets.nflxext.com/ffe/siteui/vlv3/ffa9d590-69c5-406f-bff9-e2ced3baa6ad/web/IN-en-20260713-TRIFECTA-perspective_75c0557e-9bbb-4149-9913-b87d4d7a30b7_large.jpg";
    headingElement.textContent = "HOME PAGE";
    h3Element.textContent = "TOP 3 Movies";

    heroElement.append(imageElement, overlayElement, headingElement);
    topCardContainer.classList.add("cardContainer");

    try {
        let movies = await parseCSV();
        for (let i = 0; i < 3; i++) {
            let genres = movies[i].genre;
            genres = genres.replace(/'/g, '"');
            genres = JSON.parse(genres);
            let card = createCard(
                movies[i].title,
                movies[i].rating,
                genres,
                movies[i].image,
                movies[i].year,
                movies[i].imdbid
            );
            topCardContainer.appendChild(card);
        }
        topElement.append(h3Element, topCardContainer);
        documentFragment.append(heroElement, topElement);

        const mainElement = document.querySelector("main");

        mainElement.innerHTML = "";
        mainElement.append(documentFragment);
    } catch (error) {
        console.error(error);
    }
}
