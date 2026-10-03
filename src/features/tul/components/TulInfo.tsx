import { Tul } from "@fechitat/content";
import { Button } from "@fechitat/ui";
import { Play, Info, Footprints, BookOpen } from "lucide-react";
import { formatRecommendedRange } from "../lib/timer";

export interface TulInfoProps {
  tul: Tul;
  onPractice: (tul: Tul) => void;
}

export function TulInfo({ tul, onPractice }: TulInfoProps) {
  const recommendedRangeText = formatRecommendedRange(
    tul.recommendedTime?.min,
    tul.recommendedTime?.max
  );

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        {/* Cabecera del TUL */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  tul.rank?.color || "bg-neutral-100 text-neutral-800"
                }`}
              >
                {tul.rank?.name || "ITF Official"}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                ITF Pattern
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight flex items-baseline gap-3">
              {tul.name}
              {tul.koreanName && (
                <span className="text-2xl font-normal text-[#D21111] font-mono">
                  ({tul.koreanName})
                </span>
              )}
            </h2>
          </div>

          {/* Acción Principal destacada */}
          <div className="shrink-0">
            <Button
              size="lg"
              variant="primary"
              onClick={() => onPractice(tul)}
              className="gap-2 text-base px-7 py-3 shadow-md active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Practicar TUL</span>
            </Button>
          </div>
        </div>

        {/* Métricas clave en tarjetas compactas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
              Movimientos
            </span>
            <strong className="text-2xl font-black text-neutral-900 font-mono">
              {tul.movements}
            </strong>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
              Diagrama
            </span>
            <strong className="text-xl font-bold text-[#D21111] font-mono">
              {tul.diagram || "I"}
            </strong>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
              Tiempo Sugerido
            </span>
            <strong className="text-xl font-bold text-neutral-900 font-mono">
              {recommendedRangeText}
            </strong>
          </div>
        </div>

        {/* Sección de Significado e Historia */}
        <div className="space-y-5 text-sm">
          {tul.meaning && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <Info className="w-4 h-4 text-[#D21111]" />
                <span>Significado e Interpretación Filosófica</span>
              </div>
              <p className="text-neutral-600 leading-relaxed bg-neutral-50/70 p-4 rounded-2xl border border-neutral-100">
                {tul.meaning}
              </p>
            </div>
          )}

          {tul.history && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <BookOpen className="w-4 h-4 text-[#D21111]" />
                <span>Contexto Histórico y Marcial</span>
              </div>
              <p className="text-neutral-600 leading-relaxed bg-neutral-50/70 p-4 rounded-2xl border border-neutral-100">
                {tul.history}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Regla oficial de ejecución en dojang */}
      <div className="mt-8 p-4 rounded-2xl bg-red-50/60 border border-red-200/70 flex items-start gap-3">
        <Footprints className="w-5 h-5 text-[#D21111] shrink-0 mt-0.5" />
        <div className="text-xs text-red-950 leading-relaxed">
          <strong>Regla Oficial de Ejecución:</strong> Cada patrón debe iniciarse y finalizarse exactamente en el mismo punto de partida (Postura Preparatoria / Charyot Sogi / Narani Sogi). La respiración debe ser sincronizada con el impacto (Hoo) y el principio del seno de onda (sine wave) debe aplicarse en cada transición técnica.
        </div>
      </div>
    </div>
  );
}
