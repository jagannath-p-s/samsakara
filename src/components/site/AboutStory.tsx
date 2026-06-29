import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BlurImage } from "@/components/site/BlurImage";
import { photos, type PhotoKey } from "@/lib/photos";

type Chapter = {
  num: string;
  title: string;
  body: string;
  image?: PhotoKey;
  pull?: boolean;
};

export function AboutStory() {
  const { t } = useTranslation();
  const about = t("about", { returnObjects: true }) as {
    storyEyebrow: string;
    storyTitle: string;
    scrollHint: string;
    imageCaptions: Record<string, string>;
    chapters: Chapter[];
  };

  const pinRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const rail = railRef.current;
    if (!pin || !rail) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!mq.matches) {
        rail.style.transform = "";
        return;
      }
      const rect = pin.getBoundingClientRect();
      const pinHeight = pin.offsetHeight;
      const viewH = window.innerHeight;
      const scrollRange = Math.max(pinHeight - viewH, 1);
      const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      const maxShift = Math.max(rail.scrollWidth - pin.clientWidth, 0);
      rail.style.transform = `translate3d(${-progress * maxShift}px, 0, 0)`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      update();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    mq.addEventListener("change", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [about.chapters.length]);

  return (
    <section className="about-story">
      <div className="about-story-intro mx-auto max-w-6xl px-5 pb-8 pt-2 sm:px-6 lg:px-10">
        <p className="eyebrow">{about.storyEyebrow}</p>
        <h2 className="mt-3 max-w-xl font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl">
          {about.storyTitle}
        </h2>
        <p className="about-story-hint mt-4 text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink)]/55">
          {about.scrollHint}
        </p>
      </div>

      <div className="about-story-mobile lg:hidden">
        <div className="about-story-mobile-track">
          {about.chapters.map((ch, i) => (
            <StoryPanel key={i} chapter={ch} captions={about.imageCaptions} />
          ))}
        </div>
      </div>

      <div ref={pinRef} className="about-story-pin hidden lg:block">
        <div className="about-story-sticky">
          <div ref={railRef} className="about-story-rail">
            {about.chapters.map((ch, i) => (
              <StoryPanel key={i} chapter={ch} captions={about.imageCaptions} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryPanel({
  chapter,
  captions,
}: {
  chapter: Chapter;
  captions: Record<string, string>;
}) {
  const photo = chapter.image ? photos[chapter.image] : null;
  const caption = photo ? captions[photo.captionKey] : "";

  if (chapter.pull) {
    return (
      <article className="about-story-panel about-story-panel--pull">
        <span className="about-story-pull-mark" aria-hidden>
          “
        </span>
        <p className="about-story-pull">{chapter.title}</p>
      </article>
    );
  }

  return (
    <article className="about-story-panel">
      <div className="about-story-panel-inner">
        <header className="about-story-panel-head">
          {chapter.num && <span className="about-story-num">{chapter.num}</span>}
          <h3 className="about-story-panel-title">{chapter.title}</h3>
        </header>
        <div className="about-story-panel-copy">
          <p className="about-story-panel-body">{chapter.body}</p>
        </div>
      </div>

      {photo && (
        <figure
          className="about-story-panel-media"
          style={{ ["--photo-aspect" as string]: photo.aspect }}
        >
          <div className="about-story-photo-frame">
            <BlurImage
              src={photo.src}
              alt={caption}
              width={1200}
              height={900}
              loading="lazy"
              instant
              objectPosition={photo.objectPosition}
            />
          </div>
          {caption && <figcaption className="about-story-caption">{caption}</figcaption>}
        </figure>
      )}
    </article>
  );
}
