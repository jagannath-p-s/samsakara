import { useTranslation } from "react-i18next";

type Chapter = {
  num: string;
  title: string;
  body: string;
  pull?: boolean;
};

export function AboutStory() {
  const { t } = useTranslation();
  const about = t("about", { returnObjects: true }) as {
    storyEyebrow: string;
    storyTitle: string;
    chapters: Chapter[];
  };

  return (
    <section className="about-timeline">
      <div className="about-timeline-intro mx-auto max-w-3xl px-5 pb-8 pt-6 text-center sm:px-6 lg:px-10">
        <p className="eyebrow">{about.storyEyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl">
          {about.storyTitle}
        </h2>
      </div>

      <div className="about-timeline-wrap mx-auto max-w-3xl px-5 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <ol className="about-timeline-list">
          {about.chapters.map((chapter, i) => {
            if (chapter.pull) {
              return (
                <li key={i} className="about-timeline-quote">
                  <p>{chapter.title}</p>
                </li>
              );
            }
            if (!chapter.title && !chapter.body) return null;
            return (
              <li key={i} className="about-timeline-item">
                {chapter.title ? <h3 className="about-timeline-title">{chapter.title}</h3> : null}
                {chapter.body ? <p className="about-timeline-body">{chapter.body}</p> : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
