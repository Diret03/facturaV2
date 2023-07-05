//se crea la base de datos
var solicitud = indexedDB.open('productosDB', 1);
var db;

solicitud.onerror = function (event) {
    alert('Error opening database: ' + event.target.errorCode);
};

solicitud.onupgradeneeded = function (event) {
    db = event.target.result;

    // Crear un object store para almacenar los productos
    if (!db.objectStoreNames.contains('productos')) {
        var objectStore = db.createObjectStore('productos', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('codigo', 'codigo', { unique: true });
        objectStore.createIndex('cantidad', 'cantidad', { unique: false });
        objectStore.createIndex('detalle', 'detalle', { unique: false });
        objectStore.createIndex('vUnitario', 'vUnitario', { unique: false });
        objectStore.createIndex('vTotal', 'vTotal', { unique: false });
    }
};

solicitud.onsuccess = function (event) {
    db = event.target.result;
};

function agregarProducto() {
    let codigo = document.getElementById('cod').value;
    let cantidad = document.getElementById('cant').value;
    let detalle = document.getElementById('detalle').value;
    let vUnitario = document.getElementById('vUnitario').value;

    if (codigo != '' && cantidad != '' && vUnitario != '') {

        let vTotal = cantidad * vUnitario;


        // Guardar el producto en la base de datos
        let transaccion = db.transaction(['productos'], 'readwrite');
        let objectStore = transaccion.objectStore('productos');

        let producto = {
            codigo: codigo,
            cantidad: cantidad,
            detalle: detalle,
            vUnitario: vUnitario,
            vTotal: vTotal
        };

        let solicitud = objectStore.add(producto);

        solicitud.onsuccess = function (event) {
            console.log('Producto agregado a la base de datos');
            mostrarProductos();
            resetearFila();

        };

        solicitud.onerror = function (event) {
            alert('Error al agregar el producto a la base de datos: ' + event.target.errorCode);
        };
    }
    else alert('Complete los campos correctamente');
}

function mostrarProductos() {
    let cajaDatos = document.getElementById('cajadatos');
    cajaDatos.innerHTML = '';

    let transaction = db.transaction(['productos'], 'readonly');
    let objectStore = transaction.objectStore('productos');
    let request = objectStore.openCursor();

    request.onsuccess = function (event) {
        let puntero = event.target.result;
        if (puntero) {
            let producto = puntero.value;
            let div = document.createElement('div');
            div.textContent = ' Código: ' + producto.codigo + ' - Cantidad: ' + producto.cantidad + ' - Detalle: ' + producto.detalle + ' - V. Unitario: ' + producto.vUnitario + ' - V. Total: ' + producto.vTotal.toFixed(2);

            cajaDatos.appendChild(div);

            puntero.continue();
        }
        calcularTotales();

    };

    request.onerror = function (event) {
        alert('Error al leer los productos de la base de datos: ' + event.target.errorCode);
    };
}

function resetearFila() {  //se vacian la fila al terminar los calculos
    document.getElementById('cod').value = '';
    document.getElementById('cant').value = '';
    document.getElementById('detalle').value = '';
    document.getElementById('vUnitario').value = '';
    document.getElementById('vTotal').value = '';
}

function vaciarBaseDatos() {
    let transaccion = db.transaction(['productos'], 'readwrite');
    let objectStore = transaccion.objectStore('productos');
    let solicitud = objectStore.clear();

    solicitud.onsuccess = function (event) {
        alert('Base de datos vaciada correctamente');
    };

    solicitud.onerror = function (event) {
        alert('Error al vaciar la base de datos: ' + event.target.errorCode);
    };
}

function calcularTotales() {
    let subtotal = 0;
    let iva = 0;
    let total = 0;

    let transaccion = db.transaction(['productos'], 'readonly');
    let objectStore = transaccion.objectStore('productos');
    let solicitud = objectStore.openCursor();

    solicitud.onsuccess = function (event) {
        let puntero = event.target.result;
        if (puntero) {
            let producto = puntero.value;
            subtotal += producto.vTotal;
            puntero.continue();
        } else {
            if (subtotal > 0) {
                iva = subtotal * 0.12;
                total = subtotal + iva;
                document.getElementById('inputSubtotal').value = subtotal.toFixed(2);
                document.getElementById('inputIVA').value = iva.toFixed(2);
                document.getElementById('inputTotalFinal').value = total.toFixed(2);
            }

            else  //si no hay ningún producto en la base de datos
            {
                document.getElementById('inputSubtotal').value = '0.00';
                document.getElementById('inputIVA').value = '0.00';
                document.getElementById('inputTotalFinal').value = '0.00';
            }
        }
    };

    solicitud.onerror = function (event) {
        alert('Error al leer los productos de la base de datos: ' + event.target.errorCode);
    };
}

function buscarProducto() {
    let valorBuscar = document.getElementById('valorBuscar').value;
    let transaccion = db.transaction(['productos'], 'readonly');
    let objectStore = transaccion.objectStore('productos');
    let indice = objectStore.index('codigo');
    let solicitud = indice.get(valorBuscar);

    solicitud.onsuccess = function (event) {
        let producto = event.target.result;
        if (producto) {

            let cajaDatos = document.getElementById('cajadatos');
            cajaDatos.innerHTML =
                'Producto encontrado<br><br>' +
                'Código: ' + producto.codigo + '<br>' +
                'Cantidad: ' + producto.cantidad + '<br>' +
                'Detalle: ' + producto.detalle + '<br>' +
                'V. Unitario: ' + producto.vUnitario + '<br>' +
                'V. Total: ' + producto.vTotal + '<br>';

        } else {
            alert('Producto no encontrado');
        }
    };

    solicitud.onerror = function (event) {
        alert('Error al buscar el producto: ' + event.target.errorCode);
    };
}
