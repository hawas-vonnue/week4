export function renderWatchList() {
    const documentFragment = document.createDocumentFragment();
    const addToWatchListElement = document.createElement("div");
    addToWatchListElement.classList.add("addToWatchList");
    const button = document.createElement("button");
    button.textContent = "add to watchlist";
    addToWatchListElement.append(button);
    const watchListHeading = document.createElement("h3");
    watchListHeading.textContent = "Your Watch List";
    const watchListContainerElement = document.createElement("div");
    watchListContainerElement.classList.add("watchListContainer");
    documentFragment.append(
        addToWatchListElement,
        watchListHeading,
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
