import { useState, useEffect } from "react";
import { getTuls, Tul } from "@fechitat/content";
import { TulSelector } from "./components/TulSelector";
import { TulInfo } from "./components/TulInfo";
import { PracticeView } from "./components/PracticeView";

export interface TulFeatureProps {
  initialSlug?: string;
  onNavigate?: (path: string) => void;
}

export function TulFeature({ initialSlug, onNavigate }: TulFeatureProps) {
  const [tuls, setTuls] = useState<Tul[]>([]);
  const [selectedTul, setSelectedTul] = useState<Tul | null>(null);
  const [isPracticing, setIsPracticing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carga de formas oficiales desde @fechitat/content
  useEffect(() => {
    let isMounted = true;
    getTuls()
      .then((data) => {
        if (!isMounted) return;
        setTuls(data);
        if (data.length > 0) {
          const match = initialSlug
            ? data.find((t) => t.slug.toLowerCase() === initialSlug.toLowerCase())
            : null;
          setSelectedTul(match || data[0]);
        }
      })
      .catch((err) => {
        console.error("Error cargando TULs:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [initialSlug]);

  const handleSelectTul = (tul: Tul) => {
    setSelectedTul(tul);
    if (onNavigate) {
      onNavigate(`/tul/${tul.slug}`);
    }
  };

  const handleStartPractice = (tul: Tul) => {
    setSelectedTul(tul);
    setIsPracticing(true);
  };

  const handleExitPractice = () => {
    setIsPracticing(false);
  };

  const handleSelectOther = () => {
    setIsPracticing(false);
    if (onNavigate) {
      onNavigate("/tul");
    }
  };

  // SEO dinámico para la vista
  useEffect(() => {
    if (selectedTul) {
      document.title = `${selectedTul.name} | Práctica de TUL | FECHITAT`;
    } else {
      document.title = "Práctica de TUL | FECHITAT";
    }
  }, [selectedTul]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-neutral-500 font-mono text-sm">
        Cargando formas oficiales de Taekwon-Do ITF...
      </div>
    );
  }

  if (!selectedTul) {
    return (
      <div className="text-center py-20 text-neutral-500 text-sm">
        No hay formas disponibles en este momento.
      </div>
    );
  }

  if (isPracticing) {
    return (
      <PracticeView
        tul={selectedTul}
        onExit={handleExitPractice}
        onSelectOther={handleSelectOther}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Título y subtítulo institucional */}
      <div className="border-b border-neutral-200/80 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
          Práctica de TUL
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Practica tus formas de Taekwon-Do ITF y controla tu tiempo de ejecución.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Selector y buscador */}
        <div className="lg:col-span-4">
          <TulSelector
            tuls={tuls}
            selectedTul={selectedTul}
            onSelect={handleSelectTul}
            onPractice={handleStartPractice}
          />
        </div>

        {/* Vista del TUL seleccionado */}
        <div className="lg:col-span-8">
          <TulInfo tul={selectedTul} onPractice={handleStartPractice} />
        </div>
      </div>
    </div>
  );
}
