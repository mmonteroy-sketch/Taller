// Vectores paralelos: productos[] y precios[]
const productos = [];
const precios = [];

// Elementos del DOM
const inputNombre = document.querySelector('#nombre');
const inputPrecio = document.querySelector('#precio');
const mensaje = document.querySelector('#mensaje');
const tablaProductos = document.querySelector('#tablaProductos');
const cantidadEl = document.querySelector('#cantidad');
const subtotalEl = document.querySelector('#subtotal');
const ivaEl = document.querySelector('#iva');
const totalEl = document.querySelector('#total');
const masCaroEl = document.querySelector('#masCaro');
const promedioEl = document.querySelector('#promedio');

// Formatear un valor como dinero
function formatear(valor) {
    return '$' + valor.toFixed(2);
}

// Mostrar un mensaje en pantalla
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = 'mensaje ' + (tipo || '');
}

// Validar el nombre y el precio del producto
function validarProducto(nombre, precioTexto) {
    if (nombre === '') {
        return { valido: false, mensaje: 'Ingresa el nombre del producto.' };
    }

    if (precioTexto === '') {
        return { valido: false, mensaje: 'Ingresa el precio del producto.' };
    }

    const precio = Number(precioTexto);

    if (isNaN(precio) || precio <= 0) {
        return { valido: false, mensaje: 'El precio debe ser un número mayor a 0.' };
    }

    return { valido: true, precio: precio };
}

// Buscar si el producto ya existe (sin distinguir mayúsculas)
function esDuplicado(nombre) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].toLowerCase() === nombre.toLowerCase()) {
            return true;
        }
    }

    return false;
}

// Dibujar la lista de productos registrados
function mostrarProductos() {
    tablaProductos.innerHTML = '';

    if (productos.length === 0) {
        const fila = document.createElement('tr');
        const celda = document.createElement('td');
        celda.colSpan = 3;
        celda.className = 'vacio';
        celda.textContent = 'Todavía no hay productos en esta venta.';
        fila.appendChild(celda);
        tablaProductos.appendChild(fila);
        return;
    }

    for (let i = 0; i < productos.length; i++) {
        const fila = document.createElement('tr');

        const numero = fila.insertCell();
        numero.textContent = i + 1;

        const nombre = fila.insertCell();
        nombre.textContent = productos[i];

        const precio = fila.insertCell();
        precio.textContent = formatear(precios[i]);

        tablaProductos.appendChild(fila);
    }
}

// Recorrer los vectores y calcular la factura
function calcularFactura() {
    let subtotal = 0;
    let indiceMasCaro = 0;

    for (let i = 0; i < productos.length; i++) {
        subtotal = subtotal + precios[i];

        if (precios[i] > precios[indiceMasCaro]) {
            indiceMasCaro = i;
        }
    }

    const iva = subtotal * 0.15;

    return {
        cantidad: productos.length,
        subtotal: subtotal,
        iva: iva,
        total: subtotal + iva,
        productoMasCaro: productos[indiceMasCaro],
        precioMasCaro: precios[indiceMasCaro],
        promedio: subtotal / productos.length
    };
}

// Mostrar los totales de la factura
function mostrarFactura(datos) {
    cantidadEl.textContent = datos.cantidad;
    subtotalEl.textContent = formatear(datos.subtotal);
    ivaEl.textContent = formatear(datos.iva);
    totalEl.textContent = formatear(datos.total);
    masCaroEl.textContent = datos.productoMasCaro + ' — ' + formatear(datos.precioMasCaro);
    promedioEl.textContent = formatear(datos.promedio);
}

// Reiniciar los valores de la factura
function limpiarFactura() {
    cantidadEl.textContent = '0';
    subtotalEl.textContent = '$0.00';
    ivaEl.textContent = '$0.00';
    totalEl.textContent = '$0.00';
    masCaroEl.textContent = '—';
    promedioEl.textContent = '$0.00';
}

// Agregar un producto a los vectores
function agregarProducto() {
    const nombre = inputNombre.value.trim();
    const precioTexto = inputPrecio.value.trim();

    const validacion = validarProducto(nombre, precioTexto);

    if (!validacion.valido) {
        mostrarMensaje(validacion.mensaje, 'error');
        return;
    }

    if (esDuplicado(nombre)) {
        mostrarMensaje('El producto "' + nombre + '" ya está en la venta.', 'error');
        return;
    }

    // Guardar en los vectores paralelos
    productos.push(nombre);
    precios.push(validacion.precio);

    mostrarProductos();
    mostrarMensaje('Producto agregado a la venta.', 'ok');

    // Limpiar campos para el siguiente producto
    inputNombre.value = '';
    inputPrecio.value = '';
    inputNombre.focus();
}

// Calcular la factura con los productos registrados
function generarFactura() {
    if (productos.length === 0) {
        mostrarMensaje('Todavía no hay productos para facturar.', 'error');
        return;
    }

    const datos = calcularFactura();
    mostrarFactura(datos);
    mostrarMensaje('Factura calculada correctamente.', 'ok');
}

// Empezar una nueva venta
function limpiarTodo() {
    productos.length = 0;
    precios.length = 0;

    inputNombre.value = '';
    inputPrecio.value = '';

    mostrarProductos();
    limpiarFactura();
    mostrarMensaje('');

    inputNombre.focus();
}

// Botones
document.querySelector('#btnAgregar').addEventListener('click', agregarProducto);
document.querySelector('#btnFactura').addEventListener('click', generarFactura);
document.querySelector('#btnLimpiar').addEventListener('click', limpiarTodo);

// Permitir agregar con la tecla Enter
inputNombre.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        agregarProducto();
    }
});

inputPrecio.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        agregarProducto();
    }
});

// Estado inicial
mostrarProductos();
