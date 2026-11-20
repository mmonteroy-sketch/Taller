// Inicializados con los datos del ejemplo del taller para pruebas inmediatas
let nombres = ["Ana", "Luis", "Marta", "José"];
let notas = [9, 6, 8, 7];

//  REFERENCIAS A ELEMENTOS DEL DOM
const inputNombre = document.getElementById("nombreEstudiante");
const inputNota = document.getElementById("notaEstudiante");
const btnRegistrar = document.getElementById("btnRegistrar");
const btnCalcular = document.getElementById("btnCalcular");

const tablaNotas = document.getElementById("tablaNotas");
const resPromedio = document.getElementById("resPromedio");
const resNotaAlta = document.getElementById("resNotaAlta");
const resAprobados = document.getElementById("resAprobados");
const divMensaje = document.getElementById("mensajeAlerta");

//  FUNCIÓN PARA MOSTRAR MENSAJES DE VALIDACIÓN O ÉXITO
function mostrarMensaje(texto, tipo) {
    divMensaje.textContent = texto;
    divMensaje.className = `mensaje ${tipo}`;
    divMensaje.style.display = "block";
}

//  ALGORITMO PARA REGISTRAR NOMBRE Y NOTA CON VALIDACIONES
function registrarCalificacion() {
    const nombre = inputNombre.value.trim();
    const nota = parseFloat(inputNota.value);

    // Validación 1: Nombre no vacío
    if (nombre === "") {
        mostrarMensaje("Error: Debe ingresar el nombre del estudiante.", "error");
        return;
    }

    // Validación 2: Nota numérica dentro del rango permitido (0 a 10)
    if (isNaN(nota) || nota < 0 || nota > 10) {
        mostrarMensaje("Error: La nota debe ser un número válido entre 0 y 10.", "error");
        return;
    }

    // Validación 3: Evitar nombres duplicados (ignorando mayúsculas/minúsculas)
    const existe = nombres.some(n => n.toLowerCase() === nombre.toLowerCase());
    if (existe) {
        mostrarMensaje(`Error: El estudiante "${nombre}" ya tiene una calificación registrada.`, "error");
        return;
    }

    // Guardar en los vectores paralelos
    nombres.push(nombre);
    notas.push(nota);

    // Limpiar entradas y actualizar tabla
    inputNombre.value = "";
    inputNota.value = "";
    mostrarMensaje(`Calificación de ${nombre} (${nota}) registrada correctamente.`, "exito");
    renderizarTabla();
}

// ALGORITMO PARA RECORRER VECTORES Y CALCULAR ESTADÍSTICAS
function calcularEstadisticas() {
    // Validar que existan datos registrados
    if (notas.length === 0) {
        mostrarMensaje("Error: No hay calificaciones registradas para calcular estadísticas.", "error");
        return;
    }

    // Variables acumuladoras y auxiliares
    let sumaNotas = 0;
    let notaMaxima = notas[0];
    let estudianteMaximo = nombres[0];
    let cantidadAprobados = 0;

    // Ciclo FOR 
    for (let i = 0; i < notas.length; i++) {
        // Acumular sumatoria para el promedio
        sumaNotas += notas[i];

        // Condicional para encontrar la nota más alta y su estudiante
        if (notas[i] > notaMaxima) {
            notaMaxima = notas[i];
            estudianteMaximo = nombres[i];
        }

        // Condicional para contar aprobados (nota >= 7)
        if (notas[i] >= 7) {
            cantidadAprobados++;
        }
    }

    // Cálculos finales
    const promedio = sumaNotas / notas.length;
    const porcentajeAprobados = (cantidadAprobados / notas.length) * 100;

    // Mostrar resultados en pantalla
    resPromedio.textContent = promedio.toFixed(2);
    resNotaAlta.textContent = `${notaMaxima} (${estudianteMaximo})`;
    resAprobados.textContent = `${cantidadAprobados}/${notas.length} (${porcentajeAprobados.toFixed(0)}%)`;

    mostrarMensaje("Estadísticas actualizadas correctamente.", "exito");
}

// 6. FUNCIÓN PARA MOSTRAR LA TABLA DE ESTUDIANTES
function renderizarTabla() {
    tablaNotas.innerHTML = "";

    if (nombres.length === 0) {
        tablaNotas.innerHTML = `<tr><td colspan="4">No hay estudiantes registrados.</td></tr>`;
        return;
    }

    for (let i = 0; i < nombres.length; i++) {
        const esAprobado = notas[i] >= 7;
        const estadoTexto = esAprobado ? "Aprobado" : "Reprobado";
        const claseEstado = esAprobado ? "aprobado" : "reprobado";

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${nombres[i]}</td>
            <td><strong>${notas[i].toFixed(1)}</strong></td>
            <td class="${claseEstado}">${estadoTexto}</td>
        `;
        tablaNotas.appendChild(fila);
    }
}

// 7. EVENTOS DE BOTONES
btnRegistrar.addEventListener("click", registrarCalificacion);
btnCalcular.addEventListener("click", calcularEstadisticas);

// Cargar tabla inicial al abrir la página
renderizarTabla();