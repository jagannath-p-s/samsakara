import { useTranslation } from "react-i18next";
import { writeCookieConsent, readCookieConsent } from "@/lib/cookie-consent";
import { useState, useEffect } from "react";

export function CookiePreferences() {
  const { t } = useTranslation();
  const labels = t("legal.cookieBanner", { returnObjects: true }) as {
    acceptAll: string;
    essentialOnly: string;
  };
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    setCurrent(readCookieConsent());
  }, []);

  const choose = (level: "essential" | "all") => {
    writeCookieConsent(level);
    setCurrent(level);
  };

  return (
    <div className="cookie-preferences">
      <p className="cookie-preferences-status">
        {current
          ? t("legal.cookieBanner.manage") + `: ${current === "all" ? labels.acceptAll : labels.essentialOnly}`
          : t("legal.cookieBanner.title")}
      </p>
      <div className="cookie-preferences-actions">
        <button type="button" className="cookie-banner-btn is-primary" onClick={() => choose("all")}>
          {labels.acceptAll}
        </button>
        <button type="button" className="cookie-banner-btn" onClick={() => choose("essential")}>
          {labels.essentialOnly}
        </button>
      </div>
    </div>
  );
}
