// Vector para registrar cada movimiento (tipo y monto)
let movimientos = [];
// Variable de control para verificar disponibilidad antes de retirar
let saldoActual = 0;

/**
 * Valida la operación, evita saldos negativos y guarda el movimiento en el vector
 */
function procesarTransaccion() {
    const tipo = document.getElementById("selectOperacion").value;
    const montoInput = document.getElementById("inputMonto").value;
    const monto = parseFloat(montoInput);

    // Validación de monto numérico positivo[cite: 2]
    if (isNaN(monto) || monto <= 0) {
        alert("Alerta: Por favor ingrese un monto válido mayor a $0.");
        return;
    }

    // Validación condicional (if...else) para depósitos y retiros[cite: 4]
    if (tipo === "Depósito") {
        saldoActual += monto;
        // Guardar objeto con tipo y monto en el vector movimientos[][cite: 4]
        movimientos.push({ tipo: "Depósito", monto: monto });
    } else if (tipo === "Retiro") {
        // Verificar que el saldo sea suficiente antes de permitir el retiro[cite: 4]
        if (monto > saldoActual) {
            alert(`Alerta: Saldo insuficiente. Su saldo disponible es $${saldoActual.toFixed(2)}.`);
            return; // No realiza la operación[cite: 4]
        } else {
            saldoActual -= monto;
            movimientos.push({ tipo: "Retiro", monto: monto });
        }
    }

    // Limpiar campo de entrada
    document.getElementById("inputMonto").value = "";

    // Actualizar pantalla recorriendo el vector
    actualizarEstadoCuenta();
}

/**
 * Emplea un ciclo for...of para recorrer el vector movimientos[] y calcular totales[cite: 4]
 */
function actualizarEstadoCuenta() {
    const listaMovimientos = document.getElementById("listaMovimientos");
    const panelResultados = document.getElementById("panelResultados");

    listaMovimientos.innerHTML = "";
    let totalDepositado = 0;
    let totalRetirado = 0;
    let sumaTotalMovimientos = 0;

    // Ciclo for...of para recorrer y sumar depósitos y retiros[cite: 4]
    for (const mov of movimientos) {
        sumaTotalMovimientos += mov.monto;

        if (mov.tipo === "Depósito") {
            totalDepositado += mov.monto;
            listaMovimientos.innerHTML += `<li>Depósito: +$${mov.monto.toFixed(2)}</li>`;
        } else {
            totalRetirado += mov.monto;
            listaMovimientos.innerHTML += `<li class="retiro">Retiro: -$${mov.monto.toFixed(2)}</li>`;
        }
    }

    // Cálculo de saldo final y estadística de promedio[cite: 2, 4]
    const saldoFinal = totalDepositado - totalRetirado;
    const promedioTransaccion = movimientos.length > 0 ? (sumaTotalMovimientos / movimientos.length) : 0;

    panelResultados.innerHTML = `
        <p><strong>Total depositado:</strong> $${totalDepositado.toFixed(2)}</p>
        <p><strong>Total retirado:</strong> $${totalRetirado.toFixed(2)}</p>
        <h3>Saldo final: $${saldoFinal.toFixed(2)}</h3>
        <hr>
        <p><small>Total operaciones: ${movimientos.length} | Promedio por movimiento: $${promedioTransaccion.toFixed(2)}</small></p>
    `;
}
