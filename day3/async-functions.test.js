const obj = require("./async-functions.js");
jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("testing fetchJSOn", () => {
    const mockData = { id: 1, name: "Example" };
    test("mock fetch function success", async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            json: async () => mockData,
            ok: true,
        });
        const data = await obj.fetchJson("/example");
        expect(data).toEqual(mockData);
    });
    test("mock fetch http error", async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            json: async () => mockData,
            ok: false,
        });
        await expect(obj.fetchJson("/example")).rejects.toThrow("HTTP Error");
    });
});

describe("testing debounce", () => {
    test("execute just once", () => {
        const func = jest.fn(() => console.log("hello"));
        let debouncedFunc = obj.debounce(func);
        for (let i = 0; i < 10; i++) {
            debouncedFunc();
        }
        jest.runAllTimers();
        expect(func).toHaveBeenCalledTimes(1);
    });
});

describe("testing memoize function", () => {
    const func = jest.fn((x) => console.log(x));
    memoizedFunc = obj.memoize(func);
    test("calling with same arguments", () => {
        memoizedFunc(10);
        memoizedFunc(10);
        expect(func).toHaveBeenCalledTimes(1);
    });
    test("calling with different Arguments", () => {
        memoizedFunc(11);
        memoizedFunc(12);
        expect(func).toHaveBeenCalledTimes(2);
    });
});

describe("testing abort controller ", () => {
    test("timeout fires", async () => {
        let delay = 2000;
        let url = "https://jsonplaceholder.typicode.com/posts";
        const controller = new AbortController();
        let response = obj.fetchJson(url, {
            signal: controller.signal,
        });
        setTimeout(() => {
            controller.abort();
        }, delay);
        jest.advanceTimersByTime(delay);
        await expect(response).rejects.toThrow();
    });
});
