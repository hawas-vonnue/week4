const utilities = require("./utilities.js");

test("chunk-happy path:chunks of size two ", () => {
    let arr = [1, 2, 3, 4];
    let result = [
        [1, 2],
        [3, 4],
    ];
    expect(utilities.chunk(arr, 2)).toStrictEqual(result);
});

test("chunk-edge case: chunk size greater than array size", () => {
    let arr = [1, 2];
    let result = [[1, 2]];
    expect(utilities.chunk(arr, 3)).toEqual(result);
});

test("chunk-error case:chunk size zero", () => {
    let arr = [1, 2, 3, 4];
    expect(utilities.chunk(arr, 0)).toBeFalsy();
});

test("zip-happy path:zip two arrays", () => {
    let arr1 = [1, 2];
    let arr2 = [3, 4];
    let result = [
        [1, 3],
        [2, 4],
    ];
    expect(utilities.zip(arr1, arr2)).toStrictEqual(result);
});

test("zip-edge case:one array empty", () => {
    let arr1 = [1, 2];
    let arr2 = [];
    let result = [[1], [2]];
    expect(utilities.zip(arr1, arr2)).toEqual(result);
});

test("zip-error case:one undefined array", () => {
    let arr1 = [1, 2];
    let arr2;
    expect(() => {
        utilities.zip(arr1, arr2);
    }).toThrow();
});

test("groupBy-happy path:group by age", () => {
    let arr = [10, 20, 30, 40];
    let result = { child: [10], adult: [20, 30, 40] };
    expect(
        utilities.groupBy(arr, (age) => {
            if (age < 18) return "child";
            else return "adult";
        })
    ).toStrictEqual(result);
});

test("groupBy-edge case:one not in any group", () => {
    let arr = [10, 30, 60];
    let result = { child: [10], young: [30] };
    expect(
        utilities.groupBy(arr, (age) => {
            if (age < 18) return "child";
            else if (age < 40) return "young";
        })
    ).toStrictEqual(result);
});

test("groupBy-error case:the array is empty", () => {
    let arr = [];
    let result = {};
    expect(
        utilities.groupBy(arr, (age) => {
            if (age < 18) return "child";
            else return "adult";
        })
    ).toStrictEqual(result);
});

test("pipe-happy path:pipe double and addOne", () => {
    expect(
        utilities.pipe(
            (a) => 2 * a,
            (a) => a + 1
        )(2)
    ).toBe(5);
});

test("pipe-edge case:0 functions to pipe", () => {
    expect(utilities.pipe()).toBeFalsy();
});

test("pipe-error case:function doesnt have a return value", () => {
    expect(
        utilities.pipe(
            (a) => console.log("hello"),
            (b) => console.log("hii")
        )(10)
    ).toBeFalsy();
});

test("compose-happy path:pipe double and addOne", () => {
    expect(
        utilities.compose(
            (a) => 2 * a,
            (a) => a + 1
        )(2)
    ).toBe(6);
});

test("compose-edge case:0 functions to pipe", () => {
    expect(utilities.compose()).toBeFalsy();
});

test("compose-error case:function doesnt have a return value", () => {
    expect(
        utilities.compose(
            (a) => console.log("hello"),
            (b) => console.log("hii")
        )(10)
    ).toBeFalsy();
});

test("curry-happy path:add three function", () => {
    expect(utilities.curry((x, y, z) => x + y + z)(1)(2)(3)).toBe(6);
});

test("curry-edge case:give zero arguments then all three arguments", () => {
    expect(utilities.curry((x, y, z) => x + y + z)()(1, 2, 3)).toBe(6);
});

test("curry-error case:pass an function with no arguments", () => {
    expect(utilities.curry(() => "Greetings world")()).toBe("Greetings world");
});

test("partial-happy path:first argument of addThree as one", () => {
    expect(utilities.partial((x, y, z) => x + y + z, 1)(4, 5)).toBe(10);
});

test("partial-edge case:calling with more arguments than expected", () => {
    expect(utilities.partial((x, y, z) => x + y + z, 1, 2, 3)(4)).toBe(6);
});

test("partial-error case:calling with less arguments than expected", () => {
    expect(() => {
        utilities.partial((x, y, z) => x + y + z, 1)(4);
    }).toThrow();
});

//to use toBeTruthy,toContain,toHaveLength,toBeCloseTo
test("tobeTruthy:check if it is odd", () => {
    expect(utilities.isOdd(3)).toBeTruthy();
});

test("toContain:check if it contains", () => {
    expect([1, 2, 3]).toContain(3);
});

test("toHaveLength:check if it has length", () => {
    arr = [1];
    expect(arr).toHaveLength(1);
});

test("toBeCloseTo:check with floating values", () => {
    expect(0.2 + 0.1).toBeCloseTo(0.3);
});
