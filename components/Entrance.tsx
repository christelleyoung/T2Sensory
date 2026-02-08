import React from "react";

type EntranceProps = {
  entered: boolean;
  onEnter: () => void;
};

export default function Entrance({ entered, onEnter }: EntranceProps) {
  return (
    <section
      aria-labelledby="t2-entrance-title"
      className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center transition-all duration-700 ease-out ${
        entered ? "opacity-0 pointer-events-none scale-[0.98]" : "opacity-100"
      }`}
    >
      <div className="max-w-2xl space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">T2</p>
        <h1 id="t2-entrance-title" className="text-4xl font-light tracking-wide sm:text-6xl">
          T2 Sensory Room
        </h1>
        <p className="text-base text-white/70 sm:text-lg">
          Take a moment. Choose a tea. Enter the infusion.
        </p>
        <button
          onClick={onEnter}
          className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm uppercase tracking-[0.3em] text-white/90 transition duration-500 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Enter the room
        </button>
      </div>
    </section>
  );
}
