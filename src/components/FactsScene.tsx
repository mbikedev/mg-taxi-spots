import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../config/brand";
import { font } from "../config/fonts";
import type { Spot } from "../config/spots";

/**
 * Pas de numérotation 01/02/03 : ces trois points ne forment pas une séquence,
 * juste trois raisons. Un carré teal sert de marqueur, rien de plus.
 */
export const FactsScene: React.FC<{ spot: Spot }> = ({ spot }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  const vertical = height >= width;

  const out = interpolate(frame, [86, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 34 * u,
        opacity: out,
        maxWidth: vertical ? "100%" : "62%",
      }}
    >
      {spot.facts.slice(0, 3).map((fact, i) => {
        const enter = spring({
          frame: frame - i * 10,
          fps,
          config: { damping: 18, mass: 0.8 },
        });
        return (
          <div
            key={fact}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 22 * u,
              opacity: enter,
              transform: `translateX(${(1 - enter) * -34 * u}px)`,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 16 * u,
                height: 16 * u,
                backgroundColor: brand.color.teal,
                transform: "translateY(-4px)",
              }}
            />
            <span
              style={{
                fontFamily: font.body,
                fontWeight: 500,
                fontSize: (vertical ? 52 : 44) * u,
                lineHeight: 1.24,
                color: brand.color.chalk,
              }}
            >
              {fact}
            </span>
          </div>
        );
      })}
    </div>
  );
};
