import { createRetryButton, fetchJson } from "../utils.js";
import { loadSkeletons, removeSkeletons } from "./skeleton.js";

export function renderRecentPosts() {
    function createPostCard(heading, message) {
        const serviceCard = document.createElement("div");
        serviceCard.classList.add("post");
        const headingElement = document.createElement("h2");
        headingElement.textContent = heading;
        const messageElement = document.createElement("p");
        messageElement.textContent = message;
        serviceCard.appendChild(headingElement);
        serviceCard.appendChild(messageElement);

        return serviceCard;
    }

    function loadRecentPosts(
        url = "https://jsonplaceholder.typicode.com/posts"
    ) {
        const containerElement = document.querySelector(".recentPosts");
        loadSkeletons();
        fetchJson(url).then(
            (response) => {
                const lastThree = response.slice(-3);
                lastThree.forEach((element) => {
                    let postCard = createPostCard(element.title, element.body);
                    containerElement.appendChild(postCard);
                });
                removeSkeletons();
            },
            (error) => {
                removeSkeletons();
                const recentPostsContainer = document.querySelector(
                    ".recentPostsContainer"
                );
                const retryButton = createRetryButton();
                retryButton.style.left = "50%";
                retryButton.style.position = "relative";
                recentPostsContainer.appendChild(retryButton);
                retryButton.addEventListener("click", () => {
                    let url = "https://jsonplaceholder.typicode.com/posts";
                    loadRecentPosts(url);
                    retryButton.remove();
                });
            }
        );
    }
    loadRecentPosts();
}
