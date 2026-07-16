export function searchFunction() {
    let searchInput = document.querySelector(".search input");
    let timer;
    let serviceCardsContainer = document.querySelector(".container");

    function search() {
        const serviceCards = document.querySelectorAll(
            ".container .service-card"
        );
        let serviceCardsContainer = document.querySelector(".container");
        const notFound = document.querySelector(".not-found");
        let searchInput = document.querySelector(".search input");
        const searchValue = searchInput.value.trim();
        const regex = new RegExp(searchValue, "gi");
        let text;
        for (const serviceCard of serviceCards) {
            serviceCard.style.display = "revert";
            text = serviceCard.innerHTML;
            text = text.replace(/(<span class="highlight">|<\/span>)/gim, "");
            serviceCard.innerHTML = text;
        }
        notFound.style.display = "none";
        let count = 0;
        for (const serviceCard of serviceCards) {
            if (!serviceCard.innerText.toLowerCase().includes(searchValue)) {
                serviceCard.style.display = "none";
                count++;
            } else {
                text = serviceCard.innerHTML;
                const newText = text.replace(
                    regex,
                    '<span class="highlight">$&</span>'
                );
                if (searchValue !== "") serviceCard.innerHTML = newText;
            }
        }
        if (count === serviceCards.length) {
            notFound.style.display = "inline-block";
        }
    }
    searchInput.addEventListener("keyup", (event) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            search();
            let searchValue = document
                .querySelector(".search input")
                .value.trim();
            history.pushState(
                {
                    innerHtml: serviceCardsContainer.innerHTML,
                    value: searchValue,
                },
                "",
                `?value=${searchValue}`
            );
        }, 300);
    });
    searchInput.addEventListener("input", (event) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            search();
            let searchValue = document
                .querySelector(".search input")
                .value.trim();
            history.pushState(
                {
                    innerHtml: serviceCardsContainer.innerHTML,
                    value: searchValue,
                },
                "",
                `?value=${searchValue}`
            );
        }, 300);
    });
    window.addEventListener("popstate", (event) => {
        if (event.state) {
            document.querySelector(".container").innerHTML =
                event.state.innerHtml;
            document.querySelector(".search input").value = event.state.value;
        }
    });
    let params = new URLSearchParams(document.location.search);
    let searchValue = params.get("value");
    if (searchValue) {
        document.querySelector(".search input").value = searchValue;
        search();
    }
    history.replaceState(
        { innerHtml: serviceCardsContainer.innerHTML, value: "" },
        "",
        document.location.href
    );
}
