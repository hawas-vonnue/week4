import { renderHomePage } from "./pages/home.js";
import { renderListPage } from "./pages/list.js";
import { renderDetailPage } from "./pages/detail.js";
import { renderSettingsPage } from "./pages/settings.js";
import { renderWatchList } from "./pages/watchlist.js";
import { navigate } from "./util.js";
import { register } from "./util.js";
import { createStore } from "./util.js";

const routes = [
    "/day5/movie-library.html/home",
    "/day5/movie-library.html/list",
    "/day5/movie-library.html/detail",
    "/day5/movie-library.html/settings",
    "/day5/movie-library.html/watchlist",
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
        pathname = pathname.split("/").slice(0, -1).join("/");
        const url = `${pathname}/${event.target.id}`;
        // const url = `day5/movie-library.html/${event.target.id}`;
        history.pushState({}, null, url);
        console.log(document.location.pathname);
        navigate(routesMap, document.location.pathname);
    });
});
window.onload = (event) => {
    init();
    console.log(routes);
};

function init() {
    let pathname = document.location.pathname;
    console.log("inside init");
    if (routes.includes(pathname)) {
        console.log("hello");
        navigate(routesMap, pathname);
    } else {
        const url = `/day5/movie-library.html/home`;
        history.replaceState({}, null, url);
        navigate(routesMap, url);
    }
}
console.log(routesMap);
