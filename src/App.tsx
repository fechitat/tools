const configuredBase = import.meta.env.VITE_APP_BASE_URL || (import.meta.env.DEV ? 'http://localhost:3001' : 'https://fechitat-verlce.vercel.app');

/**
 * Resuelve el destino del recurso migrado sin inventar un dominio de producción.
 * @param base URL pública configurada para FECHITAT App.
 * @param pathname Ruta anterior de Tools; los alias abren el catálogo de Tuls.
 * @returns Enlace al recurso en la app o null si falta una URL HTTP válida.
 */
export function getMigratedResourceUrl(base: string, pathname: string): string | null {
  if (!base) return null;
  try {
    const target = new URL(base);
    if (!['http:', 'https:'].includes(target.protocol)) return null;
    const slug = pathname.match(/^\/tul\/([^/]+)\/?$/)?.[1];
    target.hash = `/recursos/tuls${slug ? `/${slug}` : ''}`;
    return target.href;
  } catch {
    return null;
  }
}

export function App() {
  const target = getMigratedResourceUrl(configuredBase, window.location.pathname);
  return (
    <main className="min-h-screen bg-[#F4F2EE] text-[#15171A] px-6 py-16">
      <div className="max-w-xl mx-auto space-y-6">
        <p className="font-bold tracking-wide">FECHITAT · Herramientas</p>
        <h1 className="text-3xl font-bold">Los recursos se trasladaron a FECHITAT App</h1>
        <p>El catálogo, las fichas y el temporizador de Tuls ahora se mantienen en el proyecto de aprendizaje. No hay una segunda copia de estas herramientas en este repositorio.</p>
        {target ? <a href={target} className="inline-flex items-center min-h-12 px-5 py-3 rounded border border-[#15171A] font-bold focus-visible:outline-2 focus-visible:outline-offset-4">Abrir recursos en FECHITAT App</a> : <p role="status">El destino configurado no es una URL HTTP válida. Revisa VITE_APP_BASE_URL para abrir FECHITAT App.</p>}
        <p className="text-sm">Las rutas anteriores se conservan como pantalla de traslado. No se han modificado los despliegues públicos.</p>
      </div>
    </main>
  );
}

export default App;
