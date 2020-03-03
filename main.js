$( document ).ready(makenote());

function textAreaAdjust(o) {
	o.style.height = "1px";
	o.style.height = (25+o.scrollHeight)+"px";
	o.style.width = "100%";
}
var counts = [0,0,0,0];
function makenote()
{
	document.getElementById("field").innerHTML = '<div class="card p-2 cyan lighten-4 darken-1 mx-2 list-item stickynote" draggable="true"><div class="delnote"></div><h5 class="card-title">Tytuł</h5><textarea class="cyan lighten-4 form-control xd" onkeydown="textAreaAdjust(this)"></textarea></div>';
		
	
	$('.delnote').on("click",function(){
		var parentid = parseInt($(this).parent().parent().attr("id"));
		$(this).parent().remove();
		
		var count = $(this).parent().parent().children().length;
		counts[parentid] = count;
		
		return;
	});


	$(".stickynote").draggable({
		appendTo: "body",
		cursor: "move",
		helper: 'clone',
		revert: "invalid"
	});

	$(".backlog").droppable({
		tolerance: "intersect",
		accept: ".stickynote",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
				$(".backlog").append($(ui.draggable));
				counts[0]=$(".backlog").children().length-1;				
		}
	});
	
	$(".inprogress").droppable({
		tolerance: "intersect",
		accept: ".stickynote",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
			$(".inprogress").append($(ui.draggable));
			counts[1]=$(".inprogress").children().length-1;
		}
	});
	
	$(".peerreview").droppable({
		tolerance: "intersect",
		accept: ".stickynote",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
			$(".peerreview").append($(ui.draggable));
			counts[2]=$(".peerreview").children().length-1;
		}
	});
	
	$(".intest").droppable({
		tolerance: "intersect",
		accept: ".stickynote",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
			$(".intest").append($(ui.draggable));
			counts[3]=$(".intest").children().length-1;
		}
	});
}