<?php
// {"user_id":"0900111001","user_active":"Y"}
// {"user_id":"0900111001","user_role":"Customer"}

require_once("../allow_origin.php");
allow_origin();

$data = file_get_contents("php://input", "r");
$mydata = array();
$mydata = json_decode($data, true);


if (isset($mydata["user_id"]) && ( isset($mydata["user_active"]) || isset($mydata["user_role"]) ) ) {
    if ($mydata["user_id"] != "" ) {
        require_once("../connect/connectDB.php");
        $conn = create_connect();
        $user_id = $mydata["user_id"];
        if (isset($mydata["user_active"])) {
            $user_active = $mydata["user_active"];
            $sql = "update auth_info set user_active='$user_active' where user_id='$user_id'";
        } else {
            $user_role = $mydata["user_role"];
            $sql = "update auth_info set user_role='$user_role' where user_id='$user_id'";
        }
        if (excute_sql($conn, $sql) && mysqli_affected_rows($conn) == 1) {
            $rtn_info = '{"state":true,"message":"動作成功!","error_code":"0000"}';
        } else {
            $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"0001"}';
        }
        mysqli_close($conn);
    } else {
        $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"1000"}';
    }
} else {
    $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"2000"}';
}
echo ($rtn_info);

?>