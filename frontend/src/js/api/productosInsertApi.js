export async function crearProducto(formData) {
  const response = await fetch("https://localhost:7043/api/Producto", {
    method: "POST",
    body: formData 
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}
