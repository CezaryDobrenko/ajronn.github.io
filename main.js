$( document ).ready(makenote());

function textAreaAdjust(o) {
	o.style.height = "1px";
	o.style.height = (25+o.scrollHeight)+"px";
	o.style.width = "100%";
}
var counts = [0,0,0,0];
var draganddropflag = 0;
var block = 4;
var names = ["backlog","inprogress","peerreview","intest"];
function checkCounters(){
	document.getElementById("counterb").innerHTML = counts[0]+"/"+block;
	document.getElementById("counteri").innerHTML = counts[1]+"/"+block;
	document.getElementById("counterp").innerHTML = counts[2]+"/"+block;
	document.getElementById("counterin").innerHTML = counts[3]+"/"+block;
	var i;
	for(i = 0; i<4;i++)
	{
		if(counts[i]>=block){
			$("."+names[i]).droppable("disable");
			$("."+names[i]+" h4").css("color","red");
			$("."+names[i]+" h4").css("font-weight","bold");
		}
		else{
			$("."+names[i]).droppable("enable");
			$("."+names[i]+" h4").css("color","black");
			$("."+names[i]+" h4").css("font-weight","300");
		}
	}
	
}


function makenote()
{
	document.getElementById("field").innerHTML = '<div class="card p-2 cyan lighten-4 darken-1 mx-2 list-item stickynote" draggable="true"><div class="delnote"></div><h5 class="card-title">Tytuł</h5><textarea class="cyan lighten-4 form-control xd" onkeydown="textAreaAdjust(this)"></textarea></div>';


	
	
	$(".stickynote").on("drag",function(){
		
		if(draganddropflag == 0)
		{
		var parentid = parseInt($(this).parent().attr("id"));
		var count = $(this).parent().children().length;	
		counts[parentid] = count-2;
		checkCounters();
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
		checkCounters();
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
		var count = $(this).parent().parent().children().length-2;
		$(this).parent().remove();
		counts[parentid] = count;
		checkCounters();
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
		checkCounters();
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