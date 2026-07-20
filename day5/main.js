import { renderHomePage } from "./pages/home.js";
import { renderListPage } from "./pages/list.js";
import { renderDetailPage } from "./pages/detail.js";
import { renderSettingsPage } from "./pages/settings.js";
import { renderWatchList } from "./pages/watchlist.js";
import { createCard, createModal, navigate } from "./util.js";
import { register } from "./util.js";
import { createStore } from "./util.js";
import { reducer } from "./util.js";
import { searchMovie } from "./util.js";

const routes = [
    "/day5/index.html/home",
    "/day5/index.html/list",
    "/day5/index.html/detail",
    "/day5/index.html/settings",
    "/day5/index.html/watchlist",
];
const routesMap = {};

register(routesMap, routes[0], renderHomePage);
register(routesMap, routes[1], renderListPage);
register(routesMap, routes[2], renderDetailPage);
register(routesMap, routes[3], renderSettingsPage);
register(routesMap, routes[4], renderWatchList);

const links = document.querySelectorAll("a");
links.forEach((element) => {
    element.addEventListener("click", (event) => {
        event.preventDefault();
        let pathname = document.location.pathname;
        // pathname = pathname.split("/").slice(0, -1).join("/");
        pathname = `/day5/index.html`;
        const url = `${pathname}/${event.target.id}`;
        history.pushState({}, null, url);
        onRouteChange(url, {});
    });
});

window.onload = (event) => {
    init();
};
window.addEventListener("popstate", (event) => {
    init();
});

function init() {
    let pathname = document.location.pathname;
    let obj = {};
    if (pathname.includes(":")) {
        let pathnames = pathname.split("/");
        pathname = pathnames.slice(0, -1).join("/");
        let imdbId = pathnames[pathnames.length - 1].slice(1);
        obj = { imdbID: imdbId };
    }
    if (routes.includes(pathname)) {
        onRouteChange(pathname, obj);
    } else {
        const url = `/day5/index.html/home`;
        history.replaceState({}, null, url);
        onRouteChange(url, obj);
    }
}

// Initial State
const initialState = {
    route: {
        path: "",
        params: {},
    },
};

const store = createStore(initialState, reducer);

// Called whenever the route changes
export function onRouteChange(path, params) {
    store.dispatch({
        type: "ROUTE_CHANGED",
        payload: {
            path,
            params,
        },
    });
}

// Component subscribes to state changes
store.subscribe((state) => {
    navigate(routesMap, state.route.path, state.route.params);
});

// let card = createCard(
//     "Pulp fiction",
//     10,
//     ["crime", "Drama", "Western", "fight"],
//     "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY562_CR3,0,380,562_.jpg"
// );
// const mainElement = document.querySelector(".main");
// mainElement.append(card);
// let card2 = createCard(
//     "fight club",
//     9.5,
//     ["Drama"],
//     "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_QL75_UX380_CR0,1,380,562_.jpg"
// );
// mainElement.append(card2);

// const searchButton = document.querySelector(".searchButton");
// searchButton.addEventListener("click", () => {
//     const searchResultContainer = document.querySelector(
//         ".searchResultContainer"
//     );
//     searchResultContainer.innerHTML = "";
//     const warningElement = document.querySelector(".warning");
//     warningElement.textContent = "";
//     let searchValue = searchButton.previousElementSibling.value;
//     if (searchValue === "") return;
//     if (searchValue.length < 3) {
//         warningElement.textContent = "Type at least three characters";

//         return;
//     }
//     searchMovie(searchValue).then(
//         (searchResults) => {
//             searchResultContainer.append(searchResults);
//         },
//         (error) => {
//             warningElement.textContent = "No results found";
//         }
//     );
// });

const overlay = createModal();
document.body.prepend(overlay);
