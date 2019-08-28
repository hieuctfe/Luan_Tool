"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ts_custom_error_1 = require("ts-custom-error");
var IgClientError = /** @class */ (function (_super) {
    __extends(IgClientError, _super);
    function IgClientError(message) {
        var _newTarget = this.constructor;
        if (message === void 0) { message = 'Instagram API error was made.'; }
        var _this = _super.call(this, message) || this;
        // Fix for ts-custom-error. Otherwise console.error will show JSON instead of just stack trace
        Object.defineProperty(_this, 'name', {
            value: _newTarget.name,
            enumerable: false
        });
        return _this;
    }
    return IgClientError;
}(ts_custom_error_1.CustomError));
exports.IgClientError = IgClientError;
