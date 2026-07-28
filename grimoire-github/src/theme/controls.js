import { TYPE } from "./fonts.js";
// ─── Grimoire · Small shared controls ─────────────────────────────────────
// Style helpers that take state as an argument rather than living in the
// flat style object. `seg` is the dev viewer switcher's segmented control.

export const seg = (active) => ({
  padding: "5px 12px",
  borderRadius: 7,
  border: "none",
  cursor: "pointer",
  fontSize: 12,
  fontFamily: TYPE.ui,
  fontWeight: 600,
  background: active ? "var(--p-text)" : "transparent",
  color: active ? "var(--p-ground)" : "var(--p-textSoft)",
});
