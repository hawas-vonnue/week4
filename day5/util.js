let movies = new Set();
import { onRouteChange } from "./main.js";
export function register(routes, path, component) {
    routes[path] = component;
}

export function navigate(routes, path, params) {
    let fn = routes[path];
    if (params !== undefined && params.length !== 0) fn(params.imdbID);
    else fn();
}

export function createButton(text, backgroundColor = "white") {
    const button = document.createElement("button");
    button.textContent = text;
    button.style.backgroundColor = backgroundColor;
    button.style.padding = "3px 6px";
    button.style.border = "none";
    button.style.borderRadius = "8px";

    return button;
}

export function createCard(
    name,
    rating,
    genres,
    posterSrc,
    year,
    imdbID = null,
    button = "false"
) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    const imageElement = document.createElement("img");
    imageElement.src = posterSrc;
    imageElement.addEventListener("error", (event) => {
        // event.preventDefault();
        event.target.src = "https://picsum.photos/200/300";
    });
    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("description");
    const nameElement = document.createElement("h3");
    nameElement.textContent = `${name} (${year})`;
    const ratingElement = document.createElement("span");
    ratingElement.classList.add("rating");
    ratingElement.innerHTML = `<span >${rating}</span>&starf;`;
    const genreContainer = document.createElement("div");
    genreContainer.classList.add("genreContainer");
    for (let i = 0; i < genres.length; i++) {
        if (i === 3) break;
        let button = createButton(genres[i], "ghostwhite");
        genreContainer.appendChild(button);
    }
    descriptionElement.append(nameElement, ratingElement, genreContainer);
    if (button === "true") {
        const button = document.createElement("button");
        button.textContent = "watched";
        button.classList.add("watchedButton");
        descriptionElement.append(button);

        button.addEventListener("click", (event) => {
            const cardToDelete =
                event.currentTarget.parentElement.parentElement;
            const watchListContainer = document.querySelector(
                ".watchListContainer"
            );
            watchListContainer.removeChild(cardToDelete);
            console.log("removed from watchlist");
        });
    }
    cardElement.dataset.imdbID = imdbID;
    cardElement.append(imageElement, descriptionElement);
    cardElement.addEventListener("click", (event) => {
        if (event.target.className === "watchedButton") return;
        let imdbId = event.currentTarget.dataset.imdbID;
        let pathname = document.location.pathname;
        pathname = pathname.split("/").slice(0, -1).join("/");
        const url = `${pathname}/detail/:${imdbId}`;
        history.pushState({}, null, url);
        onRouteChange(`${pathname}/detail`, { imdbID: imdbId });
    });

    return cardElement;
}

export function createModal() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const searchElement = document.createElement("div");
    searchElement.classList.add("search");
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("placeholder", "type here to search the movie");
    const searchButton = document.createElement("button");
    searchButton.classList.add("searchButton");
    searchButton.textContent = "Search";
    searchElement.append(inputElement, searchButton);
    const warningElement = document.createElement("span");
    warningElement.classList.add("warning");
    const searchResultContainer = document.createElement("div");
    searchResultContainer.classList.add("searchResultContainer");
    const closeOverlayButton = document.createElement("button");
    closeOverlayButton.classList.add("closeOverlayButton");
    closeOverlayButton.textContent = "x";
    overlay.append(
        searchElement,
        warningElement,
        searchResultContainer,
        closeOverlayButton
    );

    closeOverlayButton.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    searchButton.addEventListener("click", () => {
        searchResultContainer.innerHTML = "";
        warningElement.textContent = "";
        let searchValue = searchButton.previousElementSibling.value;
        if (searchValue === "") return;
        if (searchValue.length < 3) {
            warningElement.textContent = "Type at least three characters";

            return;
        }
        searchMovie(searchValue).then(
            (searchResults) => {
                searchResultContainer.append(searchResults);
            },
            (error) => {
                warningElement.textContent = "No results found";
            }
        );
    });

    return overlay;
}

export async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Http Error");
        }
        const responseJson = await response.json();

        return responseJson;
    } catch (error) {
        throw new Error(error);
    }
}

// Reducer
export function reducer(state, action) {
    switch (action.type) {
        case "ROUTE_CHANGED":
            return {
                ...state,
                route: action.payload,
            };

        default:
            return state;
    }
}

// Create Store
export function createStore(initialState, reducer) {
    let state = initialState;
    const listeners = new Set();

    return {
        getState() {
            return state;
        },

        dispatch(action) {
            // Update state
            state = reducer(state, action);

            // Notify subscribers
            listeners.forEach((listener) => listener(state));
        },

        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
}

//parse
export async function parseCSV(filePath = "/Top_100_Movies.csv") {
    const response = await fetch(filePath);
    const data = await response.text();
    const lines = data.trim().split(/\r?\n/);

    const headers = parseLine(lines[0]);
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const values = parseLine(lines[i]);
        const obj = {};

        headers.forEach((header, index) => {
            obj[header] = values[index] ?? "";
        });

        result.push(obj);
    }

    return result;
}

function parseLine(line) {
    const values = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            values.push(current);
            current = "";
        } else {
            current += char;
        }
    }

    values.push(current);

    return values;
}

export function createSearchResultCard(title, year, posterSrc) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.classList.add("searchResult");
    const imageElement = document.createElement("img");
    imageElement.src = posterSrc;
    imageElement.addEventListener("error", (event) => {
        event.target.src = "https://picsum.photos/200/300";
    });
    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("description");
    const nameElement = document.createElement("h3");
    nameElement.textContent = `${title} (${year})`;
    const addToWatchListButton = document.createElement("button");
    addToWatchListButton.classList.add("addToWatchListButton");
    addToWatchListButton.textContent = "add to watchlist";
    descriptionElement.append(nameElement, addToWatchListButton);
    cardElement.append(imageElement, descriptionElement);
    addToWatchListButton.addEventListener("click", (event) => {
        let title =
            event.currentTarget.parentElement.parentElement.dataset.title;
        addToWatchList(title);
    });

    return cardElement;
}

export async function searchMovie(name) {
    let url = `http://www.omdbapi.com/?s=${name}&page=1&apikey=cbd3390f`;
    let results = await fetchJson(url);
    if (results.Response === "false") {
        Promise.reject(new Error("couldnt find results"));
    }
    let movieArray = results.Search;
    const documentFragment = document.createDocumentFragment();
    for (let movie of movieArray) {
        let card = createSearchResultCard(
            movie.Title,
            movie.Year,
            movie.Poster
        );
        card.dataset.title = movie.Title;

        documentFragment.append(card);
    }

    return documentFragment;
}

export async function addToWatchList(title) {
    const watchListContainer = document.querySelector(".watchListContainer");
    const overlay = document.querySelector(".overlay");
    let url = `http://www.omdbapi.com/?t=${title}&page=1&apikey=cbd3390f`;
    const result = await fetchJson(url);
    if (movies.has(result.imdbID)) {
        alert(`${result.Title} already in watchlist`);

        return;
    }
    let rating;
    if (result.Ratings.length === 0) rating = "N/A";
    else rating = result.Ratings[0].Value;
    let genres = result.Genre.split(",");
    let card = createCard(
        result.Title,
        rating,
        genres,
        result.Poster,
        result.Year,
        result.imdbID,
        "true"
    );
    watchListContainer.append(card);
    movies.add(result.imdbID);
    alert(`added ${result.Title} to watchlist`);
}
