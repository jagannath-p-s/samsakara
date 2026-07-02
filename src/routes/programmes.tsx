import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CalendlyEmbed } from "@/components/site/CalendlyEmbed";
import { BlurImage } from "@/components/site/BlurImage";
import {
  DiscoverySection,
  ProgrammeDetailSection,
  ProgrammeOverview,
} from "@/components/site/ProgrammeDetail";
import { SiteLayout } from "@/components/site/Layout";
import { useReveal } from "@/hooks/useReveal";
import type { ProgrammesPageContent } from "@/lib/i18n/programmes-types";
import { photos } from "@/lib/photos";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/programmes")({
  head: () => ({
    meta: [
      { title: "Work With Me | Samskara Nutrition" },
      {
        name: "description",
        content: "Artha, Setu and Samskara nutrition programmes with Samantha. Book a complimentary discovery call.",
      },
      { property: "og:title", content: "Programmes | Samskara Nutrition" },
      { property: "og:image", content: absoluteUrl(photos.approachHero.src) },
      { property: "og:url", content: absoluteUrl("/programmes") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/programmes") }],
  }),
  component: ProgrammesPage,
});

function ProgrammesPage() {
  const { t } = useTranslation();
  const p = t("programmesPage", { returnObjects: true }) as ProgrammesPageContent;
  const heroRef = useReveal<HTMLDivElement>();

  return (
    <SiteLayout>
      <section className="programme-hero bg-background">
        <div
          ref={heroRef}
          className="reveal mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-16"
        >
          <div className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left">
            <p className="eyebrow">{p.eyebrow}</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-[color:var(--color-forest)] sm:text-5xl md:text-6xl">
              {p.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink)] lg:mx-0">
              {p.intro}
            </p>
          </div>
          <figure className="order-1 lg:order-2 lg:col-span-5">
            <div className="page-photo-frame page-photo-frame--landscape">
              <BlurImage
                src={photos.approachHero.src}
                alt="Samantha during a nutrition consultation"
                width={1600}
                height={1280}
                loading="eager"
                fetchPriority="high"
                instant
                objectPosition={photos.approachHero.objectPosition}
              />
            </div>
          </figure>
        </div>
      </section>

      <ProgrammeOverview items={p.items} labels={p.labels} />

      <section className="programme-detail-stack">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
          {p.items.map((item, i) => (
            <ProgrammeDetailSection
              key={item.id}
              programme={item}
              labels={p.labels}
              featured={i === p.items.length - 1}
            />
          ))}
        </div>
      </section>

      <DiscoverySection discovery={p.discovery} />

      <section id="book" className="programme-booking scroll-mt-24 bg-background">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
          <h2 className="text-center font-serif text-3xl text-[color:var(--color-forest)]">
            {p.discovery.bookingTitle}
          </h2>
          <div className="mt-8">
            <CalendlyEmbed />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
