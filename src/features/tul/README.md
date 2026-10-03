# Feature: Práctica de TUL (`apps/tools/src/features/tul`)

Herramienta oficial de práctica y control de tiempo para las formas (TUL) de Taekwon-Do ITF de FECHITAT.

## Propósito y Filosofía Deportiva

La herramienta está concebida para su uso en tatami, dojang y gimnasios (en móviles, tablets o pantallas conectadas):
- **Acceso rápido**: Selección de la forma con buscador y filtros por dificultad.
- **Preparación inmersiva**: Estado "PREPARADO" con botón grande, seguido de cuenta regresiva sonora (3, 2, 1, YA).
- **Precisión sin drift**: Basado en `performance.now()` y `requestAnimationFrame`. No utiliza `setInterval` acumulativo ingenuo.
- **Evaluación reglamentaria**: Comparación automática del tiempo ejecutado contra los rangos recomendados federativos.
- **Controles táctiles grandes**: Botones de pausa, reanudación y finalización accesibles durante el movimiento.
- **Modo Pantalla Completa**: Vía Fullscreen API para visibilidad a distancia.
- **Feedback auditivo autónomo**: Tonos limpios sintetizados con Web Audio API (sin descargas de archivos externos). Preferencia guardada en `localStorage`.

---

## Arquitectura de Archivos

```text
apps/tools/src/features/tul/
├── components/
│   ├── Countdown.tsx         # Display visual y accesible (aria-live) del 3..2..1..YA
│   ├── PracticeControls.tsx  # Botones grandes táctiles: Pausar, Continuar, Finalizar, Reiniciar
│   ├── PracticeResult.tsx    # Resumen pos-práctica y comparación con tiempos oficiales
│   ├── PracticeTimer.tsx     # Display del cronómetro mm:ss.SS
│   ├── PracticeView.tsx      # Modo inmersivo de práctica, audio toggle y fullscreen
│   ├── TulCard.tsx           # Tarjeta individual con acción "Practicar"
│   ├── TulInfo.tsx           # Vista previa del TUL con significado, historia y diagrama
│   └── TulSelector.tsx       # Buscador y filtro por nivel (Principiante, Intermedio, Avanzado)
│
├── hooks/
│   ├── useCountdown.ts       # Hook de cuenta regresiva (configurable 3s, 5s, 10s)
│   ├── useFullscreen.ts      # Hook de control para Fullscreen API
│   └── usePracticeTimer.ts   # Hook genérico de temporización de alta precisión
│
├── lib/
│   ├── audio.ts              # Sintetizador Web Audio API de bips y acordes (ON/OFF local)
│   ├── timer.ts              # Utilidades de formateo (mm:ss.SS) y evaluación de rangos
│   └── timer.test.ts         # Tests unitarios automatizados de la lógica de tiempo
│
├── TulFeature.tsx            # Contenedor orquestador del feature TUL
├── types.ts                  # Interfaces de estado y tipos del feature
└── index.ts                  # Exportaciones públicas
```

---

## Fuente de Datos: Separación entre CMS y Herramienta

La herramienta **NO** contiene datos hardcodeados ni se conecta directamente a WordPress ni a Supabase:
- Toda la información de formas proviene de `@fechitat/content` (`packages/content`).
- Se consumen exclusivamente a través de los contratos:
  - `getTuls(): Promise<Tul[]>`
  - `getTul(slug: string): Promise<Tul | undefined>`
  - `getTulById(id: string): Promise<Tul | undefined>`
- Solo se cargan y presentan aquellas formas marcadas como `published: true`.

### ¿Qué pertenece al CMS (WordPress)?
1. Creación y edición de nombres, hangul y pronunciación.
2. Cantidad oficial de movimientos.
3. Significado filosófico y contexto histórico.
4. Diagrama y diagramas vectoriales/imágenes.
5. Rango de tiempo recomendado (mínimo y máximo en segundos).
6. Grado asociado (Gup / Dan) y dificultad técnica.
7. Enlace a video oficial federativo.

### ¿Qué pertenece al Código (`apps/tools`)?
1. La lógica de cuenta regresiva y el cronómetro de alta precisión.
2. El sintetizador Web Audio API y el modo fullscreen.
3. La interfaz deportiva, botones y navegación rápida.
4. La evaluación algorítmica del tiempo obtenido vs. rango sugerido.

---

## Separación del Timer

El hook `usePracticeTimer` y los utilitarios de `timer.ts` están completamente desacoplados del concepto de TUL. Esto permite que futuras herramientas como `tools.fechitat.cl/timer` (sparring, rounds, intervalos) compartan la misma base lógica sin duplicación.
