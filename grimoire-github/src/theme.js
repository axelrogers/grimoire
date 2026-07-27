// ─── Grimoire · Theme (barrel) ────────────────────────────────────────────
// The design system, split by surface. This file re-exports the same four
// names it always did — THEME, FONTS, seg, makeStyles — so nothing that
// imports from "./theme.js" needs to change. The pieces live in ./theme/.
//
//   theme/palettes.js   Day + Night colour
//   theme/fonts.js      webfonts + keyframes
//   theme/controls.js   stateful style helpers
//   theme/styles.js     composes the slices below into `S`
//   theme/{shell,casting,modules,browse,castSheet,coven,you}.js

export { THEME } from "./theme/palettes.js";
export { FONTS } from "./theme/fonts.js";
export { seg } from "./theme/controls.js";
export { makeStyles } from "./theme/styles.js";
