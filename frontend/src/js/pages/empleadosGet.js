import { obtenerEmpleados } from "../api/empleadosGetApi.js";

// Inicializa la tabla al cargar
document.addEventListener("DOMContentLoaded", ConsultaEmpleados);

export async function ConsultaEmpleados() {
  try {
    const data = await obtenerEmpleados();
    console.log("Datos recibidos:", data);
    const tableBody = document.querySelector("#tablaEmpleados tbody");

    // Limpia el tbody antes de volver a llenarlo
    tableBody.innerHTML = "";

    // Crea una fila por cada empleado
    data.forEach((empleado) => {
      agregarFilaEmpleado(empleado);
    });

    return data;
  } catch (error) {
    console.error("Error al consultar empleados:", error.message);
    return [];
  }
}
// 👉Función para agregar una fila nueva en tiempo real
export function agregarFilaEmpleado(empleado) {
  const tableBody = document.querySelector("#tablaEmpleados tbody");

  const row = document.createElement("tr");
  row.dataset.id = empleado.empleadoId;

  // Crear celdas de datos
  const nombreCell = document.createElement("td");
  nombreCell.textContent = empleado.nombreEmpleado;

  const apellidoPaternoCell = document.createElement("td");
  apellidoPaternoCell.textContent = empleado.apellidoPaterno;

  const apellidoMaternoCell = document.createElement("td");
  apellidoMaternoCell.textContent = empleado.apellidoMaterno;

  const telefonoCell = document.createElement("td");
  telefonoCell.textContent = empleado.telefono;

  const curpCell = document.createElement("td");
  curpCell.textContent = empleado.curp;

  // Crear celda de operaciones
  const operacionesCell = document.createElement("td");
  operacionesCell.classList.add("td-operaciones");
  operacionesCell.innerHTML = `
    <div class="btn-contenedor">
      <button class="btn-editar" type="button"
        data-id="${empleado.empleadoId}"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasActualizarEmpleado"
        aria-controls="offcanvasActualizarEmpleado">
        <i class="bx bx-edit"></i>
      </button>
      <button  data-id="${empleado.empleadoId}"class="btn-eliminar"><i class="bx bx-trash"></i></button>
    </div>
  `;

  // Agregar todas las celdas a la fila
  row.appendChild(nombreCell);
  row.appendChild(apellidoPaternoCell);
  row.appendChild(apellidoMaternoCell);
  row.appendChild(telefonoCell);
  row.appendChild(curpCell);
  row.appendChild(operacionesCell);

  // Agregar la fila al tbody
  tableBody.appendChild(row);
}
