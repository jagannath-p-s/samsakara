import { useTranslation } from "react-i18next";
import { normalizeLang, setLang, type Lang } from "@/lib/i18n";
import { tap } from "@/lib/haptics";

type Props = {
  /** Use on dark backgrounds (mobile menu footer) */
  onDark?: boolean;
  compact?: boolean;
};

export function LangToggle({ onDark = false, compact = false }: Props) {
  const { i18n } = useTranslation();
  const active = normalizeLang(i18n.resolvedLanguage ?? i18n.language);

  const pick = (next: Lang) => {
    if (next === active) return;
    void setLang(next);
    tap(6);
  };

  return (
    <div
      className={
        "lang-pill" +
        (onDark ? " is-dark" : "") +
        (compact ? " is-compact" : "")
      }
      role="group"
      aria-label="Language"
    >
      <span className="lang-pill-thumb" data-pos={active} aria-hidden />
      {(["en", "fr"] as const).map((code) => (
        <button
          key={code}
          type="button"
          className={"lang-pill-opt" + (active === code ? " is-active" : "")}
          aria-pressed={active === code}
          onClick={() => pick(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
