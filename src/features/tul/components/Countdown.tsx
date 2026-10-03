export interface CountdownProps {
  count: number | "YA" | null;
}

export function Countdown({ count }: CountdownProps) {
  if (count === null) return null;

  return (
    <div
      className="flex flex-col items-center justify-center py-12"
      aria-live="assertive"
      role="status"
    >
      <span className="text-xs font-mono font-bold tracking-widest text-[#D21111] uppercase mb-4 animate-pulse">
        {count === "YA" ? "¡COMIENZA!" : "PREPARADO..."}
      </span>
      <div className="text-8xl sm:text-9xl font-black font-mono tracking-tighter text-neutral-900 select-none animate-in fade-in duration-200">
        {count}
      </div>
    </div>
  );
}
