import rawSpots from "./spots.json";
import { tariffs, type Lang, type TariffCode } from "./brand";

export type Spot = {
  id: string;
  lang: Lang;
  /** 1 à 2 lignes. Chaque entrée est une ligne à l'écran. */
  hook: string[];
  from: string;
  to: string;
  distanceKm: number;
  /** Tarif applique : A standaard, B au-dela de 20 km, C evenementiel. */
  tariff: TariffCode;
  /** Course entre 22 h et 6 h : ajoute la nachttoeslag. */
  night?: boolean;
  /** Force un prix negocie a la place du calcul. Laisser vide sinon. */
  priceOverride?: number;
  priceLabel: string;
  /** Exactement 3 arguments courts. */
  facts: string[];
  ctaLine: string;
  kicker: string;
};

export const spots = rawSpots as Spot[];

/**
 * Le prix affiche par le compteur est derive de la grille du site, pas saisi a
 * la main : un spot ne peut donc pas annoncer un tarif que tu ne pratiques pas.
 * priceOverride sert aux courses a prix convenu d'avance.
 */
export const resolvePrice = (spot: Spot): number => {
  if (typeof spot.priceOverride === "number") return spot.priceOverride;
  const t = tariffs[spot.tariff];
  return t.start + spot.distanceKm * t.perKm + (spot.night ? t.night : 0);
};

export type FormatName = "vertical" | "square" | "wide";

export const formats: Record<
  FormatName,
  { width: number; height: number; label: string }
> = {
  vertical: { width: 1080, height: 1920, label: "Reels / TikTok / Shorts" },
  square: { width: 1080, height: 1080, label: "Feed Instagram / Facebook" },
  wide: { width: 1920, height: 1080, label: "YouTube / site / écran" },
};

export const compositionId = (spotId: string, format: FormatName): string =>
  `${spotId}-${format}`;
