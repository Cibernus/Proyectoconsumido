import { obtenerProductos } from "../api/productosGetApi.js";

// Inicializa la tabla al cargar
document.addEventListener("DOMContentLoaded", ConsultaProductos);

export async function ConsultaProductos() {
  try {
    const data = await obtenerProductos();
    console.log("Datos recibidos:", data);
    const tableBody = document.querySelector("#tablaproductos tbody");

    // Limpia el tbody antes de volver a llenarlo
    tableBody.innerHTML = "";

    // Crea una fila por cada producto
    data.forEach((producto) => {
      agregarFilaProducto(producto);
    });

    return data;
  } catch (error) {
    console.error("Error al consultar productos:", error.message);
    return [];
  }
}

// 👉Función para agregar una fila nueva en tiempo real
export function agregarFilaProducto(producto) {
  const tableBody = document.querySelector("#tablaproductos tbody");

  const row = document.createElement("tr");
  row.dataset.id = producto.productoId;

  // Crear celdas de datos
  const nombreCell = document.createElement("td");
  nombreCell.textContent = producto.nombreProducto;

  const descripcionCell = document.createElement("td");
  descripcionCell.textContent = producto.descripcion;

  const cantidadCell = document.createElement("td");
  cantidadCell.textContent = producto.cantidad;

  const precioCell = document.createElement("td");
  precioCell.textContent = producto.precio;

  // 👉 Nueva celda para la imagen
  const imagenCell = document.createElement("td");
  if (producto.imagenUrl || producto.imagen) {
    // Ajusta según cómo tu backend devuelve la propiedad (imagenUrl o imagen)
    const img = document.createElement("img");
    img.src = producto.imagenUrl || producto.imagen;
    img.alt = "Imagen del producto";
    img.width = 80; // tamaño miniatura
    imagenCell.appendChild(img);
  } else {
    imagenCell.textContent = "Sin imagen";
  }

  // Crear celda de operaciones
  const operacionesCell = document.createElement("td");
  operacionesCell.classList.add("td-operaciones");
  operacionesCell.innerHTML = `
    <div class="btn-contenedor">
      <button class="btn-editar" type="button"
        data-id="${producto.productoId}"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasActualizarProducto"
        aria-controls="offcanvasActualizarProducto">
        <i class="bx bx-edit"></i>
      </button>
      <button data-id="${producto.productoId}" class="btn-eliminar">
        <i class="bx bx-trash"></i>
      </button>
    </div>
  `;

  // Agregar todas las celdas a la fila
  row.appendChild(nombreCell);
  row.appendChild(descripcionCell);
  row.appendChild(cantidadCell);
  row.appendChild(precioCell);
  row.appendChild(imagenCell);      // 👈 ahora sí se agrega la celda de imagen
  row.appendChild(operacionesCell);

  // Agregar la fila al tbody
  tableBody.appendChild(row);
}

