<?php
    require_once("../connect/connectDB.php");
    require_once("../allow_origin.php");
    allow_origin();

    $conn = create_connect();
    $sql = "select * from product";
    $result = excute_sql($conn, $sql);

    if ( mysqli_num_rows( $result ) > 0) {
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