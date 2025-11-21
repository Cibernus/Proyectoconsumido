export async function actualizarProducto(id,formData) {
  const response = await fetch(`https://localhost:7043/api/Producto/putProductos/${id}`, {
    method: "PUT",
    body: formData 
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}
