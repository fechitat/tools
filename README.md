# FECHITAT Tools

Plataforma oficial de herramientas de entrenamiento y utilidades de la **Federación Chilena de Taekwon-Do Tradicional** (**FECHITAT**).

Dominio de producción: [https://tools.fechitat.cl](https://tools.fechitat.cl)

---

## 🥋 Herramientas Disponibles

| Herramienta | Ruta | Estado | Descripción |
| :--- | :--- | :--- | :--- |
| **Práctica y Explorador de TUL** | `/tul`, `/tul/:slug` | **Activo** | Catálogo oficial de formas ITF con cuenta regresiva, temporizador de alta precisión (`performance.now()`), comparación de tiempos reglamentarios, audio y modo pantalla completa para tatami. |
| **Temporizador de Formas** | `/temporizador` | **Activo** | Cronómetro regresivo por bloques de minutos para secuencias de entrenamiento y examen de graduación. |
| **Terminología y Recursos** | `/` | **Activo** | Directorio principal de acceso a utilidades marciales. |

---

## 🛠️ Requisitos Previos

- **Node.js**: v20 o v22 LTS.
- **Gestor de paquetes**: `pnpm` o `npm`.

---

## 🚀 Instalación y Desarrollo Local

1. **Clonar el repositorio**:
   ```bash
   git clone git@github.com:fechitat/tools.git
   cd tools
   ```

2. **Instalar dependencias**:
   ```bash
   pnpm install
   # o bien: npm install
   ```

3. **Iniciar el servidor local**:
   ```bash
   pnpm dev
   # o bien: npm run dev
   ```
   Abre [http://localhost:3002](http://localhost:3002) en tu navegador.

4. **Compilar para producción**:
   ```bash
   pnpm build
   ```

5. **Verificar tipos y código**:
   ```bash
   pnpm typecheck
   pnpm lint
   ```

---

## 📄 Guía de Contribución

Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para conocer las pautas de estilo, arquitectura de nuevas herramientas y flujo de trabajo en Git.
