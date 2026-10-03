import { useState, useRef, useCallback, useEffect } from "react";

export interface UsePracticeTimerReturn {
  durationMs: number;
  isRunning: boolean;
  isPaused: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  stop: () => number; // retorna tiempo final en ms
}

/**
 * Hook de temporizador deportivo de alta precisión basado en performance.now()
 * y requestAnimationFrame para evitar el drift temporal.
 * Genérico y reutilizable para TUL, rounds, o futuros ejercicios de FECHITAT.
 */
export function usePracticeTimer(): UsePracticeTimerReturn {
  const [durationMs, setDurationMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const accumulatedMsRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const update = useCallback(() => {
    if (startTimeRef.current !== null) {
      const now = performance.now();
      const currentElapsed = now - startTimeRef.current;
      setDurationMs(accumulatedMsRef.current + currentElapsed);
      rafIdRef.current = requestAnimationFrame(update);
    }
  }, []);

  const start = useCallback(() => {
    accumulatedMsRef.current = 0;
    setDurationMs(0);
    startTimeRef.current = performance.now();
    setIsRunning(true);
    setIsPaused(false);
    rafIdRef.current = requestAnimationFrame(update);
  }, [update]);

  const pause = useCallback(() => {
    if (startTimeRef.current !== null) {
      accumulatedMsRef.current += performance.now() - startTimeRef.current;
      startTimeRef.current = null;
    }
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(true);
    setDurationMs(accumulatedMsRef.current);
  }, []);

  const resume = useCallback(() => {
    startTimeRef.current = performance.now();
    setIsRunning(true);
    setIsPaused(false);
    rafIdRef.current = requestAnimationFrame(update);
  }, [update]);

  const reset = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    startTimeRef.current = null;
    accumulatedMsRef.current = 0;
    setIsRunning(false);
    setIsPaused(false);
    setDurationMs(0);
  }, []);

  const stop = useCallback(() => {
    let finalTime = accumulatedMsRef.current;
    if (startTimeRef.current !== null) {
      finalTime += performance.now() - startTimeRef.current;
      startTimeRef.current = null;
    }
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
    setDurationMs(finalTime);
    accumulatedMsRef.current = finalTime;
    return finalTime;
  }, []);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return {
    durationMs,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    reset,
    stop,
  };
}
