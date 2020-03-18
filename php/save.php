<?php
	require_once('connection.php');
	
	if(isset($_POST['d']))
	{
		$data = $_POST['d'];
		$sql = 'DELETE FROM kolumny';
		$connect->query($sql);
		for($i = 0 ; $i< count($data); $i++)
		{
			$sql = 'INSERT INTO kolumny (title,id_col,max_notes) VALUES("'.$data[$i][0].'","'.$data[$i][1].'","'.$data[$i][2].'")';
			$connect->query($sql);
		}
	}

?>