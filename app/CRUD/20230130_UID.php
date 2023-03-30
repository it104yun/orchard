<?php
echo "rand()=".rand()."<br />";
echo "uniqid()=".uniqid()."<br />";
echo 'date("YmdHis")='.date("YmdHis")."<br />";
echo "hash()=".hash('sha256',date("YmdHis"))."<br />";
echo "md5()=".md5(date("YmdHis"))."<br />";
echo "time()=".time()."<br />";

// 產生6個字的隨機變數
echo "產生6個字的隨機變數<br />";
echo substr(md5(hash('sha256',date("YmdHis"))),substr(date("s"),1,1),6)."<br />";   //依秒數的尾數,來看開始取值的位置
?>