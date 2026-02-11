"use client";

import { RefObject, useEffect, useState } from "react";

export default function useInViewOnce<T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0.35
) {
  const [inViewOnce, setInViewOnce] = useState(false);

  useEffect(() => {
    if (inViewOnce || !ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInViewOnce(true);
          observer.disconnect();
        }
      },
      {
        threshold
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [inViewOnce, ref, threshold]);

  return inViewOnce;
}
