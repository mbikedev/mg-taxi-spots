import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../config/brand";
import { font } from "../config/fonts";
import type { Spot } from "../config/spots";

/**
 * L'accroche est entierement lisible des l'image 0 : la premiere image sert de
 * vignette sur Instagram et Facebook, elle doit donc etre une composition finie
 * et pas un cadre vide.
 *
 * Le mouvement vient d'ailleurs : un trait marigold qui se tire sous le texte,
 * et une derive verticale tres lente de tout le bloc.
 */
export const HookScene: React.FC<{ spot: Spot }> = ({ spot }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  const vertical = height >= width;

  // Trait qui se tire sous l'accroche, de l'image 4 a l'image 30.
  const rule = interpolate(frame, [4, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Derive lente du bloc entier : le cadre respire sans jamais partir de zero.
  const drift = interpolate(frame, [0, 90], [0, -16 * u], {
    extrapolateRight: "clamp",
  });

  const out = interpolate(frame, [66, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30 * u,
        opacity: out,
        transform: `translateY(${drift}px)`,
        maxWidth: vertical ? "100%" : "70%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 * u }}>
        <span
          style={{
            width: 14 * u,
            height: 14 * u,
            backgroundColor: brand.color.teal,
          }}
        />
        <span
          style={{
            fontFamily: font.mono,
            fontSize: 24 * u,
            letterSpacing: 3 * u,
            textTransform: "uppercase",
            color: brand.color.chalkDim,
          }}
        >
          {spot.kicker}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {spot.hook.map((line, i) => (
          <span
            key={line}
            style={{
              display: "block",
              fontFamily: font.display,
              fontWeight: 800,
              fontSize: (vertical ? 128 : 104) * u,
              lineHeight: 1.02,
              letterSpacing: -3 * u,
              paddingBottom: 6 * u,
              color:
                i === spot.hook.length - 1
                  ? brand.color.marigold
                  : brand.color.chalk,
            }}
          >
            {line}
          </span>
        ))}
      </div>

      <div
        style={{
          height: 6 * u,
          width: `${rule * (vertical ? 46 : 34)}%`,
          backgroundColor: brand.color.marigold,
        }}
      />
    </div>
  );
};
