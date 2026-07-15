function accordion(button, content) {
    content.style.maxHeight = "0px";
    content.classList.remove("open");
    content.style.maxHeight = "0px";
    content.style.overflow = "hidden";
    if (button.tabIndex === -1) {
        button.tabIndex = 0;
    }

    function toggle() {
        content.classList.toggle("open");
        if (content.classList.contains("open")) {
            button.ariaExpanded = "true";
            content.style.maxHeight = "500px";
            content.style.display = "none";
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

module.exports = accordion;
