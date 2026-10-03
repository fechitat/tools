import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Tul, TulDifficulty } from "@fechitat/content";
import { TulCard } from "./TulCard";

export interface TulSelectorProps {
  tuls: Tul[];
  selectedTul: Tul;
  onSelect: (tul: Tul) => void;
  onPractice: (tul: Tul) => void;
}

export function TulSelector({
  tuls,
  selectedTul,
  onSelect,
  onPractice,
}: TulSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<TulDifficulty | "all">("all");

  const filteredTuls = useMemo(() => {
    return tuls.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.koreanName && t.koreanName.includes(searchTerm)) ||
        (t.rank?.name && t.rank.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDifficulty =
        difficultyFilter === "all" || t.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });
  }, [tuls, searchTerm, difficultyFilter]);

  return (
    <div className="space-y-4">
      {/* Controles de Búsqueda y Filtro rápido */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          <input
            type="search"
            placeholder="Buscar forma, hangul, gup..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-[#D21111] focus:ring-1 focus:ring-[#D21111] transition-all"
            aria-label="Buscar forma de Taekwon-Do"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-neutral-400 flex items-center gap-1 font-medium pl-1 pr-1">
            <Filter className="w-3 h-3" />
            Nivel:
          </span>
          {(
            [
              { id: "all", label: "Todos" },
              { id: "beginner", label: "Principiante" },
              { id: "intermediate", label: "Intermedio" },
              { id: "advanced", label: "Avanzado" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setDifficultyFilter(item.id)}
              className={`px-3 py-1 rounded-lg font-bold border transition-colors whitespace-nowrap cursor-pointer ${
                difficultyFilter === item.id
                  ? "bg-neutral-900 border-neutral-900 text-white"
                  : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista compacta de TULs */}
      <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
        {filteredTuls.length === 0 ? (
          <div className="text-center py-10 px-4 bg-white rounded-2xl border border-neutral-200 text-neutral-500 text-sm">
            No se encontraron formas con ese criterio.
          </div>
        ) : (
          filteredTuls.map((tul) => (
            <TulCard
              key={tul.id}
              tul={tul}
              isSelected={selectedTul.id === tul.id}
              onSelect={onSelect}
              onPractice={onPractice}
            />
          ))
        )}
      </div>
    </div>
  );
}
