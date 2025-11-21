// empleadosDeleteApi.js
export async function eliminarEmpleado(empleadoId) {
  try {
    const response = await fetch(`https://localhost:7043/api/Empleado/deleteEmpleados/${empleadoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error ${response.status}: ${error}`);
    }
    // Si tu API devuelve un mensaje de confirmación
    const resultado = await response.text();
    console.log("Empleado eliminado:", resultado);

    return true; // Devuelve true si se eliminó correctamente
  } catch (error) {
    console.error("Error al eliminar empleado:", error.message);
    return false; // Devuelve false si hubo error
  }
}
