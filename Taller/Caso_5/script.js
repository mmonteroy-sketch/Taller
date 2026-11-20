let placas = ["ABC123", "XYZ999"];
let horasEntrada = [9, 10];

// Constante de tarifa por hora ($0.75/hora)
const TARIFA_HORA = 0.75;

// Variables acumuladoras para estadísticas del día
let totalCobradoDia = 0;
let totalAutosSalidos = 0;

const inputPlacaEntrada = document.getElementById("placaEntrada");
const inputHoraEntrada = document.getElementById("horaEntrada");
const btnIngresar = document.getElementById("btnIngresar");

const inputPlacaSalida = document.getElementById("placaSalida");
const inputHoraSalida = document.getElementById("horaSalida");
const btnRetirar = document.getElementById("btnRetirar");

const tablaVehiculos = document.getElementById("tablaVehiculos");
const spanTotalAutos = document.getElementById("totalAutos");
const spanAutosAtendidos = document.getElementById("autosAtendidos");
const spanTotalRecaudado = document.getElementById("totalRecaudado");
const divMensaje = document.getElementById("mensajeAlerta");

// FUNCIÓN PARA MOSTRAR MENSAJES DE VALIDACIÓN O ÉXITO
function mostrarMensaje(texto, tipo) {
    divMensaje.textContent = texto;
    divMensaje.className = `mensaje ${tipo}`; // tipo: 'exito' o 'error'
    divMensaje.style.display = "block";
}

// ALGORITMO PARA REGISTRAR EL INGRESO DE UN VEHÍCULO
function registrarIngreso() {
    // Limpiar espacios y convertir placa a mayúsculas
    const placa = inputPlacaEntrada.value.trim().toUpperCase();
    const hora = parseInt(inputHoraEntrada.value);

    // Validación 1: Campos vacíos o formato incorrecto
    if (placa === "" || isNaN(hora)) {
        mostrarMensaje("Error: Debe ingresar la placa y una hora de entrada válida.", "error");
        return;
    }

    // Validación 2: Rango horario permitido (0 a 23)
    if (hora < 0 || hora > 23) {
        mostrarMensaje("Error: La hora de entrada debe estar entre 0 y 23.", "error");
        return;
    }

    // Validación 3: Evitar placas duplicadas usando indexOf()
    if (placas.indexOf(placa) !== -1) {
        mostrarMensaje(`Error: El vehículo con placa ${placa} ya se encuentra en el parqueadero.`, "error");
        return;
    }

    // Guardar datos en los vectores paralelos
    placas.push(placa);
    horasEntrada.push(hora);

    // Limpiar formulario y actualizar pantalla
    inputPlacaEntrada.value = "";
    inputHoraEntrada.value = "";
    mostrarMensaje(`Vehículo ${placa} ingresado correctamente a las ${hora}:00.`, "exito");
    actualizarInterfaz();
}

// ALGORITMO PARA RETIRAR UN VEHÍCULO Y CALCULAR COBRO
function registrarSalida() {
    const placa = inputPlacaSalida.value.trim().toUpperCase();
    const horaSalida = parseInt(inputHoraSalida.value);

    // Validación 1: Campos vacíos
    if (placa === "" || isNaN(horaSalida)) {
        mostrarMensaje("Error: Debe ingresar la placa y la hora de salida.", "error");
        return;
    }

    // Búsqueda por índice usando indexOf() (Lógica esperada en el PDF)
    const indice = placas.indexOf(placa);

    // Validación 2: Verificar si la placa existe en el vector
    if (indice === -1) {
        mostrarMensaje(`Error: No se encontró ningún vehículo estacionado con la placa ${placa}.`, "error");
        return;
    }

    // Obtener la hora de entrada correspondiente al índice encontrado
    const horaIngreso = horasEntrada[indice];

    // Validación 3: La hora de salida debe ser mayor a la hora de entrada
    if (horaSalida <= horaIngreso || horaSalida > 24) {
        mostrarMensaje(`Error: La hora de salida (${horaSalida}:00) debe ser mayor a la de entrada (${horaIngreso}:00) y máximo 24.`, "error");
        return;
    }

    // Cálculo de horas de permanencia y valor a pagar
    const horasPermanencia = horaSalida - horaIngreso;
    const valorPagar = horasPermanencia * TARIFA_HORA;

    // Actualizar estadísticas globales
    totalCobradoDia += valorPagar;
    totalAutosSalidos++;

    // Eliminar el vehículo de ambos vectores usando splice() (Lógica esperada en el PDF)
    placas.splice(indice, 1);
    horasEntrada.splice(indice, 1);

    // Limpiar campos y mostrar comprobante
    inputPlacaSalida.value = "";
    inputHoraSalida.value = "";
    mostrarMensaje(
        `Salida exitosa - Placa: ${placa} | Tiempo: ${horasPermanencia} hora(s) | Total a pagar: $${valorPagar.toFixed(2)}`,
        "exito"
    );
    actualizarInterfaz();
}

// ALGORITMO PARA RECORRER VECTORES Y ACTUALIZAR TABLA Y ESTADÍSTICAS
function actualizarInterfaz() {
    // Limpiar el contenido actual de la tabla
    tablaVehiculos.innerHTML = "";

    // Verificar si el parqueadero está vacío
    if (placas.length === 0) {
        tablaVehiculos.innerHTML = `<tr><td colspan="3">No hay vehículos estacionados actualmente.</td></tr>`;
    } else {
        // Uso de ciclo FOR para recorrer los vectores paralelos
        for (let i = 0; i < placas.length; i++) {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${i + 1}</td>
                <td><strong>${placas[i]}</strong></td>
                <td>${horasEntrada[i]}:00 hrs</td>
            `;
            tablaVehiculos.appendChild(fila);
        }
    }

    spanTotalAutos.textContent = placas.length;
    spanAutosAtendidos.textContent = totalAutosSalidos;
    spanTotalRecaudado.textContent = totalCobradoDia.toFixed(2);
}

// ASIGNACIÓN DE EVENTOS A LOS BOTONES
btnIngresar.addEventListener("click", registrarIngreso);
btnRetirar.addEventListener("click", registrarSalida);

// Renderizar la tabla inicial al cargar la página
actualizarInterfaz(); 
