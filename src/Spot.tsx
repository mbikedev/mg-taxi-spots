import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "./components/Backdrop";
import { MeterStrip } from "./components/MeterStrip";
import { RouteLine } from "./components/RouteLine";
import { HookScene } from "./components/HookScene";
import { FactsScene } from "./components/FactsScene";
import { CtaScene } from "./components/CtaScene";
import type { Spot as SpotData } from "./config/spots";

/** Zone de texte commune : meme marge et meme alignement pour chaque scene. */
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { width, height } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  const vertical = height >= width;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "flex-start",
        padding: `0 ${(vertical ? 84 : 110) * u}px ${(vertical ? 460 : 180) * u}px`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/**
 * Decoupage (30 fps, 450 images) :
 *   0-90    accroche
 *   75-260  trace du trajet + montee du compteur
 *   240-345 trois arguments
 *   330-450 marque et contact
 * Les chevauchements assurent les fondus enchaines.
 */
export const SpotVideo: React.FC<{ spot: SpotData }> = ({ spot }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  const vertical = height >= width;

  const routeOpacity = interpolate(frame, [70, 96, 236, 262], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: fadeOut, backgroundColor: "#071522" }}>
      <Backdrop />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: vertical ? "center" : "flex-end",
          paddingBottom: vertical ? 260 * u : 190 * u,
          paddingRight: vertical ? 0 : 90 * u,
          opacity: routeOpacity,
        }}
      >
        <RouteLine spot={spot} />
      </AbsoluteFill>

      <Sequence from={0} durationInFrames={90}>
        <Stage>
          <HookScene spot={spot} />
        </Stage>
      </Sequence>

      <Sequence from={240} durationInFrames={105}>
        <Stage>
          <FactsScene spot={spot} />
        </Stage>
      </Sequence>

      <Sequence from={330}>
        <Stage>
          <CtaScene spot={spot} />
        </Stage>
      </Sequence>

      <MeterStrip spot={spot} />
    </AbsoluteFill>
  );
};
