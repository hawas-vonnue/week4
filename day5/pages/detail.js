import { fetchJson } from "../util.js";

export async function renderDetailPage(imdbId) {
    const documentFragment = document.createElement("div");
    documentFragment.classList.add("detail");
    const detailedCard = document.querySelector(".detailedCard");
    let detailedCardClone = detailedCard.cloneNode(true);
    let url = `http://www.omdbapi.com/?i=${imdbId}&page=1&apikey=cbd3390f`;
    let result = await fetchJson(url);
    const img = detailedCardClone.querySelector("img");
    img.src = result.Poster;
    const nameElement = detailedCardClone.querySelector(".headingSection h2");
    nameElement.textContent = result.Title;
    const ratingElement = detailedCardClone.querySelector(".rating span");
    ratingElement.textContent = result.imdbRating;
    const yearElement = detailedCardClone.querySelector(".year");
    yearElement.textContent = result.Year;
    const runtimeElement = detailedCardClone.querySelector(".runtime");
    runtimeElement.textContent = result.Runtime;
    const ratedElement = detailedCardClone.querySelector(".rated");
    ratedElement.textContent = result.Rated;
    const plot = detailedCardClone.querySelector(".plot");
    plot.textContent = result.Plot;
    const values = detailedCardClone.querySelectorAll(".value");
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
