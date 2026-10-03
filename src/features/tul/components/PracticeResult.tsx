import { RotateCcw, ArrowLeft, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { Tul } from "@fechitat/content";
import { Button } from "@fechitat/ui";
import {
  formatTime,
  formatRecommendedRange,
  compareWithRecommendedTime,
} from "../lib/timer";

export interface PracticeResultProps {
  tul: Tul;
  durationMs: number;
  onRepeat: () => void;
  onSelectOther: () => void;
}

export function PracticeResult({
  tul,
  durationMs,
  onRepeat,
  onSelectOther,
}: PracticeResultProps) {
  const formattedTime = formatTime(durationMs);
  const comparison = compareWithRecommendedTime(durationMs, tul.recommendedTime);
  const recommendedRangeText = formatRecommendedRange(
    tul.recommendedTime?.min,
    tul.recommendedTime?.max
  );

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl border border-neutral-200 shadow-xl p-8 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-200">
      {/* Encabezado */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
          Resultado de Práctica
        </span>
      </div>

      <h2 className="text-3xl font-black text-neutral-900 tracking-tight">
        {tul.name}
      </h2>
      <p className="text-xs text-neutral-500 font-mono mt-0.5 mb-6">
        {tul.movements} movimientos · {tul.rank?.name || "ITF"}
      </p>

      {/* Tiempo Obtenido */}
      <div className="py-6 px-4 rounded-3xl bg-neutral-50 border border-neutral-200/80 mb-6">
        <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest block mb-1">
          Tiempo Total
        </span>
        <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-neutral-900 tabular-nums">
          {formattedTime}
        </div>

        {/* Comparación con rango oficial */}
        <div className="mt-4 pt-4 border-t border-neutral-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-600 font-mono">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Sugerido: <strong>{recommendedRangeText}</strong></span>
          </div>

          <div className="flex items-center gap-1.5">
            {comparison.status === "within_range" ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {comparison.message}
              </span>
            ) : comparison.status === "no_recommendation" ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
                {comparison.message}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5" />
                {comparison.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          size="lg"
          variant="primary"
          onClick={onRepeat}
          className="w-full sm:w-auto gap-2 px-8 py-3.5"
          aria-label="Repetir práctica del mismo TUL"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Repetir TUL</span>
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={onSelectOther}
          className="w-full sm:w-auto gap-2 px-6 py-3.5"
          aria-label="Elegir otro TUL"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Elegir otro TUL</span>
        </Button>
      </div>
    </div>
  );
}
