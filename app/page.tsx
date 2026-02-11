"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import TypewriterText from "../components/TypewriterText";
import useInViewOnce from "../components/useInViewOnce";

type TeaMood = {
  youtubeUrl: string;
  background: { from: string; to: string };
  accentColor: string;
  motionStyle: "drift" | "pulse" | "still";
};

const teaMoodMap: Record<string, TeaMood> = {
  "gorgeous-giesha": {
    youtubeUrl: "https://www.youtube.com/watch?v=uDAMEj403hI",
    background: { from: "#F7EDE2", to: "#EEDFCC" },
    accentColor: "#D9B8A0",
    motionStyle: "drift"
  },
  "sticky-honey-chai": {
    youtubeUrl: "https://www.youtube.com/watch?v=-l1G0Fkfksw&list=RD-l1G0Fkfksw&start_radio=1",
    background: { from: "#A87F4E", to: "#6D4B2E" },
    accentColor: "#C99A6E",
    motionStyle: "pulse"
  },
  "beauty-queen": {
    youtubeUrl: "https://www.youtube.com/watch?v=40EzqzV7o3Y",
    background: { from: "#F3E8F1", to: "#E1D1E6" },
    accentColor: "#C49FCB",
    motionStyle: "still"
  },
  red: {
    youtubeUrl: "https://www.youtube.com/watch?v=I-SrGxoGFoE&list=RDI-SrGxoGFoE&start_radio=1",
    background: { from: "#D73B3E", to: "#8A1F1F" },
    accentColor: "#B24040",
    motionStyle: "still"
  },
  "liquorice-legs": {
    youtubeUrl: "https://www.youtube.com/watch?v=Vx1UGA_T1nI&list=RDVx1UGA_T1nI&start_radio=1",
    background: { from: "#3A3648", to: "#1E1A2D" },
    accentColor: "#6C5F92",
    motionStyle: "drift"
  },
  "russian-caravan": {
    youtubeUrl:
      "https://www.youtube.com/watch?v=tkYzhHbgdOk&list=RDEM8KJKsAWB_01c-y-Z6Na58Q&start_radio=1&rv=Vx1UGA_T1nI",
    background: { from: "#4A3F34", to: "#2A221B" },
    accentColor: "#74604A",
    motionStyle: "drift"
  },
  "spi-chai": {
    youtubeUrl: "https://www.youtube.com/watch?v=HPTqiuPlaFA&list=RDEM8KJKsAWB_01c-y-Z6Na58Q&index=2",
    background: { from: "#B15A4F", to: "#672F29" },
    accentColor: "#D18C82",
    motionStyle: "pulse"
  },
  "red-green-dreamy": {
    youtubeUrl:
      "https://www.youtube.com/watch?v=aw-znWz8QEI&list=RDEM8KJKsAWB_01c-y-Z6Na58Q&index=11",
    background: { from: "#8BBF9F", to: "#355C42" },
    accentColor: "#A3D1B2",
    motionStyle: "drift"
  },
  "french-early-grey": {
    youtubeUrl:
      "https://www.youtube.com/watch?v=hRaqPMQ4WHw&list=RDEM8KJKsAWB_01c-y-Z6Na58Q&index=12",
    background: { from: "#CFCFCF", to: "#9B9B9B" },
    accentColor: "#B8B8B8",
    motionStyle: "still"
  },
  "melbourne-breakfast": {
    youtubeUrl: "https://www.youtube.com/watch?v=lJkSCFfZltE",
    background: { from: "#E9C68A", to: "#B2884A" },
    accentColor: "#D1A361",
    motionStyle: "pulse"
  },
  "english-breakfast": {
    youtubeUrl: "https://www.youtube.com/watch?v=f6RG4OdkK2M",
    background: { from: "#B36B45", to: "#7A442D" },
    accentColor: "#C18360",
    motionStyle: "still"
  },
  "strawberries-cream": {
    youtubeUrl: "https://www.youtube.com/watch?v=kyDZ_kBrD90",
    background: { from: "#F7BEC0", to: "#EB8A8F" },
    accentColor: "#EE9BA1",
    motionStyle: "drift"
  },
  matcha: {
    youtubeUrl: "https://www.youtube.com/watch?v=vUf_SaRYKHs",
    background: { from: "#A9C67E", to: "#5C7A3A" },
    accentColor: "#C4D699",
    motionStyle: "still"
  },
  "just-chamomile": {
    youtubeUrl: "https://www.youtube.com/watch?v=zP1JkRPqq5A",
    background: { from: "#F9E6B8", to: "#D9C48A" },
    accentColor: "#EBD79C",
    motionStyle: "drift"
  },
  "sweetest-dream": {
    youtubeUrl: "https://www.youtube.com/watch?v=VufGXXP6sjk",
    background: { from: "#C4B0E2", to: "#7C61A0" },
    accentColor: "#B79AD5",
    motionStyle: "drift"
  },
  "wakey-wakey": {
    youtubeUrl: "https://www.youtube.com/watch?v=gbvzq5xHzcM",
    background: { from: "#F2D16B", to: "#B58E1F" },
    accentColor: "#E5C36F",
    motionStyle: "pulse"
  }
};

const teaOptions = [
  { label: "gorgeous giesha", slug: "gorgeous-giesha" },
  { label: "sticky honey chai", slug: "sticky-honey-chai" },
  { label: "beauty queen", slug: "beauty-queen" },
  { label: "Red", slug: "red" },
  { label: "liquorice legs", slug: "liquorice-legs" },
  { label: "Russian caravan", slug: "russian-caravan" },
  { label: "Spi Chai", slug: "spi-chai" },
  { label: "Red, Green & Dreamy", slug: "red-green-dreamy" },
  { label: "French Early Grey", slug: "french-early-grey" },
  { label: "Melbourne Breakfast", slug: "melbourne-breakfast" },
  { label: "English Breakfast", slug: "english-breakfast" },
  { label: "Strawberries & Cream", slug: "strawberries-cream" },
  { label: "Matcha", slug: "matcha" },
  { label: "Just Chamomile", slug: "just-chamomile" },
  { label: "Sweetest Dream", slug: "sweetest-dream" },
  { label: "Wakey Wakey", slug: "wakey-wakey" }
] as const;

const poemOne = [
  "Pause.",
  "Let the noise loosen its grip.",
  "Steam rises.",
  "Time softens.",
  "A leaf meets water,",
  "and something ancient remembers you.",
  "Breathe in.",
  "You are here."
];

const poemTwo = [
  "There is a hunger",
  "that is not for food.",
  "A wanting",
  "for wonder,",
  "for touch,",
  "for meaning.",
  "We reach for beauty",
  "so it might carry us somewhere else.",
  "May curiosity stay restless.",
  "May love remain unfinished.",
  "May artistry meet us where words fail.",
  "May beauty sweep me away."
];

const getYouTubeId = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }
    return parsed.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
};

function DownArrow({
  onClick,
  label,
  fixed = true
}: {
  onClick: () => void;
  label: string;
  fixed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`${fixed ? "absolute bottom-8 left-1/2 -translate-x-1/2" : ""} rounded-full border border-white/40 bg-black/25 px-4 py-2 text-3xl text-white/90 transition hover:bg-black/45`}
    >
      ↓
    </button>
  );
}

export default function HomePage() {
  const frameRefs = {
    hero: useRef<HTMLElement | null>(null),
    poemOne: useRef<HTMLElement | null>(null),
    videoOne: useRef<HTMLElement | null>(null),
    poemTwo: useRef<HTMLElement | null>(null),
    tea: useRef<HTMLElement | null>(null)
  };

  const [poemOneDone, setPoemOneDone] = useState(false);
  const [poemTwoDone, setPoemTwoDone] = useState(false);
  const [selectedTea, setSelectedTea] = useState<string>(teaOptions[0].slug);
  const handlePoemOneComplete = useCallback(() => setPoemOneDone(true), []);
  const handlePoemTwoComplete = useCallback(() => setPoemTwoDone(true), []);
  const poemObserverOptions = useMemo<IntersectionObserverInit>(
    () => ({ threshold: 0.35, rootMargin: "-10% 0px -10% 0px" }),
    []
  );
  const poemOneInView = useInViewOnce(frameRefs.poemOne, poemObserverOptions);
  const poemTwoInView = useInViewOnce(frameRefs.poemTwo, poemObserverOptions);

  const activeTea = teaMoodMap[selectedTea];

  const teaStyle = useMemo(
    () => ({
      background: `linear-gradient(160deg, ${activeTea.background.from}, ${activeTea.background.to})`
    }),
    [activeTea.background.from, activeTea.background.to]
  );

  const scrollToFrame = (frame: keyof typeof frameRefs) => {
    frameRefs[frame].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory bg-black text-white">
      <section
        ref={frameRefs.hero}
        className="relative flex min-h-screen snap-start items-center justify-center overflow-hidden px-6"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,210,140,0.25),transparent_45%),linear-gradient(180deg,#0f0b09,#050505)]" />
        <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
          <Image
            src="https://s3.amazonaws.com/blab-impact-published-production/ojdylsEt8bvMh1Nzg4Lh1wMYQ7dznlMd"
            alt="T2 logo"
            width={200}
            height={100}
            className="mb-8 h-auto w-40"
          />
          <h1 className="text-5xl font-semibold uppercase tracking-[0.12em] sm:text-6xl">T2 Sensory Room</h1>
          <p className="mt-5 text-lg text-white/85 sm:text-2xl">Step into a ritual of taste, motion, and sound.</p>
          <button
            type="button"
            onClick={() => scrollToFrame("poemOne")}
            className="mt-12 rounded-full border border-white/60 px-8 py-4 text-sm font-semibold tracking-[0.2em] transition hover:bg-white/15"
          >
            BEGIN THE RITUAL
          </button>
        </div>
      </section>

      <section
        ref={frameRefs.poemOne}
        className="relative flex min-h-screen snap-start flex-col items-center justify-center bg-[linear-gradient(140deg,#0e0e17,#171424)] px-4"
      >
        <TypewriterText lines={poemOne} start={poemOneInView} onDone={handlePoemOneComplete} />
        {poemOneDone && (
          <div className="mt-6">
            <DownArrow onClick={() => scrollToFrame("videoOne")} label="Scroll to first video" fixed={false} />
          </div>
        )}
      </section>

      <section
        ref={frameRefs.videoOne}
        className="relative flex min-h-screen snap-start items-center justify-center bg-black px-3 py-8"
      >
        <div className="relative h-[80vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/20">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${getYouTubeId("https://www.youtube.com/watch?v=GUk5x2eclcw&list=RD-l1G0Fkfksw&index=6")}`}
            title="Sensory video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <DownArrow onClick={() => scrollToFrame("poemTwo")} label="Scroll to second poem" />
      </section>

      <section
        ref={frameRefs.poemTwo}
        className="relative flex min-h-screen snap-start flex-col items-center justify-center bg-[linear-gradient(140deg,#130f1e,#26162b)] px-4"
      >
        <TypewriterText lines={poemTwo} start={poemTwoInView} onDone={handlePoemTwoComplete} />
        {poemTwoDone && (
          <div className="mt-6">
            <DownArrow onClick={() => scrollToFrame("tea")} label="Scroll to tea pairing zone" fixed={false} />
          </div>
        )}
      </section>

      <section
        ref={frameRefs.tea}
        style={teaStyle}
        className="relative flex min-h-screen snap-start items-center justify-center px-4 py-10 transition-colors duration-700"
      >
        <div className="w-full max-w-5xl rounded-3xl border border-white/25 bg-black/35 p-6 backdrop-blur-md sm:p-10">
          <h2 className="mb-6 text-center text-3xl font-semibold tracking-wide">Tea Pairing Zone</h2>
          <div className="mx-auto mb-8 max-w-xl">
            <select
              value={selectedTea}
              onChange={(event) => setSelectedTea(event.target.value)}
              className="w-full rounded-xl border border-white/35 bg-black/45 px-4 py-3 text-lg capitalize text-white outline-none focus:border-white"
            >
              {teaOptions.map((tea) => (
                <option key={tea.slug} value={tea.slug} className="text-black">
                  {tea.label}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`mx-auto h-[55vh] w-full overflow-hidden rounded-2xl border border-white/30 ${
              activeTea.motionStyle === "pulse"
                ? "animate-[pulseGlow_4s_ease-in-out_infinite]"
                : activeTea.motionStyle === "drift"
                  ? "animate-[drift_12s_ease-in-out_infinite]"
                  : ""
            }`}
            style={{ boxShadow: `0 0 32px ${activeTea.accentColor}66` }}
          >
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${getYouTubeId(activeTea.youtubeUrl)}`}
              title="Tea pairing video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
