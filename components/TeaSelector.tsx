import React, { useEffect, useMemo, useRef, useState } from "react";
import type { TeaPairing } from "../data/teaPairings";

type TeaSelectorProps = {
  teas: TeaPairing[];
  selectedSlug: string;
  onSelect: (tea: TeaPairing) => void;
  onRandom: () => void;
  entered: boolean;
};

export default function TeaSelector({ teas, selectedSlug, onSelect, onRandom, entered }: TeaSelectorProps) {
  const [focusIndex, setFocusIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedIndex = useMemo(
    () => Math.max(0, teas.findIndex((tea) => tea.slug === selectedSlug)),
    [teas, selectedSlug]
  );

  useEffect(() => {
    setFocusIndex(selectedIndex);
  }, [selectedIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!entered) return;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = (focusIndex + 1) % teas.length;
      setFocusIndex(nextIndex);
      onSelect(teas[nextIndex]);
      buttonRefs.current[nextIndex]?.focus();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      const nextIndex = (focusIndex - 1 + teas.length) % teas.length;
      setFocusIndex(nextIndex);
      onSelect(teas[nextIndex]);
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <aside
      className={`relative z-20 w-full max-w-md rounded-3xl border border-white/10 bg-black/40 p-6 shadow-soft backdrop-blur transition-all duration-700 ease-out sm:max-w-sm sm:p-8 ${
        entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      onKeyDown={handleKeyDown}
      aria-label="Tea selector"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Ritual selection</p>
          <h2 className="mt-2 text-lg font-light tracking-wide">Choose your infusion</h2>
        </div>
        <button
          onClick={onRandom}
          className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Random pairing
        </button>
      </div>

      <div role="listbox" aria-label="Tea list" className="mt-6 space-y-2">
        {teas.map((tea, index) => {
          const isSelected = tea.slug === selectedSlug;
          return (
            <button
              key={tea.slug}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => onSelect(tea)}
              role="option"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                isSelected
                  ? "border-white/40 bg-white/10 text-white"
                  : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              <span className="text-sm tracking-[0.1em]">{tea.teaName}</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Select</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
