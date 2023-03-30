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
        $sql1 = "delete from auth_info WHERE user_id='$user_id'";
        $sql2 = "delete from cust_info WHERE cust_id='$user_id'";
        if ( excute_sql($conn, $sql1) && excute_sql($conn, $sql2) && mysqli_affected_rows($conn)==1 ) {
        // if ( mysqli_affected_rows($conn)==1 ) {
             $rtn_info = '{"state":true,"message":"動作成功!","error_code":"0000"}';
            echo ($rtn_info); 
        } else {
            $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"0001"}';
            echo ($rtn_info); 
        }
        mysqli_close($conn);         
} else {
    $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"2000"}';
    echo ($rtn_info); 
}
   
?>