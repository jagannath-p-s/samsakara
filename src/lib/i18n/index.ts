import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { en } from "./en";
import { fr } from "./fr";

export const SUPPORTED = ["en", "fr"] as const;
export type Lang = (typeof SUPPORTED)[number];

const STORAGE_KEY = "samskara.lang";

export function normalizeLang(lng: string | undefined | null): Lang {
  return (lng ?? "en").startsWith("fr") ? "fr" : "en";
}

const storageDetector = {
  name: "samskaraStorage",
  lookup(): string | undefined {
    if (typeof window === "undefined") return undefined;
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      if (value === "en" || value === "fr") return value;
    } catch {
      /* ignore */
    }
    return undefined;
  },
  cacheUserLanguage(lng: string) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, normalizeLang(lng));
    } catch {
      /* ignore */
    }
  },
};

const detector = new LanguageDetector();
detector.addDetector(storageDetector);

if (!i18n.isInitialized) {
  i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        fr: { translation: fr },
      },
      fallbackLng: "en",
      supportedLngs: [...SUPPORTED],
      nonExplicitSupportedLngs: true,
      load: "languageOnly",
      detection: {
        order: ["querystring", "samskaraStorage"],
        lookupQuerystring: "lang",
        caches: ["samskaraStorage"],
      },
      interpolation: { escapeValue: false },
      returnObjects: true,
      react: {
        useSuspense: false,
        bindI18n: "languageChanged loaded",
        bindI18nStore: "added removed",
      },
    });

  i18n.on("languageChanged", (lng) => {
    const next = normalizeLang(lng);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next === "fr" ? "fr-FR" : "en-GB";
    }
  });
}

export async function setLang(lng: Lang): Promise<void> {
  const next = normalizeLang(lng);
  if (normalizeLang(i18n.resolvedLanguage ?? i18n.language) === next) return;
  await i18n.changeLanguage(next);
}

export async function toggleLang(): Promise<Lang> {
  const current = normalizeLang(i18n.resolvedLanguage ?? i18n.language);
  const next: Lang = current === "en" ? "fr" : "en";
  await setLang(next);
  return next;
}

export default i18n;
