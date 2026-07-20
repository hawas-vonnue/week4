export function renderSettingsPage() {
    const documentFragment = document.createDocumentFragment();
    const settingsContainer = document.createElement("div");
    settingsContainer.classList.add("settingsContainer");
    const loginButton = document.createElement("button");
    loginButton.textContent = "Login";
    loginButton.classList.add("settingButton");
    const createUserButton = document.createElement("button");
    createUserButton.textContent = "Create User";
    createUserButton.classList.add("settingButton");
    const changeUserNameButton = document.createElement("button");
    changeUserNameButton.textContent = "Change user name";
    changeUserNameButton.classList.add("settingButton");
    const deleteAccountButton = document.createElement("button");
    deleteAccountButton.textContent = "Delete Account";
    deleteAccountButton.classList.add("settingButton");
    const resetSettingsButton = document.createElement("button");
    resetSettingsButton.textContent = "Reset Settings";
    resetSettingsButton.classList.add("settingButton");
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
