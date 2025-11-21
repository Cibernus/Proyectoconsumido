// Función para obtener empleados
export async function obtenerEmpleados() {
  const response = await fetch("https://localhost:7043/api/Empleado", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json(); // Devuelve el array de empleados
}
