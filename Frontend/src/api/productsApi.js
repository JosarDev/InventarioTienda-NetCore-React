const API_URL = "http://localhost:5234/api/products";

// Fetch all products
export async function getProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }
  return response.json();
}

// Create a new product
export async function createProduct(product) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al crear producto");
  }

  return response.json();
}

// Update product by ID
export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al actualizar producto");
  }

  return;
}

// Delete product by ID
export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al eliminar producto");
  }
}

// Generate product description using AI
export async function generateDescription(name) {
  const response = await fetch("/api/products/generate-description", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al generar descripción con IA");
  }

  return response.json();
}