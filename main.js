$( document ).ready(makenote());

function textAreaAdjust(o) {
	o.style.height = "1px";
	o.style.height = (25+o.scrollHeight)+"px";
	o.style.width = "100%";
}
var counts = [0,0,0,0];
var draganddropflag = 0;
function makenote()
{
	document.getElementById("field").innerHTML = '<div class="card p-2 cyan lighten-4 darken-1 mx-2 list-item stickynote" draggable="true"><div class="delnote"></div><h5 class="card-title">Tytuł</h5><textarea class="cyan lighten-4 form-control xd" onkeydown="textAreaAdjust(this)"></textarea></div>';


	
	
	$(".stickynote").on("drag",function(){
		
		if(draganddropflag == 0)
		{
		var parentid = parseInt($(this).parent().attr("id"));
		var count = $(this).parent().children().length;	
		counts[parentid] = count-2;
		}
		draganddropflag = 1;
		return;
		
		
	});
	
	$(".backlog").on("drop",function(){
		
		if(draganddropflag == 1)
		{
		var parentid = parseInt($(this).attr("id"));
		var count = $(this).children().length;
		counts[parentid] = count;
		}
		draganddropflag = 0;
		return;
		
	});
	
	$(".inprogress").on("drop",function(){
		
		if(draganddropflag == 1)
		{
		var parentid = parseInt($(this).attr("id"));
		var count = $(this).children().length;
		counts[parentid] = count;
		}
		draganddropflag = 0;
		return;
		
	});

	$(".peerreview").on("drop",function(){
		
		if(draganddropflag == 1)
		{
		var parentid = parseInt($(this).attr("id"));
		var count = $(this).children().length;
		counts[parentid] = count;
		}
		draganddropflag = 0;
		return;
		
	});		
	
	$(".intest").on("drop",function(){
		
		if(draganddropflag == 1)
		{
		var parentid = parseInt($(this).attr("id"));
		var count = $(this).children().length;
		counts[parentid] = count;
		}
		draganddropflag = 0;
		return;
		
	});
	
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
		//revert: "invalid",
		revert: function(event, ui){
			var parentid = parseInt($(this).parent().attr("id"));
		var count = $(this).parent().children().length;	
		counts[parentid] = count-1;
		}
	});

	$(".backlog").droppable({
		tolerance: "intersect",
		accept: ".stickynote",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
				$(".backlog").append($(ui.draggable));			
		}
	});
	
	$(".inprogress").droppable({
		tolerance: "intersect",
		accept: ".stickynote",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
			$(".inprogress").append($(ui.draggable));
		}
	});
	
	$(".peerreview").droppable({
		tolerance: "intersect",
		accept: ".stickynote",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
			$(".peerreview").append($(ui.draggable));
		}
	});
	
	$(".intest").droppable({
		tolerance: "intersect",
		accept: ".stickynote",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
			$(".intest").append($(ui.draggable));
		}
	});
}