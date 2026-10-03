import { useState, useRef, useCallback, useEffect } from "react";
import { audio } from "../lib/audio";

export interface UseCountdownOptions {
  initialSeconds?: number;
  onComplete?: () => void;
  enableAudio?: boolean;
}

export interface UseCountdownReturn {
  currentCount: number | "YA" | null;
  isActive: boolean;
  startCountdown: (customSeconds?: number) => void;
  cancelCountdown: () => void;
}

/**
 * Hook de cuenta regresiva deportiva (3, 2, 1, YA) antes de comenzar la práctica.
 * Desacoplado y configurable para 3s, 5s o 10s.
 */
export function useCountdown({
  initialSeconds = 3,
  onComplete,
  enableAudio = true,
}: UseCountdownOptions = {}): UseCountdownReturn {
  const [currentCount, setCurrentCount] = useState<number | "YA" | null>(null);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const cancelCountdown = useCallback(() => {
    clearTimer();
    setIsActive(false);
    setCurrentCount(null);
  }, [clearTimer]);

  const startCountdown = useCallback(
    (customSeconds?: number) => {
      clearTimer();
      setIsActive(true);

      const startValue = customSeconds ?? initialSeconds;
      let count = startValue;
      setCurrentCount(count);

      if (enableAudio) {
        audio.playCountdownBeep();
      }

      const step = () => {
        timerRef.current = setTimeout(() => {
          count -= 1;
          if (count > 0) {
            setCurrentCount(count);
            if (enableAudio) {
              audio.playCountdownBeep();
            }
            step();
          } else if (count === 0) {
            setCurrentCount("YA");
            if (enableAudio) {
              audio.playStartChime();
            }
            // Dar 400ms para ver el "YA" antes de disparar el cronómetro
            timerRef.current = setTimeout(() => {
              setIsActive(false);
              setCurrentCount(null);
              onComplete?.();
            }, 400);
          }
        }, 1000);
      };

      step();
    },
    [clearTimer, initialSeconds, enableAudio, onComplete]
  );

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    currentCount,
    isActive,
    startCountdown,
    cancelCountdown,
  };
}
