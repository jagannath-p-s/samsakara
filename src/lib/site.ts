export const SITE_URL = "https://samskaranutrition.com";

export const SITE_NAME = "Samskara Nutrition";

export const SITE_DESCRIPTION =
  "Functional nutrition coaching for women across the UK and Europe. Rebuild gut health and wellbeing through real food, with Samantha at Samskara Nutrition.";

/** Calendly scheduling page — override with VITE_CALENDLY_URL if needed */
export const CALENDLY_URL =
  (import.meta.env.VITE_CALENDLY_URL as string | undefined)?.trim() ||
  "https://calendly.com/samskaranutrition";

/** Inline widget URL with Samskara Calendly theme colours */
export function calendlyBookingUrl(): string {
  const base = CALENDLY_URL.split("?")[0].replace(/\/$/, "");
  return `${base}?background_color=f5eee3&text_color=2a2a2a&primary_color=2f4a3e&hide_gdpr_banner=1`;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
