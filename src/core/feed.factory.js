"use strict";
exports.__esModule = true;
var feeds_1 = require("../feeds");
var class_transformer_1 = require("class-transformer");
var FeedFactory = /** @class */ (function () {
    function FeedFactory(client) {
        this.client = client;
    }
    FeedFactory.prototype.accountFollowers = function (id) {
        var feed = new feeds_1.AccountFollowersFeed(this.client);
        feed.id = id || this.client.state.cookieUserId;
        return feed;
    };
    FeedFactory.prototype.accountFollowing = function (id) {
        var feed = new feeds_1.AccountFollowingFeed(this.client);
        feed.id = id || this.client.state.cookieUserId;
        return feed;
    };
    FeedFactory.prototype.directInbox = function () {
        return new feeds_1.DirectInboxFeed(this.client);
    };
    FeedFactory.prototype.directThread = function (options, seqId) {
        var feed = new feeds_1.DirectThreadFeed(this.client);
        feed.id = options.thread_id;
        feed.cursor = options.oldest_cursor;
        feed.seqId = seqId;
        return feed;
    };
    FeedFactory.prototype.user = function (id) {
        var feed = new feeds_1.UserFeed(this.client);
        feed.id = id;
        return feed;
    };
    FeedFactory.prototype.tag = function (tag) {
        var feed = new feeds_1.TagFeed(this.client);
        feed.tag = tag;
        return feed;
    };
    FeedFactory.prototype.location = function (id, tab) {
        if (tab === void 0) { tab = 'ranked'; }
        var feed = new feeds_1.LocationFeed(this.client);
        feed.id = id;
        feed.tab = tab;
        return feed;
    };
    FeedFactory.prototype.mediaComments = function (id) {
        var feed = new feeds_1.MediaCommentsFeed(this.client);
        feed.id = id;
        return feed;
    };
    FeedFactory.prototype.reelsMedia = function (options) {
        return class_transformer_1.plainToClassFromExist(new feeds_1.ReelsMediaFeed(this.client), options);
    };
    FeedFactory.prototype.timeline = function (reason) {
        var feed = new feeds_1.TimelineFeed(this.client);
        if (reason) {
            feed.reason = reason;
        }
        return feed;
    };
    FeedFactory.prototype.saved = function () {
        return new feeds_1.SavedFeed(this.client);
    };
    return FeedFactory;
}());
exports.FeedFactory = FeedFactory;
