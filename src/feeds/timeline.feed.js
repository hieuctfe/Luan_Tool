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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var class_transformer_1 = require("class-transformer");
var lodash_1 = require("lodash");
var feed_1 = require("../core/feed");
var TimelineFeed = /** @class */ (function (_super) {
    __extends(TimelineFeed, _super);
    function TimelineFeed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reason = lodash_1.sample(['pull_to_refresh', 'warm_start_fetch', 'cold_start_fetch']);
        return _this;
    }
    Object.defineProperty(TimelineFeed.prototype, "state", {
        set: function (body) {
            this.moreAvailable = body.more_available;
            this.nextMaxId = body.next_max_id;
        },
        enumerable: true,
        configurable: true
    });
    TimelineFeed.prototype.request = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var form, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = {
                            is_prefetch: '0',
                            feed_view_info: '',
                            seen_posts: '',
                            phone_id: this.client.state.phoneId,
                            is_pull_to_refresh: '0',
                            battery_level: this.client.state.batteryLevel,
                            timezone_offset: this.client.state.timezoneOffset,
                            _csrftoken: this.client.state.cookieCsrfToken,
                            client_session_id: this.client.state.clientSessionId,
                            device_id: this.client.state.uuid,
                            _uuid: this.client.state.uuid,
                            is_charging: Number(this.client.state.isCharging),
                            is_async_ads_in_headload_enabled: 0,
                            rti_delivery_backend: 0,
                            is_async_ads_double_request: 0,
                            will_sound_on: 0,
                            is_async_ads_rti: 0,
                            recovered_from_crash: options.recoveredFromCrash,
                            push_disabled: options.pushDisabled,
                            latest_story_pk: options.latestStoryPk
                        };
                        if (this.nextMaxId) {
                            form = Object.assign(form, {
                                max_id: this.nextMaxId,
                                reason: options.reason || 'pagination'
                            });
                        }
                        else {
                            form = Object.assign(form, {
                                reason: options.reason || this.reason,
                                is_pull_to_refresh: this.reason === 'pull_to_refresh' ? '1' : '0'
                            });
                        }
                        return [4 /*yield*/, this.client.request.send({
                                url: "/api/v1/feed/timeline/",
                                method: 'POST',
                                headers: {
                                    'X-Ads-Opt-Out': 0,
                                    'X-Google-AD-ID': this.client.state.adid,
                                    'X-DEVICE-ID': this.client.state.uuid,
                                    'X-FB': 1
                                },
                                form: form
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        this.state = body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    TimelineFeed.prototype.items = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.feed_items.filter(function (i) { return i.media_or_ad; }).map(function (i) { return i.media_or_ad; })];
                }
            });
        });
    };
    __decorate([
        class_transformer_1.Expose()
    ], TimelineFeed.prototype, "nextMaxId");
    return TimelineFeed;
}(feed_1.Feed));
exports.TimelineFeed = TimelineFeed;
