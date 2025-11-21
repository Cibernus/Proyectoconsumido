import { crearEmpleado } from "../api/empleadosInsertApi.js";
import { manejarInput } from "../pages/empleadosInsertvalidaciones.js";
import { ConsultaEmpleados } from "../pages/empleadosGet.js";

// Inicialización del evento
document.addEventListener("DOMContentLoaded", inicializarEventos);

// Inicializa por completo los eventos
function inicializarEventos() {
  let formulario = document.getElementById("formAgregarEmpleado");
  formulario.addEventListener("submit", manejarSubmitEmpleado);

  const inputs = formulario.querySelectorAll("input");
  inputs.forEach(input => {
    input.addEventListener("input", manejarInput); 
  });

}

// Función para capitalizar nombres y apellidos
function capitalizar(texto) {
   return texto
       
    .toLowerCase()
    .split(/\s+/) // separa por espacios
    .map(palabra => {
      // si la palabra no está vacía, capitaliza la primera letra
      return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    })
    .join(" ");
}

// Función separada con la lógica
async function manejarSubmitEmpleado(event) {
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
  const curp = document.getElementById("curp").value.trim();

  // 3. Armar el DTO con normalización
  const dto = {
    NombreEmpleado: capitalizar(nombre),
    ApellidoPaterno: capitalizar(apellidoPaterno),
    ApellidoMaterno: capitalizar(apellidoMaterno),
    Telefono: telefono,
    Curp: curp.toUpperCase()
  };

  // 4. Enviar al backend
  try {
    console.log("DTO listo:", dto);
    await crearEmpleado(dto);
    Swal.fire({
          title: '¡Empleado agregado!',
          text: 'El empleado ha sido agregado correctamente.',
          icon: 'success',
          timer: 2500,  
          showConfirmButton: false,  
        });
    formulario.reset();

    const offcanvas = bootstrap.Offcanvas.getInstance(
      document.getElementById("offcanvasAgregarEmpleado")
    );
    offcanvas.hide();
    await ConsultaEmpleados();

  } catch (error) {
    alert("Error al agregar empleado: " + error.message);
  }
}
