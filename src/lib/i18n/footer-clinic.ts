import { useTranslation } from "react-i18next";
import { normalizeLang } from "@/lib/i18n";
import { en } from "@/lib/i18n/en";
import { fr } from "@/lib/i18n/fr";

/** Footer clinic strings — read directly from resources so keys never leak to the UI. */
export function useFooterClinicCopy() {
  const { i18n } = useTranslation();
  const lng = normalizeLang(i18n.resolvedLanguage ?? i18n.language);
  const footer = lng === "fr" ? fr.footer : en.footer;
  const clinic = lng === "fr" ? fr.clinic : en.clinic;
  return {
    heading: footer.clinicHeading,
    hint: footer.clinicHint,
    directions: footer.clinicDirections,
    mapTitle: clinic.mapTitle,
  };
}
