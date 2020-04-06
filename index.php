<?php
	require_once('php/connection.php');
	$sql = "SELECT * FROM kolumny";
	$result = $connect->query($sql);
	$ar = $result->fetch_all(MYSQLI_NUM);	
	$sql = "SELECT * FROM notki";
	$result = $connect->query($sql);
	$ar2 = $result->fetch_all(MYSQLI_NUM);	
?>
<script>
	var colArr = <?php echo json_encode($ar); ?>; 
	var noteArr = <?php echo json_encode($ar2); ?>;
	var autor = "default";
</script>

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
<body class="yellow lighten-5">
<!-- MENU -->
<nav class="navbar navbar-expand-lg navbar-dark orange darken-1">
    <a class="navbar-brand" href="#">TABLICA KANBAN</a>
    <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon "></span>
    </button>

    <div class="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo02">

    </div>
</nav>
<!-- MENU -->
<div class="container"></div>


<!-- Kanban board -->

<section class = "kanban-container yellow lighten-5 ">
	<div class = "positioner">
		<!-- Columns inside kanban -->
	</div>
</section>

<div class="container my-5 placetocreatecard">
        <div class="row justify-content-md-center">
				<div style = "width: 450px; " >
						<div class="column" id = "dropzone" style = "height: 100px;">
								<!-- New Note -->
						</div>
				</div>
        </div>
</div>

<!-- FOOTER -->
<footer class="page-footer font-small orange darken-1">
     <div class="container">
            <div class="row">
    				<div id = "notefield" style = "height: 112px;">
    				</div>
            </div>
        </div>

    <div class="footer-copyright text-center py-4">TABLICA KANBAN - PROJEKT ZESPOŁOWY</div>
</footer>
<!-- FOOTER -->
<script src="js/skrypt.js"></script>
</body>
</html>