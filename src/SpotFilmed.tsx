import React from "react";
import {
  AbsoluteFill, Freeze, OffthreadVideo, Sequence,
  interpolate, useCurrentFrame, useVideoConfig,
} from "remotion";
import { Backdrop } from "./components/Backdrop";
import { MeterStrip } from "./components/MeterStrip";
import { RouteLine } from "./components/RouteLine";
import { HookScene } from "./components/HookScene";
import { FactsScene } from "./components/FactsScene";
import { CtaScene } from "./components/CtaScene";
import { Scrim } from "./components/Scrim";
import { footage } from "./config/footage";
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
  align: "left" | "bottom";
}> = ({ children, align }) => {
  const L = useLayout();
  return (
    <AbsoluteFill
      style={{
        justifyContent: align === "bottom" ? "flex-end" : "center",
        alignItems: "flex-start",
        padding: `0 ${L.stagePaddingX * L.u}px ${L.stagePaddingBottom * L.u}px`,
      }}
    >
      <div style={{ maxWidth: align === "left" ? "62%" : "100%" }}>{children}</div>
    </AbsoluteFill>
  );
};

const StandingShot: React.FC<{ freeze?: boolean }> = ({ freeze }) => {
  const video = (
    <OffthreadVideo
      src={footage.standing.src}
      startFrom={footage.standing.startFrom}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
  return freeze ? <Freeze frame={0}>{video}</Freeze> : video;
};

export const SpotFilmed: React.FC<{ spot: SpotData }> = ({ spot }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const L = useLayout();

  const standingOpacity = useSegmentOpacity(0, 150);
  const interludeOpacity = useSegmentOpacity(140, 280);
  const seatedOpacity = useSegmentOpacity(270, 390);
  const ctaOpacity = useSegmentOpacity(375, durationInFrames + FADE);

  const fadeOut = interpolate(
    frame,
    [durationInFrames - FADE, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: fadeOut, backgroundColor: "#071522" }}>
      <Backdrop />

      <Sequence from={0} durationInFrames={155}>
        <AbsoluteFill style={{ opacity: standingOpacity }}>
          <StandingShot />
          <Scrim side="left" />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={0} durationInFrames={150}>
        <AbsoluteFill style={{ opacity: standingOpacity }}>
          <Stage align="left"><HookScene spot={spot} /></Stage>
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

      <Sequence from={270} durationInFrames={125}>
        <AbsoluteFill style={{ opacity: seatedOpacity }}>
          <OffthreadVideo
            src={footage.seated.src}
            startFrom={footage.seated.startFrom}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Scrim side="bottom" />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={270} durationInFrames={120}>
        <AbsoluteFill style={{ opacity: seatedOpacity }}>
          <Stage align="bottom"><FactsScene spot={spot} /></Stage>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={375}>
        <AbsoluteFill style={{ opacity: ctaOpacity }}>
          <StandingShot freeze />
          <Scrim side="left" opacity={0.95} />
          <Stage align="left"><CtaScene spot={spot} /></Stage>
        </AbsoluteFill>
      </Sequence>

      <MeterStrip spot={spot} />
    </AbsoluteFill>
  );
};
