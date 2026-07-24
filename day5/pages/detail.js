import { fetchJson } from "../util.js";

export async function renderDetailPage(imdbId) {
    const documentFragment = document.createElement("div");
    documentFragment.classList.add("detail");

    const detailedCard = document.querySelector(".detailedCard");
    let detailedCardClone = detailedCard.cloneNode(true);
    let url = `https://www.omdbapi.com/?i=${imdbId}&page=1&apikey=cbd3390f`;

    let result = await fetchJson(url);

    const img = detailedCardClone.querySelector("img");
    const nameElement = detailedCardClone.querySelector(".headingSection h2");
    const ratingElement = detailedCardClone.querySelector(".rating span");
    const yearElement = detailedCardClone.querySelector(".year");
    const runtimeElement = detailedCardClone.querySelector(".runtime");
    const ratedElement = detailedCardClone.querySelector(".rated");
    const plot = detailedCardClone.querySelector(".plot");
    const values = detailedCardClone.querySelectorAll(".value");

    img.src = result.Poster;
    nameElement.textContent = result.Title;
    ratingElement.textContent = result.imdbRating;
    yearElement.textContent = result.Year;
    runtimeElement.textContent = result.Runtime;
    ratedElement.textContent = result.Rated;
    plot.textContent = result.Plot;
    values[0].textContent = result.Actors;
    values[1].textContent = result.Genre;
    values[2].textContent = result.Director;
    values[3].textContent = result.Language;
    values[4].textContent = result.Awards;
    documentFragment.append(detailedCardClone);

    const mainElement = document.querySelector("main");

    mainElement.innerHTML = "";
    mainElement.append(documentFragment);
}
