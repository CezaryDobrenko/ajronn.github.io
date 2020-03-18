<?php
	require_once('connection.php');
	$sql = 'DELETE FROM kolumny';
	$connect->query($sql);
	$sql = 'DELETE FROM notki';
	$connect->query($sql);
?>