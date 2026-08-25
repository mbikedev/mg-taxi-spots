import { staticFile } from "remotion";

export const footage = {
  standing: {
    src: staticFile("plan-b.mp4"),
    startFrom: 90,
    subjectSide: "right" as const,
  },
  seated: {
    src: staticFile("plan-a.mp4"),
    startFrom: 60,
    subjectSide: "center" as const,
  },
};
