import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { brand, copy, formatEuro } from "../config/brand";
import { font } from "../config/fonts";
import { resolvePrice, type Spot } from "../config/spots";

/**
 * L'element signature : une bande de compteur qui traverse tout le spot.
 *
 * Avant que le trajet se dessine, elle affiche le trajet en toutes lettres --
 * un compteur a 0,00 EUR sur l'image de vignette laisserait croire a une course
 * gratuite. Ensuite les kilometres et le prix montent, puis se figent : la
 * promesse du prix arrete d'avance, jouee par l'interface.
 */
export const MeterStrip: React.FC<{ spot: Spot }> = ({ spot }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  const t = copy[spot.lang];

  /**
   * Zone reservee a l'interface de la plateforme. En 9:16, Reels et TikTok
   * recouvrent le bas du cadre avec la legende et les boutons : la bande doit
   * remonter, sinon l'argument du prix fixe disparait sous l'UI.
   */
  const uiSafeBottom = height > width ? 300 * u : 0;

  const progress = interpolate(frame, [80, 250], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Bascule entre l'intitule du trajet et les chiffres.
  const dataIn = interpolate(frame, [64, 84], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const km = spot.distanceKm * progress;
  const price = resolvePrice(spot) * progress;
  const locked = progress >= 1;

  const lockGlow = interpolate(frame, [250, 268], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const label: React.CSSProperties = {
    fontSize: 20 * u,
    letterSpacing: 3 * u,
    textTransform: "uppercase",
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: uiSafeBottom,
        height: 150 * u,
        padding: `0 ${56 * u}px ${44 * u}px`,
        borderTop: `${2 * u}px solid ${brand.color.inkSoft}`,
        background: `linear-gradient(to top, ${brand.color.inkDeep}EE, transparent)`,
        fontFamily: font.mono,
      }}
    >
      {/* Etat de depart : le trajet annonce, sans chiffre. */}
      <div
        style={{
          position: "absolute",
          left: 56 * u,
          right: 56 * u,
          bottom: 44 * u,
          display: "flex",
          alignItems: "center",
          gap: 18 * u,
          opacity: 1 - dataIn,
        }}
      >
        <span style={{ ...label, color: brand.color.chalk, fontSize: 30 * u }}>
          {spot.from}
        </span>
        <span style={{ color: brand.color.marigold, fontSize: 30 * u }}>&#8594;</span>
        <span style={{ ...label, color: brand.color.chalk, fontSize: 30 * u }}>
          {spot.to}
        </span>
      </div>

      {/* Etat compteur : distance et prix qui montent puis se figent. */}
      <div
        style={{
          position: "absolute",
          left: 56 * u,
          right: 56 * u,
          bottom: 44 * u,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24 * u,
          opacity: dataIn,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 * u }}>
          <span style={{ ...label, color: brand.color.chalkDim }}>{t.kmLabel}</span>
          <span style={{ color: brand.color.chalk, fontSize: 40 * u, fontWeight: 600 }}>
            {km.toFixed(1).replace(".", ",")} km
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6 * u,
          }}
        >
          <span
            style={{
              ...label,
              color: locked ? brand.color.marigold : brand.color.chalkDim,
            }}
          >
            {spot.priceLabel}
          </span>
          <span
            style={{
              color: brand.color.marigold,
              fontSize: 56 * u,
              fontWeight: 700,
              textShadow: `0 0 ${26 * u * lockGlow}px ${brand.color.marigold}66`,
            }}
          >
            {t.priceUnit} {formatEuro(price)}
          </span>
        </div>
      </div>
    </div>
  );
};
