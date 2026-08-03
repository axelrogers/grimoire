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

  // ── The delivered working ─────────────────────────────
  // Left-aligned and quiet. The prototype's form is two short halves and a
  // margin voice; the restraint is the point, so these styles stay sparse.
  workingText: {
    textAlign: "left",
    fontFamily: TYPE.body,
    fontSize: 16,
    lineHeight: 1.5,
    color: "var(--p-text)",
    opacity: 0.85,
    margin: "16px 4px 4px",
  },
  halfBlock: {
    textAlign: "left",
    borderLeft: "2px solid",
    padding: "6px 0 6px 12px",
    margin: "14px 4px 0",
  },
  halfLabel: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--p-text)",
    opacity: 0.6,
    marginBottom: 4,
  },
  halfText: {
    fontFamily: TYPE.body,
    fontSize: 16,
    lineHeight: 1.45,
    color: "var(--p-text)",
  },
  // The margin voice — testimony rendered as an annotation in the book.
  margin: {
    textAlign: "left",
    margin: "22px 4px 20px",
    paddingTop: 14,
    borderTop: "1px solid var(--p-hair)",
  },
  marginQuote: {
    fontFamily: TYPE.display,
    fontSize: 19,
    lineHeight: 1.3,
    color: "var(--p-text)",
  },
  marginBy: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--p-text)",
    opacity: 0.6,
    marginTop: 8,
  },
});
