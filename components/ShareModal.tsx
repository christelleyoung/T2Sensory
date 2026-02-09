import React, { useMemo, useState } from "react";
import type { TeaPairing } from "../data/teaPairings";

type ShareModalProps = {
  open: boolean;
  tea: TeaPairing;
  onClose: () => void;
};

export default function ShareModal({ open, tea, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => `#tea=${tea.slug}`, [tea.slug]);
  const shareText = useMemo(
    () => `Join me in the T2 Sensory Room — ${tea.teaName}. ${shareUrl}`,
    [tea.teaName, shareUrl]
  );

  if (!open) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share this moment"
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-6"
    >
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b0b0c] p-6 shadow-soft">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Share</p>
            <h4 className="mt-2 text-lg font-light text-white">{tea.teaName}</h4>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Close
          </button>
        </div>
        <p className="mt-4 text-sm text-white/70">Copy this fragment to share the mood.</p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
          {shareText}
        </div>
        <button
          onClick={handleCopy}
          className="mt-4 w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {copied ? "Copied" : "Copy text"}
        </button>
      </div>
    </div>
  );
}
