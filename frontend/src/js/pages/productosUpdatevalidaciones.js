  export function validarNombreProducto(nombre) {
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

    return regex.test(nombre);
}
 export function validarprecio(precio){

  return precio>0;
}

 export function descripcionn(descripcion){

  const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

  return regex.test(descripcion);
}


export function validarcantidad(cantidad) {
  const regex = /^\d+$/; 


  if (!regex.test(cantidad)) {
      return false;
  }
  return true; 
}
export function manejarInputProductoActualizar(event) {
  const input = event.target;
  const errorMessage = document.getElementById(`error-${input.id}`);

  if (input.type !== "file" && input.value.trim() === '') {
    input.classList.remove('invalid');
    if (errorMessage) {
      errorMessage.style.visibility = 'hidden';
      errorMessage.textContent = '';
    }
    return; // salir aquí
  }

  if (input.id === 'nombreActualizar') {
    if (!validarNombreProducto(input.value)) {
      input.classList.add('invalid');
      errorMessage.textContent = "Solo se permite texto";
      errorMessage.style.visibility = 'visible';  
    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';  
    }

  } else if (input.id === 'descripcionActualizar') {
    if (!descripcionn(input.value)) {
      input.classList.add('invalid');
      errorMessage.textContent = "Descripción inválida";
      errorMessage.style.visibility = 'visible';
    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';
    }

  } else if (input.id === 'precioActualizar') {
    if (!validarprecio(input.value)) {
      input.classList.add('invalid');
      errorMessage.textContent = "Precio inválido";
      errorMessage.style.visibility = 'visible';
    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';
    }

  } else if (input.id === "cantidadActualizar") {
    if (!validarcantidad(input.value)) {
      input.classList.add('invalid');
      errorMessage.textContent = "Cantidad inválida";
      errorMessage.style.visibility = 'visible';
    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';
    }

  } else if (input.id === "imagenActualizar") {
    const archivo = input.files[0];
    const preview = document.getElementById("previewActualizar");
    const removeBtn = document.getElementById("remove-preview-actualizar");

    if (!archivo) {
      input.classList.add('invalid');
      errorMessage.textContent = "Debes seleccionar una imagen";
      errorMessage.style.visibility = 'visible';
      input.disabled = false;

    } else if (!(archivo.type === "image/jpeg" || archivo.type === "image/png")) {
      input.classList.add('invalid');
      errorMessage.textContent = "Solo se permiten imágenes JPG o PNG";
      errorMessage.style.visibility = 'visible';

    } else if (archivo.size > 2 * 1024 * 1024) { // 2 MB
      input.classList.add('invalid');
      errorMessage.textContent = "La imagen no debe superar 2 MB";
      errorMessage.style.visibility = 'visible';

    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';

      // Mostrar vista previa
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = "block";
        removeBtn.style.display = "block";
        input.disabled = true; 
      };
      reader.readAsDataURL(archivo);

      // Evento para borrar la imagen
      removeBtn.onclick = function() {
        preview.src = "";
        preview.style.display = "none";
        removeBtn.style.display = "none";
        input.value = ""; // limpiar input file
        input.disabled = false;
      };
    }
  }
}
