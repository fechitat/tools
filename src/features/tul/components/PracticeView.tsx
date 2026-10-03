import { useState, useRef, useEffect } from "react";
import { Maximize2, Minimize2, Volume2, VolumeX, ArrowLeft, Play } from "lucide-react";
import { Tul } from "@fechitat/content";
import { Button } from "@fechitat/ui";
import { audio } from "../lib/audio";
import { usePracticeTimer } from "../hooks/usePracticeTimer";
import { useCountdown } from "../hooks/useCountdown";
import { useFullscreen } from "../hooks/useFullscreen";
import { Countdown } from "./Countdown";
import { PracticeTimer } from "./PracticeTimer";
import { PracticeControls } from "./PracticeControls";
import { PracticeResult } from "./PracticeResult";

export interface PracticeViewProps {
  tul: Tul;
  onExit: () => void;
  onSelectOther: () => void;
}

export function PracticeView({ tul, onExit, onSelectOther }: PracticeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, isSupported: isFullscreenSupported, toggleFullscreen } = useFullscreen(containerRef);

  const [soundEnabled, setSoundEnabled] = useState(() => audio.isEnabled());
  const [sessionFinished, setSessionFinished] = useState(false);
  const [finalTimeMs, setFinalTimeMs] = useState(0);

  const toggleSound = () => {
    const next = !soundEnabled;
    audio.setEnabled(next);
    setSoundEnabled(next);
  };

  const timer = usePracticeTimer();

  const handleCountdownFinished = () => {
    timer.start();
  };

  const countdown = useCountdown({
    initialSeconds: 3,
    enableAudio: soundEnabled,
    onComplete: handleCountdownFinished,
  });

  const handleStartPractice = () => {
    setSessionFinished(false);
    timer.reset();
    countdown.startCountdown(3);
  };

  const handleFinishPractice = () => {
    const elapsed = timer.stop();
    setFinalTimeMs(elapsed);
    setSessionFinished(true);
    if (soundEnabled) {
      audio.playFinishChime();
    }
  };

  const handleRepeat = () => {
    setSessionFinished(false);
    timer.reset();
    countdown.startCountdown(3);
  };

  const isPreparing = !countdown.isActive && !timer.isRunning && !timer.isPaused && !sessionFinished;
  const isExecuting = timer.isRunning || timer.isPaused;

  // Evitar scroll accidental durante la práctica activa
  useEffect(() => {
    if (isExecuting || countdown.isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExecuting, countdown.isActive]);

  return (
    <div
      ref={containerRef}
      className={`min-h-[70vh] flex flex-col justify-between rounded-3xl transition-colors ${
        isFullscreen
          ? "bg-slate-900 text-white p-6 sm:p-12 fixed inset-0 z-50 overflow-y-auto"
          : "bg-white border border-neutral-200 shadow-xl p-6 sm:p-10 text-neutral-900"
      }`}
    >
      {/* Barra superior de herramientas y controles rápidos */}
      <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-4">
        <button
          onClick={onExit}
          className={`inline-flex items-center gap-2 text-sm font-bold transition-colors cursor-pointer ${
            isFullscreen
              ? "text-neutral-300 hover:text-white"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
          aria-label="Volver al detalle del TUL"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al TUL</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Audio ON / OFF */}
          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              isFullscreen
                ? "border-neutral-700 bg-neutral-800 text-neutral-200 hover:text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
            title={soundEnabled ? "Desactivar audio" : "Activar audio"}
            aria-label={soundEnabled ? "Desactivar audio" : "Activar audio"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
          </button>

          {/* Fullscreen Button */}
          {isFullscreenSupported && (
            <button
              onClick={toggleFullscreen}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isFullscreen
                  ? "border-neutral-700 bg-neutral-800 text-neutral-200 hover:text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
              title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Área Central según el estado */}
      <div className="flex-1 flex flex-col items-center justify-center my-6">
        {sessionFinished ? (
          <PracticeResult
            tul={tul}
            durationMs={finalTimeMs}
            onRepeat={handleRepeat}
            onSelectOther={onSelectOther}
          />
        ) : countdown.isActive ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-2 opacity-80">
              {tul.name}
            </h2>
            <Countdown count={countdown.currentCount} />
          </div>
        ) : isExecuting ? (
          <div className="w-full text-center">
            <div className="mb-2">
              <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
                Práctica en Curso
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
                {tul.name}
              </h2>
              <span className="text-xs font-mono opacity-70">
                {tul.movements} movimientos
              </span>
            </div>

            <PracticeTimer
              durationMs={timer.durationMs}
              isRunning={timer.isRunning}
              isPaused={timer.isPaused}
            />

            <PracticeControls
              isRunning={timer.isRunning}
              isPaused={timer.isPaused}
              onPause={timer.pause}
              onResume={timer.resume}
              onFinish={handleFinishPractice}
              onReset={() => {
                timer.reset();
              }}
            />
          </div>
        ) : isPreparing ? (
          /* Estado PREPARADO con botón grande */
          <div className="text-center max-w-md mx-auto py-8">
            <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-[#D21111] font-mono font-bold text-xs mb-3">
              PREPARADO
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
              {tul.name}
            </h2>
            <p className="text-sm text-neutral-500 font-mono mb-8">
              {tul.movements} movimientos · {tul.rank?.name || "ITF"}
            </p>

            <Button
              size="lg"
              variant="primary"
              onClick={handleStartPractice}
              className="w-full sm:w-auto px-12 py-5 text-xl font-black shadow-xl tracking-wider uppercase gap-3 active:scale-95"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>COMENZAR</span>
            </Button>
          </div>
        ) : null}
      </div>

      {/* Barra inferior de estado discreto */}
      <div className="text-center text-xs font-mono text-neutral-400 pt-4 border-t border-neutral-100 flex items-center justify-between">
        <span>FECHITAT Official Practice Timer</span>
        <span>Diagrama: {tul.diagram || "I"}</span>
      </div>
    </div>
  );
}
