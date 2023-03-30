<?php
// {"action":"login","user_id":"0900111001","user_pwd":"Abcde001"}
// {"action":"cust_info_login","user_id":"0900111001","user_pwd":"000","cust_name":"江月月","gender":"1","email":"xx22@abc.com","zipcode1":"4356","city1":"台中市","dist1":"外埔區","address1":"中山路十段10巷100號"}
// {"action":"cust_info_edit","user_id":"0900111001","user_pwd":"000","cpassword1":"","cust_name":"江月月","email":"xx22@abc.com","zipcode1":"43506","city1":"台中市","dist1":"外埔區","address1":"中山路十段10巷100號","zipcode2":"11122","city2":"pppprl","dist2":"====","address2":"ddd十段10巷100號","zipcode3":"22222","city3":"llrrrl","dist3":"----","address3":"中山路-----"}
require_once("../connect/connectDB.php");
require_once("../common.php");
require_once("../allow_origin.php");
allow_origin();

$data = file_get_contents("php://input", "r");
$mydata = array();
$mydata = json_decode($data, true);

if( isset($mydata["user_id"]) &&  isset($mydata["user_pwd"]) ){
    if( $mydata["user_id"] != "" && $mydata["user_pwd"] != "" ){

        $user_id = $mydata["user_id"];
        $user_pwd = $mydata["user_pwd"];
 
        $conn = create_connect();
        $sql1 = "SELECT a.user_role, a.user_id,a.user_pwd,a.user_active,b.cust_name,b.gender,b.email,b.zipcode1,b.city1,b.dist1,b.address1,";
        $sql2 = "b.zipcode2,b.city2,b.dist2,b.address2,b.zipcode3,b.city3,b.dist3,b.address3,b.contract_id,b.contract_ip,b.contract_machine ";
        // $sql3 = "FROM auth_info AS a, cust_info AS b WHERE  (a.user_id = b.cust_id) and (a.user_id='$user_id' and a.user_pwd='$user_pwd')";
        $sql3 = "FROM auth_info AS a, cust_info AS b WHERE  (a.user_id = b.cust_id) and (a.user_id='$user_id')";
        $result = excute_sql($conn, $sql1.$sql2.$sql3);
        if ( mysqli_num_rows($result)==1 ) {
            $row = mysqli_fetch_assoc($result);
            if ( password_valid($user_pwd,$row['user_pwd']) ){
                $curr_action = $mydata["action"];
                unset($row['user_pwd']);     // remove password
                // echo json_encode($row);   // after remove password show $row
                switch ($curr_action) {
                    case "login":
                        // 登入成功,產生uid,更新uid-----------------------------------------------------------------------------------------------------------begin
                        $uid1 = substr(md5(hash('sha256', date("YmdHis"))), substr(date("s"), 1, 1), 16).substr(md5(hash('sha256', date("YmdHis"))), -16, 16);
                        $uid2 = substr(md5(hash('sha256', uniqid())), substr(date("h"), 1, 1), 16).substr(md5(hash('sha256', uniqid())), -16, 16);
                        $uid3 = substr(md5(hash('sha256', rand())), substr(date("i"), 1, 1), 16).substr(md5(hash('sha256', rand())), -16, 16);
                        $sql = "update auth_info set UID01='$uid1',UID02='$uid2',UID03='$uid3' where user_id='$user_id'";
                        $result = excute_sql($conn, $sql);
                        $uid_array = array();
                        $uid_array["UID01"] = $uid1;
                        $uid_array["UID02"] = $uid2;
                        $uid_array["UID03"] = $uid3;
                        // 登入成功,產生uid,更新uid------------------------------------------------------------------------------------------------------------end
                        $rtn_info = '{"state":true,"message":"動作成功!","error_code":"0000","UID":'.json_encode($uid_array).',"data":'.json_encode($row).'}';
                        break;
                    case "cust_info_login":
                        $rtn_info =  '{"state":true,"message":"動作成功!","error_code":"0000","data":'.json_encode($row).'}';
                        break;
                    default:
                        $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"0001"}';
                }
                echo ($rtn_info); 
            } else {
                //密碼不符
                $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"0001"}';
                echo ($rtn_info); 
            }
        } else {
            $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"0010"}';
            echo ($rtn_info); 
        }
        mysqli_close($conn);  
    } else {
        $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"1000"}';
        echo ($rtn_info);  
    }
} else {
    $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"2000"}';
    echo ($rtn_info); 
}
// error_code : 共四碼, 第1碼0,已對資料庫有所動作, 但無法順利的CRUD
//                     第1碼1,欄位為空白
//                     第1碼2,缺少欄位
//   
?>