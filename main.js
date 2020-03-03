$( document ).ready(makenote());

function makenote()
{
	document.getElementById("field").innerHTML = '<div class="card p-2 cyan lighten-4 darken-1 mx-2 list-item stickynote" draggable="true"><div class="delnote"></div><h5 class="card-title">Tytuł</h5><textarea class="cyan lighten-4 form-control xd" onkeydown="textAreaAdjust(this)"></textarea></div>';
	
	$('.delnote').on("click",function(){
		$(this).parent().remove();
		return;
	});

	function textAreaAdjust(o) {
	  o.style.height = "1px";
	  o.style.height = (25+o.scrollHeight)+"px";
	  o.style.width = "100%";
	  document.getElementsByClassName(xd)[0].style.width="100%";
	}
	$(".stickynote").draggable({
		appendTo: "body",
		cursor: "move",
		helper: 'clone',
		revert: "invalid"
	});

	$("#launchPad").droppable({
		tolerance: "intersect",
		accept: ".stickynote",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
			$("#launchPad").append($(ui.draggable));
		}
		
	});

	$(".list").droppable({
		tolerance: "intersect",
		accept: ".stickynote",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
			$(this).append($(ui.draggable));
		}
	});
}

