export const SITE_URL = "https://samskaranutrition.com";

export const SITE_NAME = "Samskara Nutrition";

export const SITE_DESCRIPTION =
  "Functional nutrition coaching for women across the UK and Europe. Rebuild gut health and wellbeing through real food, with Samantha at Samskara Nutrition.";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
