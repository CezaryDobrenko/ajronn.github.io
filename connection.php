<?php 
if(isset($_REQUEST))
{
			$servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "s145920";
			
            // Create connection
            $connect = new mysqli($servername, $username, $password, $dbname);

            // Check connection
            if ($connect->connect_error) {
               die("Connection failed: " . $connect->connect_error);
            } 
}
?>