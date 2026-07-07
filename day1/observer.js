const images = document.querySelectorAll(".images .card img");
const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.getAttribute("data-src");
        }
    });
});
images.forEach((image) => {
    intersectionObserver.observe(image);
});
const cards = document.querySelectorAll(".images .card");
const headerElement = document.querySelector("header");
//header - height of section heading
const margin =
    headerElement.offsetHeight -
    document.querySelector(".card h2").offsetHeight;
const intersectionObserver2 = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                headerElement.textContent =
                    entry.target.getAttribute("data-title");
                if (entry.target.classList.contains("counter")) {
                    requestAnimationFrame(update);
                }
            }
        });
    },
    {
        threshold: 1,
        rootMargin: `${margin}px`,
    }
);
cards.forEach((card) => {
    intersectionObserver2.observe(card);
});
const counterElement = document.querySelector(".counter");
let target = 1000;
let start;

function update(timestamp) {
    if (start === undefined) start = timestamp;
    let elapsed = timestamp - start;
    let count = Math.floor(Math.min((target / 2000) * elapsed, target));
    counterElement.textContent = count;
    if (elapsed < 2000) {
        requestAnimationFrame(update);
    }
}
