const producto = [
    { "tipo": "Entrada", "fecha": "15/11/2024", "producto": "Aceite el faro", "cantidad": 100, "precio": 4000.00 },
    { "tipo": "Entrada", "fecha": "18/11/2024", "producto": "Detergente Ariel", "cantidad": 200, "precio": 5000.00 },
    { "tipo": "Entrada", "fecha": "18/11/2024", "producto": "Fideos La Moderna", "cantidad": 150, "precio": 3000.00 },
    { "tipo": "Entrada", "fecha": "16/11/2024", "producto": "Jabón Zote", "cantidad": 250, "precio": 2000.00 },
    { "tipo": "Salida", "fecha": "16/11/2024", "producto": "Galletas Gamesa", "cantidad": 300, "precio": 4500.00 },
    { "tipo": "Entrada", "fecha": "17/11/2024", "producto": "Suavizante Downy", "cantidad": 100, "precio": 3500.00 },
    { "tipo": "Entrada", "fecha": "17/11/2024", "producto": "Fritos Sabritas", "cantidad": 200, "precio": 6000.00 },
    { "tipo": "Salida", "fecha": "10/11/2024", "producto": "Limpiador Pine-Sol", "cantidad": 150, "precio": 5500.00 },
    { "tipo": "Entrada", "fecha": "01/11/2024", "producto": "Leche Lala", "cantidad": 100, "precio": 8000.00 }
];

function mostrarDatos(datos) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    if (datos.length === 0) {
        const tr2 = document.createElement("tr");
        tr2.innerHTML = `<td colspan="5" style="color:red; text-align:center;">No hay datos para lo seleccionado</td>`;
        tbody.appendChild(tr2)
    } else {
        datos.forEach(producto => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
      <td>${producto.tipo}</td>
      <td>${producto.fecha}</td>
      <td>${producto.producto}</td>
      <td>${producto.cantidad}</td>
      <td>${producto.precio}</td>
      `
            tbody.appendChild(tr);
        })
    }
}

/* --------------------------------Ocultar y abrir opciones------------------------------------ */
const seleccionado = document.querySelector(".seleccionado");
const seleccionar = document.querySelector(".seleccionar");

seleccionado.addEventListener("click", () => {
    seleccionar.style.display = seleccionar.style.display === "block" ? "none" : "block";
});

const selectSelected = document.querySelector(".select-selected");
const selectItems = document.querySelector(".select-items");

selectSelected.addEventListener("click", () => {
    selectItems.style.display = selectItems.style.display === "block" ? "none" : "block";
});

/* -----------------FUNCIONES PARA ORDENAR LA TABLA MOSTRANDO SOLO LOS QUE TENGAN LA FECHA SELECCIONADA-----------------------*/
function filtrarProductos() {
    const fechaSeleccionada = selectSelected.textContent.trim();
    const tipoMovimiento = document.querySelector("#tipo_de_movimiento .seleccionado").textContent.trim();


    const tipoMap = {
        'Entradas': 'Entrada',
        'Salidas': 'Salida',
        'Tipo': 'Todos'
    };

    const tipoFiltro = tipoMap[tipoMovimiento] || tipoMovimiento;

    let productosFiltrados = producto.filter(prod => {
        const fechaCorrecta = filtrarPorFecha(prod.fecha, fechaSeleccionada);
        const tipoCorrectoOTodos = tipoFiltro === 'Todos' || prod.tipo === tipoFiltro;

        return fechaCorrecta && tipoCorrectoOTodos;
    });

    mostrarDatos(productosFiltrados);
}

function filtrarPorFecha(fechaProducto, fechaSeleccionada) {
    const fechaHoy = new Date();
    const [dia, mes, anio] = fechaProducto.split('/');
    const fechaProductoObj = new Date(anio, mes - 1, dia);

    switch (fechaSeleccionada) {
        case 'Hoy':
            return fechaProductoObj.toDateString() === fechaHoy.toDateString();
        case 'Ayer':
            const fechaAyer = new Date(fechaHoy);
            fechaAyer.setDate(fechaAyer.getDate() - 1);
            return fechaProductoObj.toDateString() === fechaAyer.toDateString();
        case 'Ultima Semana':
            const fechaUltimaSemana = new Date(fechaHoy);
            fechaUltimaSemana.setDate(fechaUltimaSemana.getDate() - 7);
            return fechaProductoObj >= fechaUltimaSemana && fechaProductoObj <= fechaHoy;
        case 'Ultimo mes':
            const fechaUltimoMes = new Date(fechaHoy);
            fechaUltimoMes.setMonth(fechaUltimoMes.getMonth() - 1);
            return fechaProductoObj >= fechaUltimoMes && fechaProductoObj <= fechaHoy;
        default:
            return true;
    }
}

/* ----------------------------MANEJAR LA LOGICA DE OPCIONES-------------------------------------------- */

selectItems.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", () => {

        selectSelected.firstChild.textContent = item.textContent;
        selectItems.style.display = "none";

        filtrarProductos();
    })
})

seleccionar.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", () => {

        seleccionado.firstChild.textContent = item.textContent;
        seleccionar.style.display = "none";

        filtrarProductos();
    })
})
/* ESTE ES PARA SER MAS ESPECIFICOS PERO ESTA MEJOR EL OTRO 
  document.querySelector("#tipo_de_movimiento .seleccionar").querySelectorAll("div").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelector("#tipo_de_movimiento .seleccionado").firstChild.textContent = item.textContent;
    document.querySelector("#tipo_de_movimiento .seleccionar").style.display = "none";
    filtrarProductos();
  });
}); */


/* -----------------------------------------------FUNCION DE BUSCAR ------------------------------------------------------ */
function searchTable(query) {
    const tbody = document.querySelector(".tabla_entradas_y_salidas tbody");

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
// EVENTO DE BUSQUEDA
document.getElementById('searchInput').addEventListener('input', () => {
    const query = document.getElementById('searchInput').value.trim();
    searchTable(query);
});

/* ---------------------------------------CARGAR LOS DATOS POR DEFECTO----------------------- */
document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos(producto); // Mostrar todos los productos al cargar

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