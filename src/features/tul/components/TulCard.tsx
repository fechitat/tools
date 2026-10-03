import { Play, Sparkles } from "lucide-react";
import { Tul } from "@fechitat/content";
import { Button, Badge } from "@fechitat/ui";

export interface TulCardProps {
  tul: Tul;
  onSelect: (tul: Tul) => void;
  onPractice: (tul: Tul) => void;
  isSelected?: boolean;
}

export function TulCard({ tul, onSelect, onPractice, isSelected }: TulCardProps) {
  const difficultyBadgeVariant =
    tul.difficulty === "beginner"
      ? "gray"
      : tul.difficulty === "intermediate"
      ? "blue"
      : "red";

  const difficultyLabel =
    tul.difficulty === "beginner"
      ? "Principiante"
      : tul.difficulty === "intermediate"
      ? "Intermedio"
      : "Avanzado";

  return (
    <div
      onClick={() => onSelect(tul)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(tul);
        }
      }}
      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
        isSelected
          ? "bg-red-50/50 border-[#D21111] shadow-xs ring-1 ring-[#D21111]/30"
          : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-xs"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-base text-neutral-900 tracking-tight">
              {tul.name}
            </h3>
            {tul.koreanName && (
              <span className="text-xs text-neutral-400 font-mono">
                ({tul.koreanName})
              </span>
            )}
          </div>
          <span className="text-xs text-neutral-600 block mt-0.5 font-medium">
            {tul.rank?.name || "ITF Pattern"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Badge variant={difficultyBadgeVariant}>{difficultyLabel}</Badge>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
        <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
          <span className="inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D21111]" />
            <strong className="text-neutral-800">{tul.movements}</strong> movs
          </span>
          {tul.recommendedTime && (
            <span>
              {tul.recommendedTime.min}-{tul.recommendedTime.max}s
            </span>
          )}
        </div>

        <Button
          size="sm"
          variant={isSelected ? "primary" : "outline"}
          onClick={(e) => {
            e.stopPropagation();
            onPractice(tul);
          }}
          aria-label={`Practicar forma ${tul.name}`}
          className="gap-1.5 shadow-none"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Practicar</span>
        </Button>
      </div>
    </div>
  );
}
