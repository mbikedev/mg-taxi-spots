#!/usr/bin/env node
/**
 * Rend tous les spots, tous formats confondus, dans out/.
 *
 *   node scripts/render-all.mjs              -> tout
 *   node scripts/render-all.mjs vertical     -> un seul format
 *   node scripts/render-all.mjs vertical square
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const spots = JSON.parse(readFileSync(join(root, "src/config/spots.json"), "utf8"));

const ALL_FORMATS = ["vertical", "square", "wide"];
const requested = process.argv.slice(2);
const formats = requested.length ? requested : ALL_FORMATS;

const unknown = formats.filter((f) => !ALL_FORMATS.includes(f));
if (unknown.length) {
  console.error(`Format inconnu : ${unknown.join(", ")}`);
  console.error(`Formats disponibles : ${ALL_FORMATS.join(", ")}`);
  process.exit(1);
}

mkdirSync(join(root, "out"), { recursive: true });

const jobs = spots.flatMap((spot) => formats.map((format) => `${spot.id}-${format}`));
let done = 0;

for (const id of jobs) {
  done += 1;
  console.log(`[${done}/${jobs.length}] ${id}`);
  execFileSync("npx", ["remotion", "render", id, `out/${id}.mp4`], {
    cwd: root,
    stdio: "inherit",
  });
}

console.log(`\n${jobs.length} fichiers dans out/`);
