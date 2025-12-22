export function exportProductsToCSV(products) {
  if (!products || products.length === 0) {
    alert("No hay productos para exportar");
    return;
  }

  // Encabezados más profesionales
  const headers = ["ID", "Nombre", "Precio", "Stock", "Valor Total (Precio x Stock)"];

  // Filas con cálculo de valor por producto
  const rows = products.map(p => [
    p.id,
    p.name,
    Number(p.price).toFixed(2),
    p.stock,
    (p.price * p.stock).toFixed(2)
  ]);

  // Agregar fila de totales al final
  const totalValorInventario = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const totalRow = [
    "", 
    "TOTALES", 
    "", 
    products.length + " productos",
    totalValorInventario.toFixed(2)
  ];

  // Construir CSV
  const csvLines = [
    headers.join(","),
    ...rows.map(row => row.join(",")),
    "", // línea en blanco
    totalRow.join(",")
  ];

  const csvContent = csvLines.join("\n");

  // Crear y descargar archivo
  const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" }); // \ufeff para UTF-8 con acentos
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `reporte_inventario_${new Date().toISOString().slice(0,10)}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}