"use strict";
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
var _ = require("lodash");
var Bluebird = require("bluebird");
var Chance = require("chance");
var request_1 = require("request");
var tough_cookie_1 = require("tough-cookie");
var devices = require("../samples/devices.json");
var builds = require("../samples/builds.json");
var supportedCapabilities = require("../samples/supported-capabilities.json");
var constants_1 = require("./constants");
var errors_1 = require("../errors");
var State = /** @class */ (function () {
    function State() {
        this.signatureKey = constants_1.SIGNATURE_KEY;
        this.signatureVersion = constants_1.SIGNATURE_VERSION;
        this.userBreadcrumbKey = constants_1.BREADCRUMB_KEY;
        this.appVersion = constants_1.APP_VERSION;
        this.appVersionCode = constants_1.APP_VERSION_CODE;
        this.fbAnalyticsApplicationId = constants_1.FACEBOOK_ANALYTICS_APPLICATION_ID;
        this.fbOtaFields = constants_1.FACEBOOK_OTA_FIELDS;
        this.fbOrcaApplicationId = constants_1.FACEBOOK_ORCA_APPLICATION_ID;
        this.loginExperiments = constants_1.LOGIN_EXPERIMENTS;
        this.experiments = constants_1.EXPERIMENTS;
        this.supportedCapabilities = supportedCapabilities;
        this.language = 'en_US';
        this.timezoneOffset = String(new Date().getTimezoneOffset() * -60);
        this.radioType = 'wifi-none';
        this.capabilitiesHeader = '3brTPw==';
        this.connectionTypeHeader = 'WIFI';
        this.cookieStore = new tough_cookie_1.MemoryCookieStore();
        this.cookieJar = request_1.jar(this.cookieStore);
        this.checkpoint = null;
        this.challenge = null;
        this.clientSessionIdLifetime = 1200000;
        this.pigeonSessionIdLifetime = 1200000;
    }
    Object.defineProperty(State.prototype, "clientSessionId", {
        /**
         * The current application session ID.
         *
         * This is a temporary ID which changes in the official app every time the
         * user closes and re-opens the Instagram application or switches account.
         *
         * We will update it once an hour
         */
        get: function () {
            return this.generateTemporaryGuid('clientSessionId', this.clientSessionIdLifetime);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "pigeonSessionId", {
        get: function () {
            return this.generateTemporaryGuid('pigeonSessionId', this.pigeonSessionIdLifetime);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "appUserAgent", {
        get: function () {
            return "Instagram " + this.appVersion + " Android (" + this.deviceString + "; " + this.language + "; " + this.appVersionCode + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "webUserAgent", {
        get: function () {
            return "Mozilla/5.0 (Linux; Android " + this.devicePayload.android_release + "; " + this.devicePayload.model + " Build/" + this.build + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36 " + this.appUserAgent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "devicePayload", {
        get: function () {
            var deviceParts = this.deviceString.split(';');
            var _a = deviceParts[0].split('/'), android_version = _a[0], android_release = _a[1];
            var manufacturer = deviceParts[3].split('/')[0];
            var model = deviceParts[4];
            return {
                android_version: android_version,
                android_release: android_release,
                manufacturer: manufacturer,
                model: model
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "batteryLevel", {
        get: function () {
            var chance = new Chance(this.deviceId);
            var percentTime = chance.integer({ min: 200, max: 600 });
            return 100 - (Math.round(Date.now() / 1000 / percentTime) % 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "isCharging", {
        get: function () {
            var chance = new Chance("" + this.deviceId + Math.round(Date.now() / 10800000));
            return chance.bool();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "challengeUrl", {
        get: function () {
            if (!this.checkpoint) {
                throw new errors_1.IgNoCheckpointError();
            }
            return "/api/v1" + this.checkpoint.challenge.api_path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "cookieCsrfToken", {
        get: function () {
            try {
                return this.extractCookieValue('csrftoken');
            }
            catch (_a) {
                return 'missing';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "cookieUserId", {
        get: function () {
            return this.extractCookieValue('ds_user_id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "cookieUsername", {
        get: function () {
            return this.extractCookieValue('ds_user');
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.isExperimentEnabled = function (experiment) {
        return this.experiments.includes(experiment);
    };
    State.prototype.extractCookie = function (key) {
        var cookies = this.cookieJar.getCookies(constants_1.HOST);
        return _.find(cookies, { key: key }) || null;
    };
    State.prototype.extractCookieValue = function (key) {
        var cookie = this.extractCookie(key);
        if (cookie === null) {
            throw new errors_1.IgCookieNotFoundError(key);
        }
        return cookie.value;
    };
    State.prototype.extractUserId = function () {
        try {
            return this.cookieUserId;
        }
        catch (e) {
            if (this.challenge === null || !this.challenge.user_id) {
                throw new errors_1.IgUserIdNotFoundError();
            }
            return String(this.challenge.user_id);
        }
    };
    State.prototype.deserializeCookieJar = function (cookies) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.cookieJar;
                        _b = '_jar';
                        return [4 /*yield*/, Bluebird.fromCallback(function (cb) { return tough_cookie_1.CookieJar.deserialize(cookies, _this.cookieStore, cb); })];
                    case 1:
                        _a[_b] = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    State.prototype.serializeCookieJar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Bluebird.fromCallback(function (cb) { return _this.cookieJar['_jar'].serialize(cb); })];
            });
        });
    };
    State.prototype.generateDevice = function (seed) {
        var chance = new Chance(seed);
        this.deviceString = chance.pickone(devices);
        var id = chance.string({
            pool: 'abcdef0123456789',
            length: 16
        });
        this.deviceId = "android-" + id;
        this.uuid = chance.guid();
        this.phoneId = chance.guid();
        this.adid = chance.guid();
        this.build = chance.pickone(builds);
    };
    State.prototype.generateTemporaryGuid = function (seed, lifetime) {
        return new Chance("" + seed + this.deviceId + Math.round(Date.now() / lifetime)).guid();
    };
    return State;
}());
exports.State = State;
