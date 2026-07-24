export function renderWatchList() {
    const documentFragment = document.createElement("div");
    const addToWatchListElement = document.createElement("div");
    const button = document.createElement("button");
    const watchListHeading = document.createElement("h3");
    const loadingElement = document.createElement("div");
    const watchListContainerElement = document.createElement("div");

    documentFragment.classList.add("watchList");
    addToWatchListElement.classList.add("addToWatchList");
    loadingElement.classList.add("spinner");
    watchListContainerElement.classList.add("watchListContainer");

    button.textContent = "add to watchlist";
    addToWatchListElement.append(button);

    watchListHeading.textContent = "Your Watch List";
    documentFragment.append(
        addToWatchListElement,
        watchListHeading,
        loadingElement,
        watchListContainerElement
    );

    const mainElement = document.querySelector("main");

    mainElement.innerHTML = "";
    mainElement.append(documentFragment);
    button.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "flex";
    });
}
