<div align="center">
  <h1 align="center">Cronograma de Viajes</h1>
  <p align="center">Planificador inteligente de ciclos de trabajo y descanso para profesionales viajeros.</p>
</div>

---

## 📋 Descripción

**Cronograma de Viajes** es una aplicación web interactiva diseñada para calcular y visualizar itinerarios de viaje basados en ciclos de trabajo rotativos. Permite a los usuarios definir su fecha de inicio, días de salida/regreso y duración del periodo laboral para generar automáticamente un calendario anual.

### 💡 Ejemplos Prácticos de Uso

**Caso 1: Turno Minero 14x7**
Un trabajador que labora 14 días consecutivos y descansa 7.
- **Días de Trabajo**: 14 días.
- **Salida**: Jueves (para viajar el día 15).
- **Regreso**: Jueves siguiente (7 días después).

**Caso 2: Consultor Semanal (5x2)**
Un profesional que viaja a casa cada fin de semana.
- **Días de Trabajo**: 5 días (Lunes a Viernes).
- **Salida**: Viernes tarde.
- **Regreso**: Domingo tarde (para reiniciar el lunes).

## ✨ Características Principales

- **Calendario Dinámico**: Generación automática de ciclos de 12 meses.
- **Configuración Flexible**:
  - Personalización de días de trabajo (1-60 días).
  - Selección inteligente de días de vuelo (salida y regreso).
- **Interfaz Moderna**:
  - Diseño limpio y responsive.
  - Iconografía intuitiva para estados de viaje.
  - Controles táctiles "swipe" para selección de días.
- **Exportación**: Capacidad de exportar el cronograma visualizado a PDF.

## 🛠️ Tecnologías

- **Core**: React 19, TypeScript, Vite.
- **Estilos**: Tailwind CSS 3.
- **Utilidades**: html2canvas, jspdf.

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/cronograma-viajes.git
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

4. **Construir para producción**:
   ```bash
   npm run build
   ```

## 📂 Estructura del Proyecto

```
src/
├── components/   # Componentes de UI (Calendario, Controles, etc.)
├── hooks/        # Lógica de negocio reutilizable (useTravelCycles)
├── utils/        # Funciones auxiliares (dateUtils)
├── styles/       # Estilos globales
├── constants/    # Constantes de configuración
└── types/        # Definiciones de tipos TypeScript
```

---
Desarrollado con ❤️ para optimizar la planificación de viajes.
