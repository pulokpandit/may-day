<?php
echo '{"game_state":"Display","properties":[{"game_id":241,"game_title":"May Day","game_sub_title":"May Day","game_orientation":"portrait","game_description":"","game_instruction":"","goal_message":"Complete the level as fast as you can to collect stars!","allocated_point":0,"slot_slider_max":4000,"parent_map_url":"\/newgames\/games\/puzzle-adventure\/map\/index.php?customer_tournament_id=02000000D3CE84DA3639FFDDE1DB6D774D614A8C7D8751FEC5F2BA68BB831D22B342BFC9&gameId=02000000E3A157F4C2431D3A154090D466CE228638B106885E8CF609A2ACD007B570A867&custID=1973154&ses_country_code=44&platform_type=web"}],"user_play_settings":[{"current_goal":16,"booster_applied":0,"badges":""}],"play_setup":[{"plan_point":50,"min_stage":2,"max_stage":2}],"targets":[{"label":"plan","value":14,"booster_value":""},{"label":"score","value":700,"booster_value":""}],"restrictions":[{"label":"time","value":120,"booster_value":""}],"fraud_url":"","error_url":"","error_reason":"","error_msg":""}';
die;
?>
session_start();

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

if (!isset($_SERVER['PHP_AUTH_USER'])) {
    header("WWW-Authenticate: Basic");
    header("HTTP/1.0 401 Unauthorized");
    echo '{"Error":"Unauthorized access"}';
    exit;
} else {
    if (($_SERVER['PHP_AUTH_USER'] == 'technical@hatchster.com') && ($_SERVER['PHP_AUTH_PW'] == 'bologna-djakarta-dervish')) {
        require_once('gameProperty.php');
        $isConstruct2Request = false;
        $json_str = file_get_contents('php://input');
        $game_data = json_decode($json_str);

        if (isset($game_data->construct2)) {
            $isConstruct2Request = true;
            $_POST['type'] = $game_data->type;
            if (isset($game_data->game_target_id)) {
                $_SESSION['game_target_id'] = $game_data->game_target_id;
            }
            if (isset($game_data->customer_award_log_id)) {
                $_SESSION['customerAwardLogID'] = $game_data->customer_award_log_id;
            }
        }
        $CustomerID = $_SESSION['custID'];
        $PHP_Session_id = $_SESSION['sessionid'];
        $platform_type = $_SESSION['platform_type'];
        $country_code = $_SESSION['ses_country_code'];
        $customer_tournament_id = (isset($_SESSION['customer_tournament_id']) && $_SESSION['customer_tournament_id'] != '') ? $_SESSION['customer_tournament_id'] : "";

        if ($api_key != "") {
            $type = $_POST['type'];
            if (strtolower($type) == "getgameinfo") {
                if ($isConstruct2Request) {
                    $customerAwardLogID = $_SESSION["customerAwardLogID"];
                    $game_id = $_SESSION['GameID'];
                    $game_target_id = (isset($_SESSION['game_target_id']) && $_SESSION['game_target_id'] != '') ? $_SESSION['game_target_id'] : "";
                } else {
                    $customerAwardLogID = $_POST['customer_award_log_id'];
                    $_SESSION["customerAwardLogID"] = $customerAwardLogID;
                    $game_id = $_POST['game_id'];
                    $_SESSION['GameID'] = $game_id;
                    $game_target_id = (isset($_POST['game_target_id']) && $_POST['game_target_id'] != '') ? $_POST['game_target_id'] : "";
                    $_SESSION['game_target_id'] = $game_target_id;
                }


                $methodName = 'Method_0';

                $request_array = Array("encrypt_gameid" => $game_id, "encrypt_customerawardlogid" => $customerAwardLogID, "encrypt_customertournamentid" => $customer_tournament_id, "encrypt_game_target_id" => $game_target_id, "php_session_id" => $PHP_Session_id, "customerid" => $CustomerID, "methodname" => $methodName, "platform_type" => $platform_type, "country_code" => $country_code);

                $request_json = json_encode($request_array, true);

                $result = callStoredProcWithParams($request_json);
             
            } else {
                $result = '{"Error":"Invalid method call"}';
            }
        } else {
            $result = '{"Error":"Invalid api key"}';
        }

        echo $result;
    } else {
        header("WWW-Authenticate: Basic");
        header("HTTP/1.0 401 Unauthorized");
        echo '{"Error":"Unauthorized access"}';
        exit;
    }
}

//callStoredProcWithParams Start Here
function callStoredProcWithParams($request_json) {
    global $api_key,$api_url;
    $headers = array(
        'Accept: application/json',
        'Content-Type: application/json',
        'api_token:'.$api_key,
    );
	
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api_url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_POST, 1); // set post data to true
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_json);   // post data
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);

    if ($result === false) {
        $result='{"error_url":"../../game_redirect.php?type=thankspage&error=001","error_reason":"'.curl_error($ch).'","error_msg":"There appears to be an issue with the game play. Click here to resolve.","retry":1}';
    }
    curl_close($ch);
    return $result;
}
?>
