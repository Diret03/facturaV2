
let subtotal = 0;
let valorIva = 0;
let valorFinal = 0;

function calcularTotal(button) {

  let fila = button.closest(".fila");
  let inputCantidad = fila.querySelector(".cant input").value;
  let inputUnitario = fila.querySelector(".vUnitario input").value;

  if (inputCantidad !== "" && inputUnitario !== "") {

    let cantidad = parseFloat(inputCantidad);

    if (cantidad > 0) {
      let valorUnitario = parseFloat(inputUnitario);
      let valorTotal = cantidad * valorUnitario;

      subtotal += valorTotal;               //se suma y asigna el valor actual del producto a la variable global de subtotal
      console.log("Subtotal: " + subtotal);

      let inputSubtotal = document.querySelector("#subtotal input");
      inputSubtotal.value = subtotal.toFixed(2);

      fila.querySelector(".vTotal input").value = valorTotal.toFixed(2);  //se redondea a dos decimales el valor obtenido

      ponerFila();
      calcularIva();
      calcularTotalFinal();

      button.parentNode.removeChild(button);
    }
    else alert("Se necesita al menos 1 producto");


  }
  else {
    alert("Complete los campos correctamente");
  }

}

function ponerFila() {

  let nuevaFila = document.createElement("div");
  nuevaFila.className = "fila";

  // var filaExistente = document.querySelector(".fila");
  // nuevaFila.innerHTML = filaExistente.innerHTML;
  nuevaFila.innerHTML = `
  <div class="cant">
  <input type="number">
</div>
<div class="detalle">
  <input type="text">
</div>
<div class="vUnitario">
  <input type="number">
</div>
<div class="vTotal">
  <input type="number" disabled>
</div>
<div class="add">
  <button onclick="calcularTotal(this)">+</button>
</div>
  `;

  let tabla = document.getElementById("tabla");
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