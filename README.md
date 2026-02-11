<div align="center">
  <h1 align="center">✈️ Cronograma de Viajes</h1>
  <p align="center">Planificador inteligente de ciclos de trabajo y descanso para profesionales viajeros.</p>
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
</div>

---

## 📋 Descripción

**Cronograma de Viajes** es una aplicación web interactiva diseñada para calcular y visualizar itinerarios de viaje basados en ciclos de trabajo rotativos. Permite a los usuarios definir su fecha de inicio, días de salida/regreso y duración del periodo laboral para generar automáticamente un calendario anual completo con exportación a PDF profesional.

### 💡 Ejemplos Prácticos de Uso

**Caso 1: Turno Minero 14x7**
Un trabajador que labora 14 días consecutivos y descansa 7.
- **Días de Trabajo**: 14 días.
- **Días de Descanso**: 7 días.
- **Salida**: Jueves (para viajar el día 15).
- **Regreso**: Jueves siguiente (7 días después).

**Caso 2: Consultor Semanal (5x2)**
Un profesional que viaja a casa cada fin de semana.
- **Días de Trabajo**: 5 días (Lunes a Viernes).
- **Días de Descanso**: 2 días.
- **Salida**: Viernes tarde.
- **Regreso**: Domingo tarde (para reiniciar el lunes).

**Caso 3: Rotación Offshore 21x14**
Trabajador de plataforma petrolera con ciclos largos.
- **Días de Trabajo**: 21 días.
- **Días de Descanso**: 14 días.
- **Salida**: Lunes (inicio del ciclo).
- **Regreso**: Automático (calculado inteligentemente).

## ✨ Características Principales

### 📅 Calendario Dinámico
- Generación automática de ciclos para 12 meses completos
- Visualización clara con códigos de color para cada tipo de día
- Indicadores visuales de ajustes de ciclo cuando es necesario
- Navegación fluida por meses

### ⚙️ Configuración Flexible
- **Días de Trabajo**: Personalización de 1 a 60 días
- **Días de Descanso**: Configuración independiente del período de descanso
- **Día de Salida**: Selector táctil con swipe para elegir el día de vuelo
- **Día de Regreso**: Modo automático inteligente o selección manual
- **Fecha de Inicio**: Selector de calendario personalizado

### 🎨 Interfaz Moderna
- Diseño limpio y responsive (mobile-first)
- Iconografía intuitiva para todos los estados
- Controles táctiles "swipe" para selección de días
- Tooltips contextuales con ayuda en cada sección
- Botón de scroll-to-top para navegación rápida
- Animaciones suaves y transiciones fluidas

### 📄 Exportación Profesional a PDF
- **Calidad Vectorial**: Texto seleccionable y nitidez perfecta
- **Formato A4 Landscape**: Optimizado para impresión
- **Título Clickable**: Enlace automático a la aplicación web
- **Branding Personalizado**: Autor con enlace a portafolio
- **Contenido Completo**: Configuración, calendario de 12 meses y leyenda
- **Iconos SVG**: Share y autor integrados en el documento

### 🧠 Lógica Inteligente
- **Cálculo Automático de Retorno**: El sistema determina el mejor día de regreso
- **Ajustes de Ciclo**: Detecta y visualiza cuando un ciclo necesita ajustarse
- **Validación de Fechas**: Previene configuraciones inválidas
- **Persistencia de Estado**: Mantiene la configuración del usuario

## 🛠️ Tecnologías

- **Core**: React 19, TypeScript, Vite
- **Estilos**: Tailwind CSS 3
- **PDF Generation**: @react-pdf/renderer
- **Iconos**: Heroicons, SVG personalizados
- **Build Tool**: Vite 6

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/cronograma-viajes.git
   cd cronograma-viajes
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

5. **Vista previa de producción**:
   ```bash
   npm run preview
   ```

## 📂 Estructura del Proyecto

```
src/
├── components/       # Componentes de UI
│   ├── Calendar/     # Componentes del calendario
│   ├── ControlPanel.tsx
│   ├── CustomDatePicker.tsx
│   ├── DaySelector.tsx
│   ├── InfoTooltip.tsx
│   ├── PDFDocument.tsx
│   └── ScrollToTop.tsx
├── hooks/            # Lógica de negocio reutilizable
│   └── useTravelCycles.ts
├── utils/            # Funciones auxiliares
│   └── dateUtils.ts
├── constants/        # Constantes de configuración
│   └── constants.ts
├── types/            # Definiciones de tipos TypeScript
│   └── types.ts
├── assets/           # Recursos estáticos
│   ├── Logo_CityNy.gif
│   └── screenshots/
└── App.tsx           # Componente principal
```

## 📸 Screenshots

<div align="center">

### Vista General
![Vista General](./src/assets/vista%20general.jpg)

<p align="center"><em>Interfaz principal mostrando el calendario anual completo con todos los ciclos de trabajo y descanso</em></p>

### Panel de Control
![Panel de Control](./src/assets/panel%20de%20control%20minimizado.jpg)

<p align="center"><em>Panel de configuración con controles intuitivos para personalizar los ciclos de viaje</em></p>

### Reporte PDF
![Reporte PDF](./src/assets/reporte%20pdf%20calendario.jpg)

<p align="center"><em>Ejemplo de PDF exportado con formato profesional listo para imprimir</em></p>

</div>

## 🎯 Características Técnicas Destacadas

### Gestión de Estado
- Estado centralizado en `App.tsx`
- Props drilling controlado para componentes específicos
- Hooks personalizados para lógica compleja

### Rendimiento
- Cálculos optimizados con `useMemo`
- Componentes funcionales con React 19
- Build optimizado con Vite

### Accesibilidad
- Tooltips informativos en todos los controles
- Navegación por teclado
- Contraste de colores WCAG AA

### Responsive Design
- Mobile-first approach
- Breakpoints optimizados para tablet y desktop
- Touch-friendly controls

## 🐛 Correcciones Realizadas

- ✅ Ajuste de ciclos cuando el día de regreso forzado causa desfases
- ✅ Validación de configuraciones extremas (ej: 60 días de trabajo)
- ✅ Corrección de cálculo de meses en ciclos largos
- ✅ Optimización de renderizado del calendario
- ✅ Ajuste de layout PDF para una sola página

## 🔮 Roadmap

- [ ] Soporte para múltiples idiomas (i18n)
- [ ] Exportación a formatos adicionales (iCal, Excel)
- [ ] Modo oscuro
- [ ] Guardado de configuraciones favoritas
- [ ] Compartir cronograma vía URL

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

<div align="center">
  <p>Desarrollado con ❤️ por <a href="https://cityny.github.io/cityny/index.html">Dionny Nuñez</a></p>
  <p>Para optimizar la planificación de viajes de profesionales en todo el mundo</p>
</div>
