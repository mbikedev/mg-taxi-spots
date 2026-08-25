# mg-taxi.be — spots vidéo en série

Projet Remotion : les spots sont écrits en React, rendus en MP4 en local.
Le contenu vit dans un seul fichier JSON, le code s'occupe du reste.

## Démarrer

```bash
cd mg-taxi-spots
npm install
npm start          # ouvre Remotion Studio, aperçu image par image
```

Le studio liste les 12 compositions (4 spots × 3 formats). Tu peux scrubber la
timeline et modifier le JSON à chaud.

## Rendre

```bash
npm run render:all               # les 12 fichiers dans out/
npm run render:vertical          # seulement le 9:16
npx remotion render luchthaven-nl-vertical out/test.mp4
```

## Ajouter un spot

Une entrée dans `src/config/spots.json` suffit — trois compositions
apparaissent automatiquement.

```json
{
  "id": "ziekenhuis-nl",
  "lang": "nl",
  "hook": ["Afspraak om 9u.", "Wij wachten."],
  "from": "Halen",
  "to": "Jessa Ziekenhuis",
  "distanceKm": 24,
  "price": 58,
  "priceLabel": "Vaste prijs",
  "facts": ["...", "...", "..."],
  "ctaLine": "Reserveer online",
  "kicker": "Vervoer naar afspraken"
}
```

Contraintes : `hook` sur 1 à 2 lignes courtes (la dernière passe en jaune),
`facts` exactement 3 entrées, `lang` vaut `nl` ou `fr`.

## Formats

| Nom        | Taille      | Usage                        |
|------------|-------------|------------------------------|
| `vertical` | 1080 × 1920 | Reels, TikTok, Shorts        |
| `square`   | 1080 × 1080 | Feed Instagram / Facebook    |
| `wide`     | 1920 × 1080 | YouTube, site, écran en salle |

## Direction visuelle

- **Palette** — bleu pétrole `#0E2233` sur `#071522`, craie `#EDF1F0`, un seul
  signal jaune `#F5B301`, teal `#17BEBB` pour les marqueurs.
- **Type** — Bricolage Grotesque en display, Inter Tight en texte,
  JetBrains Mono pour la bande de données.
- **Élément signature** — la bande compteur en bas de cadre. Les kilomètres et
  l'euro montent pendant que le trajet se dessine, puis se figent sur le prix
  annoncé. La promesse commerciale est jouée par l'interface, pas récitée.

Tout se change dans `src/config/brand.ts`.

## À vérifier avant publication

- **Les prix du JSON sont des valeurs de démonstration.** Remplace-les par ta
  grille réelle, ou retire la ligne prix si tu préfères ne pas t'engager.
- Vérifie que la formulation sur l'agrément taxi correspond exactement à ce que
  ton autorisation IBPV te permet d'annoncer.
- Les mentions « wifi », « Payconiq », « chauffeur qui attend au quai » ne sont
  vraies que si tu les offres réellement.
- Aucune musique n'est incluse. Pour en ajouter : dépose un fichier dans
  `public/`, puis dans `Spot.tsx` :
  `import { Audio, staticFile } from "remotion"` et
  `<Audio src={staticFile("bed.mp3")} volume={0.35} />`.

## Si une police échoue à l'installation

`@remotion/google-fonts/BricolageGrotesque` peut ne pas exister selon la version.
Dans ce cas, remplace l'import dans `src/config/fonts.ts` par `Archivo` ou
`Anton` — le reste du code ne bouge pas.
