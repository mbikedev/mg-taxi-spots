import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, copy } from "../config/brand";
import { font } from "../config/fonts";
import type { Spot } from "../config/spots";

export const CtaScene: React.FC<{ spot: Spot }> = ({ spot }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  const vertical = height >= width;
  const t = copy[spot.lang];

  const mark = spring({ frame, fps, config: { damping: 15 } });
  const url = spring({ frame: frame - 10, fps, config: { damping: 18 } });
  const tel = spring({ frame: frame - 20, fps, config: { damping: 18 } });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 * u, alignItems: "flex-start" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18 * u,
          opacity: mark,
          transform: `scale(${0.94 + mark * 0.06})`,
          transformOrigin: "left center",
        }}
      >
        <span
          style={{
            backgroundColor: brand.color.marigold,
            color: brand.color.inkDeep,
            fontFamily: font.display,
            fontWeight: 800,
            fontSize: (vertical ? 62 : 52) * u,
            letterSpacing: 1 * u,
            padding: `${8 * u}px ${22 * u}px ${12 * u}px`,
          }}
        >
          {brand.wordmark}
        </span>
      </div>

      <span
        style={{
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: (vertical ? 104 : 88) * u,
          letterSpacing: -2 * u,
          lineHeight: 1.0,
          color: brand.color.chalk,
          opacity: url,
          transform: `translateY(${(1 - url) * 18 * u}px)`,
        }}
      >
        {brand.site}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16 * u,
          opacity: tel,
          transform: `translateY(${(1 - tel) * 14 * u}px)`,
        }}
      >
        <span
          style={{
            fontFamily: font.mono,
            fontSize: 24 * u,
            letterSpacing: 3 * u,
            textTransform: "uppercase",
            color: brand.color.teal,
          }}
        >
          {spot.ctaLine}
        </span>
        <span style={{ color: brand.color.inkSoft, fontSize: 28 * u }}>/</span>
        <span
          style={{
            fontFamily: font.mono,
            fontSize: 34 * u,
            fontWeight: 600,
            color: brand.color.chalk,
          }}
        >
          {t.phoneLabel} {brand.phone}
        </span>
      </div>
    </div>
  );
};
