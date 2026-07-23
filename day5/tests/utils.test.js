import { createCard, createSearchResultCard, searchMovie } from "../util.js";
import { routesMap } from "../main.js";
import { register } from "../util.js";
import { renderDetailPage } from "../pages/detail.js";
import { onMoviesListChange } from "../main.js";
import { showToast } from "../showToast.js";
import { renderListPage } from "../pages/list.js";
import { store } from "../main.js";

jest.mock("../showToast.js");
jest.mock("../pages/detail.js");

const fetch = require("cross-fetch");
global.fetch = fetch;

describe("createCard event listeners", () => {
    document.body.innerHTML = `
        <header>
            <nav>
                <a href="" id="home">Home</a>
                <a href="" id="list">List</a>
                <a href="" id="watchlist">Watchlist</a>
                <a href="" id="settings">Settings</a>
            </nav>
        </header>
        <main></main>
        <div class="hidden">
            <div class="detailedCard">
                <img
                    src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg"
                    alt="movie poster"
                />
                <div class="details">
                    <div class="headingSection">
                        <h2>Avengers: Infinity War</h2>
                        <span class="rating"><span>9.0</span>&starf;</span>
                    </div>
                    <div class="subDetails">
                        <span class="year">2018</span>
                        |
                        <span class="runtime">123m</span>
                        |
                        <span class="rated">16+</span>
                    </div>
                    <div class="overview">
                        <h3>OVERVIEW</h3>
                        <div class="overviewDetailsContainer">
                            <span class="plot"
                                >A thief who steals corporate secrets through
                                the use of dream-sharing technology is given the
                                inverse task of planting an idea into the mind
                                of a CEO, but his tragic past may doom the
                                project and his team to disaster.</span
                            >
                            <span class="fields">
                                <span class="field">
                                    <span class="label">Starring</span>
                                    <span class="value"
                                        >Leonardo DiCaprio, Joseph
                                        Gordon-Levitt, Elliot Page</span
                                    >
                                </span>
                                <span class="field">
                                    <span class="label">Genre</span>
                                    <span class="value"
                                        >Action, Adventure, Sci-Fi</span
                                    >
                                </span>
                                <span class="field">
                                    <span class="label">Director</span>
                                    <span class="value"
                                        >Christopher Nolan
                                    </span>
                                </span>
                                <span class="field">
                                    <span class="label">Languages</span>
                                    <span class="value">
                                        English, Japanese, French
                                    </span>
                                </span>
                                <span class="field">
                                    <span class="label">Awards</span>
                                    <span class="value">
                                        Won 4 Oscars. 160 wins & 220 nominations
                                        total
                                    </span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    const card = createCard(
        "test",
        10,
        "hello",
        "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg",
        2010,
        "tt2543164",
        "true"
    );
    register(routesMap, "/detail", renderDetailPage);
    const mainElement = document.querySelector("main");
    mainElement.append(card);
    test("opening detail page", async () => {
        card.click();
        expect(renderDetailPage).toHaveBeenCalled();
    });
    test("delete button", async () => {
        document.body.innerHTML = ` <header>
            <nav>
                <a href="" id="home">Home</a>
                <a href="" id="list">List</a>
                <a href="" id="watchlist">Watchlist</a>
                <a href="" id="settings">Settings</a>
            </nav>
        </header>
        <main>
        <div class="watchListContainer"></div>
        </main>
        `;
        const watchListContainer = document.querySelector(
            ".watchListContainer"
        );
        watchListContainer.append(card);
        const deleteButton = card.querySelector(".watchedButton");
        deleteButton.click();
        expect(store.getState().moviesList.has(card.id)).toBe(false);
    });
    test("create search result card", async () => {
        const card = await createSearchResultCard(
            "hello",
            2012,
            "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg"
        );
        expect(card).not.toBe(null);
    });
    test("search a movie", async () => {
        const card = await searchMovie("hello");
        expect(card).not.toBe(null);
    });
});
