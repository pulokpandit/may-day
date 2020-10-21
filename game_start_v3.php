<?php
echo '{"transaction_id":"729AF951-ABB2-46AB-9581-7EB664A09685","response":"Start","error_url":"","error_reason":"","error_msg":""}';
die;
?>

header("Access-Control-Allow-Origin: *");
session_start();

require_once('gameProperty.php');
if (!isset($_SERVER['PHP_AUTH_USER'])) {
    header("WWW-Authenticate: Basic");
    header("HTTP/1.0 401 Unauthorized");
    echo '{"Error":"Unauthorized access1"}';
    exit;
} else {
    if (($_SERVER['PHP_AUTH_USER'] == 'technical@hatchster.com') && ($_SERVER['PHP_AUTH_PW'] == 'bologna-djakarta-dervish')) {

        $isConstruct2Request = false;
        $json_str = file_get_contents('php://input');
        $game_data = json_decode($json_str);
        if (isset($game_data->construct2)) {
            $isConstruct2Request = true;
            $_POST['type'] = $game_data->type;
        }

        $CustomerID = $_SESSION['custID'];
        $country_code = $_SESSION['ses_country_code'];
        $customer_tournament_id = (isset($_SESSION['customer_tournament_id']) && $_SESSION['customer_tournament_id'] != '') ? $_SESSION['customer_tournament_id'] : "";

        if ($api_key != "") {
            $type = $_POST['type'];
            if (strtolower($type) == "requestgamestart") {
                if ($isConstruct2Request) {
                    $customerAwardLogID = $_SESSION['customerAwardLogID'];
                    $game_id = $_SESSION['GameID'];
                    $game_target_id = (isset($_SESSION['game_target_id']) && $_SESSION['game_target_id'] != '') ? $_SESSION['game_target_id'] : "";
                } else {
                    $customerAwardLogID = $_POST['customer_award_log_id'];
                    $game_id = $_POST['game_id'];
                    $game_target_id = (isset($_POST['game_target_id']) && $_POST['game_target_id'] != '') ? $_POST['game_target_id'] : "";
                }

                $methodName = 'Method_1';
                $PHP_Session_id = $_SESSION['sessionid'];
                $platform_type = $_SESSION['platform_type'];
                $request_array = Array("encrypt_gameid" => $game_id, "encrypt_customerawardlogid" => $customerAwardLogID, "encrypt_customertournamentid" => $customer_tournament_id, "encrypt_game_target_id" => $game_target_id, "php_session_id" => $PHP_Session_id, "customerid" => $CustomerID, "methodname" => $methodName, "platform_type" => $platform_type, "country_code" => $country_code);
                
                $request_json = json_encode($request_array, true);

                $result = callStoredProcWithParams($request_json);
				
                $tmpResult = json_decode($result);
				
                $_SESSION['Transaction_id'] = $tmpResult->transaction_id;
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
        echo '{"Error":"Unauthorized access2"}';
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
