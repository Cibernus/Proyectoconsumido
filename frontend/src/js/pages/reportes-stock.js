const productos = [
    { "producto": "Mayonesa", "stockActual": 250, "ventas": 0, "valorTotal": 16500.00, "rotacion": 0, "nivelDeRotacion": "Lento" },
    { "producto": "Jamon Fud", "stockActual": 250, "ventas": 0, "valorTotal": 19000.00, "rotacion": 0, "nivelDeRotacion": "Lento" },
    { "producto": "Gel antibacterial", "stockActual": 250, "ventas": 0, "valorTotal": 1000.00, "rotacion": 0, "nivelDeRotacion": "Lento" },
    { "producto": "Doritos Diablo", "stockActual": 250, "ventas": 0, "valorTotal": 20000.00, "rotacion": 0, "nivelDeRotacion": "Lento" },
    { "producto": "Pepsi", "stockActual": 100, "ventas": 150, "valorTotal": 9000.00, "rotacion": 1.5, "nivelDeRotacion": "Rápido" },
    { "producto": "Coca-Cola", "stockActual": 100, "ventas": 120, "valorTotal": 8750.00, "rotacion": 1.2, "nivelDeRotacion": "Rápido" },
    { "producto": "Nescafé", "stockActual": 200, "ventas": 20, "valorTotal": 15000.00, "rotacion": 0.1, "nivelDeRotacion": "Medio" },
    { "producto": "Colgate", "stockActual": 150, "ventas": 25, "valorTotal": 7500.00, "rotacion": 0.167, "nivelDeRotacion": "Medio" },
    { "producto": "Danone", "stockActual": 250, "ventas": 40, "valorTotal": 10000.00, "rotacion": 0.16, "nivelDeRotacion": "Medio" },
    { "producto": "Gatorade", "stockActual": 220, "ventas": 15, "valorTotal": 11000.00, "rotacion": 0.068, "nivelDeRotacion": "Lento" }
];


const tr = document.createElement('tr');

function mostrarDatos() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    productos.forEach((producto) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${producto.producto}</td>
        <td>${producto.stockActual} unidades</td>
        <td>${producto.ventas}</td>
        <td>${producto.valorTotal.toFixed(2)}</td>
        <td>${producto.nivelDeRotacion}</td>
      `;
        tbody.appendChild(tr);
    })
}

document.addEventListener('DOMContentLoaded', mostrarDatos);
/* -----------------------------------------------FUNCIONES PARA ORDENAR------------------------------------------------------------- */
// Ordenar de A-Z
function ordenarPorAZ() {
    productos.sort((a, b) => a.producto.localeCompare(b.producto));
    mostrarDatos(); // Actualizar la tabla
}

// Ordenar de Z-A
function ordenarPorZA() {
    productos.sort((a, b) => b.producto.localeCompare(a.producto));
    mostrarDatos(); // Actualizar la tabla
}

// Ordenar por mayor valor total
function ordenarPorMayorValor() {
    productos.sort((a, b) => b.valorTotal - a.valorTotal);
    mostrarDatos(); // Actualizar la tabla
}

// Ordenar por menor valor total
function ordenarPorMenorValor() {
    productos.sort((a, b) => a.valorTotal - b.valorTotal);
    mostrarDatos(); // Actualizar la tabla
}

// Ordenar por mayor stock
function ordenarPorMayorStock() {
    productos.sort((a, b) => b.stockActual - a.stockActual);
    mostrarDatos(); // Actualizar la tabla
}

// Ordenar por menor stock
function ordenarPorMenorStock() {
    productos.sort((a, b) => a.stockActual - b.stockActual);
    mostrarDatos(); // Actualizar la tabla
}

// Ordenar por mayor rotación (ventas)
function ordenarPorMayorRotacion() {
    productos.sort((a, b) => b.ventas - a.ventas);
    mostrarDatos(); // Actualizar la tabla
}

// Ordenar por menor rotación (ventas)
function ordenarPorMenorRotacion() {
    productos.sort((a, b) => a.ventas - b.ventas);
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

// Cerrar el menú si se hace clic fuera de él 
document.addEventListener("click", (e) => {
    if (!selectSelected.contains(e.target)) {
        selectItems.style.display = "none";
    }
});

// Manejar la selección de una opción
selectItems.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", () => {
        selectSelected.firstChild.textContent = item.textContent;
        selectItems.style.display = "none";

        const valorSeleccionado = item.getAttribute("data-value"); // OBTIENE EL VALOR DEL DATA-VALUE Y CON UN SWITCH SE CONTROLA LO QUE SUCEDERA
        switch (valorSeleccionado) {
            case 'a-z':
                ordenarPorAZ();
                break;
            case 'z-a':
                ordenarPorZA();
                break;
            case 'mayor_valor':
                ordenarPorMayorValor();
                break;
            case 'menor_valor':
                ordenarPorMenorValor();
                break;
            case 'mayor_stock':
                ordenarPorMayorStock();
                break;
            case 'menor_stock':
                ordenarPorMenorStock();
                break;
            case 'mayor_rotacion':
                ordenarPorMayorRotacion();
                break;
            case 'menor_rotacion':
                ordenarPorMenorRotacion();
                break;
            default:
                break;
        }
    });
});

/* --------------------------------------------------FUNCION PARA DESCARGAR UN ARCHIVO EXCEL----------------------------------------------------------------- */

function exportarAExcel() {

    const tabla = document.querySelector('table');
    // CREAN UN LIBRO DE TRABAJO DE EXCEL "TODO ESTO ES GRACIAS ALA LIBRERIA"
    const workbook = XLSX.utils.table_to_book(tabla);
    // GENERA EL ARCHIVO EXCEL
    XLSX.writeFile(workbook, 'reporteDeStock.xlsx');
}

document.getElementById('descargarExcel').addEventListener('click', exportarAExcel);



/* ---------------------------------------------FUNCION PARA QUE EL USUARIO BUSQUE-------------------------------------- */
function searchTable(query) {
    const tbody = document.querySelector(".tabla-reporte_general_de_stock tbody");

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

/* CERRAR EL MENU DE USUARIO DESPLEGABLE (TENGO DOS EVENTOS DE ESTE TIPO, SI BIEN LOS PUDE UNIR PERO PARA MAYOR COMPRENSION LO SEPARE)*/
document.addEventListener("click", () => {
    dropdownMenu.classList.remove("show");
    dropdownMenu2.classList.remove("show");
});