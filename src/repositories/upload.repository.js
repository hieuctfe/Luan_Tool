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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var lodash_1 = require("lodash");
var repository_1 = require("../core/repository");
var Chance = require("chance");
var UploadRepository = /** @class */ (function (_super) {
    __extends(UploadRepository, _super);
    function UploadRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chance = new Chance();
        return _this;
    }
    UploadRepository.prototype.photo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadId, ruploadParams, name, contentLength, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadId = options.uploadId || Date.now();
                        ruploadParams = {
                            retry_context: JSON.stringify({ num_step_auto_retry: 0, num_reupload: 0, num_step_manual_retry: 0 }),
                            media_type: '1',
                            upload_id: uploadId.toString(),
                            xsharing_user_ids: JSON.stringify([]),
                            image_compression: JSON.stringify({ lib_name: 'moz', lib_version: '3.1.m', quality: '70' })
                        };
                        name = uploadId + "_0_-" + lodash_1.random(1000000000, 9999999999);
                        contentLength = options.file.byteLength;
                        return [4 /*yield*/, this.client.request.send({
                                url: "/rupload_igphoto/" + name,
                                method: 'POST',
                                headers: {
                                    X_FB_PHOTO_WATERFALL_ID: this.chance.guid(),
                                    'X-Entity-Type': 'image/jpeg',
                                    Offset: 0,
                                    'X-Instagram-Rupload-Params': JSON.stringify(ruploadParams),
                                    'X-Entity-Name': name,
                                    'X-Entity-Length': contentLength,
                                    'Content-Type': 'application/octet-stream',
                                    'Content-Length': contentLength,
                                    'Accept-Encoding': 'gzip'
                                },
                                body: options.file
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    return UploadRepository;
}(repository_1.Repository));
exports.UploadRepository = UploadRepository;
