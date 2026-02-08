"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Entrance from "../components/Entrance";
import TeaSelector from "../components/TeaSelector";
import VideoStage from "../components/VideoStage";
import ShareModal from "../components/ShareModal";
import { teaPairings, type TeaPairing } from "../data/teaPairings";

const microcopyOptions = ["Breathe in.", "Exhale.", "Sip slowly.", "Let the warmth linger."];

const pickRandom = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];
const silentAudio =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=";

export default function HomePage() {
  const [entered, setEntered] = useState(false);
  const [selectedTea, setSelectedTea] = useState<TeaPairing>(teaPairings[0]);
  const [shareOpen, setShareOpen] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);
  const [microcopy, setMicrocopy] = useState(microcopyOptions[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const existingHash = window.location.hash;
    if (existingHash.startsWith("#tea=")) {
      const slug = existingHash.replace("#tea=", "");
      const match = teaPairings.find((tea) => tea.slug === slug);
      if (match) setSelectedTea(match);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      const slug = window.location.hash.replace("#tea=", "");
      const match = teaPairings.find((tea) => tea.slug === slug);
      if (match) setSelectedTea(match);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  useEffect(() => {
    window.location.hash = `tea=${selectedTea.slug}`;
    setMicrocopy(pickRandom(microcopyOptions));
  }, [selectedTea]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.35;
    if (ambientOn) {
      audioRef.current.play().catch(() => undefined);
    } else {
      audioRef.current.pause();
    }
  }, [ambientOn]);

  const handleSelect = (tea: TeaPairing) => {
    setSelectedTea(tea);
    if (!entered) setEntered(true);
  };

  const handleRandom = () => {
    handleSelect(pickRandom(teaPairings));
  };

  const backgroundStyle = useMemo(() => {
    const [from, via, to] = selectedTea.palette;
    return {
      background: `radial-gradient(circle at top left, ${from}, transparent 55%), linear-gradient(135deg, ${from}, ${via}, ${to ?? via})`
    } as React.CSSProperties;
  }, [selectedTea.palette]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0" style={backgroundStyle} />
      <div className="absolute inset-0 opacity-40">
        <div className="pointer-events-none absolute inset-0">
          <span className="motion-safe:float absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-white/20 blur-md" />
          <span className="motion-safe:float absolute left-[70%] top-[15%] h-3 w-3 rounded-full bg-white/15 blur-md [animation-delay:1.5s]" />
          <span className="motion-safe:float absolute left-[40%] top-[60%] h-2 w-2 rounded-full bg-white/10 blur-md [animation-delay:3s]" />
          <span className="motion-safe:float absolute left-[80%] top-[70%] h-2 w-2 rounded-full bg-white/20 blur-md [animation-delay:4s]" />
        </div>
      </div>
      <div className="grain absolute inset-0 opacity-50" />

      <Entrance entered={entered} onEnter={() => setEntered(true)} />

      <section
        className={`relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-24 pt-10 transition-all duration-700 ease-out sm:pb-28 lg:flex-row ${
          entered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="order-2 flex-1 lg:order-1">
          <div className="fixed bottom-6 left-1/2 z-30 w-[calc(100%-3rem)] -translate-x-1/2 lg:static lg:bottom-auto lg:left-auto lg:w-auto lg:translate-x-0">
            <div className="mx-auto max-w-md lg:max-w-none">
              <TeaSelector
                teas={teaPairings}
                selectedSlug={selectedTea.slug}
                onSelect={handleSelect}
                onRandom={handleRandom}
                entered={entered}
              />
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs uppercase tracking-[0.3em] text-white/50">
                <span>{microcopy}</span>
                <button
                  onClick={() => setAmbientOn((prev) => !prev)}
                  className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 transition hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-pressed={ambientOn}
                >
                  Ambient {ambientOn ? "On" : "Off"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 flex-1 lg:order-2">
          <VideoStage tea={selectedTea} entered={entered} onShare={() => setShareOpen(true)} />
        </div>
      </section>

      <ShareModal open={shareOpen} tea={selectedTea} onClose={() => setShareOpen(false)} />

      <audio ref={audioRef} src={silentAudio} loop preload="none" />

      <style jsx global>{`
        .motion-safe\\:float {
          animation: float 12s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:float { animation: none; }
        }
      `}</style>
    </main>
  );
}
