import { BrandMark } from "@/components/site/BrandMark";

export type ProgrammeIconVariant = "signature" | "clarity" | "bridge";

type Props = {
  variant: ProgrammeIconVariant;
  size?: number;
  className?: string;
};

/** Brand-aligned programme marks — not generic Lucide stock icons */
export function ProgrammeIcon({ variant, size = 20, className = "" }: Props) {
  if (variant === "signature") {
    return <BrandMark size={size} tone="forest" className={className} />;
  }

  const svgProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": true as const,
  };

  if (variant === "clarity") {
    return (
      <svg {...svgProps}>
        <path
          d="M12 20.5c0-6.5-3.5-10-6.5-13.5C8.5 8 11 6.5 12 4.5c1 2 3.5 3.5 6.5 2.5-3 3.5-6.5 7-6.5 13.5Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M12 20.5V11"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...svgProps}>
      <path
        d="M4 16.5h16"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M7 16.5V11a5 5 0 0 1 10 0v5.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 13h6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const PROGRAMME_ICON_ORDER: ProgrammeIconVariant[] = ["signature", "clarity", "bridge"];
