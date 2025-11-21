export async function eliminarProducto(ProductoId) {
  const response = await fetch(`https://localhost:7043/api/Producto/deleteProductos/${ProductoId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}
