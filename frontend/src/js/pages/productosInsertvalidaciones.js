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

 export function manejarInputProducto(event) {
  const input = event.target;
  const errorMessage = document.getElementById(`error-${input.id}`);

  if (input.type !== "file" && input.value.trim() === '') {
    input.classList.remove('invalid');
    if (errorMessage) {
      errorMessage.style.visibility = 'hidden';
      errorMessage.textContent = '';
    }
    return; //  salir aquí
  }

  if (input.id === 'nombre') {
    if (!validarNombreProducto(input.value)) {
      input.classList.add('invalid');
      errorMessage.textContent = "Solo se permite texto";
      errorMessage.style.visibility = 'visible';  
    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';  
    }

  } else if (input.id === 'descripcion') {
    if (!descripcionn(input.value))  {
      input.classList.add('invalid');
      errorMessage.textContent = "Descripción inválida";
      errorMessage.style.visibility = 'visible';
    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';
    }

  } else if (input.id === 'precio') {
    if (!validarprecio(input.value)) {
      input.classList.add('invalid');
      errorMessage.textContent = "Precio inválido";
      errorMessage.style.visibility = 'visible';
    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';
    }

  } else if (input.id === "cantidad") {
    if (!validarcantidad(input.value)) {
      input.classList.add('invalid');
      errorMessage.textContent = "Cantidad inválida";
      errorMessage.style.visibility = 'visible';
    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';
    }

  } else if (input.id === "imagen2") {
    const archivo = input.files[0];

      const preview = document.getElementById("preview");       // 👈 aquí
  const removeBtn = document.getElementById("remove-preview"); 


   if (!(archivo.type === "image/jpeg" || archivo.type === "image/png")) {
  //  Caso 1: hay archivo pero el tipo es inválido
  input.classList.add('invalid');
  errorMessage.textContent = "Solo se permiten imágenes JPG o PNG";
  errorMessage.style.visibility = 'visible';

  preview.src = "";
  preview.style.display = "none";
  removeBtn.style.display = "none";
  input.value = "";
  input.disabled = false;

} else if (!archivo) {
  // 🚨 Caso 2: no se seleccionó ningún archivo
  input.classList.add('invalid');
  errorMessage.textContent = "Debes seleccionar una imagen";
  errorMessage.style.visibility = 'visible';
  input.disabled = false;

} else if (archivo.size > 2 * 1024 * 1024) {
  // 🚨 Caso 3: archivo demasiado grande
  input.classList.add('invalid');
  errorMessage.textContent = "La imagen no debe superar 2 MB";
  errorMessage.style.visibility = 'visible';

  preview.src = "";
  preview.style.display = "none";
  removeBtn.style.display = "none";
  input.value = "";
  input.disabled = false;

} else {
  // 🚨 Caso 4: archivo válido
  input.classList.remove('invalid');
  errorMessage.style.visibility = 'hidden';

  const reader = new FileReader();
  reader.onload = function(e) {
    preview.src = e.target.result;
    preview.style.display = "block";
    removeBtn.style.display = "block";
    input.disabled = true;
  };
  reader.readAsDataURL(archivo);

  removeBtn.onclick = function() {
    preview.src = "";
    preview.style.display = "none";
    removeBtn.style.display = "none";
    input.value = "";
    input.disabled = false;
  };

  const formulario = input.closest("form");
  if (formulario) {
    formulario.addEventListener("reset", () => {
      preview.src = "";
      preview.style.display = "none";
      removeBtn.style.display = "none";
      input.disabled = false;
    });
  }
}

}

 }
