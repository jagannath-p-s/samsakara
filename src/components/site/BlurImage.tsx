import { useState, useEffect, type ImgHTMLAttributes } from "react";

type Props = {
  src: string;
  /** Optional tiny low-res preview. Only used when distinct from `src`. */
  placeholder?: string;
  alt: string;
  className?: string;
  /** Skip load fade — use for hero / above-the-fold images */
  instant?: boolean;
  objectPosition?: string;
  fit?: "cover" | "contain";
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "placeholder" | "className">;

/** Image with optional gentle fade-in when a placeholder is used. */
export function BlurImage({
  src,
  placeholder,
  alt,
  className = "",
  instant = false,
  objectPosition,
  fit = "cover",
  style,
  ...rest
}: Props) {
  const [loaded, setLoaded] = useState(instant);
  const usePh = placeholder && placeholder !== src;
  const imgStyle = {
    objectPosition,
    objectFit: fit,
    ...style,
  };

  useEffect(() => {
    setLoaded(instant);
  }, [src, instant]);

  return (
    <span className={"blur-img-wrap" + (instant ? " is-instant" : "") + (className ? " " + className : "")}>
      {usePh && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className="blur-img-ph"
          loading="eager"
        />
      )}
      <img
        {...rest}
        src={src}
        alt={alt}
        loading={rest.loading ?? "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(node) => {
          if (node?.complete && node.naturalWidth > 0) setLoaded(true);
        }}
        style={imgStyle}
        className={"blur-img-full" + (loaded || instant ? " is-loaded" : "")}
      />
    </span>
  );
}
