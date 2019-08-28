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
var repository_1 = require("../core/repository");
var errors_1 = require("../errors");
var ChallengeRepository = /** @class */ (function (_super) {
    __extends(ChallengeRepository, _super);
    function ChallengeRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChallengeRepository.prototype.state = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: this.client.state.challengeUrl,
                            qs: {
                                guid: this.client.state.uuid,
                                device_id: this.client.state.deviceId
                            }
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        this.middleware(body);
                        return [2 /*return*/, body];
                }
            });
        });
    };
    ChallengeRepository.prototype.selectVerifyMethod = function (choice) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: this.client.state.challengeUrl,
                            method: 'POST',
                            form: this.client.request.sign({
                                choice: choice,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                guid: this.client.state.uuid,
                                device_id: this.client.state.deviceId
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        this.middleware(body);
                        return [2 /*return*/, body];
                }
            });
        });
    };
    ChallengeRepository.prototype.deltaLoginReview = function (choice) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.selectVerifyMethod(choice)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChallengeRepository.prototype.sendPhoneNumber = function (phoneNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: this.client.state.challengeUrl,
                            method: 'POST',
                            form: this.client.request.sign({
                                phone_number: String(phoneNumber),
                                _csrftoken: this.client.state.cookieCsrfToken,
                                guid: this.client.state.uuid,
                                device_id: this.client.state.deviceId
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        this.middleware(body);
                        return [2 /*return*/, body];
                }
            });
        });
    };
    ChallengeRepository.prototype.auto = function (reset) {
        if (reset === void 0) { reset = false; }
        return __awaiter(this, void 0, void 0, function () {
            var challenge, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.client.state.checkpoint) {
                            throw new errors_1.IgNoCheckpointError();
                        }
                        if (!reset) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.reset()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!!this.client.state.challenge) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.state()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        challenge = this.client.state.challenge;
                        _a = challenge.step_name;
                        switch (_a) {
                            case 'select_verify_method': return [3 /*break*/, 5];
                            case 'delta_login_review': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 5: return [4 /*yield*/, this.selectVerifyMethod(challenge.step_data.choice)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: return [4 /*yield*/, this.deltaLoginReview('0')];
                    case 8: return [2 /*return*/, _b.sent()];
                    case 9:
                        {
                            return [2 /*return*/, challenge];
                        }
                        _b.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ChallengeRepository.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: this.client.state.challengeUrl.replace('/challenge/', '/challenge/reset/'),
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                guid: this.client.state.uuid,
                                device_id: this.client.state.deviceId
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        this.middleware(body);
                        return [2 /*return*/, body];
                }
            });
        });
    };
    ChallengeRepository.prototype.sendSecurityCode = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request
                            .send({
                            url: this.client.state.challengeUrl,
                            method: 'POST',
                            form: this.client.request.sign({
                                security_code: code,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                guid: this.client.state.uuid,
                                device_id: this.client.state.deviceId
                            })
                        })["catch"](function (error) {
                            if (error.response.statusCode === 400 && error.response.body.status === 'fail') {
                                throw new errors_1.IgChallengeWrongCodeError(error.response.body.message);
                            }
                            throw error;
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        this.middleware(body);
                        return [2 /*return*/, body];
                }
            });
        });
    };
    ChallengeRepository.prototype.middleware = function (body) {
        if (body.action === 'close') {
            this.client.state.checkpoint = null;
            this.client.state.challenge = null;
        }
        else {
            this.client.state.challenge = body;
        }
    };
    return ChallengeRepository;
}(repository_1.Repository));
exports.ChallengeRepository = ChallengeRepository;
