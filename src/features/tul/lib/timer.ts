/**
 * Formatea milisegundos en formato deportivo mm:ss.SS
 * Ejemplo: 77430 ms -> "01:17.43"
 */
export function formatTime(durationMs: number): string {
  const totalMilliseconds = Math.max(0, Math.floor(durationMs));
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hundredths = Math.floor((totalMilliseconds % 1000) / 10);

  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  const cs = hundredths.toString().padStart(2, "0");

  return `${mm}:${ss}.${cs}`;
}

/**
 * Formatea segundos en mm:ss (ej: para rangos recomendados)
 */
export function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Retorna texto descriptivo del rango recomendado (ej: "00:30 – 00:42")
 */
export function formatRecommendedRange(min?: number, max?: number): string {
  if (min !== undefined && max !== undefined) {
    return `${formatSeconds(min)} – ${formatSeconds(max)}`;
  }
  if (min !== undefined) {
    return `Mínimo ${formatSeconds(min)}`;
  }
  if (max !== undefined) {
    return `Máximo ${formatSeconds(max)}`;
  }
  return "Sin tiempo estipulado";
}

export type RangeComparisonStatus =
  | "within_range"
  | "below_min"
  | "above_max"
  | "no_recommendation";

/**
 * Evalúa si el tiempo transcurrido en ms está dentro del rango recomendado de segundos.
 */
export function compareWithRecommendedTime(
  durationMs: number,
  recommended?: { min?: number; max?: number }
): {
  status: RangeComparisonStatus;
  message: string;
  badgeVariant: "green" | "amber" | "red" | "gray";
} {
  if (!recommended || (recommended.min === undefined && recommended.max === undefined)) {
    return {
      status: "no_recommendation",
      message: "Completado",
      badgeVariant: "gray",
    };
  }

  const seconds = durationMs / 1000;
  const { min, max } = recommended;

  if (min !== undefined && seconds < min) {
    const diff = (min - seconds).toFixed(1);
    return {
      status: "below_min",
      message: `Rápido (-${diff}s)`,
      badgeVariant: "amber",
    };
  }

  if (max !== undefined && seconds > max) {
    const diff = (seconds - max).toFixed(1);
    return {
      status: "above_max",
      message: `Lento (+${diff}s)`,
      badgeVariant: "red",
    };
  }

  return {
    status: "within_range",
    message: "Dentro del rango oficial",
    badgeVariant: "green",
  };
}
