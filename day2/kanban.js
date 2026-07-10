import { IndexedDB } from "./offline.js";

let selectedTask = "";
let currentColumn = 0;
let obj;

async function init() {
    obj = new IndexedDB("tables", 1);
    await obj.openDB("html", { keyPath: "id" });
}
init().then(() => {
    async function updateInnerHtml() {
        for (const column of columns) {
            await obj.updateRecord({
                id: column.className,
                html: column.innerHTML,
            });
        }
    }
    const columns = document.querySelectorAll(".column");
    columns.forEach((column) => {
        column.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
        column.addEventListener("dragstart", (event) => {
            event.target.id = "dragged";
            event.dataTransfer.setData("id", event.target.id);
        });
        column.addEventListener("dragend", (event) => {
            event.target.removeAttribute("id");
        });
        column.addEventListener("drop", (event) => {
            const currentElement = event.currentTarget;
            const id = event.dataTransfer.getData("id");
            const element = document.getElementById(id);
            currentElement.appendChild(element);
            event.currentTarget.classList.remove("dragon");
            updateInnerHtml().then(() => console.log("this is finished"));
        });
        column.addEventListener("dragenter", (event) => {
            event.currentTarget.classList.add("dragon");
        });
        column.addEventListener("dragleave", (event) => {
            event.currentTarget.classList.remove("dragon");
        });
    });
    window.addEventListener("keydown", (event) => {
        if (document.activeElement.className !== "task") return;
        if (event.code === "Space") {
            event.preventDefault();
            document.activeElement.id = "dragged";
            selectedTask = document.activeElement.id;
        }
        if (event.code === "ArrowRight") {
            let currentColumnClass =
                document.activeElement.parentElement.className;
            columns[currentColumn].classList.remove("dragon");
            currentColumn = (((currentColumn + 1) % 3) + 3) % 3;
            const column = columns[currentColumn];
            column.classList.add("dragon");
        }
        if (event.code === "ArrowLeft") {
            let currentColumnClass =
                document.activeElement.parentElement.className;
            columns[currentColumn].classList.remove("dragon");
            currentColumn = (((currentColumn - 1) % 3) + 3) % 3;
            const column = columns[currentColumn];
            column.classList.add("dragon");
        }
    });
    window.addEventListener("keyup", (event) => {
        if (document.activeElement.className !== "task") return;
        if (event.code === "Space") {
            event.preventDefault();
            const element = document.getElementById(selectedTask);
            const column = columns[currentColumn];
            column.appendChild(element);
            column.classList.remove("dragon");
            updateInnerHtml();
        }
    });
    const buttons = document.querySelectorAll(".create button");
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            addTask(event);
        });
        button.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                event.preventDefault();
            }
        });
    });

    async function deleteTask() {
        const element = event.target.parentElement;
        const parent = element.parentElement;
        element.remove();
        await obj.updateRecord({
            id: parent.className,
            html: parent.innerHTML,
        });
    }

    async function addTask(event) {
        const task = document.createElement("span");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        task.textContent = event.target.previousElementSibling.value;
        task.setAttribute("draggable", true);
        task.appendChild(deleteButton);
        task.tabIndex = 0;
        task.classList.add("task");
        const tasksElement =
            event.target.parentElement.parentElement.querySelector(".column");
        tasksElement.appendChild(task);
        const input = event.target.previousElementSibling;
        input.value = "";
        update();
        await updateInnerHtml();
    }

    function update() {
        const deleteButtons = document.querySelectorAll(".column span button");
        deleteButtons.forEach((deleteButton) => {
            deleteButton.addEventListener("click", (event) => {
                deleteTask(event);
            });
        });
    }

    async function getValues() {
        let first = await obj.getRecord("column todo");
        if (first !== undefined) {
            columns[0].innerHTML = first.html;
        }
        let second = await obj.getRecord("column progress");
        if (second !== undefined) {
            columns[1].innerHTML = second.html;
        }
        let third = await obj.getRecord("column done");
        if (third !== undefined) {
            columns[2].innerHTML = third.html;
        }
    }
    getValues().then(() => {
        update();
    });
    window.addEventListener("online", (event) => {
        obj.getAllRecords().then((records) => {
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify(records),
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
        });
    });
});
