import React from "react";
import { Composition } from "remotion";
import { SpotVideo } from "./Spot";
import { brand } from "./config/brand";
import { compositionId, formats, spots, type FormatName } from "./config/spots";

/**
 * Chaque spot du JSON est décliné dans les trois formats.
 * 4 spots x 3 formats = 12 compositions, sans dupliquer une ligne de code.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {spots.map((spot) =>
        (Object.keys(formats) as FormatName[]).map((name) => {
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
    </>
  );
};
