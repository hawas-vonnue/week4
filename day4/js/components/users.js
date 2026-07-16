import { createRetryButton, fetchJson, showToast } from "../utils.js";
import { lightBox } from "./lightbox.js";
import { loadSkeletons, removeSkeletons } from "./skeleton.js";

export function renderUsers() {
    function createUserCard(id, name, role, address, specialises) {
        const userCard = document.createElement("div");
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = `https://picsum.photos/id/${id}/1000/1000`;
        const figCaptionElement = document.createElement("figcaption");
        const nameElement = document.createElement("h3");
        nameElement.textContent = name;
        figCaptionElement.appendChild(nameElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figCaptionElement);
        const roleElement = document.createElement("p");
        roleElement.textContent = role;
        const bioElement = document.createElement("p");
        bioElement.textContent = `${name} is a ${role} from ${address} and specialises in ${specialises}`;
        const socialIconsElement = document.createElement("div");
        socialIconsElement.classList.add("social-icons");
        socialIconsElement.innerHTML = ` <img
                  src=" https://img.icons8.com/?size=100&id=118468&format=png&color=000000"
                  alt="facebook icon"
                />
                <img
                  src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000"
                  alt="Twitter icon"
                />
                <img
                  src="https://img.icons8.com/?size=100&id=32292&format=png&color=000000"
                  alt="Insta icon"
                />`;
        userCard.appendChild(figureElement);
        userCard.appendChild(roleElement);
        userCard.appendChild(bioElement);
        userCard.appendChild(socialIconsElement);

        return userCard;
    }

    function loadUsers(url = "https://jsonplaceholder.typicode.com/users") {
        loadSkeletons();
        fetchJson(url).then(
            (response) => {
                let developersContainer = document.querySelector(
                    "#developers .container"
                );
                let designersContainer = document.querySelector(
                    "#designers .container"
                );
                response.forEach((element) => {
                    let userCard = createUserCard(
                        element.id,
                        element.name,
                        element.username,
                        element.address.street,
                        element.company.bs
                    );
                    if (element.id % 2 === 0) {
                        designersContainer.appendChild(userCard);
                    } else developersContainer.appendChild(userCard);
                });
                lightBox();
                removeSkeletons();
            },
            (error) => {
                const teamContainer = document.querySelector(".team");
                removeSkeletons();
                let retryButton = createRetryButton();
                retryButton.style.margin = "0px";
                teamContainer.appendChild(retryButton);
                retryButton.addEventListener("click", (event) => {
                    let url = "https://jsonplaceholder.typicode.com/users";
                    loadUsers(url);
                    retryButton.remove();
                });
            }
        );
    }
    loadUsers();
}
