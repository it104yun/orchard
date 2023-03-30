<?php
    require_once("../allow_origin.php");
    allow_origin();

    $rtn_data = array();
    require_once("../connect/connectDB.php");
    $conn = create_connect();
    $sql = "SELECT count(user_active) as user_count,user_active FROM auth_info GROUP by user_active";
    $result = excute_sql($conn, $sql);
    $user_numY = 0;
    $user_numN = 0;
    if (mysqli_num_rows( $result ) > 0){
        while($row = mysqli_fetch_assoc($result)){
            switch ($row['user_active']){
                case "Y":
                    $user_numY = $row['user_count'];
                    $rtn_data['user_numY'] = $user_numY;
                    break;
                case "N":
                    $user_numN = $row['user_count'];
                    $rtn_data['user_numN'] = $user_numN;
                    break;
                default:
                    break;
            }
        };
        $rtn_data['user_num'] = $user_numY + $user_numN;

        // 統計各縣市分怖人數
        $sql = "SELECT count(city1) as city1_num,city1 FROM cust_info group by city1";
        $result = excute_sql($conn, $sql);
        $rtn_count_city = array();
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $rtn_count_city[] = $row;
            };
        };
    } else {
        $rtn_data['user_num'] = 0;
    };
    $rtn_info = '{"state":true,"message":"動作完成","error_code":"0000","data":'.json_encode($rtn_data).',"data_city":'.json_encode($rtn_count_city).'}';
    echo ($rtn_info); 
    mysqli_close($conn);         
?>