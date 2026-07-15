let itemArray = [];

(function createArray() {
    for (let i = 0; i < 10000; i++) {
        let item = {
            id: i,
            title: `Title ${i}`,
            description: `This is the description of item number ${i}`,
        };
        itemArray.push(item);
    }
})();

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

class VirtualScroll {
    constructor(container, items, itemHeight, bufferSize = 5) {
        this.container = container;
        this.items = items;
        this.itemHeight = itemHeight;
        this.bufferSize = bufferSize;
        this.totalHeight = itemHeight * items.length;

        this.setupContainer();
        this.render();
        this.container.addEventListener("scroll", () => this.handleScroll());
        this.ticking = false;
    }
    setupContainer() {
        this.container.style.height = "600px";
        this.container.style.overflow = "auto";
        this.container.style.position = "relative";

        this.content = document.createElement("div");
        this.content.style.height = `${this.totalHeight}px`;
        this.content.position = "relative";
        this.container.appendChild(this.content);
    }
    render() {
        const scrollTop = this.container.scrollTop;
        const viewportHeight = this.container.clientHeight;
        const startIndex = Math.max(
            0,
            Math.floor(scrollTop / this.itemHeight) - this.bufferSize
        );
        const visibleCount = Math.ceil(viewportHeight / this.itemHeight);
        const endIndex = Math.min(
            this.items.length - 1,
            startIndex + visibleCount + this.bufferSize * 2
        );
        this.content.innerHTML = "";
        const fragment = document.createDocumentFragment();
        for (let i = startIndex; i < endIndex; i++) {
            const item = createCard(
                this.items[i].id,
                this.items[i].title,
                this.items[i].description
            );
            fragment.appendChild(item);
        }
        this.content.append(fragment);
        this.content.style.transform = `translateY(${startIndex * this.itemHeight}px)`;
    }
    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.render();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
}

const container = document.querySelector(".container");
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
new VirtualScroll(container, itemArray, 400);
