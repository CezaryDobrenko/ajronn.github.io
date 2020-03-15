<?php 
if(isset($_REQUEST))
{
			$servername = "127.0.0.1";
            $username = "root";
            $password = "";
            $dbname = "kanban";
            // Create connection
            $connect = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($connect->connect_error)
			{
               die("Connection failed: " . $connect->connect_error);
            } 
}
?>