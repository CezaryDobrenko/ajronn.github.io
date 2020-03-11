<?php
	require_once('connection.php');

	$data = $_POST['d'];
	
	if(isset($data))
	{
		$sql = 'DELETE FROM notes';
		$connect->query($sql);
		for($i = 0 ; $i< count($data); $i=$i+4)
		{
			$sql = 'INSERT INTO notes (title,text,id_row,noteid) VALUES("'.$data[$i+1].'","'.$data[$i+2].'","'.$data[$i+3].'","'.$data[$i+0].'")';
			$connect->query($sql);
		}

	}

?>