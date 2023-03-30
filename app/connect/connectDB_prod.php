<?php
    // myDB_dev.php 開發階段的資料庫
    function create_connect(){
        $link = mysqli_connect("localhost", "id19920692_orchard", "wi4Zo9b[nJUHY(5<","id19920692_orchardxu") or die("...開發階段資料庫無法連線..." . mysqli_connect_error());
        return $link;
    
    }

    function excute_sql($conn, $sql){
        mysqli_query($conn, "SET NAMES UTF8;");
        $result = mysqli_query($conn,$sql);
        return $result;
    }

?>