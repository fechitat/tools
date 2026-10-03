# Reglas de Desarrollo — FECHITAT Tools (`apps/tools`)

Este archivo complementa el `AGENTS.md` de la raíz del monorepo con directrices específicas para las herramientas deportivas de `apps/tools`:

1. **Uso de `@fechitat/ui` y `@fechitat/brand`**:
   - Reutilizar componentes base (`Button`, `Card`, `Badge`) de `@fechitat/ui`.
   - Utilizar la paleta de colores institucional oficial (`#D21111`, `#121212`, neutrales deportivos).

2. **Fuente de Contenido (`@fechitat/content`)**:
   - Jamás hardcodear listas de formas dentro de componentes de `apps/tools`.
   - Toda lectura de TUL se realiza a través de las funciones abstractas `getTuls()`, `getTul(slug)` o `getTulById(id)` provistas por `@fechitat/content`.
   - No realizar consultas HTTP directas a WordPress ni a Supabase desde la aplicación de herramientas.

3. **Separación de Lógica de Tiempo**:
   - Mantener `usePracticeTimer`, `useCountdown` y `timer.ts` genéricos y desacoplados de TUL para su reutilización en futuras herramientas de combate o rounds.
   - Utilizar siempre `performance.now()` o marcas de tiempo para evitar drift en cronómetros deportivos. Prohibido usar `setInterval` con acumulación ingenua de milisegundos.

4. **Experiencia de Usuario en Tatami**:
   - Botones grandes y legibles a distancia para pantallas móviles o tablets en dojang.
   - Soporte de modo pantalla completa mediante Fullscreen API.
   - Sonidos generados mediante Web Audio API autónoma (sin depender de descargas de audio externas) con interruptor ON/OFF guardado en `localStorage`.
