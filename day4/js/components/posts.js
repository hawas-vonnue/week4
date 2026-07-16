import { createRetryButton, fetchJson, showToast } from "../utils.js";
import { loadSkeletons, removeSkeletons } from "./skeleton.js";

export function fetchPosts() {
    function createServiceCard(heading, message) {
        const serviceCard = document.createElement("div");
        serviceCard.classList.add("service-card");
        const headingElement = document.createElement("h2");
        headingElement.textContent = heading;
        const messageElement = document.createElement("p");
        messageElement.textContent = message;
        serviceCard.appendChild(headingElement);
        serviceCard.appendChild(messageElement);

        return serviceCard;
    }

    function loadPosts(url = "https://jsonplaceholder.typicode.com/posts") {
        loadSkeletons();
        const containerElement = document.querySelector(".container");
        fetchJson(url).then(
            (response) => {
                response.forEach((element) => {
                    let serviceCard = createServiceCard(
                        element.title,
                        element.body
                    );
                    containerElement.appendChild(serviceCard);
                });
                removeSkeletons();
            },
            (error) => {
                removeSkeletons();
                const parentContainer = document.querySelector(".parent");
                let retryButton = createRetryButton();
                retryButton.style.position = "relative";
                retryButton.style.left = "50%";
                parentContainer.appendChild(retryButton);
                retryButton.addEventListener("click", (event) => {
                    let url = "https://jsonplaceholder.typicode.com/posts";
                    loadPosts(url);
                    retryButton.remove();
                });
            }
        );
    }
    loadPosts();
}
