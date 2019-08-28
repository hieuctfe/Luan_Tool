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
var LauncherRepository = /** @class */ (function (_super) {
    __extends(LauncherRepository, _super);
    function LauncherRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LauncherRepository.prototype.preLoginSync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sync({
                        id: this.client.state.uuid,
                        configs: 'ig_fbns_blocked,ig_android_felix_release_players,ig_user_mismatch_soft_error,ig_android_carrier_signals_killswitch,ig_android_killswitch_perm_direct_ssim,fizz_ig_android,ig_mi_block_expired_events,ig_android_os_version_blocking_config'
                    })];
            });
        });
    };
    LauncherRepository.prototype.postLoginSync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uid;
            return __generator(this, function (_a) {
                uid = this.client.state.cookieUserId;
                return [2 /*return*/, this.sync({
                        _csrftoken: this.client.state.cookieCsrfToken,
                        id: uid,
                        _uid: uid,
                        _uuid: this.client.state.uuid,
                        configs: 'ig_android_insights_welcome_dialog_tooltip,ig_android_extra_native_debugging_info,ig_android_insights_top_account_dialog_tooltip,ig_android_explore_startup_prefetch_launcher,ig_android_newsfeed_recyclerview,ig_android_react_native_ota_kill_switch,ig_qe_value_consistency_checker,ig_android_qp_keep_promotion_during_cooldown,ig_launcher_ig_explore_post_chaining_hide_comments_android_v0,ig_android_video_playback,ig_launcher_ig_android_network_stack_queue_undefined_request_qe,ig_camera_android_attributed_effects_endpoint_api_query_config,ig_android_notification_setting_sync,ig_android_dogfooding,ig_launcher_ig_explore_post_chaining_pill_android_v0,ig_android_request_compression_launcher,ig_delink_lasso_accounts,ig_android_stories_send_preloaded_reels_with_reels_tray,ig_android_critical_path_manager,ig_android_shopping_django_product_search,ig_android_qp_surveys_v1,ig_android_feed_attach_report_logs,ig_android_uri_parser_cache_launcher,ig_android_global_scheduler_infra,ig_android_explore_grid_viewpoint,ig_android_global_scheduler_direct,ig_android_upload_heap_on_oom,ig_launcher_ig_android_network_stack_cap_api_request_qe,ig_android_async_view_model_launcher,ig_android_bug_report_screen_record,ig_canvas_ad_pixel,ig_android_bloks_demos,ig_launcher_force_switch_on_dialog,ig_story_insights_entry,ig_android_executor_limit_per_group_config,ig_android_bitmap_strong_ref_cache_layer_launcher,ig_android_cold_start_class_preloading,ig_direct_e2e_send_waterfall_sample_rate_config,ig_android_qp_waterfall_logging,ig_synchronous_account_switch,ig_launcher_ig_android_reactnative_realtime_ota,ig_contact_invites_netego_killswitch,ig_launcher_ig_explore_video_chaining_container_module_android,ig_launcher_ig_explore_remove_topic_channel_tooltip_experiment_android,ig_android_request_cap_tuning_with_bandwidth,ig_android_rageshake_redesign,ig_launcher_explore_navigation_redesign_android,ig_android_betamap_cold_start,ig_android_employee_options,ig_android_direct_gifs_killswitch,ig_android_gps_improvements_launcher,ig_launcher_ig_android_network_stack_cap_video_request_qe,ig_launcher_ig_android_network_request_cap_tuning_qe,ig_android_qp_xshare_to_fb,ig_android_feed_report_ranking_issue,ig_launcher_ig_explore_verified_badge_android,ig_android_bloks_data_release,ig_android_feed_camera_latency'
                    })];
            });
        });
    };
    LauncherRepository.prototype.sync = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            method: 'POST',
                            url: '/api/v1/launcher/sync/',
                            form: this.client.request.sign(data)
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    return LauncherRepository;
}(repository_1.Repository));
exports.LauncherRepository = LauncherRepository;
