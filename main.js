$(document).ready(makenote());

//Globar variables
var counts = [0, 0, 0, 0];
var block = 4;
var names = ["backlog", "inprogress", "peerreview", "done"];
var globalparentid = -1;
var firstvisit = 0;
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
	
    var i;
    for (i = 1; i < 3; i++)
	{
        if (counts[i] >= block)
		{
            $("." + names[i]).droppable("disable");
            $("." + names[i] + " h4").css("color", "red");
            $("." + names[i] + " h4").css("font-weight", "bold");
        }
		else
		{
            $("." + names[i]).droppable("enable");
            $("." + names[i] + " h4").css("color", "black");
            $("." + names[i] + " h4").css("font-weight", "300");
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
        var parentid = parseInt($(this).parent().parent().attr("id"));
        var count = $(this).parent().parent().children().length - 2;
        $(this).parent().remove();
        counts[parentid] = count;
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
            var parentid = parseInt($(this).parent().attr("id"));
            var count = $(this).parent().children().length;
            counts[parentid] = count - 1;
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
}

	if(firstvisit == 0){ 
		document.getElementsByClassName("stickynote")[0].title = "Przenieś kartke do góry";
		firstvisit = 1;
	}