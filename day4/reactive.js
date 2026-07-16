const state = {};
const inputSpan = document.querySelector("#nameSpan");
const emailSpan = document.querySelector("#emailSpan");

const handler = {
    get(target, property) {
        console.log(`getting ${property}:${target[property]}`);
        return target[property];
    },
    set(target, property, value) {
        console.log(`setting ${property} to ${value}`);
        if (property === "name") inputSpan.textContent = value;
        if (property === "email") emailSpan.textContent = value;
        target[property] = value;
    },
    deleteProperty(target, prop) {
        if (prop in target) {
            delete target[prop];
            console.log(`property ${prop} deleted`);
        }
    },
};
const proxy = new Proxy(state, handler);
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
nameInput.addEventListener("change", (event) => {
    proxy["name"] = event.target.value;
});
emailInput.addEventListener("change", () => {
    proxy["email"] = event.target.value;
});
