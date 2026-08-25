import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "./components/Backdrop";
import { MeterStrip } from "./components/MeterStrip";
import { RouteLine } from "./components/RouteLine";
import { HookScene } from "./components/HookScene";
import { FactsScene } from "./components/FactsScene";
import { CtaScene } from "./components/CtaScene";
import { DriverScene } from "./components/DriverScene";
import { useLayout } from "./config/layout";
import type { Spot as SpotData } from "./config/spots";

const FADE = 14;

const useSegmentOpacity = (from: number, to: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, from + FADE, to - FADE, to], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

const Stage: React.FC<{
  children: React.ReactNode;
  place: "top" | "center" | "bottom";
}> = ({ children, place }) => {
  const L = useLayout();
  const justify = place === "top" ? "flex-start" : place === "bottom" ? "flex-end" : "center";
  return (
    <AbsoluteFill
      style={{
        justifyContent: justify,
        alignItems: "flex-start",
        padding: `${(place === "top" ? L.textTop : 0) * L.u}px ${L.stagePaddingX * L.u}px ${L.stagePaddingBottom * L.u}px`,
      }}
    >
      <div style={{ maxWidth: L.textMaxWidth }}>{children}</div>
    </AbsoluteFill>
  );
};

export const SpotIllustrated: React.FC<{ spot: SpotData }> = ({ spot }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const L = useLayout();

  const openOpacity = useSegmentOpacity(0, 150);
  const interludeOpacity = useSegmentOpacity(140, 280);
  const factsOpacity = useSegmentOpacity(270, 390);
  const ctaOpacity = useSegmentOpacity(375, durationInFrames + FADE);

  const fadeOut = interpolate(frame, [durationInFrames - FADE, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const portraitLike = L.mode !== "wide";

  return (
    <AbsoluteFill style={{ opacity: fadeOut, backgroundColor: "#071522" }}>
      <Backdrop />

      <Sequence from={0} durationInFrames={155}>
        <AbsoluteFill
          style={{
            opacity: openOpacity,
            alignItems: portraitLike ? "center" : "flex-end",
            justifyContent: portraitLike ? "flex-end" : "center",
            paddingBottom: L.illuBottom * L.u,
            paddingRight: portraitLike ? 0 : 70 * L.u,
          }}
        >
          <DriverScene />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={0} durationInFrames={150}>
        <AbsoluteFill style={{ opacity: openOpacity }}>
          <Stage place={portraitLike ? "top" : "center"}>
            <HookScene spot={spot} />
          </Stage>
        </AbsoluteFill>
      </Sequence>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: L.routePaddingBottom * L.u,
          opacity: interludeOpacity,
        }}
      >
        <RouteLine spot={spot} />
      </AbsoluteFill>

      <Sequence from={270} durationInFrames={120}>
        <AbsoluteFill style={{ opacity: factsOpacity }}>
          <Stage place="center"><FactsScene spot={spot} /></Stage>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={375}>
        <AbsoluteFill style={{ opacity: ctaOpacity }}>
          <Stage place="center"><CtaScene spot={spot} /></Stage>
        </AbsoluteFill>
      </Sequence>

      <MeterStrip spot={spot} />
    </AbsoluteFill>
  );
};
