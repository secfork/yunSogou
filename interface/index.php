<?php
	//Ref OpenSSL: http://www.php.net/manual/en/ref.openssl.php
	$host = $_SERVER["SERVER_NAME"];
	$host = strstr($host,"yun.sogou");
	$file = "public_ol.pem";
	if($host===false){
	    $file = "public.pem";
	}

//	$file = "public.pem";//the public key file path
	$publicKey = openssl_get_publickey(file_get_contents($file));
	$base64str = $_REQUEST["token"];
	//echo "Token:";
	//echo $base64str;	
	$bcode = base64_decode($base64str);
	$sogou_user = "";
	openssl_public_decrypt($bcode,$sogou_user,$publicKey);
	//echo "<hr/>Current Login Information:<hr/>";
	echo $sogou_user;
?>
