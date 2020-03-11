<?php
	require_once('connection.php');
	$sql = "SELECT * FROM notes";
	$result = $connect->query($sql);
	$ar = $result->fetch_all(MYSQLI_NUM);
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
    <link rel="stylesheet" href="mainstyle.css">


    <!-- PALETĘ KOLORÓW BRAŁEM Z https://mdbootstrap.com/docs/jquery/css/colors/ -->


</head>
<body class="indigo lighten-5">
<!-- MENU -->
<nav class="navbar navbar-expand-lg navbar-dark info-color-dark">
    <a class="navbar-brand" href="#">TABLICA KANBAN</a>
    <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon "></span>
    </button>

    <div class="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo02">
        <ul class="nav navbar-nav flex-row justify-content-between ml-auto">

            <li class="dropdown order-1">
                <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-info dropdown-toggle">
                    Login <span class="caret"></span></button>
                <ul class="dropdown-menu dropdown-menu-right mt-2">
                    <li class="px-3 py-2">
                        <form class="form" role="form">
                            <div class="form-group">
                                <input id="emailInput" placeholder="Email" class="form-control form-control-sm"
                                       type="text" required="">
                            </div>
                            <div class="form-group">
                                <input id="passwordInput" placeholder="Password" class="form-control form-control-sm"
                                       type="text" required="">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-info btn-block">Login</button>
                            </div>
                        </form>
                    </li>
                </ul>
            </li>
        </ul>

    </div>
</nav>
<!-- MENU -->

<!-- MAIN -->
<section ondrop="makenote()">
    <div class="container-fluid mb-5">
        <div class="lists mb-5">
            <div class="row flex-row flex-sm-nowrap py-5">
                <div class="col-sm-3 col-md-3 backlog list" id="backlogid">
					<div class="card">
                        <div class="card-block red lighten-4 py-3">
                            <h4 class="card-title text-center py-2 ">Backlog<div id="counterb" style = "display: none;">0</div><br>Infinity</h4>

                            <!-- KARTKI -->
							
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 col-md-3 inprogress list" id="inprogressid">

                    <div class="card">
                        <div class="card-block deep-purple lighten-4 py-3">
                            <h4 class="card-title text-center py-2">In Progress<div id="counteri" style = "display: none;">0/4</div><br>max 3</h4>
                            
							<!-- KARTKI -->
							
                        </div>
                    </div>

                </div>
                <div class="col-sm-3 col-md-3 peerreview list" id="peerreviewid">
                    <div class="card">
                        <div class="card-block green lighten-4 py-3">
                            <h4 class="card-title text-center py-2">Peer Review<div id="counterp" style = "display: none;">0/4</div><br>max 3</h4>
                            
							<!-- KARTKI -->
							
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 col-md-3 done list" id="doneid">
                    <div class="card">
                        <div class="card-block deep-orange lighten-4 py-3">
                            <h4 class="card-title text-center py-2">Done<div id="counterin" style = "display: none;">0</div><br>Infinity</h4>
                            
							<!-- KARTKI -->
							
                        </div>
                    </div>
                </div>
            </div>
        </div>
		
		<!-- Swingline -->
		
		<div class="swingline" style = "display: inline-block; width: 100%; min-height: 50px; border: 1px solid black;" id="s0">
            <div class="row flex-row">
                <div class="col-sm-3 col-md-3 s1backlog list" id="10">
					<div class="card my-2">
                        <div class="card-block red lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">1</h4>

                            <!-- KARTKI -->
							
                        </div>
                    </div>
                </div>
				<div class="col-sm-3 col-md-3 s1inprogress list" id="11">

                    <div class="card my-2">
                        <div class="card-block deep-purple lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">2</h4>
                            
							<!-- KARTKI -->
							
                        </div>
                    </div>

                </div>
                <div class="col-sm-3 col-md-3 s1peerreview list" id="12">
                    <div class="card my-2">
                        <div class="card-block green lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">3</h4>
                            
							<!-- KARTKI -->
							
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 col-md-3 s1done list" id="13">
                    <div class="card my-2">
                        <div class="card-block deep-orange lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">4</h4>
                            
							<!-- KARTKI -->
							
                        </div>
                    </div>
                </div>
            </div>
					<div style = "text-align: center;">Swingline Kacper Woźniak (LIDER)</div>
		</div>

		<div class="swingline" style = "display: inline-block; width: 100%; min-height: 50px; border: 1px solid black;" id="s1">
            <div class="row flex-row">
                <div class="col-sm-3 col-md-3 s2backlog list" id="20">
					<div class="card my-2">
                        <div class="card-block red lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">1</h4>

                            <!-- KARTKI -->

                        </div>
                    </div>
                </div>
				<div class="col-sm-3 col-md-3 s2inprogress list" id="21">

                    <div class="card my-2">
                        <div class="card-block deep-purple lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">2</h4>

							<!-- KARTKI -->

                        </div>
                    </div>

                </div>
                <div class="col-sm-3 col-md-3 s2peerreview list" id="22">
                    <div class="card my-2">
                        <div class="card-block green lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">3</h4>

							<!-- KARTKI -->

                        </div>
                    </div>
                </div>
                <div class="col-sm-3 col-md-3 s2done list" id="23">
                    <div class="card my-2">
                        <div class="card-block deep-orange lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">4</h4>

							<!-- KARTKI -->

                        </div>
                    </div>
                </div>
            </div>
			<div style = "text-align: center;">Swingline Paweł Bartko</div>
		</div>
		
		<div class="swingline" style = "display: inline-block; width: 100%; min-height: 50px; border: 1px solid black;" id="s2">
            <div class="row flex-row">
                <div class="col-sm-3 col-md-3 s3backlog list" id="30">
					<div class="card my-2">
                        <div class="card-block red lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">1</h4>

                            <!-- KARTKI -->

                        </div>
                    </div>
                </div>
				<div class="col-sm-3 col-md-3 s3inprogress list" id="31">

                    <div class="card my-2">
                        <div class="card-block deep-purple lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">2</h4>

							<!-- KARTKI -->

                        </div>
                    </div>

                </div>
                <div class="col-sm-3 col-md-3 s3peerreview list" id="32">
                    <div class="card my-2">
                        <div class="card-block green lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">3</h4>

							<!-- KARTKI -->

                        </div>
                    </div>
                </div>
                <div class="col-sm-3 col-md-3 s3done list" id="33">
                    <div class="card my-2">
                        <div class="card-block deep-orange lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">4</h4>

							<!-- KARTKI -->

                        </div>
                    </div>
                </div>
            </div>
			<div style = "text-align: center;">Swingline Piotr Warmiński</div>
		</div>
		
		<div class="swingline" style = "display: inline-block; width: 100%; min-height: 50px; border: 1px solid black;" id="s3">
            <div class="row flex-row">
                <div class="col-sm-3 col-md-3 s4backlog list" id="40">
					<div class="card my-2">
                        <div class="card-block red lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">1</h4>

                            <!-- KARTKI -->

                        </div>
                    </div>
                </div>
				<div class="col-sm-3 col-md-3 s4inprogress list" id="41">

                    <div class="card my-2">
                        <div class="card-block deep-purple lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">2</h4>

							<!-- KARTKI -->

                        </div>
                    </div>

                </div>
                <div class="col-sm-3 col-md-3 s4peerreview list" id="42">
                    <div class="card my-2">
                        <div class="card-block green lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">3</h4>

							<!-- KARTKI -->

                        </div>
                    </div>
                </div>
                <div class="col-sm-3 col-md-3 s4done list" id="43">
                    <div class="card my-2">
                        <div class="card-block deep-orange lighten-4">
                            <h4 class="card-title text-center py-2 opacitytitle">4</h4>

							<!-- KARTKI -->

                        </div>
                    </div>
                </div>
            </div>
			<div style = "text-align: center;">Swingline Igor Grzywacz</div>
		</div>


		<!-- SEKCJA DODAWANIA KARTEK -->
		<div class="stickynotefield cyan lighten-5" id="field">
			
		</div>

    </div>
	
</section>

<!-- MAIN -->
<button type="button" class="btn btn-primary" id="savebutton">Save changes</button>	



<!-- FOOTER -->
<footer class="page-footer font-small info-color-dark darken-3">
    <div class="container">
        <div class="row">
            <div class="col-md-12 py-5 mt-3">
				<!-- SOCIAL MEDIA
                <div class="mb-5 flex-center">
                    <a class="fb-ic">
                        <em class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </em>
                    </a>
                    <a class="tw-ic">
                        <em class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </em>
                    </a>
                    <a class="gplus-ic">
                        <em class="fab fa-youtube fa-lg white-text mr-md-5 mr-3 fa-2x"> </em>
                    </a>
                    <a class="ins-ic">
                        <em class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </em>
                    </a>
                </div>
				-->
            </div>
        </div>
    </div>
    <div class="footer-copyright text-center py-4">TABLICA KANBAN - PROJEKT ZESPOŁOWY</div>
</footer>
<!-- FOOTER -->
<input type="hidden" id="myPhpValue" value='<?php echo json_encode($ar); ?>' />
<script src="main.js"></script>

</body>
</html>