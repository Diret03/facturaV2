
let subtotal = 0;

//variables bases de datos
var db;
var cajadatos;
const dbName = "Facturacion";

function iniciar() {
  cajadatos = document.getElementById("cajadatos");
  // var botgrabar = document.getElementById("grabar");
  // botgrabar.addEventListener("click", agregarobjeto);

  var solicitud = window.indexedDB.open(dbName);
  solicitud.addEventListener("error", mostrarError);
  solicitud.addEventListener("success", comenzar);
  solicitud.addEventListener("upgradeneeded", crearbd);

  var botBoton = document.getElementById("baseDatos");
  botBoton.addEventListener("click", agregarobjeto);
}

function crearbd(event) {

  var baseDatos = event.target.result;
  var almacen = baseDatos.createObjectStore("detalle_venta", { keyPath: "cod" });
  almacen.createIndex("desc", "desc", { unique: false });
}

function comenzar(evento) {
  db = evento.target.result;
};

function mostrarError(evento) {

  alert("Error: " + evento.cod + " " + evento.message);
}

function agregarobjeto() {

  var codigo = document.getElementById("cod").value;
  var descripcion = document.getElementById("detalle").value;
  var cantidad = document.getElementById("cant").value;
  var vUnitario = document.getElementById("vUnitario").value;
  // var vTotal = document.getElementById("vTotal").value;
  var transaccion = db.transaction(["detalle_venta"], "readwrite");
  var almacen = transaccion.objectStore("detalle_venta");
  var valor = cantidad * vUnitario;
  document.getElementById("vTotal").value = valor;

  transaccion.addEventListener("complete", mostrar);
  var solicitud = almacen.add({ cod: codigo, desc: descripcion, cant: cantidad, precio: vUnitario, subtotal: valor });

  document.getElementById("cod").value = "";
  document.getElementById("detalle").value = "";
  document.getElementById("cant").value = "";
  document.getElementById("vUnitario").value = "";
  calcularTotalTodo();
}

function mostrar() {

  cajadatos.innerHTML = "";
  var transaccion = db.transaction(["detalle_venta"]);
  var almacen = transaccion.objectStore("detalle_venta");
  var puntero = almacen.openCursor();
  puntero.addEventListener("success", mostrarLista);
}

function mostrarLista(evento) {

  var puntero = evento.target.result;
  if (puntero) {
    cajadatos.innerHTML += "<div>" + puntero.value.cod + " - " +
      puntero.value.desc + " - " + puntero.value.cant + " - " + puntero.value.precio + " - " + puntero.value.subtotal + "</div>";

    puntero.continue();
  }

}




// function calcularTotal(button) {

//   // let fila = button.closest(".fila");
//   let fila = document.getElementById("fila");
//   let inputCantidad = fila.querySelector(".cant input").value;
//   let inputUnitario = fila.querySelector(".vUnitario input").value;
//   let inputDetalle = fila.querySelector(".detalle input").value;

//   if (inputCantidad !== null && inputUnitario !== null) {

//     let cantidad = inputCantidad;

//     // if (cantidad > 0) {
//     //   // let valorUnitario = inputUnitario;
//     //   // let valorTotal = cantidad * valorUnitario;
//     //   // subtotal += valorTotal;
//     //   // let inputSubtotal = document.querySelector("#subtotal input");
//     //   // inputSubtotal.value = subtotal.toFixed(2);

//     //   fila.querySelector(".vTotal input").value = valorTotal.toFixed(2);  //se redondea a dos decimales el valor obtenido


//     //   calcularTotalTodo();

//     //   button.parentNode.removeChild(button);

//     //   return subtotal;
//     // }

//     calcularTotalTodo();
//     // else alert("La cantidad debe ser mayor a cero");


//   }
//   else {
//     alert("Complete los campos correctamente");
//   }

//   agregarobjeto();
// }

function ponerFila() {

  let nuevaFila = document.createElement("div");
  nuevaFila.className = "fila";

  // var filaExistente = document.querySelector(".fila");
  // nuevaFila.innerHTML = filaExistente.innerHTML;
  nuevaFila.innerHTML = `
  <div class="cod">
  <input type="number" id="cod">
</div>
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

// function calcularTotalFinal() {

//   let valorIva = subtotal * 0.12;
//   let inputIva = document.getElementById("inputIVA");
//   inputIva.value = valorIva.toFixed(2);

//   let valorFinal = subtotal + valorIva;
//   let inputFinal = document.getElementById("inputTotalFinal");
//   inputFinal.value = valorFinal.toFixed(2);
// }

function calcularTotalTodo() {
  var transaccion = db.transaction(["detalle_venta"]);
  var almacen = transaccion.objectStore("detalle_venta");
  var rango = IDBKeyRange;
  var puntero = almacen.openCursor();
  let valorTotal = 0;

  if (puntero) {

    valorTotal = puntero.value.subtotal;

    subtotal += valorTotal;
    puntero.continue();
  }


  let inputIva = document.getElementById("inputIVA");
  let valorIva = inputIva.value.toFixed(2);

  let inputTotalFinal = document.getElementById("inputTotalFinal");
  inputTotalFinal.value = subtotal * (1 + valorIva);


}
window.addEventListener("load", iniciar); 