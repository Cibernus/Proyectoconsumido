import { crearProveedor } from "../api/proveedoresInsertApi.js";
import { manejarInput } from "./proveedoresInsertvalidaciones.js";

// Inicialización del evento
document.addEventListener("DOMContentLoaded", inicializarEventos);

function inicializarEventos() {
  let formulario = document.getElementById("formAgregarProveedor");
  formulario.addEventListener("submit", manejarSubmitProveedor);

  const inputs = formulario.querySelectorAll("input");
  inputs.forEach(input => {
    input.addEventListener("input", manejarInput);
  });
}

// Función para capitalizar nombres
function capitalizar(texto) {
  return texto
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

// Lógica del submit
async function manejarSubmitProveedor(event) {
  event.preventDefault();

  const formulario = event.target;
  const inputs = formulario.querySelectorAll("input");

  // 1. Validar si algún input tiene la clase invalid
  let formularioValido = true;
  inputs.forEach(input => {
    if (input.classList.contains("invalid")) {
      formularioValido = false;
    }
  });

  if (!formularioValido) {
    Swal.fire({
      title: 'Error',
      text: 'No puedes enviar los datos ya que hay errores en el formulario.',
      icon: 'error',
      timer: 2500,
      showConfirmButton: false
    });
    return;
  }

  // 2. Leer valores del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const apellidoPaterno = document.getElementById("apellidoPaterno").value.trim();
  const apellidoMaterno = document.getElementById("apellidoMaterno").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const rfc = document.getElementById("rfc").value.trim();
  // 3. Armar el DTO con normalización
  const dto = {
    NombreProveedor: capitalizar(nombre),
    ApellidoPaterno: capitalizar(apellidoPaterno),
    ApellidoMaterno: capitalizar(apellidoMaterno),
    Telefono: telefono,
    Rfc: rfc.toUpperCase()
  };

  // 4. Enviar al backend
  try {
    console.log("DTO listo:", dto);
    await crearProveedor(dto);
    Swal.fire({
      title: '¡Proveedor agregado!',
      text: 'El proveedor ha sido agregado correctamente.',
      icon: 'success',
      timer: 2500,
      showConfirmButton: false
    });
    formulario.reset();

    const offcanvas = bootstrap.Offcanvas.getInstance(
      document.getElementById("offcanvasAgregarProveedor")
    );
    offcanvas.hide();
  } catch (error) {
    alert("Error al agregar proveedor: " + error.message);
  }
}
