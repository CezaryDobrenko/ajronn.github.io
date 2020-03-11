var myPhpValue = $("#myPhpValue").val();

if(myPhpValue != '')
{
	var array = JSON.parse(myPhpValue);
	insert(array);
}

function insert(ar)
{
	var i;
	var id, title, text, parentid;
	ar.forEach(function(array){
		for(i = 0 ; i<array.length ; i=i+5)
		{
			id = array[i];
			title = array[i+1];
			text = array[i+2];
			parentid=array[i+3];

			$("."+parentid).append('<div class="card p-2 darken-1 mx-2 list-item stickynote" draggable="true" style="background-color:#b3e6ff;">'+
				'<div class="delnote"></div>'+
				'<h5 class="card-title">'+
					'<input type="text" class="form-control" placeholder="TITLE" id="cardtitle" value="'+title+'">'+
				'</h5>'+
				'<textarea onkeydown="textAreaAdjust(this)">'+text+'</textarea>'+
			'</div>');
			makenote();
		}
	});
}

$(document).ready(makenote());

//Globar variables
var counts = [0, 0, 0, 0];
var block = 3;
var names = ["backlog", "inprogress", "peerreview", "done"];
var globalparentid = -1;
var firstvisit = 0;
var swingcounter = [[0,0,0,0],[0,0,0,0]];
var swingnames = [["s1inprogress","s2inprogress","s3inprogress","s4inprogress"],["s1peerreview","s2peerreview","s3peerreview","s4peerreview"]];
//----------------

function insertnote()
{
	
    document.getElementById("field").innerHTML = 
		'<div class="card p-2 darken-1 mx-2 list-item stickynote" draggable="true" style="background-color:#b3e6ff;">'+
			'<div class="delnote"></div>'+
			'<h5 class="card-title">'+
				'<input type="text" class="form-control" placeholder="TITLE" id="cardtitle">'+
			'</h5>'+
			'<textarea onkeydown="textAreaAdjust(this)"></textarea>'+
		'</div>';

	if(firstvisit == 1){
		document.getElementsByClassName("stickynote")[0].title = "";
		firstvisit = false;
	}

    makenote();
}

function textAreaAdjust(o)
{
    o.style.height = "1px";
    o.style.height = (25 + o.scrollHeight) + "px";
    o.style.width = "100%";
}

function checkCounters()
{
    document.getElementById("counterb").innerHTML = counts[0];
    document.getElementById("counteri").innerHTML = counts[1] + "/" + block;
    document.getElementById("counterp").innerHTML = counts[2] + "/" + block;
    document.getElementById("counterin").innerHTML = counts[3];
	
	for(i = 0; i <= 1; i++){
		for(j = 0; j <= 4; j++){
			if(swingcounter[i][j] >= 3){
				$("."+swingnames[i][j]).droppable("disable");
				$("."+swingnames[i][j]).css("border-bottom", "5px solid red");
			} else {
				$("."+swingnames[i][j]).droppable("enable");
				$("."+swingnames[i][j]).css("border-bottom", "none");
			}
		}
	}


    if ($(".stickynotefield").children().length == 0) insertnote();
    

}

function makenote() {

    if ($(".stickynotefield").children().length < 1)
        insertnote();


    $(".stickynote").on("drag", function () {
		globalparentid = parseInt($(this).parent().attr("id"));
        return;
    });

    $('.delnote').on("click", function () {
        $(this).parent().remove();
		for(j = 1; j <= 4; j++){
			var val1 = document.getElementsByClassName("s"+j+"inprogress")[0].childElementCount-1;
			var val2 = document.getElementsByClassName("s"+j+"peerreview")[0].childElementCount-1;
			swingcounter[0][j-1] = val1;
			swingcounter[1][j-1] = val2;
		}
        checkCounters();
		return;
    });

    $(".stickynote").draggable({
        appendTo: "body",
        cursor: "move",
        helper: 'clone',
        //revert: "invalid",
        revert: function (event, ui)
		{
			for(j = 1; j <= 4; j++){
				var val1 = document.getElementsByClassName("s"+j+"inprogress")[0].childElementCount-1;
				var val2 = document.getElementsByClassName("s"+j+"peerreview")[0].childElementCount-1;
				swingcounter[0][j-1] = val1;
				swingcounter[1][j-1] = val2;
			}
            checkCounters();
			return;
        }
	});
	
    $(".backlog").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".backlog").append($(ui.draggable));
			return;
        }
    });
	
    $(".backlog").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });

    $(".inprogress").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".inprogress").append($(ui.draggable));
			return;
        }
    });
	
    $(".inprogress").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });

    $(".peerreview").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".peerreview").append($(ui.draggable));
			return;
        }
    });
	
    $(".peerreview").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });

    $(".done").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".done").append($(ui.draggable));
			return;
        }
    });
	
    $(".done").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
	// swingline  nr 1
	
    $(".s1backlog").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s1backlog").append($(ui.draggable));
			return;
        }
    });
	
    $(".s1backlog").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s1inprogress").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s1inprogress").append($(ui.draggable));
			return;
        }
    });
	
    $(".s1inprogress").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s1peerreview").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s1peerreview").append($(ui.draggable));
			return;
        }
    });
	
    $(".s1peerreview").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s1done").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s1done").append($(ui.draggable));
			return;
        }
    });
	
    $(".s1done").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
	// swingline  nr 2
	
    $(".s2backlog").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s2backlog").append($(ui.draggable));
			return;
        }
    });
	
    $(".s2backlog").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s2inprogress").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s2inprogress").append($(ui.draggable));
			return;
        }
    });
	
    $(".s2inprogress").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s2peerreview").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s2peerreview").append($(ui.draggable));
			return;
        }
    });
	
    $(".s2peerreview").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s2done").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s2done").append($(ui.draggable));
			return;
        }
    });
	
    $(".s2done").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
// swingline  nr 3
	
    $(".s3backlog").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s3backlog").append($(ui.draggable));
			return;
        }
    });
	
    $(".s3backlog").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s3inprogress").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s3inprogress").append($(ui.draggable));
			return;
        }
    });
	
    $(".s3inprogress").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s3peerreview").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s3peerreview").append($(ui.draggable));
			return;
        }
    });
	
    $(".s3peerreview").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s3done").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s3done").append($(ui.draggable));
			return;
        }
    });
	
    $(".s3done").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
// swingline  nr 4
	
    $(".s4backlog").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s4backlog").append($(ui.draggable));
			return;
        }
    });
	
    $(".s4backlog").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s4inprogress").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s4inprogress").append($(ui.draggable));
			return;
        }
    });
	
    $(".s4inprogress").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s4peerreview").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s4peerreview").append($(ui.draggable));
			return;
        }
    });
	
    $(".s4peerreview").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
    $(".s4done").droppable({
        tolerance: "intersect",
        accept: ".stickynote",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(".s4done").append($(ui.draggable));
			return;
        }
    });
	
    $(".s4done").on("drop", function () {
		counts[globalparentid]--;
		globalparentid = -1;
        return;
    });
	
}

	if(firstvisit == 0){ 
		document.getElementsByClassName("stickynote")[0].title = "Przenieś kartke do góry";
		firstvisit = 1;
	}
	
	
$("#savebutton").on("click",function(){
	$.ajax({

         type: "post",
         url: "save.php",
         success: function(){
              alert("Hello");
         }
});
});