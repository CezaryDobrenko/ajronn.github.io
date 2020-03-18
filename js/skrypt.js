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
	document.getElementsByClassName("kanban-container")[0].style.height = (window.innerHeight - 100) + "px"; // dostosowuje wysokość kanbanboard do rozdzielczości ekranu (dzięki czemu nie ma dwóch suwaków z prawej)
	addColumnKanbanButton(); // dodaje pole z + do dodawania kolumn
	addColumnFromDatabase(); // dodaje do bazy kolumny
	addNoteFromDatabase(); // dodaje do bazy notaki
	refreshDrag(); // odpala draganddrop na wszystkich aktywnych
	addNote(); // Dodaje pierwszą notke
	Testowa();
	progress();
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
	newCol.innerHTML += `<div class = "column-header"><input type="text" class="form-control column-title" onchange="saveAllChanges()">
						<input type="text" placeholder="Wpisz max liczbe kartek" class="ogranicznik" onchange="saveAllChanges()"></div>`;
	newCol.innerHTML += '<div class = "column-body"><div class="column" id="'+"col"+t+"drag"+'"></div></div>';
	$('.kanban-col-adder').before(newCol);
	t++;
	document.getElementsByClassName("column-header")[0].children[0].value = "Backlog";
	if(document.getElementsByClassName("kanban-column")[0]){
		document.getElementsByClassName("kanban-column")[0].children[1].children[1].style.display = "none";
	}
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
		newCol.innerHTML += `<div class = "column-header"><input type="text" class="form-control column-title" onchange="save()" value = "`+colArr[i][2]+`">
							<input type="text" class="ogranicznik" placeholder="Wpisz max liczbe kartek" onchange="save()" value = "`+colArr[i][3]+`"></div>`;
		newCol.innerHTML += '<div class = "column-body"><div class="column" id="'+colArr[i][1]+"drag"+'"></div></div></div>';
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
		<div class="portlet-content" style = "height: 140px;">
			<input type = "text" class = "title" onchange="saveAllChanges()" title = "wpisz tytuł notatki">
			<br>
			<textarea onkeydown="textAreaAdjust(this)" id="content" onchange="saveAllChanges()" title = "wpisz treść notatki"></textarea>
			<br>
						<input class="author" type="hidden" value="`+autor+`">
						Postęp: <input type = "text" title = "skala 15-220, jeśli puste to cała szerokość" class="progressinput" onchange="progress()">
						<img src = "img/avatar/`+autor+`/avatar.png" style = "height: 50px; float: right" title = "created by: `+autor+`">
		</div>
	</div>`;
	document.getElementById("dropzone").children[0].style.width = "420px";
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
						<div class="portlet-content" style = "height: 140px;">
						<input type = "text" class = "title" onchange="saveAllChanges()" value="`+noteArr[i][2]+`" title = "wpisz tytuł notatki">
						<br>
						<textarea onkeydown="textAreaAdjust(this)" id="content" onchange="saveAllChanges()" title = "wpisz treść notatki">`+noteArr[i][3]+`</textarea>
						<br>
						<input class="author" type="hidden" value="`+noteArr[i][4]+`">
						Postęp: <input type = "text" title = "skala 15-220, jeśli puste to cała szerokość" class="progressinput" onchange="progress()" value = "`+noteArr[i][5]+`">
						<img src = "img/avatar/`+noteArr[i][4]+`/avatar.png" style = "height: 50px; float: right" title = "created by: `+noteArr[i][4]+`">
				</div>
			</div>`;
			rodzic.innerHTML += dziecko;
	}
}

function progress(){
	len = document.getElementsByClassName("kanban-column").length;
	for(i = 0; i < len; i++){
		len2 = document.getElementsByClassName("kanban-column")[i].children[2].children[0].childElementCount;
		for(j = 0; j < len2; j++){
			dziecko = document.getElementsByClassName("kanban-column")[i].children[2].children[0].children[j];
			if(dziecko.children[1].children[5].value != ""){
				dziecko.style.width = "200px";
				dziecko.style.marginLeft = parseInt(dziecko.children[1].children[5].value);	
				if(parseInt(dziecko.children[1].children[5].value) > 221){
					dziecko.style.marginLeft = "220px";	
					dziecko.children[1].children[5].value = 220;
				}
				if(parseInt(dziecko.children[1].children[5].value) < 15){
					dziecko.style.marginLeft = "15px";
					dziecko.children[1].children[5].value = 15;					
				}
			}
			if(dziecko.children[1].children[5].value == ""){
				dziecko.style.width = "404px";
				dziecko.style.marginLeft = "15px";	
			}
		}
	}
	saveAllChanges();
}

// funkcje usuwające

function removeColumnKanban(elem){
	rodzic = document.getElementsByClassName("positioner")[0];
	if(elem[1]){
		rodzic.removeChild(elem[1]);
	} else {
		rodzic.removeChild(elem); 
	}
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
	Testowa()
}



function textAreaAdjust(o) {
  o.style.height = "1px";
  o.style.height = (25+o.scrollHeight)+"px";
}

function Testowa(){
	length = document.getElementsByClassName("kanban-column").length;
	blocker = [];
	notes = [];
	for(i = 0; i < length; i++){
		blocker.push(document.getElementsByClassName("kanban-column")[i].children[1].children[1].value);
		notes.push(document.getElementsByClassName("kanban-column")[i].children[2].children[0].childElementCount);
	}
	console.log(blocker);
	console.log(notes);
	for(i = 0; i < length; i++){
		if(notes[i] > parseInt(blocker[i])-1){
			document.getElementsByClassName("kanban-column")[i].style.border = "solid 1px red";
		} else {
			document.getElementsByClassName("kanban-column")[i].style.border = "none";	
		}
	}
	for(i = 0; i < length; i++){
		if(blocker[i] != ""){
			temp = document.getElementsByClassName("kanban-column")[i].children[2].children[0].childElementCount;
			for(j = temp; j > parseInt(blocker[i]); j--){
				document.getElementsByClassName("column")[i].removeChild(document.getElementsByClassName("column")[i].lastChild)
			}
		}
	}
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
		Testowa();
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
			tmp.push(shorter.children[2].children[0].children[j].children[1].children[4].value);
			tmp.push(shorter.children[2].children[0].children[j].children[1].children[5].value);
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
		if(i != 0){
			tmp.push(document.getElementsByClassName("kanban-column")[i].children[1].children[1].value);	
		}
		data.push(tmp);
	}
	console.log(data);
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
init();


if(document.getElementsByClassName("kanban-column")[0]){
	document.getElementsByClassName("kanban-column")[0].children[1].children[1].style.display = "none";
}

document.getElementById("dropzone");

