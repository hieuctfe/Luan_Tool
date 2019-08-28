"use strict";
exports.__esModule = true;
function Enumerable(value) {
    return function (target, key) {
        Object.defineProperty(target, key, {
            get: function () {
                return undefined;
            },
            set: function (val) {
                Object.defineProperty(this, key, {
                    value: val,
                    writable: true,
                    enumerable: value,
                    configurable: true
                });
            },
            enumerable: false
        });
    };
}
exports.Enumerable = Enumerable;
