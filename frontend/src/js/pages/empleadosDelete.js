// empleadosActions.js
import { eliminarEmpleado } from "../api/empleadosDeleteApi.js";
import { ConsultaEmpleados } from "./empleadosGet.js";

const tablaBody = document.querySelector("#tablaEmpleados tbody");

document.addEventListener("click", async (e) => {
  const btnEliminar = e.target.closest(".btn-eliminar");
  if (!btnEliminar) return; // si no es botón eliminar, salimos

  const empleadoId = btnEliminar.dataset.id; // 👈 ahora tomamos el id directo del botón
  const row = btnEliminar.closest("tr");     // fila asociada para borrarla del DOM

  const result = await Swal.fire({
    title: '¿Eliminar empleado?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#d33', // rojo
  cancelButtonColor: '#3085d6',// azul
  customClass: {
    icon: 'swal-icon-red' // clase personalizada para el icono
  }
  });

  if (result.isConfirmed) {
    const eliminado = await eliminarEmpleado(empleadoId);

    if (eliminado) {
      //  elimina la fila en tiempo real
      if (row) row.remove();

      Swal.fire({
        title: '¡Empleado eliminado!',
        text: 'El registro ha sido borrado correctamente.',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false,
      });

      // Si prefieres refrescar toda la tabla desde la BD:
      // await ConsultaEmpleados();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el empleado.',
        icon: 'error',
      });
    }
  }
});
