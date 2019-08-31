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
var _this = this;
exports.__esModule = true;
require("dotenv/config");
var src_1 = require("../../src");
var os_1 = require("os");
var mysql = require('mysql');
var db = require('../db');
var fs = require('fs');
Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        var val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
};
function twoDigits(d) {
    if (0 <= d && d < 10)
        return "0" + d.toString();
    if (-10 < d && d < 0)
        return "-0" + (-1 * d).toString();
    return d.toString();
}
Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
function doRequest(username, ig, idx) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (rs, rj) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                setTimeout(function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var userId, sql2, err_1;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 3, , 4]);
                                                    return [4 /*yield*/, ig.user.getIdByUsername(username)];
                                                case 1:
                                                    userId = _a.sent();
                                                    return [4 /*yield*/, ig.user.info(userId)];
                                                case 2:
                                                    os_1.userInfo = _a.sent();
                                                    console.log(os_1.userInfo.username, os_1.userInfo.follower_count);
                                                    sql2 = 'SELECT * FROM account where accountId = ?';
                                                    db.query(sql2, [os_1.userInfo.username], function (err, response) {
                                                        var sql = 'insert into report (date,following,follower,post, accId, shopName) values (?,?,?,?,?,?)';
                                                        var date = new Date().toMysqlFormat();
                                                        var id = response[0].accId;
                                                        db.query(sql, [date, os_1.userInfo.following_count, os_1.userInfo.follower_count, os_1.userInfo.media_count, id, os_1.userInfo.full_name], function (err, response) {
                                                            if (err)
                                                                throw err;
                                                            rs(response);
                                                        });
                                                    });
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    err_1 = _a.sent();
                                                    rs({});
                                                    return [3 /*break*/, 4];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    });
                                }, 2000 * idx);
                                return [2 /*return*/];
                            });
                        });
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
module.exports = {
    updateUserInfo: function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var userId, ig, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.body.userId;
                    ig = new src_1.IgApiClient();
                    ig.state.generateDevice("katun.meoz");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ig.account.login("katun.meoz", "Yeutho123")];
                case 2:
                    _a.sent();
                    doRequest(userId, ig).then(function (res2) {
                        res.json({ status: "true" });
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    res.json({ status: "false" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    update: function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var ig, sql, e_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ig = new src_1.IgApiClient();
                    ig.state.generateDevice("katun.meoz");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, ig.account.login("katun.meoz", "Yeutho123")];
                case 2:
                    _a.sent();
                    sql = 'SELECT * FROM account where serverId != 11';
                    return [4 /*yield*/, db.query(sql, function (err, response) { return __awaiter(_this, void 0, void 0, function () {
                            var links, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (err)
                                            throw err;
                                        links = [];
                                        for (i = 0; i < response.length; i++) {
                                            links.push(response[i].accountId);
                                        }
                                        return [4 /*yield*/, Promise.all(links.map(function (el, idx) { return doRequest(el, ig, idx); })).then(function (res2) {
                                                res.json({ status: "true" });
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    res.json({ status: "false" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }
};