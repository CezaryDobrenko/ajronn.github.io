// JS to kanban project

// Basic function info:
// init() -> funkcja początkowa wywoływana tylko raz przy wejściu na stronę
// addColumnKanban() -> funkcja dodająca kolumnę (zwiększa szerokość okna positioner, potem wstawia div)
// addColumnFromDatabase -> Dodaje kolumny z bazy danych
// addColumnKanbanButton() -> funkcja dodaje kolumnę z guzikiem do dodawania kolumn draganddrop
// removeColumnKanban() -> funkcja usuwająca kolumnę (zmniejsza szerokość okna positioner, potem usuwa div)
// save() -> funkcja zapisuje zmiany do bazy
// czyscTabeleKolumn() -> Czyści całą tabele (przydatne przy usuwaniu ostatniego elementu)



// Global variables
var t = 0;

// Pierwszy start programu
function init(){
	document.getElementsByClassName("positioner")[0].style.width = "0px";
	document.getElementsByClassName("kanban-container")[0].style.height = (window.innerHeight - 279) + "px"; // dostosowuje wysokość kanbanboard do rozdzielczości ekranu (dzięki czemu nie ma dwóch suwaków z prawej)
	addColumnKanbanButton(); // dodaje pole z + do dodawania kolumn
	addColumnFromDatabase(); // dodaje do bazy kolumny
	addNoteFromDatabase(); // dodaje do bazy notaki
	refreshDrag(); // odpala draganddrop na wszystkich aktywnych
	addNote(); // Dodaje pierwszą notke
}

// Funkcje dodające
function addColumnKanban(){
	t = Math.floor(Math.random() * 9999999999); 
	elem = document.getElementsByClassName("positioner")[0];
	elem.style.width = (parseInt(elem.style.width)+467)+"px";
	newCol = document.createElement("div");
	newCol.classList.add("kanban-column");
	newCol.id = "col"+t;
	newCol.innerHTML += '<div class = "column-remover"><img src = "img/delete.png" class="remove" onclick = "removeColumnKanban('+"col"+t+')"></div>';
	newCol.innerHTML += '<div class = "column-header"><input type="text" class="form-control column-title" onchange="saveAllChanges()"></div>';
	newCol.innerHTML += '<div class = "column-body"><div class="column" id="'+"col"+t+"drag"+'"></div></div>';
	$('.kanban-col-adder').before(newCol);
	t++;
	saveAllChanges();
	refreshDrag();
}

function addColumnFromDatabase(){
	for(i = 0; i < colArr.length; i++){
		elem = document.getElementsByClassName("positioner")[0];
		elem.style.width = (parseInt(elem.style.width)+467)+"px";
		newCol = document.createElement("div");
		newCol.classList.add("kanban-column");
		newCol.id = colArr[i][1];
		tmpid = colArr[i][1].match(/\d+/g).map(Number);
		newCol.innerHTML += '<div class = "column-remover"><img src = "img/delete.png" class="remove" onclick = "removeColumnKanban('+"col"+tmpid+')"></div>';
		newCol.innerHTML += '<div class = "column-header"><input type="text" class="form-control column-title" onchange="save()" value = "'+colArr[i][2]+'"></div>';
		newCol.innerHTML += '<div class = "column-body"><div class="column" id="'+colArr[i][1]+"drag"+'"></div></div>';
		$('.kanban-col-adder').before(newCol);
	}
}

function addColumnKanbanButton(){
	elem = document.getElementsByClassName("positioner")[0];
	elem.style.width = (parseInt(elem.style.width)+467)+"px";
	newCol = '<div class = "kanban-col-adder" onclick="addColumnKanban()"><img src="img/add.png" class = "add"></div>';
	elem.innerHTML = newCol;
	t++;
}

function addNote(){
	document.getElementById('dropzone').innerHTML = 
	`<div class="portlet">
		<div class="portlet-header">
			<div>
				<div style = "float: left;"><img id= "pin" src = "img/pin.png"></div>
				<div style = "float: right;"><img class= "deletenote" src = "img/delete.png" onclick = "delnote(this)"></div>
			</div>
		</div>
		<div class="portlet-content">
			<input type = "text" class = "title" onchange="saveAllChanges()">
			<br>
			<textarea onkeydown="textAreaAdjust(this)" id="content" onchange="saveAllChanges()"></textarea>
			<br>
			created by: `+autor+`
		</div>
	</div>`;
}

function addNoteFromDatabase(){
	for(i = 0; i < noteArr.length; i++){
			rodzic = document.getElementById(noteArr[i][1]);
			dziecko = 
			`<div class="portlet">
				<div class="portlet-header">
					<div>
						<div style = "float: left;"><img id= "pin" src = "img/pin.png"></div>
						<div style = "float: right;"><img class= "deletenote" src = "img/delete.png" onclick = "delnote(this)"></div>
					</div>
					</div>
						<div class="portlet-content">
						<input type = "text" class = "title" onchange="saveAllChanges()" value="`+noteArr[i][2]+`">
						<br>
						<textarea onkeydown="textAreaAdjust(this)" id="content" onchange="saveAllChanges()">`+noteArr[i][3]+`</textarea>
						<br>
						created by: `+autor+`
				</div>
			</div>`;
			rodzic.innerHTML += dziecko;
	}
}


// funkcje usuwające

function removeColumnKanban(elem){
	rodzic = document.getElementsByClassName("positioner")[0];
	rodzic.removeChild(elem); 
	saveAllChanges();
	if(rodzic.childElementCount == 1){
		czyscTabeleKolumn();
	}
}

function delnote(elem){
	dziecko = elem.parentElement.parentElement.parentElement.parentElement;
	rodzic = elem.parentElement.parentElement.parentElement.parentElement.parentElement;
	rodzic.removeChild(dziecko);
	saveAllChanges();
	console.log(rodzic.childElementCount);
	if(rodzic.childElementCount == 0){
		czyscTabeleKolumn();
	}
}




function textAreaAdjust(o) {
  o.style.height = "1px";
  o.style.height = (25+o.scrollHeight)+"px";
}

function refreshDrag()
  {
    $( ".column" ).sortable({
      connectWith: ".column",
      handle: ".portlet-header",
      cancel: ".portlet-toggle",
      start: function (event, ui) {
        ui.item.addClass('tilt');
      },
      stop: function (event, ui) {
        ui.item.removeClass('tilt');
		addNote();
		saveAllChanges();
      }
    });

    $( ".portlet" )
      .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
      .find( ".portlet-header" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

    $( ".portlet-toggle" ).click(function() {
      var icon = $( this );
      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
      icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
    });
  }



//Funkcje ajax

function czyscTabeleKolumn(){
	$.ajax({ 
		   type: "POST", 
		   url: "php/clear.php", 
		   data: { d : data}, 
		   success: function() { 
				  //alert("Success"); 
			} 
		});
}

function saveAllChanges(){
	save();
	saveNote();
}

function saveNote(){
	data2 = [];
	length = document.getElementsByClassName("positioner")[0].childElementCount-1;
	for(i = 0; i < length; i++){
		length2 = document.getElementsByClassName("column")[i].childElementCount;
		for(j = 0; j < length2; j++){
			tmp = [];
			shorter = document.getElementsByClassName("positioner")[0].children[i];
			tmp.push(shorter.children[2].children[0].id);
			tmp.push(shorter.children[2].children[0].children[j].children[1].children[0].value);
			tmp.push(shorter.children[2].children[0].children[j].children[1].children[2].value);
			data2.push(tmp);
		}
	}
	console.log(data2);
	$.ajax({ 
		   type: "POST", 
		   url: "php/savenotes.php", 
		   data: { d : data2}, 
		   success: function() { 
				  //alert("Success"); 
			} 
	}); 	
}

function save(){
	data = [];
	length = document.getElementsByClassName("positioner")[0].childElementCount-1;
	for(i = 0; i < length; i++){
		tmp = [];
		tmp.push(document.getElementsByClassName("kanban-column")[i].id);
		tmp.push(document.getElementsByClassName("kanban-column")[i].children[1].children[0].value);	
		data.push(tmp);
	}
	$.ajax({ 
       type: "POST", 
       url: "php/save.php", 
       data: { d : data}, 
       success: function() { 
              //alert("Success"); 
        } 
}); 
}


// Odpalanie funkcji startowych
init()
