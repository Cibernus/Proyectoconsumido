// productosActions.js
import { actualizarProducto } from "../api/productosUpdateApi.js";
import { ConsultaProductos } from "./productosGet.js";
import { manejarInputProductoActualizar } from "./productosUpdatevalidaciones.js";

document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.querySelector("#tablaproductos tbody");
  const formActualizar = document.getElementById("formActualizarProducto");

  const inputFile = document.getElementById("imagenActualizar");
  const preview = document.getElementById("previewActualizar");
  const removeBtn = document.getElementById("remove-preview-actualizar");

  // 👉 Listener permanente para el botón ×
  removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    preview.src = "";
    preview.style.display = "none";
    removeBtn.style.display = "none";
    inputFile.value = ""; // limpiar input file
    inputFile.disabled = false; // volver a habilitar
  });

  // 👉 Aplica manejarInputProductoActualizar a cada campo del formulario de actualización
  formActualizar.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("input", manejarInputProductoActualizar);
    input.addEventListener("change", manejarInputProductoActualizar); // para file y textarea
  });

  // Función para capitalizar texto
  function capitalizar(texto) {
    return texto
      .toLowerCase()
      .split(/\s+/)
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(" ");
  }

  // Evento para abrir el offcanvas y llenar el formulario
  document.addEventListener("click", async (e) => {
    if (e.target.closest(".btn-editar")) {
      const btn = e.target.closest(".btn-editar");
      const productoId = btn.dataset.id;

      const productos = await ConsultaProductos();
      const producto = productos.find(p => String(p.productoId) === String(productoId));

      formActualizar.dataset.id = productoId;

      // Llenar el formulario con los datos del producto
      document.getElementById("nombreActualizar").value = producto.nombreProducto;
      document.getElementById("descripcionActualizar").value = producto.descripcion;
      document.getElementById("precioActualizar").value = producto.precio;
      document.getElementById("cantidadActualizar").value = producto.cantidad;

      // Mostrar imagen actual en preview
      if (producto.imagen) {
        preview.src = producto.imagen;
        preview.style.display = "block";
        removeBtn.style.display = "block";
        inputFile.disabled = true; // deshabilitar input si ya hay imagen
      } else {
        preview.src = "";
        preview.style.display = "none";
        removeBtn.style.display = "none";
        inputFile.disabled = false;
      }

      const offcanvas = bootstrap.Offcanvas.getOrCreateInstance("#offcanvasActualizarProducto");
      offcanvas.show();
    }
  });

  // Evento submit con validación
  formActualizar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const productoId = formActualizar.dataset.id;

    const inputs = formActualizar.querySelectorAll("input, textarea");

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
    const nombre = document.getElementById("nombreActualizar").value.trim();
    const descripcion = document.getElementById("descripcionActualizar").value.trim();
    const precioRaw = document.getElementById("precioActualizar").value.trim();
    const cantidadRaw = document.getElementById("cantidadActualizar").value.trim();
    const imagenFile = inputFile.files[0];

    const precio = parseFloat(precioRaw);
    const cantidad = parseInt(cantidadRaw, 10);

    // 3. Armar FormData
    const formData = new FormData();
    
    formData.append("NombreProducto", capitalizar(nombre));
    formData.append("Descripcion", capitalizar(descripcion));
    formData.append("Precio", precio);
    formData.append("Cantidad", cantidad);
    
    formData.append("Imagen", imagenFile ?? new File([], ""));

    //  Mostrar en consola todo el contenido del FormData
for (let [key, value] of formData.entries()) {
  if (value instanceof File) {
    console.log(`${key}: File name = ${value.name}, size = ${value.size}, type = ${value.type}`);
  } else {
    console.log(`${key}: ${value}`);
  }

}

    try {
      await actualizarProducto(productoId, formData);

      Swal.fire({
        title: '¡Producto actualizado!',
        text: 'El producto ha sido actualizado correctamente.',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false,
      });

      formActualizar.reset();

      // 🔄 Actualizar la fila en la tabla directamente
      const row = tablaBody.querySelector(`tr[data-id="${productoId}"]`);
      if (row) {
        const cells = row.querySelectorAll("td");
        cells[0].textContent = capitalizar(nombre);
        cells[1].textContent = capitalizar(descripcion);
        cells[2].textContent = precio;
        cells[3].textContent = cantidad;
        // Si quieres mostrar imagen en la tabla:
        if (imagenFile) {
          const previewUrl = URL.createObjectURL(imagenFile);
          cells[4].querySelector("img").src = previewUrl;
        }
      }

      // Cerrar el offcanvas
      const offcanvas = bootstrap.Offcanvas.getOrCreateInstance("#offcanvasActualizarProducto");
      offcanvas.hide();

    } catch (error) {
      console.error("Error al actualizar producto:", error.message);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el producto.',
        icon: 'error'
      });
    }
  });
});
