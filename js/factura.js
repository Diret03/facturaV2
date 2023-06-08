
let cont = 0;

function calculateTotal() {

  var table = document.getElementById("miTabla");
  var tbody = table.getElementsByTagName("tbody")[0];
  var fila = tbody.rows[cont];

  var cantidadInput = fila.querySelector(".cant input");
  var precioUnitarioInput = fila.querySelector(".vUnitario input");
  var valorTotalInput = fila.querySelector(".vTotal input");

  var cantidad = parseInt(cantidadInput.value);
  var precioUnitario = parseFloat(precioUnitarioInput.value);

  var valorTotal = cantidad * precioUnitario;
  valorTotalInput.value = valorTotal.toFixed(2);

  var ultimaFila = tbody.lastElementChild;

  var nuevaFila = document.createElement("tr");
  nuevaFila.innerHTML = `
    <td class="cant"><input type="number"></td>
    <td class="detalle"><input type="text"></td>
    <td class="vUnitario"><input type="number"></td>
    <td class="vTotal"><input type="number" disabled></td>
    <td class="add"><button onclick="calculateTotal()">+</button></td>
  `;
  tbody.appendChild(nuevaFila);
  // tbody.insertRow(nuevaFila);
  // tbody.append(nuevaFila);
  // tbody.insertBefore(nuevaFila, ultimaFila);
  cont++;
  console.log(cont);
}

// function calculateTotals() {
//   var rows = document.querySelectorAll("#miTabla tbody tr");

//   var subtotal = 0;
//   var iva = 0;
//   var total = 0;

//   rows.forEach(function (row) {
//     var cantidad = parseFloat(row.querySelector(".cant input").value);
//     var vUnitario = parseFloat(row.querySelector(".vUnitario input").value);
//     var vTotal = cantidad * vUnitario;
//     row.querySelector(".vTotal input").value = vTotal.toFixed(2);
//     subtotal += vTotal;
//   });

//   iva = subtotal * 0.12;
//   total = subtotal + iva;

//   document.getElementById("subtotal").value = subtotal.toFixed(2);
//   document.getElementById("iva").value = iva.toFixed(2);
//   document.getElementById("total").value = total.toFixed(2);
// }

// function addRow() {
//   var tbody = document.querySelector("#miTabla tbody");
//   var newRow = document.createElement("tr");
//   newRow.innerHTML = `
//     <td class="cant"><input type="number"></td>
//     <td class="detalle"><input type="text"></td>
//     <td class="vUnitario"><input type="number"></td>
//     <td class="vTotal"><input type="number" disabled></td>
//     <td class="add"><button onclick="calculateTotals()">+</button></td>
//   `;
//   tbody.appendChild(newRow);
// }

function ponerFila() {

  let tabla = document.getElementById("tabla");

  let nuevaFila = document.createElement("div");
  nuevaFila.className = "fila";

  let contenidoFila = document.querySelector(".fila").innerHTML;
  nuevaFila.innerHTML = contenidoFila;
  tabla.appendChild(nuevaFila);


}