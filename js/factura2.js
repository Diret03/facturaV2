// Abrir o crear la base de datos
var request = indexedDB.open('productosDB', 1);
var db;

request.onerror = function (event) {
    console.log('Error opening database: ' + event.target.errorCode);
};

request.onupgradeneeded = function (event) {
    db = event.target.result;

    // Crear un object store para almacenar los productos
    if (!db.objectStoreNames.contains('productos')) {
        var objectStore = db.createObjectStore('productos', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('codigo', 'codigo', { unique: false });
        objectStore.createIndex('cantidad', 'cantidad', { unique: false });
        objectStore.createIndex('detalle', 'detalle', { unique: false });
        objectStore.createIndex('vUnitario', 'vUnitario', { unique: false });
        objectStore.createIndex('vTotal', 'vTotal', { unique: false });
    }
};

request.onsuccess = function (event) {
    db = event.target.result;
};

function calcularTotal() {
    var codigo = document.getElementById('cod').value;
    var cantidad = parseInt(document.getElementById('cant').value);
    var detalle = document.getElementById('detalle').value;
    var vUnitario = parseFloat(document.getElementById('vUnitario').value);
    var vTotal = cantidad * vUnitario;

    // Guardar el producto en la base de datos
    var transaction = db.transaction(['productos'], 'readwrite');
    var objectStore = transaction.objectStore('productos');

    var producto = {
        codigo: codigo,
        cantidad: cantidad,
        detalle: detalle,
        vUnitario: vUnitario,
        vTotal: vTotal
    };

    var request = objectStore.add(producto);

    request.onsuccess = function (event) {
        console.log('Producto agregado a la base de datos');
        displayProductos();
        resetForm();
    };

    request.onerror = function (event) {
        console.log('Error al agregar el producto a la base de datos: ' + event.target.errorCode);
    };
}

function displayProductos() {
    var cajaDatos = document.getElementById('cajadatos');
    cajaDatos.innerHTML = '';

    var transaction = db.transaction(['productos'], 'readonly');
    var objectStore = transaction.objectStore('productos');
    var request = objectStore.openCursor();

    request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            var producto = cursor.value;
            var div = document.createElement('div');
            div.textContent = 'Código: ' + producto.codigo + ', Cantidad: ' + producto.cantidad + ', Detalle: ' + producto.detalle + ', V. Unitario: ' + producto.vUnitario + ', V. Total: ' + producto.vTotal;
            cajaDatos.appendChild(div);

            cursor.continue();
        }
    };

    request.onerror = function (event) {
        console.log('Error al leer los productos de la base de datos: ' + event.target.errorCode);
    };
}

function resetForm() {
    document.getElementById('cod').value = '';
    document.getElementById('cant').value = '';
    document.getElementById('detalle').value = '';
    document.getElementById('vUnitario').value = '';
    document.getElementById('vTotal').value = '';
}

document.getElementById('baseDatos').addEventListener('click', displayProductos);
