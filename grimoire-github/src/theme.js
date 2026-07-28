// ─── Grimoire · Theme (barrel) ────────────────────────────────────────────
// The design system, split by surface. Components import from here and never
// reach into the slices directly. The pieces live in ./theme/.
//
//   theme/palettes.js   amber/amethyst ramps + the --p-*/--g-* token layer
//   theme/fonts.js      webfonts + keyframes
//   theme/controls.js   stateful style helpers
//   theme/styles.js     composes the slices below into `S`
//   theme/{shell,casting,modules,browse,castSheet,coven,you}.js

export { PALETTES, PALETTE_KEYS, tokensFor, paletteMeta } from "./theme/palettes.js";
export { FONTS, TYPE } from "./theme/fonts.js";
export { seg } from "./theme/controls.js";
export { makeStyles } from "./theme/styles.js";
