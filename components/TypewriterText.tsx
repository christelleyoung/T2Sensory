"use client";

import { useEffect, useRef, useState } from "react";

type TypewriterTextProps = {
  lines: string[];
  start: boolean;
  skipAnimations?: boolean;
  onDone?: () => void;
};

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function TypewriterText({
  lines,
  start,
  skipAnimations = false,
  onDone
}: TypewriterTextProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>(Array(lines.length).fill(""));
  const [done, setDone] = useState(false);
  const doneCalledRef = useRef(false);

  useEffect(() => {
    if (!start) {
      setVisibleLines(Array(lines.length).fill(""));
      setDone(false);
      doneCalledRef.current = false;
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const reduceMotion =
      skipAnimations || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      setDone(true);
      if (!doneCalledRef.current) {
        doneCalledRef.current = true;
        onDone?.();
      }
    };

    if (reduceMotion) {
      setVisibleLines(lines);
      finish();
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    const draft = Array(lines.length).fill("");

    const step = () => {
      if (lineIndex >= lines.length) {
        finish();
        return;
      }

      const currentLine = lines[lineIndex];

      if (charIndex < currentLine.length) {
        draft[lineIndex] += currentLine[charIndex];
        setVisibleLines([...draft]);
        charIndex += 1;
        timeoutId = setTimeout(step, randomBetween(40, 70));
        return;
      }

      lineIndex += 1;
      charIndex = 0;
      timeoutId = setTimeout(step, randomBetween(500, 700));
    };

    step();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [lines, onDone, skipAnimations, start]);

  return (
    <div
      className={`mx-auto w-full max-w-[52ch] px-6 text-center text-lg font-light leading-relaxed tracking-[0.02em] text-white sm:text-xl md:text-2xl ${
        done ? "opacity-85" : "opacity-100"
      }`}
    >
      <div className="space-y-6">
        {visibleLines.map((line, lineIndex) => (
          <p key={`${lineIndex}-${lines[lineIndex]}`} className="min-h-[1.75em]">
            {line.split("").map((char, charIndex) => (
              <span
                key={`${lineIndex}-${charIndex}-${char}`}
                className={
                  skipAnimations
                    ? "opacity-100"
                    : "inline-block animate-[letterFade_120ms_ease-out_forwards] opacity-0"
                }
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
