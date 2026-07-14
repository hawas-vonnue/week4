function openDrawer(hamburger, drawer) {
    hamburger.onclick = (event) => {
        if (drawer.ariaExpanded === "true") {
            drawer.classList.remove("open");
            drawer.ariaExpanded = "false";
        } else {
            drawer.classList.add("open");
            drawer.ariaExpanded = "true";
        }
    };
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            drawer.classList.remove("open");
            drawer.ariaExpanded = "false";
        }
    });
    drawer.addEventListener("keydown", (event) => {
        let query = ".drawer a[href]:not([disabled])";
        let focusables = document.querySelectorAll(query);
        let firsFocusable = focusables[0];
        let lastFocusable = focusables[focusables.length - 1];
        let isTabPressed = event.key === "Tab";
        if (isTabPressed) {
            if (event.shiftKey) {
                if (document.activeElement === firsFocusable) {
                    lastFocusable.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firsFocusable.focus();
                    event.preventDefault();
                }
            }
        }
    });
}

module.exports = openDrawer;
