import { parseCSV } from "../util.js";
import { createCard } from "../util.js";
import { showToast } from "../showToast.js";

export async function renderListPage() {
    const documentFragment = document.createElement("div");
    const headingElement = document.createElement("h1");
    const spinnerElement = document.createElement("div");
    const cardContainer = document.createElement("div");
    const mainElement = document.querySelector("main");

    documentFragment.classList.add("list");
    spinnerElement.classList.add("spinner");
    cardContainer.classList.add("cardContainer");

    headingElement.textContent = "MOVIES";
    documentFragment.append(headingElement, spinnerElement);

    mainElement.innerHTML = "";
    mainElement.append(documentFragment);

    //use timeout just to simulate time taking and to see loading
    // setTimeout(async () => {
    try {
        let movies = await parseCSV();
        for (let i = 0; i < movies.length; i++) {
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
            cardContainer.appendChild(card);
        }
        documentFragment.append(cardContainer);
        spinnerElement.classList.add("hidden");
    } catch (error) {
        showToast("error in fetching data", 3, "error");
    }
    // }, 300);
}
