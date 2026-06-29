import { useTranslation } from "react-i18next";

type LegalDoc = {
  title: string;
  updated: string;
  intro?: string;
  sections: { heading: string; paragraphs: string[] }[];
};

type Props = {
  docKey: "privacy" | "terms" | "cookies";
};

export function LegalDocument({ docKey }: Props) {
  const { t } = useTranslation();
  const doc = t(`legal.${docKey}`, { returnObjects: true }) as LegalDoc;

  return (
    <article className="legal-doc">
      <header className="legal-doc-header">
        <p className="eyebrow">{t("legal.eyebrow")}</p>
        <h1 className="legal-doc-title">{doc.title}</h1>
        <p className="legal-doc-updated">
          {t("legal.lastUpdated")}: {doc.updated}
        </p>
        {doc.intro && <p className="legal-doc-intro">{doc.intro}</p>}
      </header>

      <div className="legal-doc-sections">
        {doc.sections.map((section) => (
          <section key={section.heading} className="legal-doc-section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
