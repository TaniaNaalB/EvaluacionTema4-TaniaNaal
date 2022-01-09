var selectedRow = null;
var participante = [];
UpdatePageRefresh();

function onFormSubmit(e){
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow === null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
}

function readFormData() {
    var formData = {};
    formData["ID_participante"] = document.getElementById("ID_participante").value; 
    formData["nombre_participante"] = document.getElementById("nombre_participante").value;
    formData["fecha"] = document.getElementById("fecha").value;
    formData["dias_inscripcion"] = document.getElementById("dias_inscripcion").value;
    return formData;
}

function insertNewRecord(formData) {
    var table = document.getElementById("participate_list").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.ID_participante;

    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.nombre_participante;

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.fecha;

    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.dias_inscripcion;

    var cell5 = newRow.insertCell(4);
    cell5.innerHTML=  '<button onClick= onEdit(this)>Modificar</button> <button onClick= onDelete(this)>Eliminar</button>'
participante.push(formData);
localStorage.setItem("participante",JSON.stringify(participante));
}


//Boton de editar

function onEdit(td) {
selectedRow = td.parentElement.parentElement;
document.getElementById('ID_participante').value = selectedRow.cells[0].innerHTML;
document.getElementById('nombre_participante').value = selectedRow.cells[1].innerHTML;
document.getElementById('fecha').value = selectedRow.cells[2].innerHTML;
document.getElementById('dias_inscripcion').value = selectedRow.cells[3].innerHTML;   
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.ID_participante;
    selectedRow.cells[1].innerHTML = formData.nombre_participante;
    selectedRow.cells[2].innerHTML = formData.fecha;
    selectedRow.cells[3].innerHTML = formData.dias_inscripcion;
    participante.splice(selectedRow.rowIndex-1, 1, {ID_participante:formData.ID_participante, nombre_participante:formData.nombre_participante, fecha:formData.fecha, dias_inscripcion:formData.dias_inscripcion});
    localStorage.setItem("participante",JSON.stringify(participante));

}

//Boton de eliminar

function onDelete(td) {
if(confirm('¿Esta seguro de eliminar este registro?')){
    row = td.parentElement.parentElement;
    document.getElementById('participate_list').deleteRow(row.rowIndex);
    participante.splice(row.rowIndex-1, 1);
    localStorage.setItem("participante",JSON.stringify(participante));
}
resetForm();
}

// Boton de Reiniciar

function resetForm() {
document.getElementById('ID_participante').value = '';
document.getElementById('nombre_participante').value = '';
document.getElementById('fecha').value = '';
document.getElementById('dias_inscripcion').value = '';
}

function UpdatePageRefresh(){
    if(localStorage.getItem("participante") == null ){
        console.log("No hay participantes registrados")
    }
    else{
        participante = JSON.parse(localStorage.getItem("participante"));
for (let index = 0; index < participante.length; index++) {
   let ID = participante[index].ID_participante;
   let name = participante[index].nombre_participante;
   let date = participante[index].fecha;
   let days = participante[index].dias_inscripcion;
    
   document.getElementById("tbody").innerHTML +=
   `<tr>
   <td>${ID}</td>
   <td>${name}</td>
   <td>${date}</td>
   <td>${days}</td>
   <td><button onClick= onEdit(this)>Modificar</button> <button onClick= onDelete(this)>Eliminar</button></td>
   </tr>
   `
}
    }
}