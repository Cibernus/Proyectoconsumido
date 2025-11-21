// empleadosActions.js
import { actualizarEmpleado } from "../api/empleadoUpdateApi.js";
import { ConsultaEmpleados } from "./empleadosGet.js";
import { manejarInputt } from "./empleadosupdavalidaciones.js";

document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.querySelector("#tablaEmpleados tbody");
  const formActualizar = document.getElementById("formActualizarEmpleado");

  // 👉 Aplica manejarInput a cada campo del formulario de actualizació
  formActualizar.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", manejarInputt);

    const inputs = formActualizar.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
      input.classList.remove("invalid");
      const errorMessage = input.nextElementSibling;
      if (errorMessage && errorMessage.classList.contains("error-message")) {
        errorMessage.textContent = "";
        errorMessage.style.visibility = "hidden";
      }
    });

  });

   
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

  // Evento para abrir el offcanvas y llenar el formulario
  document.addEventListener("click", async (e) => {
    if (e.target.closest(".btn-editar")) {
      const btn = e.target.closest(".btn-editar");
      const empleadoId = btn.dataset.id;

      const empleados = await ConsultaEmpleados();
      const empleado = empleados.find(emp => String(emp.empleadoId) === String(empleadoId));

      formActualizar.dataset.id = empleadoId;

      // Llenar el formulario con los datos del empleado
      document.getElementById("actualizarNombre").value = empleado.nombreEmpleado;
      document.getElementById("actualizarApellidoPaterno").value = empleado.apellidoPaterno;
      document.getElementById("actualizarApellidoMaterno").value = empleado.apellidoMaterno;
      document.getElementById("actualizarTelefono").value = empleado.telefono;
      document.getElementById("actualizarCurp").value = empleado.curp;

      const offcanvas = bootstrap.Offcanvas.getOrCreateInstance("#offcanvasActualizarEmpleado");
      offcanvas.show();
    }
  });

  // Evento submit con validación
  formActualizar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const empleadoId = formActualizar.dataset.id;

    const inputs = formActualizar.querySelectorAll("input");

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
        text: 'No puedes actualizar los datos ya que hay errores en el formulario.',
        icon: 'error',
        timer: 2500,
        showConfirmButton: false
      });
      return;
    }

    // 2. Leer valores del formulario
    const nombre = document.getElementById("actualizarNombre").value.trim();
    const apellidoPaterno = document.getElementById("actualizarApellidoPaterno").value.trim();
    const apellidoMaterno = document.getElementById("actualizarApellidoMaterno").value.trim();
    const telefono = document.getElementById("actualizarTelefono").value.trim();
    const curp = document.getElementById("actualizarCurp").value.trim();

    // 3. Armar el DTO con normalización
    const dto = {
      nombreEmpleado: capitalizar(nombre),
      apellidoPaterno: capitalizar(apellidoPaterno),
      apellidoMaterno: capitalizar(apellidoMaterno),
      telefono: telefono,
      curp: curp.toUpperCase()
    };

    try {
      await actualizarEmpleado(empleadoId, dto);

      Swal.fire({
        title: '¡Empleado actualizado!',
        text: 'El empleado ha sido actualizado correctamente.',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false,
      });

      formActualizar.reset();

      // 🔄 Actualizar la fila en la tabla directamente
      const row = tablaBody.querySelector(`tr[data-id="${empleadoId}"]`);
      if (row) {
        const cells = row.querySelectorAll("td");
        cells[0].textContent = dto.nombreEmpleado;
        cells[1].textContent = dto.apellidoPaterno;
        cells[2].textContent = dto.apellidoMaterno;
        cells[3].textContent = dto.telefono;
        cells[4].textContent = dto.curp;
      }

      // Cerrar el offcanvas
      const offcanvas = bootstrap.Offcanvas.getOrCreateInstance("#offcanvasActualizarEmpleado");
      offcanvas.hide();

    } catch (error) {
      console.error("Error al actualizar:", error.message);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el empleado.',
        icon: 'error'
      });
    }
  });
});

 
