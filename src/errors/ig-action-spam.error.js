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
var ig_response_error_1 = require("./ig-response.error");
var IgActionSpamError = /** @class */ (function (_super) {
    __extends(IgActionSpamError, _super);
    function IgActionSpamError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IgActionSpamError.prototype, "expirationDate", {
        get: function () {
            var date = this.response.body.feedback_message.match(/(\d{4}-\d{2}-\d{2})/);
            if (date === null) {
                return null;
            }
            return date[0];
        },
        enumerable: true,
        configurable: true
    });
    return IgActionSpamError;
}(ig_response_error_1.IgResponseError));
exports.IgActionSpamError = IgActionSpamError;
