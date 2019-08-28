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
var rxjs_1 = require("rxjs");
var class_transformer_1 = require("class-transformer");
var attempt_1 = require("@lifeomic/attempt");
var Chance = require("chance");
var errors_1 = require("../errors");
var repository_1 = require("./repository");
var decorators_1 = require("../decorators");
var Feed = /** @class */ (function (_super) {
    __extends(Feed, _super);
    function Feed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attemptOptions = {
            delay: 60000,
            factor: 1.5,
            maxAttempts: 10,
            minDelay: 60000,
            maxDelay: 300000,
            jitter: true
        };
        _this.items$ = new rxjs_1.Observable(function (observer) {
            var subscribed = true;
            process.nextTick(function () { return __awaiter(_this, void 0, void 0, function () {
                var e_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, attempt_1.retry(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var items;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.items()];
                                            case 1:
                                                items = _a.sent();
                                                observer.next(items);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, __assign({ handleError: function (error, context) {
                                        // If instagram just tells us to wait - we are waiting.
                                        if (error instanceof errors_1.IgResponseError &&
                                            error.response.statusCode === 400 &&
                                            error.response.body.status === 'fail') {
                                            return;
                                        }
                                        else {
                                            context.abort();
                                        }
                                    } }, this.attemptOptions))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            observer.error(e_1);
                            return [3 /*break*/, 3];
                        case 3:
                            if (this.isMoreAvailable() && subscribed) return [3 /*break*/, 0];
                            _a.label = 4;
                        case 4:
                            observer.complete();
                            return [2 /*return*/];
                    }
                });
            }); });
            return function () { return (subscribed = false); };
        });
        _this.chance = new Chance();
        _this.rankToken = _this.chance.guid();
        return _this;
    }
    Feed.prototype.serialize = function () {
        return class_transformer_1.serialize(this, { strategy: 'excludeAll' });
    };
    Feed.prototype.deserialize = function (data) {
        class_transformer_1.plainToClassFromExist(this, JSON.parse(data));
    };
    Feed.prototype.toPlain = function () {
        return class_transformer_1.classToPlain(this, { strategy: 'excludeAll' });
    };
    Feed.prototype.isMoreAvailable = function () {
        return !!this.moreAvailable;
    };
    __decorate([
        class_transformer_1.Expose()
    ], Feed.prototype, "moreAvailable");
    __decorate([
        decorators_1.Enumerable(false)
    ], Feed.prototype, "chance");
    __decorate([
        class_transformer_1.Expose()
    ], Feed.prototype, "rankToken");
    return Feed;
}(repository_1.Repository));
exports.Feed = Feed;
