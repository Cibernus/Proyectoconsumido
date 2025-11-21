// Función para actualizar empleados
export  async function actualizarEmpleado(EmpleadoId, dto) {
  const response = await fetch(`https://localhost:7043/api/Empleado/putEmpleados/${EmpleadoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}
