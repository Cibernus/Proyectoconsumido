//Función para crear empleados 
export async function crearProveedor(dto) {
  const response = await fetch("https://localhost:7043/api/Proveedor", {
    method: "POST",
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
