import { useEffect, useState } from "react";
import {
  allowsFunctionalCookies,
  readCookieConsent,
  type CookieConsentLevel,
} from "@/lib/cookie-consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsentLevel | null>(() =>
    typeof window === "undefined" ? null : readCookieConsent(),
  );

  useEffect(() => {
    const sync = () => setConsent(readCookieConsent());
    sync();
    window.addEventListener("samskara:cookie-consent", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("samskara:cookie-consent", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return {
    consent,
    functionalAllowed: allowsFunctionalCookies(consent),
  };
}
