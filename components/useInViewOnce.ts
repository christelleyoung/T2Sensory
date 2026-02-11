"use client";

import { RefObject, useEffect, useState } from "react";

type UseInViewOnceOptions = IntersectionObserverInit;

export default function useInViewOnce<T extends Element>(
  ref: RefObject<T | null>,
  options: UseInViewOnceOptions = { threshold: 0.35, rootMargin: "-10% 0px -10% 0px" }
) {
  const [inViewOnce, setInViewOnce] = useState(false);

  useEffect(() => {
    const target = ref.current;

    if (!target || inViewOnce) {
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
      options
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [inViewOnce, options, ref]);

  return inViewOnce;
}
