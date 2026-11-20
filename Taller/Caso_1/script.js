// Vectores paralelos solicitados en el requerimiento
let productos = [];
let cantidades = [];
let precios = [];

/**
 * Función para validar entradas, guardar en los vectores y actualizar la vista
 */
function agregarProducto() {
    const select = document.getElementById("selectProducto").value;
    const cantidadInput = document.getElementById("inputCantidad").value;
    const mensajeError = document.getElementById("mensajeError");

    // Limpiar mensajes de error previos
    mensajeError.textContent = "";

    // Validar que la cantidad sea un número entero positivo
    const cantidad = parseInt(cantidadInput);
    if (isNaN(cantidad) || cantidad <= 0) {
        mensajeError.textContent = "Error: Ingrese una cantidad válida mayor a 0.";
        return;
    }

    // Separar el nombre y el precio del valor del <select>
    const partes = select.split("|");
    const nombreProducto = partes[0];
    const precioUnitario = parseFloat(partes[1]);

    // Guardar los datos en los vectores correspondientes[cite: 3]
    productos.push(nombreProducto);
    cantidades.push(cantidad);
    precios.push(precioUnitario);

    // Limpiar el campo de cantidad
    document.getElementById("inputCantidad").value = "";

    // Ejecutar cálculos y mostrar resultados
    calcularYMostrarFactura();
}

/**
 * Recorre los vectores con un ciclo for para calcular subtotal, IVA, descuento y estadísticas[cite: 2, 3]
 */
function calcularYMostrarFactura() {
    const tablaDetalle = document.getElementById("tablaDetalle");
    const seccionResultados = document.getElementById("seccionResultados");
    
    tablaDetalle.innerHTML = "";
    let subtotal = 0;
    let maxPrecio = 0;
    let productoMasCaro = "";

    // Ciclo for para recorrer los vectores paralelos[cite: 3]
    for (let i = 0; i < productos.length; i++) {
        let totalItem = cantidades[i] * precios[i];
        subtotal += totalItem;

        // Estadística adicional: encontrar el producto de mayor precio unitario[cite: 2]
        if (precios[i] > maxPrecio) {
            maxPrecio = precios[i];
            productoMasCaro = productos[i];
        }

        // Construir fila en la tabla HTML
        tablaDetalle.innerHTML += `
            <tr>
                <td>${productos[i]}</td>
                <td>${cantidades[i]}</td>
                <td>$${precios[i].toFixed(2)}</td>
                <td>$${totalItem.toFixed(2)}</td>
            </tr>
        `;
    }

    // Cálculo del IVA del 15%[cite: 3]
    const iva = subtotal * 0.15;

    // Condicional compuesto para determinar si aplica el descuento del 5% (si subtotal > $20)[cite: 3]
    let descuento = 0;
    if (subtotal > 20) {
        descuento = subtotal * 0.05;
    } else if (subtotal > 0) {
        descuento = 0;
    }

    // Fórmula del Total a pagar[cite: 3]
    const totalPagar = subtotal + iva - descuento;

    // Mostrar resumen de resultados y estadísticas[cite: 2, 3]
    seccionResultados.innerHTML = `
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
        <p><strong>IVA (15%):</strong> $${iva.toFixed(2)}</p>
        <p><strong>Descuento (5% si subtotal > $20):</strong> $${descuento.toFixed(2)}</p>
        <h3>Total a pagar: $${totalPagar.toFixed(2)}</h3>
        <hr>
        <p><small>Total de ítems registrados: ${productos.length} | Producto de mayor valor unitario: ${productoMasCaro} ($${maxPrecio.toFixed(2)})</small></p>
    `;
}
