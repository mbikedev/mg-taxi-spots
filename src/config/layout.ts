import { useVideoConfig } from "remotion";

export type LayoutMode = "portrait" | "square" | "wide";

export const getLayout = (width: number, height: number) => {
  const ratio = width / height;
  const mode: LayoutMode =
    ratio < 0.9 ? "portrait" : ratio > 1.1 ? "wide" : "square";

  const pick = <T,>(portrait: T, square: T, wide: T): T =>
    mode === "portrait" ? portrait : mode === "square" ? square : wide;

  return {
    mode,
    u: Math.min(width, height) / 1080,
    uiSafeBottom: pick(300, 0, 0),
    stagePaddingBottom: pick(460, 210, 180),
    stagePaddingX: pick(84, 84, 110),
    routeScale: pick(0.82, 0.5, 0.62),
    routePaddingBottom: pick(260, 130, 190),
    hookFontSize: pick(128, 104, 104),
    factFontSize: pick(52, 46, 44),
  };
};

export const useLayout = () => {
  const { width, height } = useVideoConfig();
  return getLayout(width, height);
};
