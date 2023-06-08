
let cont = 0;
let subtotal = 0;
let valorIva = 0;
let valorFinal = 0;

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


function calcularTotal(button) {

  var fila = button.closest(".fila");
  var cantidad = parseFloat(fila.querySelector(".cant input").value);
  var valorUnitario = parseFloat(fila.querySelector(".vUnitario input").value);
  var valorTotal = cantidad * valorUnitario;

  subtotal += valorTotal;
  console.log("Subtotal: " + subtotal);

  let inputSubtotal = document.querySelector("#subtotal input");
  inputSubtotal.value = subtotal;

  fila.querySelector(".vTotal input").value = valorTotal.toFixed(2);

  ponerFila();
  calcularIva();
  calcularTotalFinal();
}

function ponerFila() {

  let nuevaFila = document.createElement("div");
  nuevaFila.className = "fila";

  var filaExistente = document.querySelector(".fila");
  filaExistente.parentNode.insertBefore(nuevaFila, filaExistente);
  nuevaFila.innerHTML = filaExistente.innerHTML;

  let contenidoFila = document.querySelector(".fila").innerHTML;
  nuevaFila.innerHTML = contenidoFila;

  let filaPrevia = document.getElementById("filaSubtotal");
  tabla.insertBefore(nuevaFila, filaPrevia);
}

function calcularIva() {


  valorIva = subtotal * 0.12;
  let inputIva = document.querySelector("#iva input");
  inputIva.value = valorIva;
}

function calcularTotalFinal() {

  valorFinal = subtotal + valorIva;
  let inputFinal = document.querySelector("#total input");
  inputFinal.value = valorFinal;
}