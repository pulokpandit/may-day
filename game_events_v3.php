<?php
//2) Game End = Yes ( Loss )
echo '{"transaction_id":"4AA5BB3F-63D5-4B4D-991A-89C3ED6F0865","game_end":"YES","end_result":"LOSS","is_prize_achieved":1,"achieved_prize_no":0,"achieved_prize_image":"","achieved_prize_msg":"","results":{"Target":{"score":{"label":"score","value":1800,"result":0},"jump":{"label":"jump","value":20,"result":0}},"Restrictions":{"attempt":{"label":"attempt","value":2,"result":0},"time":{"label":"time","value":300,"result":1}}},"properties":[{"messages":[{"popup_header":"GAME OVER!","in_game":"So close!","out_web":"Wow, so close! Have a another go","out_app":"Wow, so close! Have a another go"}],"links":[{"replay":[{"label":"Play again","url":"play_again","play_count":0}],"end_play":[{"label":"Finish","url":"/newgames/games/tap-adventure/map/index.php?customer_tournament_id=02000000F78DC9885C1C15D748CBFE6EE6914377A03AADB721FFDD87992A5C3E6575519B&gameId=020000008DF8D1A7A75AC536659569CD4A1D16BA25B163785E16AB44959CBCC2B0E578F8&custID=1973154&ses_country_code=44&platform_type=web"}],"next_level":[{"label":"next_level","url":"","game_id":"","game_target_id":""}]}]}],"star_collect":0,"game_price":"50","booster_properties":[{"is_booster_available":1,"booster_award_id":1396,"booster_game_price":100,"booster_popup_msg":"You are purchasing game play with extra time."}],"error_url":"","error_reason":"","error_msg":""}';
die;
//3) Game End = Yes ( win )
//echo '{"transaction_id":"957D910E-5FBC-4EC4-A4C5-0FFBCF9F2596","game_end":"YES","end_result":"WIN","is_prize_achieved":0,"achieved_prize_no":0,"achieved_prize_image":"","achieved_prize_msg":"","results":{"Target":{"score":{"label":"score","value":1000,"result":1},"jump":{"label":"jump","value":20,"result":1}},"Restrictions":{"time":{"label":"time","value":300,"result":1}}},"properties":[{"messages":[{"popup_header":"WAY TO GO!","in_game":"You got 1 star","out_web":"Awesome, you have completed level 1! Got 1 star","out_app":"Awesome, you have completed level 1! Got 1 star"}],"links":[{"replay":[{"label":"Play again","url":"play_again","play_count":0}],"end_play":[{"label":"Finish","url":"/newgames/games/tap-adventure/map/index.php?customer_tournament_id=02000000F78DC9885C1C15D748CBFE6EE6914377A03AADB721FFDD87992A5C3E6575519B&gameId=02000000160D505C5AEE103ECD75985F5526E22BA595A770050A435951C768087D6145B2&custID=1973154&ses_country_code=44&platform_type=web"}],"next_level":[{"label":"next_level","url":"next_level","game_id":"02000000A7C0DFB2DB202FCC283E2D667A4462232C90544FFB19DC29D30B3A9F0F61FB0A","game_target_id":"0200000045CAAC17DE14FF3A1F9E80A022D99279FA6A508AF620E0E65CE00B02DE208B91"}]}]}],"star_collect":1,"game_price":"50","booster_properties":[{"is_booster_available":0,"booster_award_id":0,"booster_game_price":0,"booster_popup_msg":""}],"error_url":"","error_reason":"","error_msg":""}';
//die;
//5) API Fail
//echo '{"transaction_id":"455AB30B-BF74-4022-BB1C-67FD906AA7FA","game_end":"","error_url":"..\/..\/game_redirect.php?type=thankspage&error=001","error_reason":"ncorrect/NULL Game_ID","error_msg":"There appears to be an issue with the game play. Click here to resolve."}';
//die;
?>

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
session_start();
require_once('gameProperty.php');
if (!isset($_SERVER['PHP_AUTH_USER'])) {
    header("WWW-Authenticate: Basic");
    header("HTTP/1.0 401 Unauthorized");
    echo '{"Error":"Unauthorized access"}';
    exit;
} else {
    if (($_SERVER['PHP_AUTH_USER'] == 'technical@hatchster.com') && ($_SERVER['PHP_AUTH_PW'] == 'bologna-djakarta-dervish')) {
        $isConstruct2Request = false;
        $json_str = file_get_contents('php://input');
        $game_data = json_decode($json_str);
        if (isset($game_data->construct2)) {
            $isConstruct2Request = true;
            $_POST['type'] = $game_data->type;
            if (isset($game_data->end)) {
                $_POST['end'] = $game_data->end;
            }
            if (isset($game_data->selection)) {
                $_POST['selection'] = $game_data->selection;
            }
            if (isset($game_data->reason)) {
                $_POST['reason'] = $game_data->reason;
            }
            if (isset($game_data->targets)) {
                $_POST['targets'] = $game_data->targets;
            }
            if (isset($game_data->restrictions)) {
                $_POST['restrictions'] = $game_data->restrictions;
            }
        }

        $PHP_Session_id = $_SESSION['sessionid'];
        $CustomerID = $_SESSION['custID'];
        $platform_type = $_SESSION['platform_type'];
        $country_code = $_SESSION['ses_country_code'];
        $customer_tournament_id = (isset($_SESSION['customer_tournament_id']) && $_SESSION['customer_tournament_id'] != '') ? $_SESSION['customer_tournament_id'] : "";

        if ($api_key != "") {
            $type = $_POST['type'];
            if (strtolower($type) == "gameevent") {

                if ($isConstruct2Request) {
                    $Transaction_id = $_SESSION["Transaction_id"];
                    $game_target_id = (isset($_SESSION['game_target_id']) && $_SESSION['game_target_id'] != '') ? $_SESSION['game_target_id'] : "";
                } else {
                    $Transaction_id = $_POST['transaction_id'];
                    $game_target_id = (isset($_POST['game_target_id']) && $_POST['game_target_id'] != '') ? $_POST['game_target_id'] : "";
                }

                $methodName = 'Method_2';
                $End = '';
                $Reason = '';
                $Targets = '';
                $Selection = '';
                $Restrictions = '';
				
				$request_array = Array("transaction_id" => $Transaction_id, "encrypt_customertournamentid" => $customer_tournament_id, "php_session_id" => $PHP_Session_id, "customerid" => $CustomerID, "methodname" => $methodName, "platform_type" => $platform_type, "country_code" => $country_code,"source_site"=>$_SERVER['HTTP_HOST']);

                if (isset($_POST['end']) && $_POST['end'] != "") {
                    $request_array['end'] = $_POST['end'];
                }
                if (isset($_POST['selection']) && $_POST['selection'] != "" && $_POST['selection'] != null) {
                    $request_array['selection'] = $_POST['selection'];
                }
                if (isset($_POST['reason']) && $_POST['reason'] != "") {
                    $request_array['reason'] = $_POST['reason'];
                }
                if (isset($_POST['targets']) && $_POST['targets'] != "") {
                    $request_array['targets'] = $_POST['targets'];
                }
                if (isset($_POST['restrictions']) && $_POST['restrictions'] != "") {
                    $request_array['restrictions'] = $_POST['restrictions'];
                }

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
