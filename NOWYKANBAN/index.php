<?php
//Syfne logowanie byle sprawdzić czy działa
session_start();
if(isset($_POST['email']) && isset($_POST['haslo'])){
	require_once('php/connection.php');
	$sql = "SELECT * FROM user";
	$result = $connect->query($sql);
	$ar = $result->fetch_all(MYSQLI_NUM);	
	foreach ($ar as $item) {
		if($_POST['email'] == $item[1]){
			if($_POST['haslo'] == $item[2]){
				$_SESSION["email"] = $item[1];
				$_SESSION["rola"] = $item[3];
				header('Location: kanban.php');
			}
		}
	}
}
if(isset($_SESSION["email"])){
	header('Location: kanban.php');
}
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>TABLICA KANBAN</title>
    <meta name="author" content="UNITEAM">
    <meta name="keywords" content="tablica, kanban">
    <meta name="description" content="TABLICA KANBAN">

    <!-- JQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <script
            src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
            integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
            crossorigin="anonymous"></script>

    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossorigin="anonymous"></script>

    <!-- WTYCZKA DO BOOTSTRAPA -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.6/css/mdb.min.css"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css">
    <link rel="stylesheet" href="css/style.css">
	



    <!-- PALETĘ KOLORÓW BRAŁEM Z https://mdbootstrap.com/docs/jquery/css/colors/ -->


</head>
<body class="amber lighten-5">
<!-- MENU -->
<nav class="navbar navbar-expand-lg navbar-dark orange darken-1">
    <a class="navbar-brand" href="#">TABLICA KANBAN</a>
    <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon "></span>
    </button>

    <div class="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo02">
        <ul class="nav navbar-nav flex-row justify-content-between ml-auto">

            <li class="dropdown order-1">
                <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn orange lighten-1 dropdown-toggle">
                    Login <span class="caret"></span></button>
                <ul class="dropdown-menu dropdown-menu-right mt-2">
                    <li class="px-3 py-2">
                        <form action = "" method = "POST" class="form" role="form">
                            <div class="form-group">
                                <input id="emailInput" placeholder="Email" class="form-control form-control-sm"
                                       name="email" type="text" required="">
                            </div>
                            <div class="form-group">
                                <input id="passwordInput" placeholder="Password" class="form-control form-control-sm"
                                       name="haslo" type="text" required="">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn orange lighten-1 btn-block">Login</button>
                            </div>
                        </form>
                    </li>
                </ul>
            </li>
        </ul>

    </div>
</nav>
<!-- MENU -->

<!-- Kanban board -->

<section style="height: 714px">
	<div>
		<div>
			<h1 class="text-center mt-5">ZALOGUJ SIĘ ABY MIEĆ DOSTĘP DO TABLICY</p>
			<img class="klodka mt-5" src = "img/klodka.png">
		</div>
	</div>
</section>

<!-- FOOTER -->
<footer class="page-footer font-small orange darken-1">
    <div class="container">
        <div class="row">
				<div style = "height: 112px;">
				</div>
        </div>
    </div>
    <div class="footer-copyright text-center py-4">TABLICA KANBAN - PROJEKT ZESPOŁOWY</div>
</footer>
<!-- FOOTER -->
</body>
</html>