// Vector de clientes en espera y contador de atendidos
const turnos = [];
let atendidos = 0;

// Elementos del DOM
const campoCliente = document.querySelector('#campoCliente');
const avisoSistema = document.querySelector('#avisoSistema');
const listaTurnos = document.querySelector('#listaTurnos');
const datoTotal = document.querySelector('#datoTotal');
const datoAtendidos = document.querySelector('#datoAtendidos');
const datoPendientes = document.querySelector('#datoPendientes');
const datoPorcentaje = document.querySelector('#datoPorcentaje');
const datoEnAtencion = document.querySelector('#datoEnAtencion');

// Mostrar un mensaje en pantalla
function mostrarAviso(texto, tipo) {
    avisoSistema.textContent = texto;
    avisoSistema.className = 'aviso' + (tipo ? ' aviso-' + tipo : '');
}

// Armar el número de turno a partir de su posición (ej: T-001)
function formatearTurno(numero) {
    return 'T-' + String(numero).padStart(3, '0');
}

// Dibujar la lista de turnos pendientes
function renderizarTurnos() {
    listaTurnos.innerHTML = '';

    if (turnos.length === 0) {
        const fila = document.createElement('tr');
        const celda = document.createElement('td');
        celda.colSpan = 2;
        celda.className = 'celda-vacia';
        celda.textContent = 'No hay turnos pendientes';
        fila.appendChild(celda);
        listaTurnos.appendChild(fila);
    } else {
        for (let i = 0; i < turnos.length; i++) {
            const fila = document.createElement('tr');

            const celdaTurno = fila.insertCell();
            celdaTurno.textContent = formatearTurno(atendidos + i + 1);

            const celdaCliente = fila.insertCell();
            celdaCliente.textContent = turnos[i];

            listaTurnos.appendChild(fila);
        }
    }

    actualizarEstadisticas();
}

// Asignar un turno al cliente escrito en el campo
function asignarTurno() {
    const nombre = campoCliente.value.trim();

    // Validar nombre vacío
    if (nombre === '') {
        mostrarAviso('Escribe el nombre del cliente antes de asignar un turno.', 'error');
        campoCliente.focus();
        return;
    }

    // Validar que no esté repetido entre los turnos pendientes
    for (let i = 0; i < turnos.length; i++) {
        if (turnos[i].toLowerCase() === nombre.toLowerCase()) {
            mostrarAviso('El cliente "' + nombre + '" ya tiene un turno pendiente.', 'error');
            campoCliente.focus();
            campoCliente.select();
            return;
        }
    }

    turnos.push(nombre);
    renderizarTurnos();

    mostrarAviso('Turno ' + formatearTurno(atendidos + turnos.length) + ' asignado a ' + nombre + '.', 'ok');

    campoCliente.value = '';
    campoCliente.focus();
}

// Atender al primer cliente del vector
function atenderSiguiente() {
    if (turnos.length === 0) {
        mostrarAviso('No quedan turnos pendientes por atender.', 'error');
        return;
    }

    const cliente = turnos.shift();
    atendidos++;

    datoEnAtencion.textContent = cliente + ' (' + formatearTurno(atendidos) + ')';
    renderizarTurnos();
    mostrarAviso('Atendiendo a ' + cliente + ' (' + formatearTurno(atendidos) + ').', 'ok');
}

// Actualizar los valores de las estadísticas (sin tocar el aviso)
function actualizarEstadisticas() {
    const pendientes = turnos.length;
    const total = atendidos + pendientes;
    const porcentaje = total === 0 ? 0 : Math.round((atendidos / total) * 100);

    datoTotal.textContent = total;
    datoAtendidos.textContent = atendidos;
    datoPendientes.textContent = pendientes;
    datoPorcentaje.textContent = porcentaje + '%';

    return { total: total, pendientes: pendientes };
}

// Mostrar las estadísticas y el mensaje correspondiente
function verEstadisticas() {
    const resumen = actualizarEstadisticas();

    if (resumen.total === 0) {
        mostrarAviso('Todavía no se han asignado turnos hoy.', 'error');
    } else if (resumen.pendientes === 0) {
        mostrarAviso('Jornada finalizada: se atendieron todos los turnos.', 'ok');
    } else {
        mostrarAviso('Estadísticas actualizadas.', 'ok');
    }
}

// Botones
document.querySelector('#botonAsignar').addEventListener('click', asignarTurno);
document.querySelector('#botonAtender').addEventListener('click', atenderSiguiente);
document.querySelector('#botonEstadisticas').addEventListener('click', verEstadisticas);

// Permitir asignar el turno con la tecla Enter
campoCliente.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        asignarTurno();
    }
});

// Estado inicial
renderizarTurnos();
