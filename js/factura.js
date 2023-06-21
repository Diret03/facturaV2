
let subtotal = 0;

//variables bases de datos
var db;
var cajadatos;
const dbName = "Facturacion";

const listaProduct = [];
const objDetalle = { cod: 0, desc: "", cant: 0, precio: 0, subtotal: 0 };

function iniciar() {
  cajadatos = document.getElementById("cajadatos");
  // var botgrabar = document.getElementById("grabar");
  // botgrabar.addEventListener("click", agregarobjeto);

  var solicitud = indexedDB.open(dbName);
  solicitud.addEventListener("success", comenzar);
  solicitud.onerror = (event) => {
    // Handle errors.
    console.error(`Database error: ${event.target.errorCode}`);
  };

  solicitud.onupgradeneeded = (event) => {
    const bd = event.target.result;

    var objectStore = bd.createObjectStore("detalle_venta", { keyPath: "ruc_ci" });

    objectStore.createIndex("descripcion", "descripcion", { unique: false });

    objectStore.createIndex("cantidad", "cantidad", { unique: false });

    objectStore.createIndex("precio", "precio", { unique: false });

    objectStore.createIndex("subtotal", "subtotal", { unique: false });

  };
}

function comenzar(evento) {
  db = evento.target.result;
};

function agregarobjeto() {
  var transaccion = db.transaction(["detalle_venta"], "readwrite");
  var almacen = transaccion.objectStore("detalle_venta");

  if (listaProduct == null) {
    listaProduct.add(objDetalle);
  }
  listaProduct.forEach((detalle) => {
    detalle.cod = "1";
    almacen.add(detalle);
    cajadatos.innerHTML += "<div>" + detalle.cod + " - " +
      detalle.desc + " - " + detalle.cant + " - " + detalle.precio + " - " + detalle.subtotal + "</div>";
  });

};


function calcularTotal(button) {

  let fila = button.closest(".fila");
  let inputCantidad = fila.querySelector(".cant input").value;
  let inputUnitario = fila.querySelector(".vUnitario input").value;
  let inputDetalle = fila.querySelector(".detalle input").value;
  objDetalle.cod = 1;
  objDetalle.desc = inputDetalle;
  objDetalle.precio = inputUnitario;


  if (inputCantidad !== null && inputUnitario !== null) {

    let cantidad = inputCantidad;

    if (cantidad > 0) {
      let valorUnitario = inputUnitario;
      let valorTotal = cantidad * valorUnitario;

      subtotal += valorTotal;               //se suma y asigna el valor actual del producto a la variable global de subtotal
      console.log("Subtotal: " + subtotal);

      let inputSubtotal = document.querySelector("#subtotal input");
      inputSubtotal.value = subtotal.toFixed(2);

      fila.querySelector(".vTotal input").value = valorTotal.toFixed(2);  //se redondea a dos decimales el valor obtenido

      ponerFila();
      calcularTotalFinal();

      objDetalle.subtotal = subtotal;

      button.parentNode.removeChild(button);
    }
    else alert("La cantidad debe ser mayor a cero");


  }
  else {
    alert("Complete los campos correctamente");
  }

  agregarobjeto();
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
  let inputIva = document.getElementById("#iva input");
  inputIva.value = valorIva.toFixed(2);
}

function calcularTotalFinal() {

  let valorIva = subtotal * 0.12;
  let inputIva = document.getElementById("inputIVA");
  inputIva.value = valorIva.toFixed(2);

  let valorFinal = subtotal + valorIva;
  let inputFinal = document.getElementById("inputTotalFinal");
  inputFinal.value = valorFinal.toFixed(2);
}

window.addEventListener("load", iniciar); 