document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevenir el envío del formulario mientras validamos

    // Obtener valores de los campos
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validar correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;  // Detener la ejecución si la validación falla
    }

    // Validar contraseña (al menos 6 caracteres)
    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;  // Detener la ejecución si la validación falla
    }

});
