export function renderSettingsPage() {
    const documentFragment = document.createElement("div");
    const settingsContainer = document.createElement("div");
    const loginButton = document.createElement("button");
    const createUserButton = document.createElement("button");
    const changeUserNameButton = document.createElement("button");
    const deleteAccountButton = document.createElement("button");
    const resetSettingsButton = document.createElement("button");

    documentFragment.classList.add("settings");
    settingsContainer.classList.add("settingsContainer");
    loginButton.classList.add("settingButton");
    createUserButton.classList.add("settingButton");
    changeUserNameButton.classList.add("settingButton");
    deleteAccountButton.classList.add("settingButton");
    resetSettingsButton.classList.add("settingButton");

    loginButton.textContent = "Login";
    createUserButton.textContent = "Create User";
    changeUserNameButton.textContent = "Change user name";
    deleteAccountButton.textContent = "Delete Account";
    resetSettingsButton.textContent = "Reset Settings";

    settingsContainer.append(
        loginButton,
        createUserButton,
        changeUserNameButton,
        deleteAccountButton,
        resetSettingsButton
    );
    documentFragment.append(settingsContainer);

    const mainElement = document.querySelector("main");

    mainElement.innerHTML = "";
    mainElement.append(documentFragment);
}
