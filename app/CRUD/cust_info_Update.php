<?php
// {"user_id":"0900111001","user_pwd":"111","cpassword1":"","cust_name":"江月月","email":"xx22@abc.com","zipcode1":"43506","city1":"台中市","dist1":"外埔區","address1":"中山路十段10巷100號","zipcode2":"11122","city2":"pppprl","dist2":"====","address2":"ddd十段10巷100號","zipcode3":"22222","city3":"llrrrl","dist3":"----","address3":"中山路-----"}

require_once("../allow_origin.php");
allow_origin();

    require_once("../connect/connectDB.php");
    require_once("../common.php");
    $data = file_get_contents("php://input", "r");
    $mydata = array();
    $mydata = json_decode($data, true);
    if( isset($mydata["user_id"]) &&  isset($mydata["user_pwd"]) && isset($mydata["cust_name"]) && 
        isset($mydata["email"]) && isset($mydata["zipcode1"]) && 
        isset($mydata["city1"]) && isset($mydata["dist1"]) && isset($mydata["address1"]) 
       )
       {
        if( $mydata["user_id"] != "" && $mydata["user_pwd"] != "" && $mydata["cust_name"] != "" && 
            $mydata["email"]!= "" && $mydata["zipcode1"]!= "" && 
            $mydata["city1"]!="" && $mydata["dist1"]!="" && $mydata["address1"]!=""
          )
          {
            $conn = create_connect();
            $user_id = $mydata["user_id"];
            $user_pwd = $mydata["user_pwd"];
            //Double check password
            // $sql = "SELECT user_id,user_pwd FROM auth_info  WHERE  user_id='$user_id' and user_pwd='$user_pwd' ";
            $sql = "SELECT user_id,user_pwd FROM auth_info  WHERE  user_id='$user_id'";
            $result = excute_sql($conn, $sql);

            if ($result && mysqli_affected_rows($conn) == 1) {
                $cpassword1 = $mydata["cpassword1"];
                if ($cpassword1 != "") {
                    $pwd= password_encode($cpassword1); //加密後再儲存
                    $sql = "UPDATE auth_info SET user_pwd='$pwd' WHERE user_id='$user_id'";
                    $result = excute_sql($conn, $sql);
                };

                $cust_name = $mydata["cust_name"];
                $email = $mydata["email"];

                $zipcode1 = $mydata["zipcode1"];
                $city1 = $mydata["city1"];
                $dist1 = $mydata["dist1"];
                $address1 = $mydata["address1"];

                $zipcode2 = $mydata["zipcode2"];
                $city2 = $mydata["city2"];
                $dist2 = $mydata["dist2"];
                $address2 = $mydata["address2"];

                $zipcode3 = $mydata["zipcode3"];
                $city3 = $mydata["city3"];
                $dist3 = $mydata["dist3"];
                $address3 = $mydata["address3"];

                $sql = "UPDATE cust_info SET cust_name='$cust_name',email='$email',
                            zipcode1='$zipcode1',city1='$city1',dist1='$dist1',address1='$address1',
                            zipcode2='$zipcode2',city2='$city2',dist2='$dist2',address2='$address2',
                            zipcode3='$zipcode3',city3='$city3',dist3='$dist3',address3='$address3' 
                            WHERE cust_id='$user_id'";
                $result = excute_sql($conn, $sql);
                if ($result && mysqli_affected_rows($conn) == 1) {
                    $rtn_info = '{"state":true,"message":"動作成功!","error_code":"0000"}';
                } else {
                    //更新未成功
                    $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"0010"}';
                }
                
            } else{
                //帳密不符
                $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"0001"}';
            }
            mysqli_close($conn);
        } 
    else {
        //欄位空白
        $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"1000"}';
    }
} 
else {
    //缺少欄位
    $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"2000"}';
}
echo ($rtn_info);
// error_code : 共四碼, 第1碼0,已對資料庫有所動作, 但無法順利的CRUD
//                     第1碼1,欄位為空白
//                     第1碼2,缺少欄位
//                     
?>