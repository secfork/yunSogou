<?php

	class RSAToolImpl {
	
		public function loadPublicKey($file) {
			return openssl_get_publickey(file_get_contents($file));
		}
		
		public function loadPrivateKey($file) {
			return openssl_get_privatekey(file_get_contents($file));
		}
		
		public function encryptWithKey($input, $key) {
			if(openssl_public_encrypt($input, $encrypted, $key))
				return $encrypted;
			else
				return FALSE;
		}
		
		public function decryptWithKey($input, $key) {
			if(openssl_private_decrypt($input, $decrypted, $key))
				return $decrypted;
			else
				return FALSE;
		}
		
		public function signWithKey($input, $key) {
			if(openssl_sign($input, $signature, $key))
				return $signature;
			else
				return FALSE;
		}
		
		public function verifyWithKey($input, $signature, $key) {
			return openssl_verify($input, $signature, $key);
		}
		
	}
?>