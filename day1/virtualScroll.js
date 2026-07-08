let ItemArray = [];

(function createArray() {
    for (let i = 0; i < 10000; i++) {
        let item = {
            id: i,
            title: `Title ${i}`,
            description: `This is the description of item number ${i}`,
        };
        ItemArray.push(item);
    }
})();
const containerElement = document.querySelector(".container");

function createCard(id, title, description) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    const idElement = document.createElement("span");
    idElement.textContent = id;
    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    cardElement.append(idElement, titleElement, descriptionElement);

    return cardElement;
}
let rendered = new Set();

function render(startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
        if (rendered.has(i)) continue;
        let cardElement = createCard(
            ItemArray[i].id,
            ItemArray[i].title,
            ItemArray[i].description
        );
        rendered.add(i);
        containerElement.append(cardElement);
    }
}

function init() {
    render(0, 3);
}
init();
containerElement.addEventListener("scroll", (event) => {
    //10 added to compensate for the margin
    const itemHeight = document.querySelector(".card").offsetHeight + 10;
    const containerHeight = document.querySelector(".container").offsetHeight;
    let scrollTop = containerElement.scrollTop;
    let startIndex = Math.floor(scrollTop / itemHeight);
    let visibleItems = Math.ceil(containerHeight / itemHeight);
    //10 item buffer
    let endIndex = startIndex + visibleItems + 10;
    render(startIndex, endIndex);
});
