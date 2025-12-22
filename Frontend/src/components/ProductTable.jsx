export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p style={{ textAlign: "center", color: "#94a3b8" }}>
      No hay productos registrados
    </p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td data-label="Nombre">{p.name}</td>
            <td data-label="Descripción">
              {p.description || <em style={{ color: "#64748b" }}>Sin descripción</em>}
            </td>
            <td data-label="Precio">${Number(p.price).toFixed(2)}</td>
            <td data-label="Stock">{p.stock}</td>
            <td data-label="Acciones">
              <div className="actions">
                <button className="secondary" onClick={() => onEdit(p)}>
                  Editar
                </button>
                <button className="danger" onClick={() => onDelete(p)}>
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}