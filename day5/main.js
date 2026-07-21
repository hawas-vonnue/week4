import { renderHomePage } from "./pages/home.js";
import { renderListPage } from "./pages/list.js";
import { renderDetailPage } from "./pages/detail.js";
import { renderSettingsPage } from "./pages/settings.js";
import { renderWatchList } from "./pages/watchlist.js";
import { createCard, createModal, navigate, updateMovieList } from "./util.js";
import { register } from "./util.js";
import { createStore } from "./util.js";
import { reducer } from "./util.js";
import { renderUpdatedMoviesList } from "./util.js";

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
    movieChanged: {
        id: "",
        type: "add",
    },
    moviesList: new Set(),
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

export async function onMoviesListChange(type, id) {
    await store.dispatch({
        type: "MOVIESLIST_CHANGED",
        payload: { type, id },
    });
}

// Component subscribes to state changes
store.subscribe("ROUTE_CHANGED", (state) => {
    navigate(routesMap, state.route.path, state.route.params);
    renderUpdatedMoviesList(state);
});
store.subscribe("MOVIESLIST_CHANGED", (state) => {
    updateMovieList(state);
});

const overlay = createModal();
document.body.prepend(overlay);
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (overlay.style.display !== "none") overlay.style.display = "none";
    }
});
