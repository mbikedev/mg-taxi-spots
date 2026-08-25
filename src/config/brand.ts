/**
 * Tokens de marque mg-taxi.be
 *
 * Palette : bleu pétrole profond (nuit + signalisation routière belge),
 * craie froide, jaune marigold comme unique signal, teal pour l'hybride.
 * Un seul accent vif à la fois — le marigold porte l'attention.
 */
export const brand = {
  color: {
    ink: "#0E2233",
    inkDeep: "#071522",
    inkSoft: "#1B3549",
    chalk: "#EDF1F0",
    chalkDim: "#A8BAC4",
    marigold: "#F5B301",
    teal: "#17BEBB",
  },
  site: "mg-taxi.be",
  phone: "+32 496 93 57 45",
  wordmark: "MG TAXI",
  fps: 30,
  durationInFrames: 450, // 15 s
} as const;

/**
 * Grille publiee sur mg-taxi.be/nl/tarieven. Toute modification du site doit
 * etre repercutee ici, sinon les spots annoncent un prix que tu ne pratiques
 * plus. Nachttoeslag : 22 h - 6 h.
 */
export const tariffs = {
  A: { label: "Standaard", start: 10.0, perKm: 3.0, night: 2.5 },
  B: { label: "+20 km", start: 5.45, perKm: 3.0, night: 2.5 },
  C: { label: "Club / Festival / Event", start: 6.0, perKm: 4.96, night: 4.0 },
} as const;

export type TariffCode = keyof typeof tariffs;

export const copy = {
  nl: {
    phoneLabel: "Bellen",
    kmLabel: "afstand",
    priceUnit: "€",
    ritLabel: "rit",
  },
  fr: {
    phoneLabel: "Appeler",
    kmLabel: "distance",
    priceUnit: "€",
    ritLabel: "trajet",
  },
} as const;

export type Lang = keyof typeof copy;

/** Formatage belge : 145,00 */
export const formatEuro = (value: number): string =>
  value.toFixed(2).replace(".", ",");
