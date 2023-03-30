<?php
    require_once("../connect/connectDB.php");
    require_once("../allow_origin.php");
    allow_origin();

    $conn = create_connect();
    // $sql1 = "SELECT a.user_role, a.user_id,a.user_pwd,b.cust_name,b.gender,b.email,b.zipcode1,b.city1,b.dist1,b.address1,";
    $sql1 = "SELECT a.user_role, a.user_id,a.user_active,b.cust_name,b.gender,b.email,b.zipcode1,b.city1,b.dist1,b.address1,";
    $sql2 = "b.zipcode2,b.city2,b.dist2,b.address2,b.zipcode3,b.city3,b.dist3,b.address3,b.contract_id,b.contract_ip,b.contract_machine ";
    $sql3 = "FROM auth_info AS a, cust_info AS b WHERE  a.user_id = b.cust_id order by a.user_id desc";
    
    $result = excute_sql($conn, $sql1.$sql2.$sql3);
   

    if ( mysqli_num_rows( $result ) > 0) {
        // $rtn_info = array();
        // while($row = mysqli_fetch_array($result)){
        //     $rtn_info[] = $row;
        // }

        // $result_test = excute_sql($conn, $sql1.$sql2.$sql3);
        // $rtn_info_test = array();
        // while($row = mysqli_fetch_assoc($result_test)){
        //     $rtn_info_test[] = $row;
        // }

        // echo( '{"state":true,"message":"讀取資料成功!","data":'.json_encode($rtn_info).',"data_test":'.json_encode($rtn_info_test).'}');
        
        $result = excute_sql($conn, $sql1.$sql2.$sql3);
        $rtn_info = array();
        while($row = mysqli_fetch_assoc($result)){
            $rtn_info[] = $row;
        }
        echo( '{"state":true,"message":"讀取資料成功!","data":'.json_encode($rtn_info).'}');
    } else {
        echo( '{"state":false,"message":"讀取資料失敗!"}');
    }
    mysqli_close($conn);
?>