import { useState, useEffect } from "react";
import { TulFeature } from "./features/tul";
import { ExternalLink } from "lucide-react";

export function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || "/tul");

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || "/tul");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path);
  };

  const tulSlugMatch = currentPath.match(/^\/tul\/(.+)/);
  const currentTulSlug = tulSlugMatch ? tulSlugMatch[1] : undefined;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header oficial FECHITAT Tools */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/tul")}
          >
            <div className="w-10 h-10 rounded-xl bg-[#D21111] text-white font-black flex items-center justify-center text-lg shadow-sm">
              F
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                FECHITAT <span className="text-[#D21111]">Herramientas</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Federación Chilena de Taekwon-Do Tradicional
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-red-50 text-[#D21111] border border-red-200/60">
              Práctica de Formas ITF
            </span>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <TulFeature
          initialSlug={currentTulSlug}
          onNavigate={(newPath) => navigate(newPath)}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 FECHITAT — Plataforma Oficial de Herramientas ITF</p>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <a
              href="https://fechitat.cl"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D21111] transition-colors inline-flex items-center gap-1"
            >
              <span>Sitio Principal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://fechitat.cl/recursos"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D21111] transition-colors inline-flex items-center gap-1"
            >
              <span>Recursos y Formación</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
