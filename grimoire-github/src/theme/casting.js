// ─── Grimoire · casting styles ─────────────────────────────────────────────
// Casting card, held beat, rings, success state.
// Receives the active palette (C) — plus the system-sheet palette where the
// surface needs it. Returns a flat slice of the composed style object.

export const castingStyles = (C) => ({
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
    fontSize: 58,
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
    fontFamily: "system-ui",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: C.inkSoft,
    marginTop: 10,
    animation: "fadeUp 0.6s ease both",
  }
});
