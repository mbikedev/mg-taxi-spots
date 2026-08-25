import React from "react";
import { Composition } from "remotion";
import { SpotVideo } from "./Spot";
import { SpotFilmed } from "./SpotFilmed";
import { SpotIllustrated } from "./SpotIllustrated";
import { brand } from "./config/brand";
import { compositionId, formats, spots, type FormatName } from "./config/spots";

export const RemotionRoot: React.FC = () => {
  const graphicFormats = Object.keys(formats) as FormatName[];
  const filmedFormats: FormatName[] = ["vertical", "square"];

  return (
    <>
      {spots.map((spot) =>
        graphicFormats.map((name) => {
          const { width, height } = formats[name];
          return (
            <Composition
              key={compositionId(spot.id, name)}
              id={compositionId(spot.id, name)}
              component={SpotVideo}
              durationInFrames={brand.durationInFrames}
              fps={brand.fps}
              width={width}
              height={height}
              defaultProps={{ spot }}
            />
          );
        })
      )}
      {spots.map((spot) =>
        filmedFormats.map((name) => {
          const { width, height } = formats[name];
          return (
            <Composition
              key={`${spot.id}-film-${name}`}
              id={`${spot.id}-film-${name}`}
              component={SpotFilmed}
              durationInFrames={brand.durationInFrames}
              fps={brand.fps}
              width={width}
              height={height}
              defaultProps={{ spot }}
            />
          );
        })
      )}
      {spots.map((spot) =>
        graphicFormats.map((name) => {
          const { width, height } = formats[name];
          return (
            <Composition
              key={`${spot.id}-illu-${name}`}
              id={`${spot.id}-illu-${name}`}
              component={SpotIllustrated}
              durationInFrames={brand.durationInFrames}
              fps={brand.fps}
              width={width}
              height={height}
              defaultProps={{ spot }}
            />
          );
        })
      )}
    </>
  );
};
