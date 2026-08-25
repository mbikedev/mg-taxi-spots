import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../config/brand";
import { font } from "../config/fonts";
import { useLayout } from "../config/layout";
import type { Spot } from "../config/spots";

const PATH_LENGTH = 1000;

/** Courbe unique, réutilisée dans tous les spots : viewBox 0 0 100 100. */
const PATH = "M 12 82 C 34 78, 26 44, 50 40 S 74 30, 88 16";

export const RouteLine: React.FC<{ spot: Spot }> = ({ spot }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const L = useLayout();
  const u = L.u;
  const size = Math.min(width, height) * L.routeScale;

  const draw = interpolate(frame, [80, 250], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const pinA = spring({ frame: frame - 74, fps, config: { damping: 14 } });
  const pinB = spring({ frame: frame - 236, fps, config: { damping: 12 } });

  /**
   * La destination s'annonce en sourdine des que le trajet demarre, puis se
   * renforce quand la ligne l'atteint. Sans ca, le spectateur regarde une
   * ligne monter pendant cinq secondes sans savoir vers quoi.
   */
  const destHint = interpolate(frame, [86, 112], [0, 0.42], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const destLock = interpolate(frame, [232, 254], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const destOpacity = Math.max(destHint, destLock);

  const label = (text: string, scale: number, align: "left" | "right") => (
    <span
      style={{
        fontFamily: font.body,
        fontSize: 34 * u,
        fontWeight: 600,
        letterSpacing: 0.5 * u,
        color: brand.color.chalk,
        opacity: scale,
        transform: `translateY(${(1 - scale) * 14 * u}px)`,
        textAlign: align,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: "visible" }}>
        <path
          d={PATH}
          fill="none"
          stroke={brand.color.inkSoft}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
        <path
          d={PATH}
          fill="none"
          stroke={brand.color.marigold}
          strokeWidth={1.8}
          strokeLinecap="round"
          pathLength={PATH_LENGTH}
          strokeDasharray={PATH_LENGTH}
          strokeDashoffset={PATH_LENGTH * (1 - draw)}
        />
        <circle cx={12} cy={82} r={2.4 * pinA} fill={brand.color.teal} />
        <circle
          cx={88}
          cy={16}
          r={2.6}
          fill="none"
          stroke={brand.color.marigold}
          strokeWidth={0.9}
          opacity={destHint * 1.6}
        />
        <circle
          cx={88}
          cy={16}
          r={3 * pinB}
          fill={brand.color.marigold}
          stroke={brand.color.inkDeep}
          strokeWidth={0.8}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: "88%",
          display: "flex",
          flexDirection: "column",
          gap: 4 * u,
        }}
      >
        {label(spot.from, pinA, "left")}
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "2%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {label(spot.to, destOpacity, "right")}
      </div>
    </div>
  );
};
