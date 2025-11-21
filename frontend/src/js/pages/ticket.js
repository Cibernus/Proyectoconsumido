document.getElementById('Imprimir').addEventListener('click', function () {
    const element = document.querySelector('.ticket');
    html2pdf(element, {
        margin: 1,
        filename: 'ticket.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a2', orientation: 'portrait' }
    });
});



document.getElementById('Imprimir').addEventListener('click', function () {
    var contenido = document.querySelector('.ticket').outerHTML; // Captura el contenido de la clase .ticket
    var ventanaImpresion = window.open('', '', 'height=500, width=800'); // Crea una nueva ventana
    ventanaImpresion.document.write('<html><head><title>Ticket</title></head><body>');
    ventanaImpresion.document.write(contenido); // Inserta el contenido de la ticket
    ventanaImpresion.document.write('</body></html>');
    ventanaImpresion.document.close(); // Cierra el documento para que se pueda renderizar
    ventanaImpresion.print(); // Llama al método de impresión
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