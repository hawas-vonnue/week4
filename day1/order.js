function pipe(...fns) {
    return function (x) {
        let value = x;
        fns.forEach((func) => {
            value = func(value);
        });
        return value;
    };
}

function double(x) {
    return 2 * x;
}

function addOne(x) {
    return x + 1;
}
console.log("pipe:");
console.log(pipe(double, addOne)(5));
console.log(pipe(addOne, addOne, addOne)(5));
console.log(pipe(double, addOne, double, addOne)(3));

function compose(...fns) {
    return function (x) {
        let value = x;
        for (let i = fns.length - 1; i >= 0; i--) {
            value = fns[i](value);
        }
        return value;
    };
}
console.log("compose:");
console.log(compose(double, addOne)(5));
console.log(compose(addOne, addOne, addOne)(5));
console.log(compose(double, addOne, double, addOne)(3));

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

function addThree(x, y, z) {
    return x + y + z;
}
console.log("curry:");
console.log(curry(addThree)(1)(2)(3));
console.log(curry(addThree)(10)(20)(30));
console.log(curry(addThree)(61)(52)(43));

function partial(fn, ...presetArgs) {
    return function partitioned(...args) {
        return fn.apply(this, presetArgs.concat(args));
    };
}
console.log("partial:");
let add1 = partial(addThree, 1, 2);
console.log(add1(1));
let add2 = partial(addThree, 1);
console.log(add2(2, 1));
let add3 = partial(addThree);
console.log(add3(1, 2, 1));
