// Vector para guardar los turnos
let turnos = [];

// Registrar paciente
function registrar() {

    let nombre = document.getElementById("nombre").value;
    let prioridad = document.getElementById("prioridad").value;

    if (nombre == "") {
        alert("Ingrese el nombre del paciente");
        return;
    }

    // Guardar en el vector
    turnos.push({
        nombre: nombre,
        prioridad: prioridad
    });

    document.getElementById("nombre").value = "";

    mostrarTurnos();
}

// Mostrar turnos en la tabla
function mostrarTurnos() {

    let tabla = document.getElementById("tabla");

    tabla.innerHTML = "";

    for (let i = 0; i < turnos.length; i++) {

        let fila = tabla.insertRow();

        fila.insertCell(0).textContent = i + 1;
        fila.insertCell(1).textContent = turnos[i].nombre;
        fila.insertCell(2).textContent = turnos[i].prioridad;
    }
}

// Atender paciente
function atender() {

    if (turnos.length == 0) {
        alert("No hay pacientes pendientes");
        return;
    }

    let posicion = -1;

    // Buscar paciente con prioridad alta
    for (let i = 0; i < turnos.length; i++) {

        if (turnos[i].prioridad == "Alta") {
            posicion = i;
            break;
        }
    }

    let paciente;

    if (posicion != -1) {

        // Atender prioridad alta
        paciente = turnos.splice(posicion, 1)[0];

    } else {

        // Atender por orden de llegada
        paciente = turnos.shift();
    }

    // Mostrar paciente atendido
    document.getElementById("atendido").textContent =
        "Paciente atendido: " + paciente.nombre;

    // Actualizar tabla
    mostrarTurnos();
}
