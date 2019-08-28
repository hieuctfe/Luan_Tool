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
exports.__esModule = true;
var repository_1 = require("../core/repository");
var StoryService = /** @class */ (function (_super) {
    __extends(StoryService, _super);
    function StoryService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StoryService.prototype.seen = function (input, sourceId) {
        if (sourceId === void 0) { sourceId = null; }
        var items;
        if (input instanceof Array) {
            items = input;
        }
        else {
            items = Object.values(input).reduce(function (accumulator, current) { return accumulator.concat(current.items); }, []);
        }
        var reels = {};
        var maxSeenAt = Math.floor(Date.now() / 1000); // Get current global UTC timestamp.
        var seenAt = maxSeenAt - items.length; // Start seenAt in the past.
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var itemTakenAt = item.taken_at;
            // Raise "seenAt" if it's somehow older than the item's "takenAt".
            // NOTE: Can only happen if you see a story instantly when posted.
            // Do not let "seenAt" exceed the current global UTC time.
            if (seenAt < itemTakenAt) {
                seenAt = itemTakenAt + 1;
            }
            if (seenAt > maxSeenAt) {
                seenAt = maxSeenAt;
            }
            // Determine the source ID for this item. This is where the item was
            // seen from, such as a UserID or a Location-StoryTray ID.
            var itemSourceId = sourceId === null ? item.user.pk : sourceId;
            // Key Format: "mediaPk_userPk_sourceId".
            // NOTE: In case of seeing stories on a user's profile, their
            // userPk is used as the sourceId, as "mediaPk_userPk_userPk".
            var reelId = item.id + "_" + itemSourceId;
            // Value Format: ["mediaTakenAt_seenAt"] (array with single string).
            reels[reelId] = [itemTakenAt + "_" + seenAt];
            // Randomly add 1-3 seconds to next seenAt timestamp, to act human.
            seenAt += 1;
        }
        return this.client.media.seen(reels);
    };
    return StoryService;
}(repository_1.Repository));
exports.StoryService = StoryService;
