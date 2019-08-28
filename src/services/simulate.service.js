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
var Bluebird = require("bluebird");
var SimulateService = /** @class */ (function (_super) {
    __extends(SimulateService, _super);
    function SimulateService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SimulateService.prototype, "preLoginFlowRequests", {
        get: function () {
            var _this = this;
            return [
                function () { return _this.client.account.readMsisdnHeader(); },
                function () { return _this.client.account.msisdnHeaderBootstrap('ig_select_app'); },
                function () { return _this.client.zr.tokenResult(); },
                function () { return _this.client.account.contactPointPrefill('prefill'); },
                function () { return _this.client.launcher.preLoginSync(); },
                function () { return _this.client.qe.syncLoginExperiments(); },
                function () { return _this.client.attribution.logAttribution(); },
                function () { return _this.client.account.getPrefillCandidates(); },
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimulateService.prototype, "postLoginFlowRequests", {
        get: function () {
            var _this = this;
            return [
                function () { return _this.client.zr.tokenResult(); },
                function () { return _this.client.launcher.postLoginSync(); },
                function () { return _this.client.qe.syncExperiments(); },
                function () { return _this.client.attribution.logAttribution(); },
                function () { return _this.client.attribution.logResurrectAttribution(); },
                function () { return _this.client.loom.fetchConfig(); },
                function () { return _this.client.linkedAccount.getLinkageStatus(); },
                function () { return _this.client.creatives.writeSupportedCapabilities(); },
                // () => this.client.account.processContactPointSignals(),
                function () { return _this.client.feed.timeline().request({ recoveredFromCrash: '1', reason: 'cold_start_fetch' }); },
                function () { return _this.client.fbsearch.suggestedSearches('users'); },
                function () { return _this.client.fbsearch.suggestedSearches('blended'); },
                function () { return _this.client.fbsearch.recentSearches(); },
                function () { return _this.client.direct.rankedRecipients('reshare'); },
                function () { return _this.client.direct.rankedRecipients('raven'); },
                function () { return _this.client.direct.getPresence(); },
                function () { return _this.client.feed.directInbox().request(); },
                function () { return _this.client.media.blocked(); },
                function () { return _this.client.qp.batchFetch(); },
                function () { return _this.client.qp.getCooldowns(); },
                function () { return _this.client.user.arlinkDownloadInfo(); },
                function () { return _this.client.discover.topicalExplore(); },
                function () { return _this.client.discover.markSuSeen(); },
                function () { return _this.facebookOta(); },
            ];
        },
        enumerable: true,
        configurable: true
    });
    SimulateService.executeRequestsFlow = function (_a) {
        var requests = _a.requests, _b = _a.concurrency, concurrency = _b === void 0 ? 1 : _b, _c = _a.toShuffle, toShuffle = _c === void 0 ? true : _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (toShuffle) {
                            requests = lodash_1.shuffle(requests);
                        }
                        return [4 /*yield*/, Bluebird.map(requests, function (request) { return request(); }, { concurrency: concurrency })];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SimulateService.prototype.preLoginFlow = function (concurrency, toShuffle) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, SimulateService.executeRequestsFlow({
                        requests: this.preLoginFlowRequests,
                        concurrency: concurrency,
                        toShuffle: toShuffle
                    })];
            });
        });
    };
    SimulateService.prototype.postLoginFlow = function (concurrency, toShuffle) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, SimulateService.executeRequestsFlow({
                        requests: this.postLoginFlowRequests,
                        concurrency: concurrency,
                        toShuffle: toShuffle
                    })];
            });
        });
    };
    SimulateService.prototype.facebookOta = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uid, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = this.client.state.cookieUserId;
                        return [4 /*yield*/, this.client.request.send({
                                url: '/api/v1/facebook_ota/',
                                qs: {
                                    fields: this.client.state.fbOtaFields,
                                    custom_user_id: uid,
                                    signed_body: this.client.request.signature('') + '.',
                                    ig_sig_key_version: this.client.state.signatureVersion,
                                    version_code: this.client.state.appVersionCode,
                                    version_name: this.client.state.appVersion,
                                    custom_app_id: this.client.state.fbOrcaApplicationId,
                                    custom_device_id: this.client.state.uuid
                                }
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    return SimulateService;
}(repository_1.Repository));
exports.SimulateService = SimulateService;
