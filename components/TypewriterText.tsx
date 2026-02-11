"use client";

import { useEffect, useRef, useState } from "react";

type TypewriterTextProps = {
  lines: string[];
  start: boolean;
  onDone?: () => void;
};

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function TypewriterText({ lines, start, onDone }: TypewriterTextProps) {
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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        timeoutId = setTimeout(step, randomBetween(45, 65));
        return;
      }

      lineIndex += 1;
      charIndex = 0;
      timeoutId = setTimeout(step, randomBetween(450, 700));
    };

    step();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [lines, onDone, start]);

  return (
    <div
      className={`mx-auto mt-6 mb-10 w-full max-w-[52ch] px-6 text-center text-lg leading-relaxed tracking-wide text-white sm:text-xl md:text-2xl ${
        done ? "opacity-85" : "opacity-100"
      }`}
    >
      <div className="space-y-4">
        {visibleLines.map((line, lineIndex) => (
          <p key={`${lineIndex}-${lines[lineIndex]}`} className="min-h-[1.75em] font-light">
            {line.split("").map((char, charIndex) => (
              <span
                key={`${lineIndex}-${charIndex}-${char}`}
                className="inline-block animate-[letterFade_120ms_ease-out_forwards] opacity-0"
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
