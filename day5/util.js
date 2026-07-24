import { onRouteChange } from "./main.js";
import { onMoviesListChange } from "./main.js";
import { showToast } from "./showToast.js";

export function register(routes, path, component) {
    routes[path] = component;
}

export async function navigate(routes, path, params) {
    let fn = routes[path];
    if (params !== undefined && params.length !== 0) await fn(params.imdbID);
    else await fn();
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
    cardElement.dataset.imdbId = imdbID;
    cardElement.id = imdbID;
    const imageElement = document.createElement("img");
    imageElement.src = posterSrc;
    imageElement.addEventListener("error", (event) => {
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

        button.addEventListener("click", async (event) => {
            const cardToDelete =
                event.currentTarget.parentElement.parentElement;
            let movies = new Set();
            await onMoviesListChange("delete", cardToDelete.id, movies);
            showToast("removed from watchlist", 3, "success");
        });
    }
    cardElement.append(imageElement, descriptionElement);
    cardElement.addEventListener("click", (event) => {
        if (event.target.className === "watchedButton") return;
        let imdbId = event.currentTarget.dataset.imdbId;
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
    const spinnerElement = document.createElement("div");
    spinnerElement.classList.add("spinner");
    spinnerElement.classList.add("hidden");
    const warningElement = document.createElement("span");
    warningElement.classList.add("warning");
    const searchResultContainer = document.createElement("div");
    searchResultContainer.classList.add("searchResultContainer");
    const closeOverlayButton = document.createElement("button");
    closeOverlayButton.classList.add("closeOverlayButton");
    closeOverlayButton.textContent = "x";
    overlay.append(
        searchElement,
        spinnerElement,
        warningElement,
        searchResultContainer,
        closeOverlayButton
    );

    closeOverlayButton.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    searchButton.addEventListener("click", () => {
        spinnerElement.classList.remove("hidden");
        searchResultContainer.innerHTML = "";
        warningElement.textContent = "";
        let searchValue = searchButton.previousElementSibling.value;
        if (searchValue === "") return;
        if (searchValue.length < 3) {
            warningElement.textContent = "Type at least three characters";
            spinnerElement.classList.add("hidden");

            return;
        }
        searchMovie(searchValue).then(
            (searchResults) => {
                searchResultContainer.append(searchResults);
                spinnerElement.classList.add("hidden");
            },
            (error) => {
                warningElement.textContent = "No results found";
                spinnerElement.classList.add("hidden");
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

export function reducer(state, action) {
    switch (action.type) {
        case "ROUTE_CHANGED":
            return {
                ...state,
                route: action.payload,
            };
        case "MOVIESLIST_CHANGED": {
            let list = state.moviesList;
            if (action.payload.type === "add") {
                list.add(action.payload.id);
            }
            if (action.payload.type === "delete") {
                list.delete(action.payload.id);
            }
            return {
                ...state,
                moviesList: list,
                movieChanged: {
                    id: action.payload.id,
                    type: action.payload.type,
                },
            };
        }
        case "ON_LOAD":
            return {
                ...state,
                moviesList: action.moviesList,
            };
        default:
            return state;
    }
}

// Create Store
export function createStore(initialState, reducer) {
    let state = initialState;
    const listeners = {};

    return {
        getState() {
            return state;
        },

        async dispatch(action) {
            if (
                action.payload.type === "add" &&
                state.moviesList.has(action.payload.id)
            ) {
                showToast("movie already in watchlist", 3, "error");
                return;
            }
            // Update state
            state = reducer(state, action);

            //store updated state in local storage if type is MOVIESLIST_CHANGED
            if (action.type === "MOVIESLIST_CHANGED") {
                localStorage.setItem(
                    "moviesList",
                    JSON.stringify([...state.moviesList])
                );
            }
            if (action.type === "ROUTE_CHANGED") {
                let value = localStorage.getItem("moviesList");
                let movies = new Set(JSON.parse(value));
                state = reducer(state, { type: "ON_LOAD", moviesList: movies });
            }

            // Notify subscribers
            let listenersOfType = listeners[action.type];
            for (let listener of listenersOfType) {
                await listener(state);
            }
        },

        subscribe(type, listener) {
            if (!listeners[type]) {
                listeners[type] = [];
            }
            listeners[type].push(listener);
        },
    };
}

//use filepath = http://127.0.0.1:8080/Top_100_Movies.csv
//when testing because cross-fetch needs absolute url
//when in github pages use - /week4/day5/Top_100_Movies.csv
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
    addToWatchListButton.addEventListener("click", async (event) => {
        let imdbId =
            event.currentTarget.parentElement.parentElement.dataset.imdbId;
        await onMoviesListChange("add", imdbId);
    });

    return cardElement;
}

export async function searchMovie(name) {
    let url = `https://www.omdbapi.com/?s=${name}&page=1&apikey=cbd3390f`;
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
        card.dataset.imdbId = movie.imdbID;

        documentFragment.append(card);
    }

    return documentFragment;
}

export async function addToWatchList(imdbId) {
    const overlay = document.querySelector(".overlay");
    let url = `https://www.omdbapi.com/?i=${imdbId}&page=1&apikey=cbd3390f`;
    let result;
    try {
        result = await fetchJson(url);
    } catch (error) {
        showToast("error in fetching ", 3, "error");
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

    return card;
}

export async function renderUpdatedMoviesList(state) {
    if (!document.location.pathname.includes("watchlist")) return;
    let movies = state.moviesList;
    let moviesList = movies;
    const watchListContainer = document.querySelector(".watchListContainer");
    const documentFragment = document.createDocumentFragment();
    for (let movie of moviesList) {
        const card = await addToWatchList(movie);
        documentFragment.append(card);
    }
    const spinner = document.querySelector("main .spinner");
    watchListContainer.replaceChildren(documentFragment);
    spinner.classList.add("hidden");
}

export async function updateMovieList(state) {
    let type = state.movieChanged.type;
    let id = state.movieChanged.id;
    const watchListContainer = document.querySelector(".watchListContainer");
    if (type === "delete") {
        const card = document.getElementById(id);
        watchListContainer.removeChild(card);
    }
    if (type === "add") {
        const card = await addToWatchList(id);
        watchListContainer.append(card);
        showToast(`added movie to watchlist`, 3, "success");
    }
}
