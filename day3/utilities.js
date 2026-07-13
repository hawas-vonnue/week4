function chunk(arr, size) {
    const chunkedArray = [];
    if (size <= 0) {
        return null;
    }
    for (let i = 0; i < arr.length; i = i + size) {
        let index = i + size;
        chunkedArray.push(arr.slice(i, index));
    }
    return chunkedArray;
}

function zip(...arrays) {
    const maxLength = Math.max(
        ...arrays.map((a) => {
            if (a === undefined) throw new Error("undefined array");
            return a.length;
        })
    );
    let zipArray = Array.from({ length: maxLength }, (_, i) =>
        arrays.map((a) => {
            return a[i];
        })
    );
    return zipArray;
}

function groupBy(arr, keyfn) {
    const newGroup = {};
    for (const element of arr) {
        const key = keyfn(element);
        if (key === undefined) continue;
        if (!newGroup[key]) newGroup[key] = [];
        newGroup[key].push(element);
    }
    return newGroup;
}

function pipe(...fns) {
    if (fns.length === 0) return null;
    return function (x) {
        let value = x;
        fns.forEach((func) => {
            value = func(value);
        });
        return value;
    };
}

function compose(...fns) {
    if (fns.length === 0) return null;
    return function (x) {
        let value = x;
        for (let i = fns.length - 1; i >= 0; i--) {
            value = fns[i](value);
        }
        return value;
    };
}

function curry(fn) {
    return function carried(...args) {
        if (fn.length <= args.length) {
            return fn.apply(this, args);
        } else {
            return function (...args2) {
                return carried.apply(this, args.concat(args2));
            };
        }
    };
}

function partial(fn, ...presetArgs) {
    return function partitioned(...args) {
        if (args.length + presetArgs.length < fn.length)
            throw new Error("Number of parameter exceeds");

        return fn.apply(this, presetArgs.concat(args));
    };
}

function isOdd(num) {
    return num % 2 === 1 ? true : false;
}

module.exports = {
    chunk,
    zip,
    groupBy,
    pipe,
    compose,
    curry,
    partial,
    isOdd,
};
