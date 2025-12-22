# 📦 Inventario de Productos

Aplicación full stack para gestión de inventario de una tienda. Desarrollada como prueba técnica para proceso de selección en ISES.

## 🧩 Funcionalidades

Sistema completo que permite al administrador:

- Ver lista de productos.
- Crear nuevos productos (con generación automática de descripción usando IA).
- Editar precio y stock.
- Eliminar productos (eliminación lógica - soft delete).
- Exportar reporte completo en CSV (con valor total del inventario).
- Restricciones: Precio y stock no negativos.

**Bonus opcional implementado**: Integración con Google Gemini para generar descripciones atractivas al crear productos.

## Tecnologías Utilizadas

- **Backend**: ASP.NET Core Web API (.NET 8)
- **Base de datos**: SQLite (con Entity Framework Core y migraciones)
- **Frontend**: React (Vite) + CSS puro (responsive)
- **IA**: Google Gemini API (proxy seguro en backend)
- **Otras**: Git para control de versiones

## 📂 Estructura del Proyecto

```tree
InventarioTienda-NetCore-React/
├── Backend/                  # API REST .NET Core
│   ├── Controllers/          # ProductsController y GenerateDescriptionController
│   ├── DTOs/                 # DTOs para requests/responses
│   ├── Migrations/           # Migraciones
│   ├── Models/               # Product.cs y AppDbContext.cs
│   └── appsettings*.json
├── Frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/       # ProductTable, ProductForm, Modal
│   │   ├── hooks/            # useProducts
│   │   ├── api/              # productsApi.js
│   │   └── styles/           # app.css (diseño responsive)
│   └── vite.config.js        # Proxy para API
├── README.md
└── .gitignore
```

## ⚙️Requisitos Previos

- .NET SDK 8 o superior
- Node.js 18+
- Git

## ▶️ Instrucciones de Ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/JosarDev/InventarioTienda-NetCore-React.git
   cd InventarioTienda-NetCore-React
2. Backend:
   - cd Backend
   - dotnet restore
   - dotnet ef database update  # Aplica migraciones
   - dotnet run
3. Frontend:
   - cd ../Frontend
   - npm install
   - npm run dev
4. Configuración Gemini (opcional pero recomendado):
  - Obtén una API Key gratuita en: <https://aistudio.google.com/app/apikey>
  - Crea el archivo Backend/appsettings.Development.json (NO lo subas a GitHub):
```tree
   {
    "Gemini": {
        "ApiKey": "TU_API_KEY_AQUI"
     }
    }
