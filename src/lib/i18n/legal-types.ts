export type LegalDocContent = {
  title: string;
  updated: string;
  intro?: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export type LegalTranslations = {
  eyebrow: string;
  lastUpdated: string;
  footerPrivacy: string;
  footerTerms: string;
  footerCookies: string;
  footerLegal: string;
  disclaimer: string;
  cookieBanner: {
    title: string;
    body: string;
    acceptAll: string;
    essentialOnly: string;
    manage: string;
  };
  privacy: LegalDocContent;
  terms: LegalDocContent;
  cookies: LegalDocContent;
};
