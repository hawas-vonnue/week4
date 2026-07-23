import { describe } from "node:test";
import { createStore } from "../util.js";

describe("state manager test", () => {
    const initialstate = {
        text: "",
    };
    let reducer = jest.fn().mockImplementationOnce((state, action) => {
        state.text = action.payload;
        return state;
    });
    const store1 = createStore(initialstate, reducer);
    let payload = "hello world";
    let fn = jest.fn(() => {
        console.log("hi hello");
    });
    function onChange(payload) {
        store1.dispatch({ payload, type: "test" });
    }
    test("dispatch action calles subscriber", () => {
        store1.subscribe("test", fn);
        onChange(payload);
        expect(fn).toHaveBeenCalled();
        expect(store1.getState().text).toBe("hello world");
    });
});
