import React, { useEffect, useMemo, useState } from "react";
import type { TeaPairing } from "../data/teaPairings";

type VideoStageProps = {
  tea: TeaPairing;
  entered: boolean;
  onShare: () => void;
};

const buildEmbedUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1`;

export default function VideoStage({ tea, entered, onShare }: VideoStageProps) {
  const [currentId, setCurrentId] = useState(tea.youtubeId);
  const [incomingId, setIncomingId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (tea.youtubeId === currentId) return;
    setIncomingId(tea.youtubeId);
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setCurrentId(tea.youtubeId);
      setIncomingId(null);
      setIsTransitioning(false);
    }, 900);
    return () => clearTimeout(timeout);
  }, [tea.youtubeId, currentId]);

  const showPlaceholder = !tea.youtubeId;
  const overlayLabel = useMemo(() => tea.tastingLine, [tea.tastingLine]);

  return (
    <section
      aria-label="Sensory video stage"
      className={`relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-soft transition-all duration-700 ease-out ${
        entered ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0">
        {!showPlaceholder && currentId ? (
          <iframe
            title={tea.videoTitle}
            src={buildEmbedUrl(currentId)}
            className={`h-full w-full transition-opacity duration-700 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
            allow="autoplay; fullscreen"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-black/50 text-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Video ID needed</p>
              <p className="mt-2 text-lg text-white/80">Add YouTube ID to begin</p>
            </div>
          </div>
        )}
        {incomingId && incomingId !== currentId ? (
          <iframe
            title={`${tea.videoTitle} transition`}
            src={buildEmbedUrl(incomingId)}
            className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700"
            style={{ opacity: isTransitioning ? 1 : 0 }}
            allow="autoplay; fullscreen"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="absolute bottom-6 left-6 z-10 max-w-md space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Now steeping</p>
        <h3 className="text-2xl font-light tracking-wide text-white">{tea.teaName}</h3>
        <p className="text-sm text-white/70">{overlayLabel}</p>
        <button
          onClick={onShare}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Share this moment
        </button>
      </div>
    </section>
  );
}
