import { BrandMark } from "./BrandMark";

type Props = {
  /** Horizontal for header; stacked for footer / hero lockups */
  layout?: "horizontal" | "stacked";
  markSize?: number;
  tone?: "light" | "dark";
  /** Icon colour on dark backgrounds — defaults to cream */
  markTone?: "forest" | "cream" | "gold";
  align?: "center" | "start";
  className?: string;
};

/**
 * Samskara Nutrition wordmark — House-style typography:
 * large serif “Samskara” with tracked “Nutrition” beneath in terracotta/gold.
 */
export function BrandWordmark({
  layout = "horizontal",
  markSize = 44,
  tone = "light",
  markTone,
  align = "center",
  className = "",
}: Props) {
  const iconTone =
    markTone ?? (tone === "dark" ? "cream" : "forest");
  const titleClass =
    tone === "dark"
      ? "font-serif text-[color:var(--color-cream)]"
      : "font-serif text-[color:var(--color-forest)]";
  const subtitleClass =
    tone === "dark"
      ? "text-[0.58rem] uppercase tracking-[0.34em] text-[color:var(--color-gold)]"
      : "text-[0.58rem] uppercase tracking-[0.34em] text-[color:var(--color-terracotta)]";
  const alignClass = align === "start" ? "items-start text-left" : "items-center text-center";

  if (layout === "stacked") {
    return (
      <div className={`flex flex-col ${alignClass} ${className}`}>
        <BrandMark size={markSize} tone={iconTone} />
        <span className={`mt-3 text-2xl leading-none md:text-3xl ${titleClass}`}>Samskara</span>
        <span className={`mt-2 ${subtitleClass}`}>Nutrition</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <BrandMark size={markSize} tone={iconTone} className="shrink-0" />
      <span className="flex flex-col leading-tight">
        <span className={`text-xl md:text-2xl ${titleClass}`}>Samskara</span>
        <span className={subtitleClass}>Nutrition</span>
      </span>
    </div>
  );
}
