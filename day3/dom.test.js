const userEvent = require("@testing-library/user-event").default;
const user = userEvent.setup();
require("@testing-library/jest-dom");
const FormValidator = require("./formvalidator.js");
const accordion = require("./accordion.js");
const nav = require("./nav.js");
const {
    tab,
} = require("@testing-library/user-event/dist/cjs/convenience/tab.js");

describe("test formValidator", () => {
    document.body.innerHTML = `<main>
    <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"/>
        <span></span>
    </form>
</main>`;
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    const span = document.querySelector("span");
    rules = {
        name: { required: true, minLength: 2, maxLength: 10 },
        email: { required: true, email: true },
    };
    const formValidator = new FormValidator(form, rules);
    test("check error message appear", () => {
        expect(() => {
            formValidator.validateAll();
        }).toThrow();
        expect(span.textContent).toEqual(expect.stringContaining("error"));
    });
    test("check if error message disappear", () => {
        input.value = "fadhil";
        formValidator.validateAll();
        expect(span.textContent).toEqual(expect.not.stringContaining("error"));
    });
});

describe("test accordion", () => {
    document.body.innerHTML = `
        <main>
            <div class="header"></div>
            <div class="panel"></div>
        </main>`;
    const header = document.querySelector(".header");
    const panel = document.querySelector(".panel");
    accordion(header, panel);
    header.click();
    test("aria-expanded to true", () => {
        expect(header.ariaExpanded).toBe("true");
    });
    test("panel become visible (max-height not zero)", () => {
        expect(panel.style.maxHeight).not.toBe("0px");
    });
});

describe("test mobile nav", () => {
    // function simulateTabFocusChange() {
    //     let query = `button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)`;
    //     let focusables0 = document.querySelectorAll(query);
    //     let focusables = [...focusables0];

    //     let isTabPressed = event.key === "Tab";
    //     if (isTabPressed) {
    //         if (event.shiftKey) {
    //             let activeElement = document.activeElement;
    //             let count = focusables.indexOf(activeElement);
    //             focusables[--count].focus();
    //         } else {
    //             let activeElement = document.activeElement;
    //             let count = focusables.indexOf(activeElement);
    //             console.log(count);
    //             focusables[++count].focus();
    //         }
    //     }
    // }
    document.body.innerHTML = `
        <main>
            <button class="hamburger"></button>
            <div class="drawer">
                <a href="" id="1"></a>
                <a href="" id="2"></a>
                <a href="" id="3"></a>
            </div>
            <button class="waste"></button>
        </main>`;
    const hamburger = document.querySelector(".hamburger");
    const drawer = document.querySelector(".drawer");
    const links = document.querySelectorAll("a");
    nav(hamburger, drawer);
    hamburger.click();

    test("drawer has class open", () => {
        expect(drawer.classList).toContain("open");
    });

    test("focus is trapped", async () => {
        // const tabEvent = new KeyboardEvent("keydown", {
        //     key: "Tab",
        //     code: "Tab",
        //     KeyCode: 9,
        //     bubbles: true,
        //     cancelable: true,
        // });
        // document.addEventListener("keydown", (event) => {
        //     simulateTabFocusChange();
        // });
        // drawer.dispatchEvent(tabEvent);
        // drawer.dispatchEvent(tabEvent);
        // drawer.dispatchEvent(tabEvent);
        links[0].focus();
        await user.tab();
        await user.tab();
        await user.tab();
        expect(links[0]).toHaveFocus();
    });
});
