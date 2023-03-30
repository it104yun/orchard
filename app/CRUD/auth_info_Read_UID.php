<?php 
// {"UID01":"3ae7c7f6461c475999746c8d3555c77d", "UID02":"744f9d5d0f2db2a93b0835b4ffd39789", "UID03":"b0a4f761a177b92dfa21536457c71089"}

require_once("../connect/connectDB.php");
require_once("../common.php");
require_once("../allow_origin.php");
allow_origin();

$data = file_get_contents("php://input", "r");
$mydata = array();
$mydata = json_decode($data, true);

if( isset($mydata["UID01"]) &&  isset($mydata["UID02"]) &&  isset($mydata["UID03"]) ){
    if( $mydata["UID01"] != "" && $mydata["UID02"] != "" && $mydata["UID03"] != ""){

        $p_uid01 = $mydata["UID01"];
        $p_uid02 = $mydata["UID02"];
        $p_uid03 = $mydata["UID03"];
 
        $conn = create_connect();
        $sql1 = "SELECT a.user_role, a.user_id,a.user_active,b.cust_name,b.gender,b.email,b.zipcode1,b.city1,b.dist1,b.address1,";
        $sql2 = "b.zipcode2,b.city2,b.dist2,b.address2,b.zipcode3,b.city3,b.dist3,b.address3,b.contract_id,b.contract_ip,b.contract_machine ";
        $sql3 = "FROM auth_info AS a, cust_info AS b WHERE  (a.user_id = b.cust_id) and (a.UID01='$p_uid01' and a.UID02='$p_uid02' and a.UID03='$p_uid03')";
        $result = excute_sql($conn, $sql1.$sql2.$sql3);
        if ( mysqli_num_rows($result)==1 ) {
            $row = mysqli_fetch_assoc($result);    //前端收到物件,js要使用 Objects.keys(data)( function (item) { return data[item] } )
            $rtn_info = '{"state":true,"message":"動作成功!","error_code":"0000","data":'.json_encode($row).'}';
            echo ($rtn_info); 

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