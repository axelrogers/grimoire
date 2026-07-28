import { TYPE } from "./fonts.js";
// ─── Grimoire · casting styles ─────────────────────────────────────────────
// Casting card, held beat, rings, success state.
// Receives the active palette (C) — plus the system-sheet palette where the
// surface needs it. Returns a flat slice of the composed style object.

export const castingStyles = () => ({
  // ── Casting card + held beat ──────────────────────────
  cardBody: { transition: "opacity 0.7s ease" },
  cardBodyMuted: { opacity: 0.32 },
  cardCasting: {
    boxShadow: "0 0 0 1px rgba(0,0,0,0.04), 0 10px 40px rgba(0,0,0,0.10)",
    transition: "box-shadow 0.7s ease",
  },
  beat: {
    textAlign: "center",
    padding: "8px 0 6px",
  },
  beatGlyphWrap: {
    position: "relative",
    height: 110,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  beatGlyph: {
    fontSize: 68,
    lineHeight: 1,
    position: "relative",
    zIndex: 2,
  },
  beatGlyphHold: { animation: "breathe 2.2s ease-in-out infinite" },
  beatGlyphSend: { animation: "rise 1.4s cubic-bezier(.4,0,.2,1) forwards" },
  ring: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: "50%",
    border: "1.5px solid",
    opacity: 0,
    zIndex: 1,
  },
  ring2: { width: 90, height: 90 },
  ringSend: { animation: "ringOut 1.3s ease-out forwards" },
  ringSend2: { animation: "ringOut 1.3s ease-out 0.15s forwards" },
  beatWord: {
    fontFamily: TYPE.ui,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "var(--p-textSoft)",
    marginTop: 10,
    animation: "fadeUp 0.6s ease both",
  },

  // ── The delivered working (hybrid model) ──────────────
  // Everything below is left-aligned: the success state's centred kicker is a
  // moment, but the rite is something you read while holding a handful of
  // salt. Centred body copy would be unusable at the exact instant it matters.

  // An unwritten slot. Deliberately conspicuous — writing debt should be
  // impossible to miss in the running app, not just in the repo.
  slot: {
    display: "inline-block",
    fontFamily: TYPE.mono,
    fontSize: 12,
    color: "var(--p-accent)",
    background: "var(--p-plate1)",
    border: `1px dashed var(--p-accent)`,
    borderRadius: 5,
    padding: "1px 6px",
    opacity: 0.85,
  },

  // Grimoire's half of the working.
  performed: {
    textAlign: "left",
    borderLeft: "2px solid",
    padding: "8px 0 8px 12px",
    margin: "14px 4px 4px",
  },
  performedLabel: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "var(--p-textSoft)",
    marginBottom: 4,
  },
  performedText: { fontSize: 14, color: "var(--p-text)", lineHeight: 1.55 },

  partLabel: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "var(--p-textSoft)",
    textAlign: "left",
    margin: "22px 4px 2px",
    paddingTop: 14,
    borderTop: `1px solid var(--p-hair)`,
  },

  block: { textAlign: "left", margin: "14px 4px 0" },
  blockHead: {
    fontFamily: TYPE.display,
    fontSize: 16,
    fontWeight: 600,
    color: "var(--p-text)",
    marginBottom: 6,
  },
  blockBody: { fontSize: 14, color: "var(--p-text)", lineHeight: 1.6 },

  matList: { listStyle: "none", padding: 0, margin: 0 },
  matItem: {
    display: "flex",
    flexDirection: "column",
    padding: "6px 0",
    borderBottom: `1px solid var(--p-hair)`,
  },
  matName: { fontSize: 14, color: "var(--p-text)" },
  matOpt: { fontSize: 12, color: "var(--p-textSoft)" },
  matNote: { fontSize: 12, color: "var(--p-textSoft)", marginTop: 2, lineHeight: 1.45 },

  riteStep: { display: "flex", gap: 10, alignItems: "flex-start", padding: "7px 0" },
  riteNum: {
    flex: "0 0 auto",
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: "1px solid",
    fontFamily: TYPE.ui,
    fontSize: 12,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  riteBody: { flex: 1 },
  riteText: { fontSize: 14, color: "var(--p-text)", lineHeight: 1.6 },
  // The said line. Set apart because it's spoken aloud, not read past.
  spoken: {
    fontSize: 16,
    color: "var(--p-text)",
    borderLeft: "2px solid",
    padding: "3px 0 3px 10px",
    margin: "7px 0 2px",
    lineHeight: 1.5,
  },

  // The window they hold between casting and verdict.
  hold: {
    textAlign: "left",
    border: "1px solid",
    borderRadius: 10,
    padding: "11px 13px",
    margin: "18px 4px 0",
    // parchmentDeep is the raised-surface token in both palettes, so this
    // needs no day/night branch — it's correct by construction.
    background: "var(--p-plate1)",
  },
  holdLabel: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: "var(--p-textSoft)",
    marginBottom: 4,
  },
  holdText: { fontSize: 14, color: "var(--p-text)", lineHeight: 1.55 },

  verdictNote: {
    textAlign: "left",
    fontSize: 14,
    color: "var(--p-textSoft)",
    margin: "16px 4px 20px",
    lineHeight: 1.55,
  },
  verdictQ: { color: "var(--p-text)" },
});
