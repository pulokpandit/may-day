/*
 File created by Vishal Chavan to maintain all ajax calls and its response.
 */
BackEndService = {
    debug_mode: false,
    gameInit_baseURL: '../game_info_v3.php',
    gameStart_baseURL: '../../game_start_v3.php',
    gamePoints_baseURL: '../../game_points.php',
    gameResult_baseURL: '../../game_events_v3.php',
    Transaction_id: null,
    gameID: null,
    customerAwardLogID: null,
    gameTargetID: null,
    redirect_url: null,
    is_game_end: null,
    customerID: null,
    GAstatus: 0,
    GACrashReport: 0
};

BackEndService.ajaxRequest = function (url, params, sync) {

    return $.ajax({
        type: 'POST',
        dataType: 'json',
        data: params,
        async: sync ? false : true,
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                    'Authorization',
                    'Basic ' + btoa('technical@hatchster.com:bologna-djakarta-dervish')
                    );
        }
    });
};

BackEndService.gameInit = function () {
    if (BackEndService.debug_mode) {
        return BackEndDummy.gameInit();
    }

    var promise = $.Deferred();
    var params = {
        type: 'getgameinfo',
        customer_award_log_id: BackEndService.customerAwardLogID,
        game_target_id: BackEndService.gameTargetID,
        game_id: BackEndService.gameID
    };
    try {
        BackEndService.ajaxRequest(BackEndService.gameInit_baseURL, params, false)
                .success(function (response) {
                    var data = {
                        error_url: "",
                        error_msg: ""
                    };
                    if (response.error_url != '') {
                        data.error_url = response.error_url;
                        data.error_msg = response.error_msg;
                        if (BackEndService.GACrashReport == 1)
                        {
                            AnalyticsErrorCall('Critical', JSON.stringify({"customer_id": BackEndService.customerID, "customer_award_log_id": BackEndService.customerAwardLogID, "method_called": "GameInfo", "error_reason": response.error_reason}));
                        }
                    } else
                    {
                        BackEndService.game_state = response.game_state;
                        BackEndService.play_setup = response.play_setup;
                        BackEndService.properties = response.properties;
                        BackEndService.restrictions = response.restrictions;
                        BackEndService.targets = response.targets;
                        BackEndService.user_play_settings = response.user_play_settings;
                    }
                    promise.resolve(data);
                })
                .fail(function () {
                    if (BackEndService.GACrashReport == 1)
                    {
                        AnalyticsErrorCall('Critical', JSON.stringify({"customer_id": BackEndService.customerID, "customer_award_log_id": BackEndService.customerAwardLogID, "method_called": "GameInfo", "error_reason": "AJAX/Server Issue"}));
                    }
                    promise.resolve({
                        error_url: "../../game_redirect.php?type=thankspage&error=001",
                        error_msg: "There appears to be an issue with the game play. Click here to resolve."
                    });
                });
    } catch (e) {
        if (BackEndService.GACrashReport == 1)
        {
            AnalyticsErrorCall('Critical', JSON.stringify({"customer_id": BackEndService.customerID, "customer_award_log_id": BackEndService.customerAwardLogID, "method_called": "GameInfo", "error_reason": "InValidResponse"}));
        }
        promise.resolve({
            error_url: "../../game_redirect.php?type=thankspage&error=001",
            error_msg: "There appears to be an issue with the game play. Click here to resolve."
        });
    }
    return promise;
};

BackEndService.getGameDataObject = function (array, label) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].label == label) {
            return array[i];
        }
    }
    console.log('ERROR: Data object not found: ' + label);
    return null;
};

BackEndService.getGameDataValue = function (isBoosterOn, array, label) {
    var dataObject = BackEndService.getGameDataObject(array, label);
    var gameDataValue = isBoosterOn ? dataObject.booster_value : dataObject.value;
    return gameDataValue;
};

BackEndService.setGameData = function (isBoosterOn, restrictions, targets) {
    BackEndService.game_time = BackEndService.getGameDataValue(
            isBoosterOn,
            restrictions,
            'time'
            );
    BackEndService.game_moves = BackEndService.getGameDataValue(
            isBoosterOn,
            restrictions,
            'move'
            );
    BackEndService.target_score = BackEndService.getGameDataValue(
            isBoosterOn,
            targets,
            'point'
            );
};

BackEndService.gameStart = function () {
    if (BackEndService.debug_mode) {
        return BackEndDummy.gameStart();
    }

    var promise = $.Deferred();
    var params = {
        type: 'requestgamestart',
        customer_award_log_id: BackEndService.customerAwardLogID,
        game_target_id: BackEndService.gameTargetID,
        game_id: BackEndService.gameID
    };
    try {
        BackEndService.ajaxRequest(BackEndService.gameStart_baseURL, params, false)
                .success(function (response) {
                    var data = {
                        response: response.response.toLowerCase(),
                        error_url: response.error_url,
                        error_msg: response.error_msg,
                    };
                    if (BackEndService.GACrashReport == 1 && response.response.toLowerCase() == "error")
                    {
                        AnalyticsErrorCall('Critical', JSON.stringify({"customer_id": BackEndService.customerID, "customer_award_log_id": BackEndService.customerAwardLogID, "method_called": "GameStart", "error_reason": response.error_reason}));
                    }
                    BackEndService.Transaction_id = response.transaction_id;
                    promise.resolve(data);
                })
                .fail(function () {
                    if (BackEndService.GACrashReport == 1)
                    {
                        AnalyticsErrorCall('Critical', JSON.stringify({"customer_id": BackEndService.customerID, "customer_award_log_id": BackEndService.customerAwardLogID, "method_called": "GameStart", "error_reason": "AJAX/Server Issue"}));
                    }
                    promise.resolve({
                        response: "Error",
                        error_url: "../../game_redirect.php?type=thankspage&error=001",
                        error_msg: "There appears to be an issue with the game play. Click here to resolve."
                    });
                });
    } catch (e) {
        if (BackEndService.GACrashReport == 1)
        {
            AnalyticsErrorCall('Critical', JSON.stringify({"customer_id": BackEndService.customerID, "customer_award_log_id": BackEndService.customerAwardLogID, "method_called": "GameStart", "error_reason": "InValidResponse"}));
        }
        promise.resolve({
            response: "Error",
            error_url: "../../game_redirect.php?type=thankspage&error=001",
            error_msg: "There appears to be an issue with the game play. Click here to resolve."
        });
    }

    return promise;
};

BackEndService.gamePoints = function (points) {
    if (BackEndService.debug_mode) {
        return BackEndDummy.gamePoints(points);
    }

    var promise = $.Deferred();
    var params = {
        type: 'pointupdate',
        request_type: 'consume',
        point: points,
        transaction_id: BackEndService.Transaction_id
    };
    BackEndService.ajaxRequest(BackEndService.gamePoints_baseURL, params, false)
            .success(function (response) {
                if (response.error_url != '') {
                    window.location.href = response.error_url;
                    return;
                }

                var success = response.status.toLowerCase() == 'success';
                var data = {
                    success: success,
                    currentBalance: response.current_balance
                };

                if (success) {
                    BackEndService.deposit_points = points + BackEndService.allocated_points;
                    BackEndService.deposit_success_msg = 'Successfully deposited ' + BackEndService.deposit_points + ' points';
                } else if (currentBalance == 0) {
                    BackEndService.deposit_points = BackEndService.allocated_points;
                    BackEndService.deposit_error_msg = 'Your points balance is too low. Please select a new deposit amount.';
                    BackEndService.deposit_success_msg = 'Successfully deposited ' + BackEndService.deposit_points + ' points';
                } else {
                    BackEndService.deposit_error_msg = 'You have no more points left to deposit';
                }

                promise.resolve(data);
            })
            .fail(function () {
                if (BackEndService.GACrashReport == 1)
                {
                    AnalyticsErrorCall('Critical', JSON.stringify({"customer_id": BackEndService.customerID, "customer_award_log_id": BackEndService.customerAwardLogID, "method_called": "GamePointUpdate", "error_reason": "AJAX/Server Issue"}));
                }
                promise.reject();
            });
    return promise;
};

BackEndService.gameResult = function (gamePoint) {
    if (BackEndService.debug_mode) {
        return BackEndDummy.gameResult(points, checkout, bet_amount, win_amount);
    }

    var promise = $.Deferred();
    var params = {
        type: 'gameevent',
        transaction_id: BackEndService.Transaction_id,
        restrictions: {},
        targets: {}
    };
    var sync = true;
//    if (checkout) {
//        sync = false;
//    }

    BackEndService.ajaxRequest(BackEndService.gameResult_baseURL, params, sync)
            .success(function (response) {

                var data = {
                    error_url: "",
                    error_msg: ""
                };
                if (response.error_url != '') {
                    data.error_url = response.error_url;
                    data.error_msg = response.error_msg;
                    if (BackEndService.GACrashReport == 1)
                    {
                        AnalyticsErrorCall('Critical', JSON.stringify({"customer_id": BackEndService.customerID, "customer_award_log_id": BackEndService.customerAwardLogID, "method_called": "GameEvent", "error_reason": response.error_reason}));
                    }
                } else
                {
                    BackEndService.is_game_end = response.game_end.toLowerCase() == 'yes';
                    if (BackEndService.is_game_end) {
                        BackEndService.end_msg = response.properties[0].messages;
                        BackEndService.end_play_url = response.properties[0].links[0].end_play[0].url;
                        BackEndService.replay_url = response.properties[0].links[0].replay[0].url;
                        BackEndService.next_level_url = response.properties[0].links[0].next_level[0].url;
                        BackEndService.star_collect = response.star_collect;
                        BackEndService.targets = response.results.Target;
                        BackEndService.restrictions = response.results.Restrictions;
                        
                        BackEndService.is_prize_achieved = response.is_prize_achieved;//prize achieved check
                        data.game_end = response.game_end;
                        data.end_result = response.end_result;
                    }
                }
                promise.resolve(data);
            })
            .fail(function () {
                if (BackEndService.GACrashReport == 1)
                {
                    AnalyticsErrorCall('Critical', JSON.stringify({"customer_id": BackEndService.customerID, "customer_award_log_id": BackEndService.customerAwardLogID, "method_called": "GameEvent", "error_reason": "AJAX/Server Issue"}));
                }
                promise.resolve({
                    error_url: "../../game_redirect.php?type=thankspage&error=001",
                    error_msg: "There appears to be an issue with the game play. Click here to resolve."
                });
            });
    return promise;
};
