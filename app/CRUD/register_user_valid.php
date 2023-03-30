<?php
// {"user_id":"0900111001"}

require_once("../allow_origin.php");
allow_origin();

$data = file_get_contents("php://input", "r");
$mydata = array();
$mydata = json_decode($data, true);

if( isset($mydata["user_id"])  && $mydata["user_id"] != "" ){
        $user_id = $mydata["user_id"];
        require_once("../connect/connectDB.php");
        $conn = create_connect();
        $sql = "SELECT user_id FROM auth_info where user_id = '$user_id'";
        $result = excute_sql($conn, $sql);

        if ( mysqli_num_rows($result)==1 ) {
            $rtn_info = '{"state":false,"message":"帳號已存在,請更換帳號!","error_code":"1000"}';
            echo ($rtn_info); 
        } else {
            $rtn_info = '{"state":true,"message":"帳號不存在,請繼續註冊!","error_code":"0000"}';
            echo ($rtn_info); 
        }
        mysqli_close($conn);         
} else {
    $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"2000"}';
    echo ($rtn_info); 
}
   
?>