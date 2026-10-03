import { Play, Pause, Square, RotateCcw } from "lucide-react";
import { Button } from "@fechitat/ui";

export interface PracticeControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onFinish: () => void;
  onReset: () => void;
}

export function PracticeControls({
  isRunning,
  isPaused,
  onPause,
  onResume,
  onFinish,
  onReset,
}: PracticeControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {isRunning && (
        <Button
          size="lg"
          variant="secondary"
          onClick={onPause}
          className="gap-2.5 px-8 py-4 text-base min-w-[160px] bg-amber-600 hover:bg-amber-700 border-none shadow-md"
          aria-label="Pausar práctica"
        >
          <Pause className="w-5 h-5 fill-current" />
          <span>PAUSAR</span>
        </Button>
      )}

      {isPaused && (
        <Button
          size="lg"
          variant="primary"
          onClick={onResume}
          className="gap-2.5 px-8 py-4 text-base min-w-[160px] shadow-md"
          aria-label="Reanudar práctica"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>CONTINUAR</span>
        </Button>
      )}

      {(isRunning || isPaused) && (
        <Button
          size="lg"
          variant="secondary"
          onClick={onFinish}
          className="gap-2.5 px-8 py-4 text-base min-w-[160px] bg-neutral-900 hover:bg-black text-white shadow-md"
          aria-label="Finalizar práctica"
        >
          <Square className="w-5 h-5 fill-current" />
          <span>FINALIZAR</span>
        </Button>
      )}

      {isPaused && (
        <Button
          size="lg"
          variant="outline"
          onClick={onReset}
          className="gap-2 px-5 py-4 text-sm text-neutral-600 hover:text-neutral-900"
          title="Reiniciar temporizador a cero"
          aria-label="Reiniciar temporizador"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar</span>
        </Button>
      )}
    </div>
  );
}
