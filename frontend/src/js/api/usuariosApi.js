document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api-sandbox-f3ei.onrender.com/users';
    const tableBody = document.querySelector('#tablaUsuarios tbody'); // Corregido

    // Función para obtener los usuarios
    const ObtenerUsuarios = async () => {
        try {
            const response = await fetch(apiUrl, { method: 'GET' });
            if (!response.ok) {
                throw new Error(`Error al obtener los datos: ${response.status}`);
            }
            const users = await response.json();
            console.log(users); // Verificar datos recibidos
            llenarTabla(users);
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    // Función para llenar la tabla
    const llenarTabla = (users) => {
        tableBody.innerHTML = ''; // Limpiar antes de llenar
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.motherLastName}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td class="td-operaciones">
                    <div class="btn-contenedor">
                        <a href="../editar-usuarios/editar-usuarios.html?id=${user._id}">
                            <button class="btn-editar"><i class="bx bx-edit"></i></button>
                        </a>
                        <button class="btn-eliminar" data-id="${user._id}">
                            <i class="bx bx-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    // Función para eliminar un usuario
    const eliminarUsuario = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error al eliminar usuario: ${response.status}`);
            }
            alert('Usuario eliminado exitosamente');
            ObtenerUsuarios(); // Actualizar la tabla
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            alert('Hubo un problema al eliminar el usuario.');
        }
    };

    // Delegación de eventos para eliminación
    tableBody.addEventListener('click', (event) => {
        const boton = event.target.closest('.btn-eliminar');
        if (boton) {
            const id = boton.getAttribute('data-id');
            if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
                eliminarUsuario(id);
            }
        }
    });

    ObtenerUsuarios();
});
