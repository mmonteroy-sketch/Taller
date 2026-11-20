// Vectores del sistema

// Vectores del sistema
let platos = [
    "Hamburguesa",
    "Ensalada",
    "Sopa",
    "Arroz con pollo",
    "Pizza",
    "Lasaña",
    "Pollo asado",
    "Papas fritas",
    "Hot dog",
    "Tacos"
];

let stock = [
    10,
    8,
    5,
    12,
    7,
    6,
    9,
    15,
    10,
    8
];

let pedidos = [];


// Mostrar inventario
function mostrarInventario() {

    let tabla = document.getElementById("inventario");

    tabla.innerHTML = "";

    for (let i = 0; i < platos.length; i++) {

        let fila = tabla.insertRow();

        fila.insertCell(0).textContent = i + 1;
        fila.insertCell(1).textContent = platos[i];
        fila.insertCell(2).textContent = stock[i];

    }
}

// Registrar pedido
function registrarPedido() {

    let nombre = document.getElementById("plato").value;

    if (nombre == "") {
        alert("Ingrese el nombre del plato");
        return;
    }

    // Buscar el plato
    let posicion = platos.indexOf(nombre);

    // Verificar si existe
    if (posicion == -1) {

        alert("El plato no existe");

    } else {

        // Verificar el stock
        if (stock[posicion] > 0) {

            // Descontar una unidad
            stock[posicion]--;

            // Guardar pedido
            pedidos.push(nombre);

            document.getElementById("mensaje").textContent =
                "Pedido aceptado: " + nombre;

        } else {

            alert("Producto agotado");

            document.getElementById("mensaje").textContent =
                "Producto agotado: " + nombre;

        }
    }

    document.getElementById("plato").value = "";

    mostrarInventario();
    mostrarPedidos();
    mostrarAgotados();
}

// Mostrar pedidos realizados
function mostrarPedidos() {

    let tabla = document.getElementById("pedidos");

    tabla.innerHTML = "";

    for (let i = 0; i < pedidos.length; i++) {

        let fila = tabla.insertRow();

        fila.insertCell(0).textContent = i + 1;
        fila.insertCell(1).textContent = pedidos[i];

    }
}

// Mostrar platos agotados
function mostrarAgotados() {

    let tabla = document.getElementById("agotados");

    tabla.innerHTML = "";

    let contador = 0;

    for (let i = 0; i < platos.length; i++) {

        if (stock[i] == 0) {

            contador++;

            let fila = tabla.insertRow();

            fila.insertCell(0).textContent = contador;
            fila.insertCell(1).textContent = platos[i];

        }
    }
}

// Mostrar datos al iniciar
mostrarInventario();
mostrarPedidos();
mostrarAgotados();
