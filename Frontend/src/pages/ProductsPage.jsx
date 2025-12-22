import { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { exportProductsToCSV } from "../utils/exportCSV";
import { deleteProduct } from "../api/productsApi";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import Modal from "../components/Modal";

export default function ProductsPage() {
  const { products, loading, error, reload } = useProducts();

  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  async function handleDelete() {
    try {
      await deleteProduct(productToDelete.id);
      setMessage("Producto eliminado correctamente");
      setMessageType("success");
      setProductToDelete(null);
      reload();
    } catch {
      setMessage("Error al eliminar producto");
      setMessageType("error");
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="alert error">{error}</p>;

  return (
    <div className="container">
      <h1>Inventario de Productos</h1>

      {/* Botón de reporte - alineado a la derecha para mejor UX */}
      <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
        <button
          className="primary"
          onClick={() => exportProductsToCSV(products)}
          style={{ padding: "0.8rem 1.8rem", fontSize: "1.1rem" }}
        >
          📊 Generar Reporte CSV
        </button>
      </div>

      <div className="card report-summary" style={{ textAlign: "center", padding: "1.5rem" }}>
        <p><strong>Total productos:</strong> {products.length}</p>
        <p><strong>Valor total del inventario:</strong> ${products.reduce((sum, p) => sum + p.price * p.stock, 0).toFixed(2)}</p>
      </div>

      {message && (
        <div className={`alert ${messageType}`}>
          {message}
        </div>
      )}

      {message && (
        <div className={`alert ${messageType}`}>
          {message}
        </div>
      )}

      <div className="card">
        <ProductForm
          onSuccess={() => {
            setMessage("Producto creado correctamente");
            setMessageType("success");
            reload();
          }}
        />
      </div>

      <div className="card">
        <ProductTable
          products={products}
          onEdit={setEditingProduct}
          onDelete={setProductToDelete}
        />
      </div>

      {/* MODAL EDITAR */}
      {editingProduct && (
        <Modal onClose={() => setEditingProduct(null)}>
          <ProductForm
            editingProduct={editingProduct}
            onSuccess={() => {
              setMessage("Producto actualizado correctamente");
              setMessageType("success");
              reload();
              setEditingProduct(null);
            }}
            onCancel={() => setEditingProduct(null)}
          />
        </Modal>
      )}

      {/* MODAL ELIMINAR */}
      {productToDelete && (
        <Modal onClose={() => setProductToDelete(null)}>
          <h3>Confirmar eliminación</h3>
          <p>
            ¿Eliminar <strong>{productToDelete.name}</strong>?
          </p>

          <div className="actions">
            <button className="danger" onClick={handleDelete}>
              Sí, eliminar
            </button>
            <button className="secondary" onClick={() => setProductToDelete(null)}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}