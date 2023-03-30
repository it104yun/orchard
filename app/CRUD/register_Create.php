<?php
// {"user_id":"0901000000","user_pwd":"000","cust_name":"江月月","gender":"1","email":"xx22@abc.com","zipcode1":"4356","city1":"台中市","dist1":"外埔區","address1":"中山路十段10巷100號"}

require_once("../allow_origin.php");
allow_origin();

    $data = file_get_contents("php://input", "r");
    $mydata = array();
    $mydata = json_decode($data, true);
    if( isset($mydata["user_id"]) &&  isset($mydata["user_pwd"]) && isset($mydata["cust_name"]) && 
        isset($mydata["gender"]) && isset($mydata["email"]) && isset($mydata["zipcode1"]) && 
        isset($mydata["city1"]) && isset($mydata["dist1"]) && isset($mydata["address1"]) 
       )
       {
        if( $mydata["user_id"] != "" && $mydata["user_pwd"] != "" && $mydata["cust_name"] != "" && 
            $mydata["gender"] != "" && $mydata["email"]!= "" && $mydata["zipcode1"]!= "" && 
            $mydata["city1"]!="" && $mydata["dist1"]!="" && $mydata["address1"]!=""
          )
          {
            require_once("../connect/connectDB.php");
            require_once("../common.php");
            $conn = create_connect();
            $user_id = $mydata["user_id"];
            // $user_pwd = $mydata["user_pwd"];
            $user_pwd = password_encode($mydata["user_pwd"]);
            $cust_name = $mydata["cust_name"];
            $gender = $mydata["gender"] ;
            $email = $mydata["email"];
            $zipcode1 = $mydata["zipcode1"];
            $city1 = $mydata["city1"];
            $dist1 = $mydata["dist1"];
            $address1 = $mydata["address1"];
            // 配送地址2,配送地址3,合約同意資訊-----------------------------------------------begin
            // 配送地址2---
            if (isset($mydata["zipcode2"])) {
                $zipcode2 = $mydata["zipcode2"];
            } else {
                $zipcode2 = "---";
            }
            if (isset($mydata["city2"])) {
                $city2 = $mydata["city2"];
            } else {
                $city2 = "---";
            }
            if (isset($mydata["dist2"])) {
                $dist2 = $mydata["dist2"];
            } else {
                $dist2 = "---";
            }
            if (isset($mydata["address2"])) {
                $address2 = $mydata["address2"];
            } else {
                $address2 = "---";
            }
            // 配送地址3---
            if (isset($mydata["zipcode3"])) {
                $zipcode3 = $mydata["zipcode3"];
            } else {
                $zipcode3 = "---";
            }
            if (isset($mydata["city3"])) {
                $city3 = $mydata["city3"];
            } else {
                $city3 = "---";
            }
            if (isset($mydata["dist3"])) {
                $dist3 = $mydata["dist3"];
            } else {
                $dist3 = "---";
            }
            if (isset($mydata["address3"])) {
                $address3 = $mydata["address3"];
            } else {
                $address3 = "---";
            }
            //合約
            // contract_id,contract_ip,contract_machine
            if (isset($mydata["contract_id"])) {
                $contract_id = $mydata["contract_id"];
            } else {
                $contract_id = 999999999;   //最多只能9位
            }
            if (isset($mydata["contract_ip"])) {
                $contract_ip = $mydata["contract_ip"];
            } else {
                $contract_ip = "---";
            }
            if (isset($mydata["contract_machine"])) {
                $contract_machine = $mydata["contract_machine"];
            } else {
                $contract_machine = "---";
            }
            // 配送地址2,配送地址3,合約同意資訊------------------------------------------------end
            $sql1 = "insert into auth_info(user_role,user_id,user_pwd) VALUES('Customer','$user_id','$user_pwd')";
            $sql2 = "INSERT INTO cust_info(cust_id, cust_name, gender,email,zipcode1,city1,dist1,address1,
                     zipcode2,city2,dist2,address2,zipcode3,city3,dist3,address3,contract_id,contract_ip,contract_machine) 
                     VALUES ('$user_id','$cust_name','$gender','$email','$zipcode1','$city1','$dist1','$address1',
                     '$zipcode2','$city2','$dist2','$address2','$zipcode3','$city3','$dist3','$address3',
                     '$contract_id','$contract_ip','$contract_machine')"; 
            $result1 = excute_sql($conn,$sql1);
            $result2 = excute_sql($conn,$sql2);
            if ( $result1 && $result2 && mysqli_affected_rows($conn)==1 ) {
                $rtn_info = '{"state":true,"message":"動作成功!","error_code":"0000"}';
                echo ($rtn_info);
            } else  {
                $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"0010"}';
                echo ($rtn_info);
            }
            mysqli_close($conn);
    } 
    else {
        $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"1000"}';
        echo ($rtn_info); 
    }
} 
else {
    $rtn_info = '{"state":false,"message":"動作失敗!","error_code":"2000"}';
    echo ($rtn_info); 
}
// error_code : 共四碼, 第1碼0,已對資料庫有所動作, 但無法順利的CRUD
//                     第1碼1,欄位為空白
//                     第1碼2,缺少欄位
//                     
?>