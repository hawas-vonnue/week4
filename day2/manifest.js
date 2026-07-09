let installPrompt = null;
const installButton = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    console.log(event);
    installPrompt = event;
    installButton.removeAttribute("hidden");
});
installButton.addEventListener("click", async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    installPrompt = null;
    installButton.setAttribute("hidden", "");
});
