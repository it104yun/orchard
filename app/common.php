<?php 

function password_encode($password){
	$encode_pwd = password_hash($password, PASSWORD_DEFAULT);
	return $encode_pwd;
}

function password_valid($password,$hash){
	$result = password_verify($password, $hash);
	return $result;
}

?>