import { crearProducto } from "../api/productosInsertApi.js";
import { manejarInputProducto } from "./productosInsertvalidaciones.js";
import { ConsultaProductos } from "./productosGet.js";

document.addEventListener("DOMContentLoaded", inicializarEventos);

function inicializarEventos() {
  let formulario = document.getElementById("formAgregarProducto");
  formulario.addEventListener("submit", manejarSubmitProducto);

  const inputs = formulario.querySelectorAll("input, select");
  inputs.forEach(input => {
    input.addEventListener("input", manejarInputProducto);
    input.addEventListener("change", manejarInputProducto);


    const offcanvasEl = document.getElementById("offcanvasAgregarProducto");
  if (offcanvasEl) {
    offcanvasEl.addEventListener("hidden.bs.offcanvas", () => {
      formulario.reset();

       const inputs = formulario.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
      input.classList.remove("invalid");
      const errorMessage = input.nextElementSibling;
      if (errorMessage && errorMessage.classList.contains("error-message")) {
        errorMessage.textContent = "";
        errorMessage.style.visibility = "hidden";
      }
    });

      const inputImagen = document.getElementById("imagen2");
      const preview = document.getElementById("preview");
      const removeBtn = document.getElementById("remove-preview");

      if (inputImagen) {
        inputImagen.value = "";
        inputImagen.disabled = false;
      }
      if (preview && removeBtn) {
        preview.src = "";
        preview.style.display = "none";
        removeBtn.style.display = "none";
      }
    });
  }
  });

  const inputImagen = document.getElementById("imagen2");
  const preview = document.getElementById("preview");
  const removeBtn = document.getElementById("remove-preview");

  if (inputImagen && preview && removeBtn) {
    inputImagen.addEventListener("change", () => {
      const archivo = inputImagen.files?.[0];
      if (archivo) {
        const url = URL.createObjectURL(archivo);
        preview.src = url;
        preview.style.display = "block";
        removeBtn.style.display = "inline-block";
      } else {
        preview.src = "";
        preview.style.display = "none";
        removeBtn.style.display = "none";
      }
    });

    removeBtn.addEventListener("click", () => {
      inputImagen.value = "";
      preview.src = "";
      preview.style.display = "none";
      removeBtn.style.display = "none";
    });
  }
}

function capitalizar(texto) {
  return texto
    .toLowerCase()
    .split(/\s+/)
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

async function manejarSubmitProducto(event) {
  event.preventDefault();

  const formulario = event.target;
  const inputs = formulario.querySelectorAll("input, select");

  let formularioValido = true;
  inputs.forEach(input => {
    if (input.classList.contains("invalid")) {
      formularioValido = false;
    }
  });

  if (!formularioValido) {
    Swal.fire({
      title: "Error",
      text: "No puedes enviar los datos ya que hay errores en el formulario.",
      icon: "error",
      timer: 2500,
      showConfirmButton: false
    });
    return;
  }

  const nombreProducto = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const cantidad = parseInt(document.getElementById("cantidad").value.trim(), 10);
  const precio = parseFloat(document.getElementById("precio").value.trim());
  const archivoImagen = document.getElementById("imagen2")?.files?.[0];

  if (!archivoImagen) {
    Swal.fire({
      title: "Error",
      text: "Debes seleccionar una imagen",
      icon: "error"
    });
    return;
  }

  // 👉 Armar FormData con todos los campos + archivo
  const formData = new FormData();
  formData.append("NombreProducto", capitalizar(nombreProducto));
  formData.append("Cantidad", cantidad);
  formData.append("Precio", precio);
  formData.append("Descripcion", capitalizar(descripcion));
  formData.append("Imagen", archivoImagen);

  try {
    await crearProducto(formData); // 👈 ahora crearProducto debe enviar FormData

    Swal.fire({
      title: "¡Producto agregado!",
      text: "El producto ha sido agregado correctamente.",
      icon: "success",
      timer: 2500,
      showConfirmButton: false
    });
    formulario.reset();

    const preview = document.getElementById("preview");
    const removeBtn = document.getElementById("remove-preview");
    if (preview && removeBtn) {
      preview.src = "";
      preview.style.display = "none";
      removeBtn.style.display = "none";
    }

    const offcanvas = bootstrap.Offcanvas.getInstance(
      document.getElementById("offcanvasAgregarProducto")
    );
    offcanvas.hide();
     await ConsultaProductos();

     const submitBtn = formulario.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = false;



  } catch (error) {
    console.error("Error al enviar producto:", error);
    alert("Error al agregar producto: " + error.message);
  }

  const submitBtn = formulario.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = false;

}
