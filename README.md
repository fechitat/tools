# FECHITAT Tools · recursos trasladados

El catálogo de nueve Tuls, sus fichas y el temporizador de práctica se migraron a `../fechitat-app/` a petición del usuario. El código y el contenido migrados se eliminaron de `src/features/tul/` y `src/shared/content.ts` de este repositorio después de verificar su funcionamiento en la app.

## Destino

- Código: `../fechitat-app/src/features/tul/`.
- Contenido conservado, pendiente de revisión editorial: `../fechitat-app/src/data/tulsContent.ts`.
- Pruebas de tiempo: `../fechitat-app/tests/unit/timer.test.ts`.
- Acceso local: `http://localhost:3001/#/recursos/tuls`.
- Ficha: `http://localhost:3001/#/recursos/tuls/chon-ji`.

El origen solo contenía nueve Tuls, no 24. `/temporizador` y `/timer` cargaban la misma aplicación de Tuls: no existía un temporizador independiente por bloques de minutos que se pudiera migrar.

## Compatibilidad de enlaces anteriores

Se conservan las entradas `/`, `/tul`, `/tul/:slug`, `/temporizador` y `/timer` con una pantalla de traslado, sin duplicar las herramientas. En desarrollo el enlace apunta a `http://localhost:3001`; en producción el destino por defecto es `https://fechitat-verlce.vercel.app`, comprobado públicamente antes de guardarlo. `VITE_APP_BASE_URL` permite sustituirlo (ver `.env.example`). Una configuración inválida muestra un aviso en lugar de abrir un enlace inseguro.

La app de destino ya se desplegó y comprobó en `https://fechitat-verlce.vercel.app`; se probaron los enlaces anteriores localmente. No se desplegó esta pantalla de Tools ni se configuraron redirecciones HTTP permanentes. Los dominios públicos existentes no se han retirado. La retirada del código de Tools queda en una rama y PR separados para no cambiar por sorpresa su sitio público.

## Verificación local

```bash
pnpm run dev -- --host 127.0.0.1
pnpm run typecheck
pnpm run build
pnpm run lint
```

La app destino se levanta por separado con `pnpm dev` desde `../fechitat-app`. Las pruebas del recurso migrado ahora se ejecutan allí con `pnpm test` y `pnpm test:e2e`.

`CONTRIBUTING.md` y `AGENTS.md` describen la arquitectura histórica de Tools; no añadas otra copia del catálogo o temporizador en este repositorio.
