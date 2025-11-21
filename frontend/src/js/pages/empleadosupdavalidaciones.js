// empleadosValidaciones.js

//Validación de de nombre y apellidos

export function validarNombreApellido(nombre, apellido_paterno, apellido_materno) {

  const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

  return regex.test(nombre) && regex.test(apellido_paterno) && regex.test(apellido_materno);
}

//Validación de Teléfono 

 export function validarTelefono(telefono) {
  const regex = /^(?:\+?(\d{1,3}))?(\(?\d{2,3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}$/;

  const numeroSinEspacios = telefono.replace(/[\s\-]/g, '');  // Eliminar espacios y guiones
  if (numeroSinEspacios.length < 10 || numeroSinEspacios.length > 15) {
      return false;
  }
  return regex.test(telefono);

}
//Validación de Curp
 export function validarCURP(curp) {
  curp = curp.trim().toUpperCase();

  if (curp.length !== 18) {
    console.log("La longitud del CURP no es válida.");
    return false;
  }

  const regexCURP = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/;
  if (!regexCURP.test(curp)) {
    console.log("El formato del CURP no es válido.");
    return false;
  }

  const fecha = curp.slice(4, 10);
  const anio = parseInt(fecha.slice(0, 2)); 
  const mes = parseInt(fecha.slice(2, 4), 10);  
  const dia = parseInt(fecha.slice(4, 6), 10);

  console.log("Día:", dia);
  console.log("Mes:", mes);
  console.log("Año (últimos dos dígitos):", anio);

  if (mes < 1 || mes > 12) {
    console.log("El mes no es válido.");
    return false;
  }


  const anioStr = anio.toString().padStart(2, '0');
  let year;
  if (parseInt(anioStr) >= 30) {
    year = `19${anioStr}`;
  } else {
    year = `20${anioStr}`;
  }

  const yearnumber = parseInt(year, 10);
  console.log("Año completo:", yearnumber);

  
  if (yearnumber < 1930 || yearnumber > (new Date()).getFullYear()) {
    console.log("El año de nacimiento no es válido, debe ser a partir de 1930 y no puede ser en el futuro.");
    return false;
  }

  const fechaNacimiento = new Date(yearnumber, mes - 1, dia);


  if (fechaNacimiento.getDate() !== dia || fechaNacimiento.getMonth() + 1 !== mes) {
    console.log("Fecha de nacimiento no válida:", fechaNacimiento);
    return false;
  }

  const fechaActual = new Date();
  if (fechaNacimiento > fechaActual) {
    console.log("La fecha de nacimiento es en el futuro.");
    return false;
  }


  const sexo = curp.slice(10, 11);
  if (!/^[HM]$/.test(sexo)) {
    console.log("Sexo no válido.");
    return false;
  }

  const consonantes = curp.slice(11, 16);
  if (!/^[A-Z]{5}$/.test(consonantes)) {
    console.log("Las consonantes internas no son válidas.");
    return false;
  }

  const homoclave = curp.slice(16, 18);
  if (!/^[A-Z0-9]{2}$/.test(homoclave)) {
    console.log("Homoclave no válida.");
    return false;
  }

  console.log("CURP válido.");
  return true;
}
// Validación de inputs(Campos de entrada)
 export function manejarInputt(event) {
  const input = event.target;
  const errorMessage = document.getElementById(`error-${input.id}`);

  // Si el campo está vacío, no se marca como inválido
  if (input.value.trim() === '') {
    input.classList.remove('invalid');
    errorMessage.style.visibility = 'hidden';
    return; // 👈 salimos aquí y no seguimos validando
  }

  // Validaciones específicas según el ID
  if (
    input.id === 'actualizarNombre' ||
    input.id === 'actualizarApellidoPaterno' ||
    input.id === 'actualizarApellidoMaterno'
  ) {
    if (!validarNombreApellido(input.value)) {
      input.classList.add('invalid');
      errorMessage.textContent = "Solo se permite texto";
      errorMessage.style.visibility = 'visible';
    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';
    }
  } else if (input.id === 'actualizarCurp') {
    if (!validarCURP(input.value)) {
      input.classList.add('invalid');
      errorMessage.textContent = "CURP inválido";
      errorMessage.style.visibility = 'visible';
    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';
    }
  } else if (input.id === 'actualizarTelefono') {
    if (!validarTelefono(input.value)) {
      input.classList.add('invalid');
      errorMessage.textContent = "Número de teléfono inválido";
      errorMessage.style.visibility = 'visible';
    } else {
      input.classList.remove('invalid');
      errorMessage.style.visibility = 'hidden';
    }
  }
}
