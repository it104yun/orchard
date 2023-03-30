<?php 


    function allow_origin(){
        $http_origin = $_SERVER['HTTP_ORIGIN'];        //postman---這一行會有錯誤
        $allowed_domains = array(
            'http://localhost',
            'http://localhost:5500',
            'http://127.0.0.1',
            'http://127.0.0.1:5500',
            'https://lengthiest-cent.000webhostapp.com/',
            'http://it104yun.great-site.net/',
        );

        
        if (in_array($http_origin, $allowed_domains))
        {  
            header("Access-Control-Allow-Origin: $http_origin");
        }
    }
?>