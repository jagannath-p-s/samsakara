export type CookieConsentLevel = "essential" | "all";

const STORAGE_KEY = "samskara.cookie-consent";

export function readCookieConsent(): CookieConsentLevel | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "essential" || value === "all") return value;
  } catch {
    /* ignore */
  }
  return null;
}

export function writeCookieConsent(level: CookieConsentLevel): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, level);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("samskara:cookie-consent", { detail: level }));
}

/** Third-party embeds (e.g. Calendly) require explicit consent beyond essential cookies. */
export function allowsFunctionalCookies(level: CookieConsentLevel | null): boolean {
  return level === "all";
}
