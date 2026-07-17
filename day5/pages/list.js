export function renderListPage() {
    const documentFragment = document.createDocumentFragment();
    const divElement = document.createElement("div");
    const h2Element = document.createElement("h2");
    h2Element.textContent = "List Page";
    divElement.append(h2Element);
    documentFragment.append(divElement);
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    mainElement.append(documentFragment);
}
