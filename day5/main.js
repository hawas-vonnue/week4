import { renderHomePage } from "./pages/home.js";
import { renderListPage } from "./pages/list.js";
import { renderDetailPage } from "./pages/detail.js";
import { renderSettingsPage } from "./pages/settings.js";
import { renderWatchList } from "./pages/watchlist.js";
import { navigate } from "./util.js";
import { register } from "./util.js";
import { createStore } from "./util.js";
import { reducer } from "./util.js";

const routes = ["#home", "#list", "#detail", "#settings", "#watchlist"];
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
        if (`#${event.target.id}` !== document.location.hash) {
            history.pushState({}, null, `#${event.target.id}`);
            onRouteChange(document.location.hash, {});
        }
    });
});
window.onload = (event) => {
    init();
};

window.addEventListener("popstate", () => {
    onRouteChange(document.location.hash, {});
});

function init() {
    if (routes.includes(document.location.hash)) {
        onRouteChange(document.location.hash, {});
    } else {
        console.log("hello");
        history.pushState({}, null, "#home");
        onRouteChange(document.location.hash, {});
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
function onRouteChange(path, params) {
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
    navigate(routesMap, state.route.path);
});
