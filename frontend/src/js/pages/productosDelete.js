// productosActions.js
import { eliminarProducto } from "../api/productosDeleteApi.js";
import { ConsultaProductos } from "./productosGet.js";

const tablaBody = document.querySelector("#tablaproductos tbody");

document.addEventListener("click", async (e) => {
  const btnEliminar = e.target.closest(".btn-eliminar");
  if (!btnEliminar) return; // si no es botón eliminar, salimos

  const productoId = btnEliminar.dataset.id; // 👈 tomamos el id directo del botón
  const row = btnEliminar.closest("tr");     // fila asociada para borrarla del DOM

  const result = await Swal.fire({
    title: '¿Eliminar producto?',
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
    try {
      const eliminado = await eliminarProducto(productoId);

      if (eliminado) {
        // 🔄 elimina la fila en tiempo real
        if (row) row.remove();

        Swal.fire({
          title: '¡Producto eliminado!',
          text: 'El registro ha sido borrado correctamente.',
          icon: 'success',
          timer: 2500,
          showConfirmButton: false,
        });

        // Si prefieres refrescar toda la tabla desde la BD:
        // await ConsultaProductos();
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el producto.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el producto.',
        icon: 'error',
      });
    }
  }
});
