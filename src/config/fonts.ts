import { loadFont as loadDisplay } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadBody } from "@remotion/google-fonts/InterTight";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const display = loadDisplay();
const body = loadBody();
const mono = loadMono();

/**
 * Bricolage Grotesque : display, un peu bancale et mécanique — elle a du
 * caractère sans virer au serif « éditorial » qu'on voit partout.
 * Inter Tight : texte courant, resserré pour tenir en vertical.
 * JetBrains Mono : la bande compteur en bas de cadre (l'élément signature).
 */
export const font = {
  display: `${display.fontFamily}, "Archivo", system-ui, sans-serif`,
  body: `${body.fontFamily}, "Inter", system-ui, sans-serif`,
  mono: `${mono.fontFamily}, "SF Mono", ui-monospace, monospace`,
};
