// ─── Grimoire · Small shared controls ─────────────────────────────────────
// Style helpers that take state as an argument rather than living in the
// flat style object. `seg` is the dev viewer switcher's segmented control.

export const seg = (active, C) => ({
  padding: "5px 12px",
  borderRadius: 7,
  border: "none",
  cursor: "pointer",
  fontSize: 12,
  fontFamily: "system-ui",
  fontWeight: 600,
  background: active ? C.ink : "transparent",
  color: active ? C.parchment : C.inkSoft,
});
