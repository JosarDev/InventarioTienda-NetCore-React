import { useEffect, useState } from "react";
import { createProduct, updateProduct, generateDescription } from "../api/productsApi";

export default function ProductForm({ onSuccess, editingProduct, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [error, setError] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        description: editingProduct.description || "",
        price: editingProduct.price,
        stock: editingProduct.stock,
      });
    } else {
      setForm({ name: "", description: "", price: "", stock: "" });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerateDescription = async () => {
    if (!form.name.trim()) {
      setError("Ingresa el nombre del producto primero");
      return;
    }

    setLoadingAI(true);
    setError("");

    try {
      const result = await generateDescription(form.name);
      setForm({ ...form, description: result.description });
    } catch (err) {
      console.error("Error al generar descripción con Gemini:", err);
      setError("No se pudo generar la descripción con IA. Verifica tu conexión o API Key.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (price < 0 || stock < 0) {
      setError("Precio y stock deben ser mayores o iguales a 0");
      return;
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, { price, stock });
      } else {
        await createProduct({
          name: form.name.trim(),
          description: form.description.trim(),
          price,
          stock,
        });
        setForm({ name: "", description: "", price: "", stock: "" });
      }
      onSuccess();
    } catch (err) {
      setError(err.message || "Error al guardar producto");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h2>

      {error && <div className="alert error">{error}</div>}

      {!editingProduct && (
        <>
          <input
            name="name"
            placeholder="Nombre del producto"
            value={form.name}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="secondary"
            onClick={handleGenerateDescription}
            disabled={!form.name || loadingAI}
            style={{ width: "100%", margin: "0.8rem 0", padding: "0.9rem" }}
          >
            🤖 {loadingAI ? "Generando descripción..." : "Generar descripción con IA"}
          </button>

          <textarea
            name="description"
            placeholder="Descripción del producto (puedes editarla después de generarla)"
            value={form.description}
            onChange={handleChange}
            rows="5"
            style={{
              width: "100%",
              padding: "0.9rem 1rem",
              background: "#0f172a",
              border: "2px solid #334155",
              borderRadius: "10px",
              color: "#e2e8f0",
              fontSize: "1rem",
              resize: "vertical",
            }}
          />
        </>
      )}

      <input
        name="price"
        type="number"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
        min="0"
      />

      <div className="actions">
        <button type="submit" className="primary">
          {editingProduct ? "Actualizar" : "Guardar"}
        </button>

        {editingProduct && (
          <button type="button" onClick={onCancel} className="secondary">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}