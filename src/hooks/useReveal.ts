import { useEffect, useRef } from "react";

function markRevealed(el: HTMLElement) {
  if (el.classList.contains("is-revealed")) return;
  el.classList.add("is-revealed");
  el.querySelectorAll<HTMLElement>("[data-reveal-child]").forEach((k, i) => {
    k.style.setProperty("--reveal-delay", `${i * 90}ms`);
  });
}

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh * 0.92 && rect.bottom > 0;
}

/**
 * Adds `.is-revealed` when the element enters the viewport.
 * Content stays visible if JS is slow or observers are unavailable.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    document.documentElement.classList.add("js");

    if (typeof IntersectionObserver === "undefined") {
      markRevealed(el);
      return;
    }

    if (isInViewport(el)) {
      markRevealed(el);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          markRevealed(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.01 },
    );
    io.observe(el);

    const fallback = window.setTimeout(() => markRevealed(el), 400);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
  return ref;
}
