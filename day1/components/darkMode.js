export function init() {
    let toggleElement = document.querySelector("#checkbox");
    const imageElement = document.querySelector(".toggle img");
    const bodyElement = document.getElementsByTagName("html")[0];
    toggleElement.addEventListener("click", function (event) {
        if (this.ariaPressed === "true") {
            this.ariaPressed = "false";
            imageElement.src = `https://img.icons8.com/?size=100&id=26VZRBiScXoN&format=png&color=000000`;
            bodyElement.setAttribute("data-theme", "light");
            localStorage.setItem("data-theme", "light");
        } else {
            this.ariaPressed = "true";
            imageElement.src = `https://img.icons8.com/?size=100&id=HpcvnWPxS15j&format=png&color=000000`;
            bodyElement.setAttribute("data-theme", "dark");
            localStorage.setItem("data-theme", "dark");
        }
    });
    let theme = localStorage.getItem("data-theme");
    if (theme === null) {
        const systemSettingDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );
        if (systemSettingDark.matches) {
            theme = "dark";
            imageElement.src = `https://img.icons8.com/?size=100&id=HpcvnWPxS15j&format=png&color=000000`;
            localStorage.setItem("data-theme", "dark");
            bodyElement.setAttribute("data-theme", "dark");
        }
    } else {
        if (theme === "dark") {
            imageElement.src = `https://img.icons8.com/?size=100&id=HpcvnWPxS15j&format=png&color=000000`;
            bodyElement.setAttribute("data-theme", "dark");
        } else {
            imageElement.src = `https://img.icons8.com/?size=100&id=26VZRBiScXoN&format=png&color=000000`;
        }
    }
    if (theme === "dark") {
        toggleElement.ariaPressed = "true";
    }
}
