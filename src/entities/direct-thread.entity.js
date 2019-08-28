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
var urlRegex = require("url-regex");
var entity_1 = require("../core/entity");
var DirectThreadEntity = /** @class */ (function (_super) {
    __extends(DirectThreadEntity, _super);
    function DirectThreadEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.threadId = null;
        _this.userIds = null;
        return _this;
    }
    DirectThreadEntity.prototype.broadcastText = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var urls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urls = text.match(urlRegex({ strict: false }));
                        if (urls instanceof Array) {
                            return [2 /*return*/, this.broadcastLink(text, urls)];
                        }
                        return [4 /*yield*/, this.broadcast({
                                item: 'text',
                                form: {
                                    text: text
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.broadcastLink = function (link_text, link_urls) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.broadcast({
                            item: 'link',
                            form: {
                                link_text: link_text,
                                link_urls: JSON.stringify(link_urls)
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.broadcastPhoto = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var upload_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.upload.photo({
                            uploadId: options.uploadId,
                            file: options.file
                        })];
                    case 1:
                        upload_id = (_a.sent()).upload_id;
                        return [4 /*yield*/, this.broadcast({
                                item: 'configure_photo',
                                form: {
                                    allow_full_aspect_ratio: options.allowFullAspectRatio || true,
                                    upload_id: upload_id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.broadcast = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var baseParams, params, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.threadId === null && this.userIds === null) {
                            throw new Error('DirectThread: No recipients set');
                        }
                        baseParams = {
                            item: options.item,
                            form: options.form
                        };
                        if (this.threadId) {
                            params = Object.assign(baseParams, { threadIds: this.threadId });
                        }
                        else {
                            params = Object.assign(baseParams, { userIds: this.userIds });
                        }
                        return [4 /*yield*/, this.client.directThread.broadcast(params)];
                    case 1:
                        response = _a.sent();
                        this.threadId = response.payload.thread_id;
                        this.userIds = null;
                        return [2 /*return*/, response.payload];
                }
            });
        });
    };
    return DirectThreadEntity;
}(entity_1.Entity));
exports.DirectThreadEntity = DirectThreadEntity;
