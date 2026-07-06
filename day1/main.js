import { init as navInit } from "./components/nav.js";
import { init as darkModeInit } from "./components/darkMode.js";
import { init as accordionInit } from "./components/accordion.js";
import { lightBox } from "./components/lightbox.js";
import { scrollAnimation } from "./components/scroll.js";
import { progressBar } from "./components/progress.js";
import { FormValidator } from "./components/validator.js";
import { rules } from "./components/validator.js";
import { showToast } from "./utils.js";
import { fetchPosts } from "./components/posts.js";
import { searchFunction } from "./components/search.js";
import { renderUsers } from "./components/users.js";
import { renderRecentPosts } from "./components/recentPosts.js";

window.onload = (event) => {
    darkModeInit();
    navInit();
    accordionInit();
    if (window.location.href.includes("team.html")) {
        renderUsers();
    }
    if (window.location.href.includes("index.html")) {
        scrollAnimation();
        renderRecentPosts();
    }
    const backToTopButton = document.querySelector(".back-to-top");
    window.addEventListener("scroll", () => {
        if (scrollY >= 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });
    backToTopButton.addEventListener("click", (event) => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
    progressBar("index.html");
    if (window.location.href.includes("contact.html")) {
        const form = document.querySelector("form");
        const formValidator = new FormValidator(form, rules);
        const spinner = document.querySelector(".spinnerContainer");
        const submitButton = document.querySelector("#submitButton");
        form.addEventListener(
            "blur",
            (event) => {
                event.preventDefault();
                formValidator.validate(event.target);
            },
            true
        );
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            submitButton.style.display = "none";
            spinner.style.display = "inline-block";
            setTimeout(() => {
                let flag = formValidator.validateAll();
                submitButton.style.display = "revert";
                spinner.style.display = "none";
                if (flag === 1) showToast("Error", 7, "error");
                else {
                    showToast("success", 7, "success");
                    form.reset();
                    const fields = form.querySelectorAll("input,textarea");
                    fields.forEach((field) => {
                        field.classList.remove("is-valid");
                    });
                }
            }, 1500);
        });
    }
    if (window.location.href.includes("services.html")) {
        fetchPosts();
        searchFunction();
    }
};
