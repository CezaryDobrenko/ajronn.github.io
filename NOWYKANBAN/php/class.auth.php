<?php

 
class Authorization {
 
private $_user;
private $_password;
private $_dbpdo;
 
public function __construct() {
try
{
global $pdo;
$this->_dbpdo = $pdo;
} 
catch(PDOException $error)
{
return $error->getMessage();
}
}
 
public function setUser($user) {
$this->_user = $user;
}
 
public function setPassword($password) {
$this->_password = $password; 
}
 
public function getUser() {
return $this->_user;
}
 
public function getPassword() {
return $this->_password;
}
 
public function validateUsr() {
if ( ($this->getUser())=='' || ($this->getPassword())=='' ) {
return false;
} else {
return true;
}
}
 
public function Hash() {
return sha1(md5($this->getPassword().$this->getPassword()));
}
 
public function Login() 
{
$password = $this->Hash();
$sql = $this->_dbpdo->prepare("SELECT * FROM users WHERE login=:user AND password=:password LIMIT 1");
$sql->bindValue(':user',$this->getUser(),PDO::PARAM_STR);
$sql->bindValue(':password',$password,PDO::PARAM_STR);
$sql->execute();
 
if ($row = $sql->fetch()) 
{
session_start();
$_SESSION['id_usr'] = $row['id'];
$_SESSION['email_usr'] = $row['email'];
$_SESSION['rola_usr'] = $row['rola'];
 
ini_set('session.cookie_httponly', 1); 
return true; 
} else {
return false;
}

$sql->closeCursor();
}
 
public function LogOut() {
session_start();
session_unset();
session_destroy();
}
 
}
?>