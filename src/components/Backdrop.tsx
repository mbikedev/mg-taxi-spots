import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../config/brand";

/**
 * Fond de tous les spots : bleu pétrole, une trame de rues très discrète,
 * et un halo marigold qui dérive lentement — l'éclairage d'un lampadaire
 * qui passe sur le pare-brise. Rien d'autre : le reste doit rester calme.
 */
export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  const glowX = interpolate(frame, [0, durationInFrames], [0.15, 0.85]) * width;
  const glowY = interpolate(frame, [0, durationInFrames], [0.7, 0.25]) * height;
  const cell = Math.min(width, height) / 12;

  return (
    <AbsoluteFill style={{ backgroundColor: brand.color.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, ${brand.color.inkSoft} 0%, ${brand.color.ink} 45%, ${brand.color.inkDeep} 100%)`,
        }}
      />
      <svg width={width} height={height} style={{ position: "absolute", opacity: 0.16 }}>
        <defs>
          <pattern id="streets" width={cell} height={cell} patternUnits="userSpaceOnUse">
            <path
              d={`M ${cell} 0 L 0 0 0 ${cell}`}
              fill="none"
              stroke={brand.color.chalkDim}
              strokeWidth={1}
            />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#streets)" />
      </svg>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${glowX}px ${glowY}px, ${brand.color.marigold}22 0%, transparent 38%)`,
        }}
      />
    </AbsoluteFill>
  );
};
