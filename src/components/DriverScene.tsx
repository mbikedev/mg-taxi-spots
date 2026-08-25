import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../config/brand";
import { font } from "../config/fonts";
import { useLayout } from "../config/layout";

const ignition = (f: number): number => {
  if (f < 30) return 0;
  if (f < 33) return 1;
  if (f < 37) return 0.12;
  if (f < 39) return 0.92;
  if (f < 43) return 0.28;
  return 1;
};

export const DriverScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  const width = 600 * L.u * L.illuScale;

  const enter = spring({ frame: frame - 2, fps, config: { damping: 15, mass: 1.2 } });
  const rise = interpolate(enter, [0, 1], [58, 0]);

  const settled = interpolate(frame, [43, 66], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const breathe = 0.9 + 0.1 * Math.sin((frame - 66) / 17);
  const lit = ignition(frame) * (frame > 66 ? breathe : 1);

  const ink = brand.color.inkDeep;
  const shell = brand.color.inkSoft;
  const edge = brand.color.chalkDim;
  const gold = brand.color.marigold;

  const FRONT = "90,150 360,118 360,262 90,294";
  const SIDE = "360,118 468,150 468,268 360,262";
  const TOP = "90,150 360,118 468,150 198,182";

  return (
    <svg viewBox="0 0 600 420" width={width} style={{ overflow: "visible" }} role="img" aria-label="Lumineux de taxi">
      <defs>
        <radialGradient id="halo">
          <stop offset="0%" stopColor={gold} stopOpacity={0.5} />
          <stop offset="55%" stopColor={gold} stopOpacity={0.12} />
          <stop offset="100%" stopColor={gold} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD35C" />
          <stop offset="100%" stopColor={gold} />
        </linearGradient>
      </defs>

      <g transform={`translate(0, ${rise})`} opacity={enter}>
        <ellipse cx={278} cy={200} rx={330} ry={230} fill="url(#halo)" opacity={lit} />

        <path d="M 20 372 C 150 330 430 322 580 358" fill="none" stroke={shell} strokeWidth={7} strokeLinecap="round" />
        <ellipse cx={276} cy={346} rx={172} ry={18} fill={gold} opacity={0.22 * lit} />

        <path d="M 150 288 L 168 340 L 196 336 L 182 282 Z" fill={shell} stroke={edge} strokeWidth={2} />
        <path d="M 318 268 L 330 330 L 358 326 L 344 264 Z" fill={shell} stroke={edge} strokeWidth={2} />

        <polygon points={TOP} fill={shell} stroke={edge} strokeWidth={2.5} strokeLinejoin="round" />
        <polygon points={SIDE} fill={ink} stroke={edge} strokeWidth={2.5} strokeLinejoin="round" />
        <polygon points={SIDE} fill={gold} opacity={0.3 * lit} />

        <polygon points={FRONT} fill={shell} stroke={edge} strokeWidth={3} strokeLinejoin="round" />
        <polygon points={FRONT} fill="url(#panel)" opacity={lit} />
        <polygon points={FRONT} fill="none" stroke={gold} strokeWidth={3} opacity={lit}
          style={{ filter: `drop-shadow(0 0 ${26 * lit}px ${gold})` }} />

        <g transform="rotate(-6.8 225 206)">
          <text x={225} y={222} textAnchor="middle" fontFamily={font.display} fontWeight={800}
            fontSize={78} letterSpacing={2} fill={lit > 0.4 ? ink : edge} opacity={lit > 0.4 ? 1 : 0.45}>
            TAXI
          </text>
        </g>

        <path d="M 90 294 L 360 262" stroke="#FFE9A8" strokeWidth={2} opacity={0.8 * settled * lit} />
      </g>
    </svg>
  );
};
