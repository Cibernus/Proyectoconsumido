document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5127/api/Usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: email,
                clave: password
            })
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }

        const data = await response.json();

        // Si la API devuelve datos del usuario, el login fue exitoso
        if (data.usuarioId && data.usuario) {
            // Guarda la información del usuario en localStorage
            localStorage.setItem('usuarioId', data.usuarioId);
            localStorage.setItem('usuario', data.usuario);
            localStorage.setItem('correo', data.correo);

            alert(`¡Bienvenido ${data.usuario}!`);

            // Redirige al dashboard
            window.location.href = '../views/dashboard.html';
        } else {
            alert('Error al iniciar sesión. Por favor, intenta de nuevo.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Usuario o contraseña incorrectos');
    }
});





/* document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://api-sandbox-f3ei.onrender.com/auth/login', {  // 'https://api-adivinanza.onrender.com/auth/login'
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        alert("Inicio de sesión exitoso.");
        window.location.href = '/Prototipo_navegacional_Web/inicio/inicio.html';
    } else {
        alert(data.message);
    }
}); */