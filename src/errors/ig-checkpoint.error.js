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
var IgCheckpointError = /** @class */ (function (_super) {
    __extends(IgCheckpointError, _super);
    function IgCheckpointError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IgCheckpointError.prototype, "url", {
        get: function () {
            return this.response.body.challenge.url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IgCheckpointError.prototype, "apiUrl", {
        get: function () {
            return 'https://i.instagram.com/api/v1' + this.response.body.challenge.api_path;
        },
        enumerable: true,
        configurable: true
    });
    return IgCheckpointError;
}(ig_response_error_1.IgResponseError));
exports.IgCheckpointError = IgCheckpointError;
