const productos = [
    { nombre: "Galletas Marias", stock: 300, valorTotal: 12000.00, costoTotal: 6000.00, gananciaTotal: 6000.00 },
    { nombre: "Sabritas Doritos Dinamita", stock: 150, valorTotal: 22500.00, costoTotal: 11250.00, gananciaTotal: 11250.00 },
    { nombre: "Sabritas Cheetos Flamin' Hot", stock: 180, valorTotal: 21600.00, costoTotal: 10800.00, gananciaTotal: 10800.00 },
    { nombre: "Sabritas Ruffles Limon", stock: 220, valorTotal: 44000.00, costoTotal: 22000.00, gananciaTotal: 22000.00 },
    { nombre: "Bonafont Agua", stock: 300, valorTotal: 27000.00, costoTotal: 13500.00, gananciaTotal: 13500.00 },
    { nombre: "Vinegar Alacena", stock: 100, valorTotal: 5000.00, costoTotal: 2500.00, gananciaTotal: 2500.00 },
    { nombre: "Herdes Chiles", stock: 150, valorTotal: 7500.00, costoTotal: 3750.00, gananciaTotal: 3750.00 },
    { nombre: "La Costeña Frijoles", stock: 200, valorTotal: 10000.00, costoTotal: 5000.00, gananciaTotal: 5000.00 },
    { nombre: "Cemex Cemento", stock: 50, valorTotal: 20000.00, costoTotal: 10000.00, gananciaTotal: 10000.00 },
];

function mostrarDatos() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar la tabla
    productos.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.stock} unidades</td>
            <td>${producto.valorTotal.toFixed(2)}</td>
            <td>${producto.costoTotal.toFixed(2)}</td>
            <td>${producto.gananciaTotal.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', mostrarDatos);

/* -----------------------------------------------FUNCIONES PARA ORDENAR------------------------------------------------------------- */
function ordenarPorMayorGanancia() {
    productos.sort((a, b) => b.gananciaTotal - a.gananciaTotal);
    mostrarDatos(); // Actualizar la tabla
}

function ordenarPorMenorGanancia() {
    productos.sort((a, b) => a.gananciaTotal - b.gananciaTotal);
    mostrarDatos(); // Actualizar la tabla
}

function ordenarPorMayorValorTotal() {
    productos.sort((a, b) => b.valorTotal - a.valorTotal);
    mostrarDatos(); // Actualizar la tabla
}

function ordenarPorMenorValorTotal() {
    productos.sort((a, b) => a.valorTotal - b.valorTotal);
    mostrarDatos(); // Actualizar la tabla
}

function ordenarPorMayorCostoTotal() {
    productos.sort((a, b) => b.costoTotal - a.costoTotal);
    mostrarDatos(); // Actualizar la tabla
}

function ordenarPorMenorCostoTotal() {
    productos.sort((a, b) => a.costoTotal - b.costoTotal);
    mostrarDatos(); // Actualizar la tabla
}



/* -------------------------------------------------------LOGICA PARA BOTON DE OPCIONES DESPLEGABLES ------------------------------------------------------------ */

const selectSelected = document.querySelector(".select-selected");
const selectItems = document.querySelector(".select-items");

// Mostrar/ocultar las opciones al hacer clic en el elemento seleccionado
selectSelected.addEventListener("click", () => {
    selectItems.style.display =
        selectItems.style.display === "block" ? "none" : "block";
});

// Manejar la selección de una opción
selectItems.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", () => {
        selectSelected.firstChild.textContent = item.textContent; // Actualiza el texto seleccionado
        selectItems.style.display = "none"; // Ocultar opciones

        const valorSeleccionado = item.getAttribute("data-value"); // Obtener el valor de data-value
        switch (valorSeleccionado) {
            case 'mayor-ganancia':
                ordenarPorMayorGanancia();
                break;
            case 'menor-ganancia':
                ordenarPorMenorGanancia();
                break;
            case 'mayor-valor-total':
                ordenarPorMayorValorTotal();
                break;
            case 'menor-valor-total':
                ordenarPorMenorValorTotal();
                break;
            case 'mayor-costo-total':
                ordenarPorMayorCostoTotal();
                break;
            case 'menor-costo-total':
                ordenarPorMenorCostoTotal();
                break;
            default:
                break;
        }
    });
});

// CERRAR EL MENU SI EL USUARIO HACE CLICK AFUERA DE EL 
document.addEventListener("click", (e) => {
    if (!selectSelected.contains(e.target)) {
        selectItems.style.display = "none";
    }
});

/* ---------------------------------------------FUNCION PARA QUE EL USUARIO BUSQUE-------------------------------------- */
function searchTable(query) {
    const tbody = document.querySelector(".tabla_valor_total_de_inventario tbody");

    if (!tbody) return; /* SI NO ENCUENTRA EL BODY REGRESA */

    const rows = tbody.getElementsByTagName('tr');
    const queryLower = query.toLowerCase(); /* SE CONVIERTE LO QUE ESTA ESCRIBIENDO EL USUARIO A MINUSCULAS PARA QUE LA BUSQUEDA SEA INSENSIBLE */
    let resultsFound = false;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let shouldDisplay = false;/* SE DECLARA UNA VARIABLE PARA VER SI SE MUESTRA O NO */

        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].textContent || cells[j].innerText;/* LE PUSE DOS OPCIONES POR SI UNOS NAVEGADORAS NO ACEPTAN UN METODO */
            if (cellText.toLowerCase().includes(queryLower)) {/* SE COMPARAN LOS TEXTOS */
                shouldDisplay = true;
                break;
            } else {
                /* NO HAGAS NADA */
            }
        }

        rows[i].style.display = shouldDisplay ? '' : 'none';

        // Si al menos una fila es visible, hay resultados
        if (shouldDisplay) {
            resultsFound = true;
        } else {
            /* NO HAGAS NADA */
        }
    }

    // ELIMINAR EL MENSAJE DE NO RESULTADOS PARA MOSTRAR REGISTROS
    const existingNoResultsRow = document.getElementById('noResults');
    if (existingNoResultsRow) {
        existingNoResultsRow.remove();
    } else {
        /* NO HAGAS NADA */
    }

    // Si no hay resultados y hay un query, mostrar mensaje
    if (!resultsFound && query.trim() !== '') {
        const noResults = document.createElement('tr');
        noResults.id = 'noResults';/* ES NESEARIO EL ID PARA BORRAR EL MENSAJE */
        noResults.innerHTML = `<td colspan="5" style="color:red; text-align:center;">No se encontraron resultados</td>`;
        tbody.appendChild(noResults);
    } else {
        /* NO HAGAS NADA */
    }
}

// Evento de búsqueda
document.getElementById('searchInput').addEventListener('input', () => {
    const query = document.getElementById('searchInput').value.trim();
    searchTable(query);
});

/* --------------------------------------- ABRIR Y CERRAR EL MENU DE OPCIONES DE OPCIONES Y NOTIFICACIONES ---------------------- */
const dropdown = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdown2 = document.querySelector(".dropdown-toggle2");
const dropdownMenu2 = document.querySelector(".dropdown-menu2");

dropdown.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle("show");

    /* SI EL SEGUNDO MENU ESTA ABIERTO */
    if (dropdownMenu2.classList.contains("show")) {
        /* CIERRALO */
        dropdownMenu2.classList.remove("show");
    }

});

dropdown2.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu2.classList.toggle("show");
    /* SI EL PRIMER MENU ESTA ABIERTO */
    if (dropdownMenu.classList.contains("show")) {
        /* CIERRALO */
        dropdownMenu.classList.remove("show");
    }
});

document.addEventListener("click", () => {
    dropdownMenu.classList.remove("show");
    dropdownMenu2.classList.remove("show");
}) 