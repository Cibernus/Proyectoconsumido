 export function validarNombreApellido(nombre, apellido_paterno, apellido_materno) {
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

    return regex.test(nombre) && regex.test(apellido_paterno) && regex.test(apellido_materno);
}


 export function validarTelefono(telefono) {
  const regex = /^(?:\+?(\d{1,3}))?(\(?\d{2,3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}$/;

  const numeroSinEspacios = telefono.replace(/[\s\-]/g, '');
  if (numeroSinEspacios.length < 10 || numeroSinEspacios.length > 15) {
      return false;
  }
  return regex.test(telefono);
}
 export function validarRFC(rfc) {
  const patron = /^[A-Z&]{3,4}\d{6}(?:[A-Z0-9]{3})?$/;

  return patron.test(rfc.toUpperCase().trim());
}


 export function manejarInput(event) {
const input = event.target;
const errorMessage = document.getElementById(`error-${input.id}`);

if (input.id === 'nombre' || input.id === 'apellidoPaterno' || input.id === 'apellidoMaterno') {

if (!validarNombreApellido(input.value)) {
    input.classList.add('invalid');
    errorMessage.textContent = "Solo se permirte texto";
    errorMessage.style.visibility = 'visible';  
} else {
    input.classList.remove('invalid');
    errorMessage.style.visibility = 'hidden';  
}

}else if(input.id === 'rfc'){

if (!validarRFC(input.value)) {
  input.classList.add('invalid');
  errorMessage.textContent = "RFC inválido";
  errorMessage.style.visibility = 'visible';
} else {
  input.classList.remove('invalid');
  errorMessage.style.visibility = 'hidden';
}
}else  if(input.id === 'teli'){

if (!validarTelefono(input.value)) {
  input.classList.add('invalid');
  errorMessage.textContent = "Número de teléfono inválido";
  errorMessage.style.visibility = 'visible';
} else {
  input.classList.remove('invalid');
  errorMessage.style.visibility = 'hidden';
}
}

if (input.value.trim() === '') {
  input.classList.remove('invalid');
  errorMessage.style.visibility = 'hidden';
}
}
