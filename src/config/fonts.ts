import { loadFont as loadDisplay } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadBody } from "@remotion/google-fonts/InterTight";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

/**
 * On ne charge que ce qui est reellement utilise : alphabet latin, et les
 * seules graisses presentes dans les composants. Sans ces options, Remotion
 * telecharge chaque graisse et chaque sous-ensemble d'alphabet -- plus de cent
 * requetes par police, a chaque rendu et pour chacun des 18 fichiers.
 */
const display = loadDisplay("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

const body = loadBody("normal", {
  weights: ["500", "600"],
  subsets: ["latin"],
});

const mono = loadMono("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

export const font = {
  display: `${display.fontFamily}, "Archivo", system-ui, sans-serif`,
  body: `${body.fontFamily}, "Inter", system-ui, sans-serif`,
  mono: `${mono.fontFamily}, "SF Mono", ui-monospace, monospace`,
};
