# My Market - E-commerce Platform

![My Market](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6)
![Vite](https://img.shields.io/badge/Vite-4.4+-646CFF)
![License](https://img.shields.io/badge/License-MIT-green)

Una aplicación de e-commerce moderna construida con React + TypeScript que permite a los usuarios explorar productos, agregarlos al carrito y realizar compras seguras.

## 🚀 Características Principales

- **🔐 Autenticación Segura**: Login con validación de credenciales usando DummyJSON API
- **🛍️ Catálogo de Productos**: Paginación, búsqueda y filtrado por categorías
- **🛒 Carrito Inteligente**: Gestión de cantidades, validación de stock y total automático
- **📱 Diseño Responsive**: Optimizado para desktop, tablet y móvil
- **🎨 Interfaz Moderna**: Paleta de colores corporativa y efectos de hover
- **📦 Formulario de Envío**: Validación completa de datos de entrega
- **✅ Alertas Personalizadas**: Sistema de notificaciones para el usuario

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Estado Global**: Context API + useReducer
- **Estilos**: CSS puro con Flexbox/Grid
- **API**: DummyJSON REST API
- **Validación**: React Hook Form
- **Testing**: Vitest + Testing Library

## 📦 Estructura del Proyecto
src/
├── components/ # Componentes reutilizables
│ ├── Alert/
│ ├── CartIcon/
│ ├── CategoryFilter/
│ ├── Pagination/
│ ├── ProductCard/
│ └── SearchBar/
├── context/ # Estado global (CartContext)
├── hooks/ # Custom hooks
│ ├── usePagination/
│ └── useDistritos/
├── pages/ # Vistas principales
│ ├── Cart/
│ ├── Home/
│ ├── Login/
│ └── Summary/
├── services/ # Servicios API
├── styles/ # Variables CSS globales
└── types/ # Definiciones TypeScript

text

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos para ejecutar localmente

1. **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/BOOTCAMP-0825-FRONTEND-REACT-NTT-[TU-NOMBRE].git
cd BOOTCAMP-0825-FRONTEND-REACT-NTT-[TU-NOMBRE]
Instalar dependencias

bash
npm install
Ejecutar en modo desarrollo

bash
npm run dev
Abrir en el navegador

text
http://localhost:5173
Scripts Disponibles
bash
npm run dev          # Modo desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run test         # Ejecutar tests
npm run test:coverage # Tests con coverage
🎨 Paleta de Colores
La aplicación utiliza una paleta de colores corporativa:

Primary: #911440 (Bordó oscuro)

Secondary: #F6464A (Rojo coral)

Accent: #F68B7B (Salmón)

Light Accent: #FFB48F (Melón claro)

Neutral: #C0B19E (Beige)

📱 Funcionalidades Implementadas
✅ Pantalla de Login
Validación de credenciales con API DummyJSON

Campos validados (no espacios en blanco)

Modal para "Olvidé contraseña"

Manejo de errores y estados de carga

✅ Pantalla Home
Listado de productos con paginación (custom hook)

Búsqueda en tiempo real (mínimo 3 caracteres)

Filtrado por categorías

Agregar al carrito con validación de stock

Diseño responsive con grid de productos

✅ Pantalla Carrito/Resumen
Gestión completa de items (agregar/remover/actualizar)

Cálculo automático del total

Formulario de envío con validaciones

Confirmación de compra con alerta personalizada

Limpieza automática después de compra

✅ Componentes Adicionales
CartIcon: Contador interactivo con animaciones

Alert: Sistema de modales personalizables

Pagination: Navegación entre páginas

CategoryFilter: Selector de categorías

🔧 Arquitectura Técnica
Estado Global
Context API con useReducer para el carrito

Patrón reducer para acciones complejas

Persistencia durante la sesión

Custom Hooks
usePagination: Lógica de paginación reutilizable

useDistritos: Carga de datos locales para formulario

Patrones Implementados
HOC: withAuth para protección de rutas

Mappers: Transformación snake_case to camelCase

Container/Presentational: Separación de lógica y vista

🧪 Testing
El proyecto incluye tests unitarios para:

✅ Componentes individuales

✅ Custom hooks

✅ Utilidades

✅ Páginas completas

Para ejecutar los tests:

bash
npm run test
npm run test:coverage  # Coverage > 90%
📋 Convenciones de Código
Commits
feat: Nuevas funcionalidades

fix: Corrección de bugs

chore: Tareas de mantenimiento

docs: Documentación

Estructura de Componentes
typescript
// Ejemplo de estructura component
interface ComponentProps {
  prop: Type;
}

const Component: React.FC<ComponentProps> = ({ prop }) => {
  // Lógica aquí
  return (
    // JSX aquí
  );
};
🌐 API Endpoints Utilizados
Login: https://dummyjson.com/auth/login

Productos: https://dummyjson.com/products

Categorías: https://dummyjson.com/products/categories

📞 Soporte
Para soporte técnico o preguntas sobre el proyecto, contactar a:

Email: bootcampntt2024@gmail.com

Repositorio: GitHub Issues

📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

Desarrollado por Lisette V. Piña Martínez para el Bootcamp Web React de NTT Data - 2025