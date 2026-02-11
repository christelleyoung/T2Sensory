"use client";

import Image from "next/image";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import TypewriterText from "../components/TypewriterText";
import useInViewOnce from "../components/useInViewOnce";
import { teaMoods, teaMoodMap } from "../data/teaMoodMap";

const poemOne = [
  "Pause.",
  "",
  "Let the noise loosen its grip.",
  "",
  "Steam rises.",
  "Time softens.",
  "",
  "A leaf meets water,",
  "and something ancient remembers you.",
  "",
  "Breathe in.",
  "You are here."
];

const poemTwo = [
  "There is a hunger",
  "that is not for food.",
  "",
  "A wanting",
  "for wonder,",
  "for touch,",
  "for meaning.",
  "",
  "We reach for beauty",
  "so it might carry us somewhere else.",
  "",
  "May curiosity stay restless.",
  "May love remain unfinished.",
  "May artistry meet us where words fail.",
  "",
  "May beauty sweep me away."
];

const portalVideoUrl = "https://www.youtube.com/watch?v=GUk5x2eclcw&list=RD-l1G0Fkfksw&index=6";

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

function DownArrow({ onClick, label, visible = true }: { onClick: () => void; label: string; visible?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`rounded-full border border-white/35 bg-black/25 px-4 py-2 text-2xl text-white/90 transition duration-700 hover:bg-white/10 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      ↓
    </button>
  );
}

function FrameShell({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative flex min-h-screen snap-start items-center justify-center overflow-hidden px-4 py-12 ${className}`}
    >
      <div className="grain-overlay" aria-hidden />
      <div className="vignette-overlay" aria-hidden />
      {children}
    </section>
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

  const [selectedTea, setSelectedTea] = useState(teaMoods[0].slug);
  const [poemOneDone, setPoemOneDone] = useState(false);
  const [poemTwoDone, setPoemTwoDone] = useState(false);
  const [skipAnimations, setSkipAnimations] = useState(false);

  const poemOneInView = useInViewOnce(frameRefs.poemOne, 0.35);
  const poemTwoInView = useInViewOnce(frameRefs.poemTwo, 0.35);
  const videoInView = useInViewOnce(frameRefs.videoOne, 0.3);

  const activeTea = teaMoodMap[selectedTea];

  const motionClass = skipAnimations
    ? "motion-still"
    : activeTea.motionStyle === "drift"
      ? "motion-drift"
      : activeTea.motionStyle === "pulse"
        ? "motion-pulse"
        : "motion-still";

  const teaBackground = useMemo(
    () => ({
      background: `linear-gradient(145deg, ${activeTea.backgroundFrom}, ${activeTea.backgroundTo})`,
      transition: "background 1000ms ease"
    }),
    [activeTea.backgroundFrom, activeTea.backgroundTo]
  );

  const scrollToFrame = useCallback((frame: keyof typeof frameRefs) => {
    frameRefs[frame].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory bg-black text-white">
      <FrameShell className="bg-[radial-gradient(circle_at_20%_10%,rgba(201,168,140,0.2),transparent_40%),linear-gradient(180deg,#0f0d10,#060608)]">
        <section ref={frameRefs.hero} className="relative z-10 flex w-full flex-col items-center text-center">
          <div className="absolute left-4 top-4 z-20 md:left-8 md:top-8">
            <button
              type="button"
              onClick={() => setSkipAnimations((value) => !value)}
              aria-pressed={skipAnimations}
              className="rounded-full border border-white/40 bg-black/35 px-4 py-2 text-xs tracking-[0.12em] text-white/90 transition hover:bg-white/10"
            >
              {skipAnimations ? "ANIMATIONS SKIPPED" : "SKIP ANIMATIONS"}
            </button>
          </div>

          <Image
            src="https://s3.amazonaws.com/blab-impact-published-production/ojdylsEt8bvMh1Nzg4Lh1wMYQ7dznlMd"
            alt="T2 logo"
            width={220}
            height={120}
            className="mb-10 h-auto w-44 opacity-90"
            priority
          />
          <div className="mx-auto max-w-[52ch] space-y-6 px-4">
            <h1 className="text-4xl font-semibold uppercase tracking-[0.16em] text-white/95 md:text-6xl">
              T2 Sensory Installation
            </h1>
            <p className="text-lg leading-relaxed text-white/80 md:text-2xl">
              A single unfolding ritual of atmosphere, poetry, and tea-personalised mood.
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToFrame("poemOne")}
            className="mt-12 rounded-full border border-white/55 bg-white/5 px-8 py-4 text-xs font-semibold tracking-[0.25em] transition duration-700 hover:bg-white/15"
          >
            BEGIN THE RITUAL
          </button>
        </section>
      </FrameShell>

      <FrameShell className="bg-[linear-gradient(170deg,#10101b,#181325)] temperature-shift-slow">
        <section ref={frameRefs.poemOne} className="relative z-10 flex w-full flex-col items-center gap-8">
          <TypewriterText
            lines={poemOne}
            start={poemOneInView}
            skipAnimations={skipAnimations}
            onDone={() => setPoemOneDone(true)}
          />
          <DownArrow
            onClick={() => scrollToFrame("videoOne")}
            label="Scroll to portal video"
            visible={poemOneDone}
          />
        </section>
      </FrameShell>

      <FrameShell className="bg-[linear-gradient(170deg,#09090c,#171922)]">
        <section ref={frameRefs.videoOne} className="relative z-10 flex w-full flex-col items-center gap-7">
          <div
            className={`relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-black/35 transition duration-1000 ${
              videoInView ? "opacity-100" : "opacity-0"
            } ${skipAnimations ? "" : "portal-zoom"}`}
          >
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(portalVideoUrl)}`}
                title="Sensory portal video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <DownArrow onClick={() => scrollToFrame("poemTwo")} label="Scroll to second poem" />
        </section>
      </FrameShell>

      <FrameShell className="bg-[linear-gradient(170deg,#110f1d,#2a1728)] temperature-shift-slow">
        <section ref={frameRefs.poemTwo} className="relative z-10 flex w-full flex-col items-center gap-8">
          <TypewriterText
            lines={poemTwo}
            start={poemTwoInView}
            skipAnimations={skipAnimations}
            onDone={() => setPoemTwoDone(true)}
          />
          <DownArrow
            onClick={() => scrollToFrame("tea")}
            label="Scroll to tea pairing zone"
            visible={poemTwoDone}
          />
        </section>
      </FrameShell>

      <FrameShell className="bg-black">
        <section ref={frameRefs.tea} className="relative z-10 flex w-full items-center justify-center">
          <div className="tea-zone-frame w-full max-w-5xl rounded-3xl border border-white/20 p-7 sm:p-10" style={teaBackground}>
            <div className={`rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur ${motionClass}`}>
              <div className="mx-auto max-w-[52ch] space-y-6 text-center">
                <h2 className="text-2xl font-semibold tracking-[0.12em] text-white/95 md:text-3xl">
                  Tea Pairing Zone
                </h2>
                <p className="text-base leading-relaxed text-white/70 md:text-lg">
                  Choose a tea as a mood. The room responds.
                </p>
              </div>

              <div className="mx-auto mt-8 max-w-xl">
                <select
                  value={selectedTea}
                  onChange={(event) => setSelectedTea(event.target.value)}
                  className="w-full rounded-xl border bg-black/50 px-4 py-3 text-base text-white outline-none transition focus:bg-black/60 md:text-lg"
                  style={{ borderColor: `${activeTea.accentColor}90`, boxShadow: `0 0 0 1px ${activeTea.accentColor}20` }}
                  aria-label="Choose tea mood"
                >
                  {teaMoods.map((tea) => (
                    <option key={tea.slug} value={tea.slug} className="text-black">
                      {tea.label}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mx-auto mt-6 max-w-[52ch] text-center text-lg leading-relaxed text-white/80 md:text-xl">
                {activeTea.microPoem}
              </p>

              <div className="mx-auto mt-8 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/25 bg-black/30">
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(activeTea.youtubeUrl)}`}
                    title={`${activeTea.label} tea mood video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </FrameShell>
    </main>
  );
}
