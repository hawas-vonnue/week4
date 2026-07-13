const obj = require("./event.js");

describe("testing emitter", () => {
    test("event emitter listener mocking", () => {
        const listener1 = jest.fn((x) => console.log(x));
        obj.emitter.on("listener1", listener1);
        let argument = "this is the argument";
        obj.emitter.emit("listener1", argument);
        expect(listener1).toHaveBeenCalledWith(argument);
    });
});

describe("testing fetchJSOn", () => {
    const mockData = { id: 1, name: "Example" };
    test("mock fetch function success", async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            json: async () => mockData,
            ok: true,
        });
        const data = await obj.fetchJson("/example");
        expect(data).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith("/example");
    });
    test("mock fetch http error", async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            json: async () => mockData,
            ok: false,
        });
        await expect(obj.fetchJson("/example")).rejects.toThrow("HTTP Error");
    });
    test("mock network failure", async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce(
            Promise.reject(new Error("fetch failed"))
        );
        await expect(obj.fetchJson("/example")).rejects.toThrow("fetch failed");
    });
});

describe("testing retry logic", () => {
    const retry = jest.fn(() => {
        return Promise.resolve(10);
    });
    test("first", () => {
        retry.mockImplementationOnce(() => {
            return Promise.reject("implemented error");
        });
        expect(retry()).rejects.toEqual("implemented error");
    });
    test("second try", () => {
        expect(retry()).resolves.toBe(10);
    });
});
