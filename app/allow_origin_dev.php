<?php 


    function allow_origin(){
        header("Access-Control-Allow-Origin: *");    //相當於大門倘開, 不可使用
        header("Access-Control-Allow-Headers: *");   //相當於大門倘開, 不可使用
    }
?>