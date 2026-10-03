import { Tul, TulDifficulty, RecommendedTime } from "@fechitat/content";

export type { Tul, TulDifficulty, RecommendedTime };

export type PracticeStatus = "idle" | "countdown" | "running" | "paused" | "finished";

export interface PracticeSessionResult {
  tul: Tul;
  durationMs: number;
  formattedTime: string;
  status: "within_range" | "below_min" | "above_max" | "no_recommendation";
  recommendedRangeText?: string;
  differenceMs?: number;
}
