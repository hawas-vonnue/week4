let width = 1850;
let height = 290;
let barGraphWidth = 40;
let barGraphHeight = 250;
const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.borderBoxSize) {
            const barGraphs = document.querySelectorAll(".chart .barGraph");
            barGraphs.forEach((barGraph) => {
                barGraph.style.width = `
                    ${
                        barGraphWidth *
                        (entry.borderBoxSize[0].inlineSize / width)
                    }px`;
                barGraph.style.height = `${(barGraphHeight * entry.borderBoxSize[0].blockSize) / height}px`;
            });
        }
    });
});
const chartElement = document.querySelector(".chart");
observer.observe(chartElement);
const isTabletOrMore = window.matchMedia("(min-width: 768px)");
isTabletOrMore.addEventListener("change", (event) => {
    if (isTabletOrMore.matches) console.log("Crossed 768px");
});
const isLaptop = window.matchMedia("(min-width: 1024px)");
isLaptop.addEventListener("change", (event) => {
    if (isLaptop.matches) console.log("Crossed 1024px");
});
