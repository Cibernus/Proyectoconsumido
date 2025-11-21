let subtotal = 0;
const IMPUESTO = 0.10;

function cargarProductos() {
    fetch('http://localhost:3005/productos')
        .then(response => response.json())
        .then(productos => {
            const tablaCuerpo = document.querySelector('#mitabla tbody');
            tablaCuerpo.innerHTML = ''; // Limpiar la tabla antes de agregar los productos

            // Reiniciar el subtotal a cero al cargar los productos
            subtotal = 0;

            // Iterar sobre los productos y agregar filas
            productos.forEach(producto => {
                const precioConMoneda = `$ ${producto.precio.toFixed(2)}`; // Formatear el precio con signo de pesos

                // Crear una nueva fila
                const fila = document.createElement('tr');
                fila.classList.add(`producto-${producto.id}`); // Agregar una clase única por producto
                fila.style.display = 'none';

                fila.innerHTML = `
                
                    <td>${producto.nombre}</td>
                    <td class="boton">
                        <button class="menor-btn">-</button>
                        <span class="cantidad" data-max="${producto.cantidad}">0</span> <!-- Guardar cantidad máxima en data-max -->
                        <button class="mas-btn">+</button>
                    </td>
                    <td class="precio" data-precio="${producto.precio}">${precioConMoneda}</td> <!-- Precio con signo de pesos y dos decimales -->
                    <td class="td-operaciones">
                        <div class="btn-contenedor">
                            <button class="btn-eliminar"><i class="bx bx-trash"></i></button>                                 
                        </div>
                    </td>
                 `;
                // Agregar la fila a la tabla
                tablaCuerpo.appendChild(fila);
            });

            // Inicializar el subtotal, impuesto y total en cero
            actualizarSubtotal();
            actualizarImpuestoYTotal();

            // Agregar los eventos de los botones
            agregarEventosBotones();
        })
        .catch(error => console.error('Error al obtener los productos:', error));



}

// Función para agregar los eventos a los botones de la tabla
function agregarEventosBotones() {
    const tablaCuerpo = document.querySelector('#mitabla tbody');

    // Delegación de eventos para los botones de cantidad
    tablaCuerpo.addEventListener('click', function (event) {
        if (event.target.classList.contains('menor-btn') || event.target.classList.contains('mas-btn')) {
            const boton = event.target;
            const cantidadElement = boton.parentNode.querySelector('.cantidad');
            const precioElement = boton.parentNode.parentNode.querySelector('.precio');
            let cantidad = parseInt(cantidadElement.textContent); // Obtener solo el valor numérico de la cantidad
            const maxCantidad = parseInt(cantidadElement.dataset.max); // Obtener la cantidad máxima permitida
            const precio = parseFloat(precioElement.dataset.precio); // Obtener el precio del producto desde el atributo data-precio

            if (boton.classList.contains('menor-btn') && cantidad > 0) {
                cantidad--; // Disminuir cantidad
                subtotal -= precio; // Restar el precio del subtotal
            } else if (boton.classList.contains('mas-btn') && cantidad < maxCantidad) {
                cantidad++; // Aumentar cantidad
                subtotal += precio; // Sumar el precio al subtotal
            }

            cantidadElement.textContent = cantidad; // Actualizar la cantidad en la tabla

            // Mostrar el subtotal y el precio en la consola para depuración
            console.log('Precio:', precio);
            console.log('Cantidad:', cantidad);
            console.log('Subtotal:', subtotal);

            // Actualizar el subtotal, el impuesto y el total
            actualizarSubtotal();
            actualizarImpuestoYTotal();
        }

        if (event.target.closest('.btn-eliminar')) {
            const fila = event.target.closest('tr'); // Fila actual del producto
            const cantidadElement = fila.querySelector('.cantidad'); // Cantidad actual
            const precioElement = fila.querySelector('.precio'); // Precio del producto
            const cantidad = parseInt(cantidadElement.textContent); // Cantidad seleccionada
            const precio = parseFloat(precioElement.dataset.precio); // Precio por unidad

            if (cantidad > 0) {
                subtotal -= cantidad * precio; // Actualizar el subtotal
                cantidadElement.textContent = '0'; // Restablecer la cantidad a 0
                actualizarSubtotal();
                actualizarImpuestoYTotal();
            }

            // Ocultar la fila del producto eliminado
            fila.style.display = 'none';
            console.log(`Producto eliminado temporalmente: ${fila.querySelector('td').textContent}`);
        }


    });

    // Agregar evento al campo de entrada para calcular cambio automáticamente
    const efectivoElement = document.querySelector('#efectivo');
    if (efectivoElement) {
        efectivoElement.addEventListener('input', calcularCambio);
    }
}

// Función para calcular el cambio
function calcularCambio() {
    const efectivoElement = document.querySelector('#efectivo');
    const cambioElement = document.querySelector('#cambio');
    const efectivo = parseFloat(efectivoElement.value);
    const total = parseFloat(document.querySelector('#Total').textContent.replace('$', ''));

    if (!isNaN(efectivo) && efectivo >= total) {
        const cambio = efectivo - total;
        cambioElement.textContent = `Cambio: $ ${cambio.toFixed(2)}`;
    } else {
        cambioElement.textContent = 'Efectivo insuficiente';
    }
}

// Función para actualizar el subtotal
function actualizarSubtotal() {
    const subtotalElement = document.querySelector('#Subtotal'); // Obtener el elemento donde se muestra el subtotal
    subtotalElement.textContent = `$ ${subtotal.toFixed(2)}`; // Mostrar el subtotal con dos decimales

    // Mostrar el valor del subtotal en la consola para depuración
    console.log('Actualizar Subtotal:', subtotal);
}

// Función para actualizar el impuesto y el total
function actualizarImpuestoYTotal() {
    const impuesto = subtotal * IMPUESTO; // Calcular el impuesto (10% del subtotal)
    const total = subtotal + impuesto; // Calcular el total (subtotal + impuesto)

    // Mostrar el impuesto en la tabla
    const impuestoElement = document.querySelector('#Impuestos');
    if (impuestoElement) {
        impuestoElement.textContent = `$ ${impuesto.toFixed(2)}`; // Actualizar el impuesto con dos decimales
    }

    // Mostrar el total en la tabla
    const totalElement = document.querySelector('#Total');
    if (totalElement) {
        totalElement.textContent = `$ ${total.toFixed(2)}`; // Actualizar el total con dos decimales
    }

    // Mostrar los valores de impuesto y total en la consola para depuración
    console.log('Impuesto:', impuesto);
    console.log('Total:', total);
}


// Llamar a la función para cargar los productos cuando la página se carga
window.onload = cargarProductos;




document.getElementById("search").addEventListener("input", () => {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filas = document.querySelectorAll('#mitabla tbody tr');

    let productoSeleccionado = false; // Variable para verificar si hay un producto con cantidad > 0 mostrado

    filas.forEach(fila => {
        const nombre = fila.querySelector('td').textContent.toLowerCase();
        const cantidadElement = fila.querySelector('.cantidad');
        const cantidad = parseInt(cantidadElement.textContent); // Cantidad seleccionada

        if (searchTerm !== '' && nombre.includes(searchTerm)) {
            // Mostrar producto que coincide con la búsqueda
            fila.style.display = '';
            productoSeleccionado = true; // Indicar que se encontró un producto coincidente
        } else if (cantidad > 0 && searchTerm === '') {
            // Mostrar productos seleccionados solo si no hay término de búsqueda
            fila.style.display = '';
        } else {
            // Ocultar el resto de los productos
            fila.style.display = 'none';
        }
    });

    // Si hay un término de búsqueda pero no se seleccionó el producto buscado,
    // volver a mostrar los productos previamente seleccionados
    if (!productoSeleccionado && searchTerm === '') {
        filas.forEach(fila => {
            const cantidad = parseInt(fila.querySelector('.cantidad').textContent); // Cantidad seleccionada
            if (cantidad > 0) {
                fila.style.display = '';
            }
        });
    }
});


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