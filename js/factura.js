
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
}