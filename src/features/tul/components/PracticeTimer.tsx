import { formatTime } from "../lib/timer";

export interface PracticeTimerProps {
  durationMs: number;
  isRunning: boolean;
  isPaused: boolean;
}

export function PracticeTimer({
  durationMs,
  isRunning,
  isPaused,
}: PracticeTimerProps) {
  const formatted = formatTime(durationMs);

  return (
    <div className="flex flex-col items-center justify-center my-6 select-none" aria-live="off">
      <div className="text-7xl sm:text-9xl font-black font-mono tracking-tight text-neutral-900 drop-shadow-xs tabular-nums">
        {formatted}
      </div>

      <div className="flex items-center gap-2 mt-4 text-xs font-mono font-bold tracking-wider uppercase">
        {isRunning && (
          <span className="inline-flex items-center gap-1.5 text-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            Ejecución en curso
          </span>
        )}
        {isPaused && (
          <span className="inline-flex items-center gap-1.5 text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Pausado
          </span>
        )}
        {!isRunning && !isPaused && durationMs === 0 && (
          <span className="text-neutral-400">
            Listo para iniciar
          </span>
        )}
      </div>
    </div>
  );
}
