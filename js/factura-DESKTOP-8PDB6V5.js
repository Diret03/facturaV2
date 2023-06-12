
<<<<<<< HEAD
let cont = 0;  //atributo no usado

=======
>>>>>>> 89519071f8bdff9afee76940b56874f5d53c9c5d
let subtotal = 0;
let valorIva = 0;
let valorFinal = 0;

<<<<<<< HEAD
function calculateTotal() {  //metodo descartado

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
  cont++;
  console.log(cont);
}


=======
>>>>>>> 89519071f8bdff9afee76940b56874f5d53c9c5d
function calcularTotal(button) {

  let fila = button.closest(".fila");
  let inputCantidad = fila.querySelector(".cant input").value;
  let inputUnitario = fila.querySelector(".vUnitario input").value;

<<<<<<< HEAD
  subtotal += valorTotal;               //se suma y asigna el valor actual del producto a la variable global de subtotal
  console.log("Subtotal: " + subtotal);
=======
  if (inputCantidad !== "" && inputCantidad !== "") {
>>>>>>> 89519071f8bdff9afee76940b56874f5d53c9c5d

    let cantidad = parseFloat(inputCantidad);
    let valorUnitario = parseFloat(inputUnitario);
    let valorTotal = cantidad * valorUnitario;

<<<<<<< HEAD
  fila.querySelector(".vTotal input").value = valorTotal.toFixed(2);  //se redondea a dos decimales el valor obtenido
=======
    subtotal += valorTotal;               //se suma y asigna el valor actual del producto a la variable global de subtotal
    console.log("Subtotal: " + subtotal);

    let inputSubtotal = document.querySelector("#subtotal input");
    inputSubtotal.value = subtotal;

    fila.querySelector(".vTotal input").value = valorTotal.toFixed(2);  //se redondea a dos decimales el valor obtenido


    ponerFila();
    calcularIva();
    calcularTotalFinal();
  }
>>>>>>> 89519071f8bdff9afee76940b56874f5d53c9c5d

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
  inputIva.value = valorIva.toFixed(2);
}

function calcularTotalFinal() {

  valorFinal = subtotal + valorIva;
  let inputFinal = document.querySelector("#total input");
  inputFinal.value = valorFinal.toFixed(2);
}