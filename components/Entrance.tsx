import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type EntranceProps = {
  entered: boolean;
  onEnter: () => void;
};

const poetryLines = [
  "A door of quiet opens.",
  "Warmth gathers in the air.",
  "Leaf, water, time.",
  "Scent finds its way home.",
  "Colour blooms, then deepens.",
  "Sip slowly. Hear the hush.",
  "Let the day unclench.",
  "Choose what you need."
];

export default function Entrance({ entered, onEnter }: EntranceProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [sequenceDone, setSequenceDone] = useState(false);
  const activeLine = useMemo(() => poetryLines[lineIndex], [lineIndex]);

  useEffect(() => {
    if (sequenceDone || entered) return;
    const timeout = setTimeout(() => {
      setLineIndex((current) => {
        if (current >= poetryLines.length - 1) {
          setSequenceDone(true);
          return current;
        }
        return current + 1;
      });
    }, 2200);
    return () => clearTimeout(timeout);
  }, [lineIndex, sequenceDone, entered]);

  const handleSkip = () => {
    if (!sequenceDone) {
      setSequenceDone(true);
      setLineIndex(poetryLines.length - 1);
    }
  };

  return (
    <section
      aria-labelledby="t2-entrance-title"
      className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center transition-all duration-[1400ms] ease-out ${
        entered ? "opacity-0 pointer-events-none scale-[0.98]" : "opacity-100"
      }`}
      onClick={handleSkip}
    >
      <div className="max-w-2xl space-y-8">
        <div className="min-h-[180px] sm:min-h-[220px]">
          <AnimatePresence mode="wait">
            {!sequenceDone ? (
              <motion.p
                key={activeLine}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-sm font-light uppercase tracking-[0.3em] text-white/75 sm:text-base"
              >
                {activeLine}
              </motion.p>
            ) : (
              <motion.p
                key="final-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1.2 }}
                className="text-sm font-light uppercase tracking-[0.3em] text-white/80 sm:text-base"
              >
                {poetryLines[poetryLines.length - 1]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <h1 id="t2-entrance-title" className="text-4xl font-light tracking-wide sm:text-6xl">
          T2 Sensory Room
        </h1>
        <p className="text-base text-white/70 sm:text-lg">
          Take a moment. Choose a tea. Enter the infusion.
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onEnter();
            }}
            className={`group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm uppercase tracking-[0.3em] text-white/90 transition duration-700 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
              sequenceDone ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            Begin the ritual
          </button>
          {!sequenceDone ? (
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleSkip();
              }}
              className="text-xs uppercase tracking-[0.4em] text-white/40 transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Skip
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
