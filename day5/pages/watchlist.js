export function renderWatchList() {
    const documentFragment = document.createElement("div");
    documentFragment.classList.add("watchList");
    const addToWatchListElement = document.createElement("div");
    addToWatchListElement.classList.add("addToWatchList");
    const button = document.createElement("button");
    button.textContent = "add to watchlist";
    addToWatchListElement.append(button);
    const watchListHeading = document.createElement("h3");
    watchListHeading.textContent = "Your Watch List";
    const loadingElement = document.createElement("div");
    loadingElement.classList.add("spinner");
    const watchListContainerElement = document.createElement("div");
    watchListContainerElement.classList.add("watchListContainer");
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
