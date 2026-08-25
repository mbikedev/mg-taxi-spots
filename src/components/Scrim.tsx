import React from "react";
import { AbsoluteFill } from "remotion";
import { brand } from "../config/brand";

export const Scrim: React.FC<{
  side: "left" | "bottom";
  opacity?: number;
}> = ({ side, opacity = 1 }) => {
  const ink = brand.color.inkDeep;
  const gradient =
    side === "left"
      ? `linear-gradient(to right, ${ink}F2 0%, ${ink}D9 38%, ${ink}66 62%, transparent 82%)`
      : `linear-gradient(to top, ${ink}F5 0%, ${ink}CC 28%, transparent 62%)`;

  return <AbsoluteFill style={{ background: gradient, opacity }} />;
};
