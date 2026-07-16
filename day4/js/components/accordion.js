export function init(button, content) {
    const faqs = document.querySelectorAll(".faqSection .faq");
    faqs.forEach((faq) => {
        const questionElement = faq.querySelector(".question");
        const answerElement = faq.querySelector(".answer");
        accordion(questionElement, answerElement);
    });
    function accordion(button, content) {
        content.style.maxHeight = "0px";
        content.classList.remove("open");
        content.style.overflow = "hidden";
        if (button.tabIndex === -1) {
            button.tabIndex = 0;
        }

        function toggle() {
            content.classList.toggle("open");
            if (content.classList.contains("open")) {
                button.ariaExpanded = "true";
                content.style.maxHeight = "500px";
            } else {
                button.ariaExpanded = "false";
                content.style.maxHeight = "0px";
            }
        }
        button.addEventListener("click", () => {
            toggle();
        });
        window.addEventListener("keydown", (event) => {
            if (document.activeElement !== button) return;
            if (event.code === "Enter") {
                toggle();
            }
        });
    }
}
