const blogElements = document.querySelectorAll(".card");
const overlayElement = document.querySelector(".overlay");
const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animation");
        } else {
            entry.target.classList.remove("animation");
        }
    });
});
blogElements.forEach((blog) => {
    intersectionObserver.observe(blog);
});

function createArticle(heading, description) {
    const articleElement = document.createElement("article");
    articleElement.classList.add("card");
    const headerElement = document.createElement("header");
    headerElement.textContent = heading;
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    articleElement.append(headerElement, descriptionElement);

    return articleElement;
}
const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            for (let node of mutation.addedNodes) {
                intersectionObserver.observe(node);
            }
            console.log(mutation);
            if (mutation.addedNodes.length !== 0) {
                for (const node of mutation.addedNodes) {
                    overlayElement.textContent += `added:${node.nodeName}\n`;
                }
            }
            if (mutation.removedNodes.length !== 0) {
                for (const node of mutation.removedNodes) {
                    overlayElement.textContent += `removed:${node.nodeName}\n`;
                }
            }
        }
        if (mutation.type === "attributes") {
            console.log(mutation);
            overlayElement.textContent += `attribute "${mutation.attributeName}" changed\n`;
        }
    }
});
const parentContainer = document.querySelector(".mainContent");
observer.observe(parentContainer, config);

function addArticle(heading, description) {
    let article = createArticle(heading, description);
    parentContainer.appendChild(article);
}
addArticle(
    "hello this is heading",
    `There seem to be a lot of people who just assume that faster means better. There's this thing that used to take me 1 hour. Now, thanks to this magic tool, I can do it in 10 minutes.This perspective can be problematic when you've not fully internalized purpose of a process. for example,if I could write an essay like this one in two minutes instead of an hour or two ,it would in many cased be worse for me. Because I wouldn't struggle through manual re-writes, through editing, through deleting , through re-organizing. I would lose out on the benefits of the process. Now you may be thinking:"What's so bad about losing out on the process?Are you saying we should not make anything more efficient? I do not see you going out to the well to get your water."`
);
setTimeout(() => {
    addArticle(
        "hello this is heading",
        `There seem to be a lot of people who just assume that faster means better. There's this thing that used to take me 1 hour. Now, thanks to this magic tool, I can do it in 10 minutes.This perspective can be problematic when you've not fully internalized purpose of a process. for example,if I could write an essay like this one in two minutes instead of an hour or two ,it would in many cased be worse for me. Because I wouldn't struggle through manual re-writes, through editing, through deleting , through re-organizing. I would lose out on the benefits of the process. Now you may be thinking:"What's so bad about losing out on the process?Are you saying we should not make anything more efficient? I do not see you going out to the well to get your water."`
    );
}, 3000);
