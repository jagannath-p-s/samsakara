import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { readCookieConsent, writeCookieConsent } from "@/lib/cookie-consent";

export function CookieConsent() {
  const { t } = useTranslation();
  const banner = t("legal.cookieBanner", { returnObjects: true }) as {
    title: string;
    body: string;
    acceptAll: string;
    essentialOnly: string;
    manage: string;
  };
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readCookieConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (level: "essential" | "all") => {
    writeCookieConsent(level);
    setVisible(false);
  };

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" aria-live="polite">
      <div className="cookie-banner-inner">
        <div className="cookie-banner-copy">
          <p id="cookie-banner-title" className="cookie-banner-title">
            {banner.title}
          </p>
          <p className="cookie-banner-body">{banner.body}</p>
        </div>
        <div className="cookie-banner-actions">
          <button type="button" className="cookie-banner-btn is-primary" onClick={() => choose("all")}>
            {banner.acceptAll}
          </button>
          <button type="button" className="cookie-banner-btn" onClick={() => choose("essential")}>
            {banner.essentialOnly}
          </button>
          <Link to="/cookies" className="cookie-banner-link" onClick={() => setVisible(false)}>
            {banner.manage}
          </Link>
        </div>
      </div>
    </div>
  );
}
