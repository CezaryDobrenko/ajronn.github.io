<?php 
if(isset($_REQUEST))
{
			$servername = "bad.uwm.edu.pl";
            $username = "wozniakk";
            $password = "kacper";
            $dbname = "wozniakk";
            // Create connection
            $connect = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($connect->connect_error)
			{
               die("Connection failed: " . $connect->connect_error);
            } 
}
?>