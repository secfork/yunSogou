<?php
	require_once "RSAToolImpl.class.php";
	
	class RSAToolFactory {
	
		public static function getRSATool() {
			return new RSAToolImpl();
		}
	
	}

?>