# Guía de Contribución — FECHITAT Tools

¡Bienvenido al repositorio de herramientas web de entrenamiento de la **Federación Chilena de Taekwon-Do Tradicional** (`fechitat/tools`)!

Este proyecto agrupa utilidades interactivas para practicantes, jueces e instructores, como el **Temporizador de Formas** y el **Explorador y Cronómetro de TUL**.

---

## 🏗️ Arquitectura del Proyecto

El proyecto está construido con **Vite + React 19 + TypeScript + Tailwind CSS v4**.

```text
tools/
├── index.html                   # Página de inicio / Catálogo de herramientas
├── tul/
│   └── index.html               # Entrada multipágina para la herramienta TUL
├── temporizador/
│   └── index.html               # Entrada multipágina para el Temporizador
├── src/
│   ├── features/
│   │   ├── tul/                 # Lógica, vistas y componentes de TUL
│   │   └── temporizador/        # Lógica y vistas del temporizador
│   └── shared/
│       ├── brand.ts             # Identidad visual (colores federativos)
│       ├── content.ts           # Información oficial de las 24 formas ITF
│       └── ui.tsx               # Componentes UI reutilizables (Button, Badge, Card)
├── vite.config.ts               # Configuración Vite multipágina con alias
└── vercel.json                  # Reglas de enrutamiento y reescritura para producción
```

---

## 🧩 Cómo Agregar una Nueva Herramienta

1. **Crear la feature en `src/features/<nombre-herramienta>/`**:
   - Desarrolla tus componentes y hooks aislados dentro de esta carpeta.
2. **Crear el punto de entrada HTML**:
   - Crea `<nombre-herramienta>/index.html` siguiendo la estructura de `tul/index.html`.
3. **Registrar la entrada en `vite.config.ts`**:
   - En `build.rollupOptions.input`, añade:
     ```ts
     nombreHerramienta: fileURLToPath(new URL('./<nombre-herramienta>/index.html', import.meta.url))
     ```
4. **Enlazar la tarjeta en `index.html` o en el panel de navegación**.

---

## 🌿 Flujo de Trabajo con Git

1. **Crear una rama para tu tarea**:
   ```bash
   git checkout -b feature/cronometro-combate
   # o bien:
   git checkout -b fix/audio-beep-tul
   ```
2. **Validar antes del commit**:
   ```bash
   pnpm typecheck
   pnpm build
   ```
3. **Commit y Push**:
   ```bash
   git commit -m "feat(tul): añadir control de volumen para beeps acústicos"
   git push origin feature/cronometro-combate
   ```
4. **Abrir Pull Request** hacia `main` en GitHub.
