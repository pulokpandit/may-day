<?php
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
        $json_str = file_get_contents('php://input');
        $game_data = json_decode($json_str);
        
        if (isset($game_data->construct2)) {
            $_POST['type'] = $game_data->type;
        }
       
        $CustomerID = $_SESSION['custID'];
        $PHP_Session_id = $_SESSION['sessionid'];
        $platform_type = $_SESSION['platform_type'];
        $country_code = $_SESSION['ses_country_code'];
		$game_id = $_SESSION['GameID'];
        
        if ($api_key != "") {
            $type = $_POST['type'];
            if (strtolower($type) == "goal_grid") {
                
                $methodName = 'Request_Goal_Grid';
                $request_array = Array("encrypt_gameid" => $game_id, "php_session_id" => $PHP_Session_id, "customerid" => $CustomerID, "methodname" => $methodName, "platform_type" => $platform_type, "country_code" => $country_code);
				
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
