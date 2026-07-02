export type ProgrammeIconVariant = "signature" | "clarity" | "bridge";

export type ProgrammeIconTone = "forest" | "terracotta" | "cream" | "gold";

export type ProgrammeIconContext = "overview" | "detail" | "home";

type Props = {
  variant: ProgrammeIconVariant;
  tone?: ProgrammeIconTone;
  context?: ProgrammeIconContext;
  onDark?: boolean;
  className?: string;
};

const ICON_SRC: Record<ProgrammeIconVariant, string> = {
  clarity: "/images/icons/artha-lotus.png",
  bridge: "/images/icons/setu-bridge.png",
  signature: "/images/icon-base.png",
};

const TONE_COLOR: Record<ProgrammeIconTone, string> = {
  forest: "var(--color-forest)",
  terracotta: "var(--color-terracotta)",
  cream: "var(--color-cream)",
  gold: "var(--color-gold)",
};

export function programmeIconTone(_onDark: boolean, _variant: ProgrammeIconVariant): ProgrammeIconTone {
  return "forest";
}

/** Outlined lotus / bridge / brand mark — sized via parent `.programme-icon-well` */
export function ProgrammeIcon({
  variant,
  tone,
  context = "overview",
  onDark = false,
  className = "",
}: Props) {
  const resolvedTone = tone ?? programmeIconTone(onDark, variant);
  const src = ICON_SRC[variant];

  return (
    <span
      className={
        "programme-icon-well" +
        ` programme-icon-well--${context}` +
        (onDark ? " is-on-dark" : "") +
        (className ? " " + className : "")
      }
      data-variant={variant}
    >
      <span
        aria-hidden="true"
        className="programme-glyph"
        style={{
          backgroundColor: TONE_COLOR[resolvedTone],
          WebkitMaskImage: `url(${src})`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskImage: `url(${src})`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
      />
    </span>
  );
}

export const PROGRAMME_ICON_ORDER: ProgrammeIconVariant[] = ["clarity", "bridge", "signature"];
