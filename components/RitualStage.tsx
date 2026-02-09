import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type RitualStageProps = {
  active: boolean;
  onComplete: () => void;
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

export default function RitualStage({ active, onComplete }: RitualStageProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [sequenceDone, setSequenceDone] = useState(false);
  const [started, setStarted] = useState(false);
  const activeLine = useMemo(() => poetryLines[lineIndex], [lineIndex]);

  useEffect(() => {
    if (!active) return;
    setLineIndex(0);
    setSequenceDone(false);
    setStarted(false);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const delay = setTimeout(() => setStarted(true), 450);
    return () => clearTimeout(delay);
  }, [active]);

  useEffect(() => {
    if (!active || !started || sequenceDone) return;
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
  }, [active, started, lineIndex, sequenceDone]);

  useEffect(() => {
    if (!active || !sequenceDone) return;
    const finalize = setTimeout(() => onComplete(), 500);
    return () => clearTimeout(finalize);
  }, [active, sequenceDone, onComplete]);

  const handleSkip = () => {
    if (!sequenceDone) {
      setSequenceDone(true);
      setLineIndex(poetryLines.length - 1);
    }
  };

  if (!active) return null;

  return (
    <section
      aria-label="Ritual poetry"
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      onClick={handleSkip}
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          handleSkip();
        }}
        className="absolute right-6 top-6 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/50 transition hover:border-white/30 hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Skip
      </button>
      <div className="min-h-[180px] sm:min-h-[220px]">
        <AnimatePresence mode="wait">
          {started && !sequenceDone ? (
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
              animate={{ opacity: started ? 0.3 : 0 }}
              transition={{ duration: 1.2 }}
              className="text-sm font-light uppercase tracking-[0.3em] text-white/70 sm:text-base"
            >
              {poetryLines[poetryLines.length - 1]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
