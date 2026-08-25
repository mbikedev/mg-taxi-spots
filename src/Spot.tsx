import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "./components/Backdrop";
import { MeterStrip } from "./components/MeterStrip";
import { RouteLine } from "./components/RouteLine";
import { HookScene } from "./components/HookScene";
import { FactsScene } from "./components/FactsScene";
import { CtaScene } from "./components/CtaScene";
import { useLayout } from "./config/layout";
import type { Spot as SpotData } from "./config/spots";

const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const L = useLayout();
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "flex-start",
        padding: `0 ${L.stagePaddingX * L.u}px ${L.stagePaddingBottom * L.u}px`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const SpotVideo: React.FC<{ spot: SpotData }> = ({ spot }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const L = useLayout();

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
          justifyContent: "center",
          paddingBottom: L.routePaddingBottom * L.u,
          paddingRight: L.mode === "wide" ? 90 * L.u : 0,
          opacity: routeOpacity,
        }}
      >
        <RouteLine spot={spot} />
      </AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <Stage><HookScene spot={spot} /></Stage>
      </Sequence>
      <Sequence from={240} durationInFrames={105}>
        <Stage><FactsScene spot={spot} /></Stage>
      </Sequence>
      <Sequence from={330}>
        <Stage><CtaScene spot={spot} /></Stage>
      </Sequence>
      <MeterStrip spot={spot} />
    </AbsoluteFill>
  );
};
