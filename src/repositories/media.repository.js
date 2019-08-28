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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var luxon_1 = require("luxon");
var repository_1 = require("../core/repository");
var Chance = require("chance");
var MediaRepository = /** @class */ (function (_super) {
    __extends(MediaRepository, _super);
    function MediaRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaRepository.prototype.info = function (mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/info/",
                            method: 'GET',
                            form: this.client.request.sign({
                                igtv_feed_preview: false,
                                media_id: mediaId,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                _uuid: this.client.state.uuid
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype["delete"] = function (_a) {
        var mediaId = _a.mediaId, _b = _a.mediaType, mediaType = _b === void 0 ? 'PHOTO' : _b;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/delete/",
                            method: 'POST',
                            qs: {
                                media_type: mediaType
                            },
                            form: this.client.request.sign({
                                igtv_feed_preview: false,
                                media_id: mediaId,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                _uuid: this.client.state.uuid
                            })
                        })];
                    case 1:
                        body = (_c.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.likeAction = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var signedFormData, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        signedFormData = this.client.request.sign(__assign({ module_name: options.moduleInfo.module_name, media_id: options.mediaId, _csrftoken: this.client.state.cookieCsrfToken }, lodash_1.omit(options.moduleInfo, 'module_name'), { radio_type: this.client.state.radioType, _uid: this.client.state.cookieUserId, device_id: this.client.state.deviceId, _uuid: this.client.state.uuid }));
                        return [4 /*yield*/, this.client.request.send({
                                url: "/api/v1/media/" + options.mediaId + "/" + options.action + "/",
                                method: 'POST',
                                form: __assign({}, signedFormData, { d: options.d })
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.like = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.likeAction(__assign({ action: 'like' }, options))];
            });
        });
    };
    MediaRepository.prototype.unlike = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.likeAction(__assign({ action: 'unlike' }, options))];
            });
        });
    };
    MediaRepository.prototype.comment = function (_a) {
        var mediaId = _a.mediaId, text = _a.text, _b = _a.module, module = _b === void 0 ? 'self_comments_v2' : _b;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/comment/",
                            method: 'POST',
                            form: this.client.request.sign({
                                user_breadcrumb: this.client.request.userBreadcrumb(text.length),
                                idempotence_token: new Chance().guid(),
                                _csrftoken: this.client.state.cookieCsrfToken,
                                radio_type: this.client.state.radioType,
                                _uid: this.client.state.cookieUserId,
                                device_id: this.client.state.deviceId,
                                _uuid: this.client.state.uuid,
                                comment_text: text,
                                containermodule: module
                            })
                        })];
                    case 1:
                        body = (_c.sent()).body;
                        return [2 /*return*/, body.comment];
                }
            });
        });
    };
    MediaRepository.prototype.likers = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + id + "/likers/"
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.blocked = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/blocked/"
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body.media_ids];
                }
            });
        });
    };
    MediaRepository.prototype.uploadFinish = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/media/upload_finish/',
                            method: 'POST',
                            headers: {
                                retry_context: JSON.stringify({ num_step_auto_retry: 0, num_reupload: 0, num_step_manual_retry: 0 })
                            },
                            form: this.client.request.sign({
                                timezone_offset: this.client.state.timezoneOffset,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                source_type: options.source_type,
                                _uid: this.client.state.cookieUserId,
                                device_id: this.client.state.deviceId,
                                _uuid: this.client.state.uuid,
                                upload_id: options.upload_id,
                                device: this.client.state.devicePayload
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.configure = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var devicePayload, now, width, height, form, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        devicePayload = this.client.state.devicePayload;
                        now = luxon_1.DateTime.local().toFormat('yyyy:mm:dd HH:mm:ss');
                        width = options.width || 1520;
                        height = options.height || 2048;
                        form = lodash_1.defaultsDeep(options, {
                            date_time_digitalized: now,
                            camera_model: devicePayload.model,
                            scene_capture_type: 'standard',
                            timezone_offset: this.client.state.timezoneOffset,
                            _csrftoken: this.client.state.cookieCsrfToken,
                            media_folder: 'Camera',
                            source_type: '4',
                            _uid: this.client.state.cookieUserId,
                            device_id: this.client.state.deviceId,
                            _uuid: this.client.state.uuid,
                            creation_logger_session_id: this.client.state.clientSessionId,
                            caption: '',
                            date_time_original: now,
                            software: '1',
                            camera_make: devicePayload.manufacturer,
                            device: devicePayload,
                            edits: {
                                crop_original_size: [width, height],
                                crop_center: [0.0, -0.0],
                                crop_zoom: lodash_1.random(1.01, 1.99).toFixed(7)
                            },
                            extra: { source_width: width, source_height: height }
                        });
                        return [4 /*yield*/, this.client.request.send({
                                url: '/api/v1/media/configure/',
                                method: 'POST',
                                form: this.client.request.sign(form)
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.seen = function (reels, module) {
        if (module === void 0) { module = 'feed_timeline'; }
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v2/media/seen/",
                            method: 'POST',
                            qs: {
                                reel: 1,
                                live_vod: 0
                            },
                            // TODO: gzip
                            form: this.client.request.sign({
                                reels: reels,
                                container_module: module,
                                reel_media_skipped: [],
                                live_vods: [],
                                live_vods_skipped: [],
                                nuxes: [],
                                nuxes_skipped: [],
                                _uuid: this.client.state.uuid,
                                _uid: this.client.state.cookieUserId,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                device_id: this.client.state.deviceId
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    return MediaRepository;
}(repository_1.Repository));
exports.MediaRepository = MediaRepository;
