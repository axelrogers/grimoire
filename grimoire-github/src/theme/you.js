// ─── Grimoire · you styles ─────────────────────────────────────────────
// Crest, rank progress, cast history.
// Receives the active palette (C) — plus the system-sheet palette where the
// surface needs it. Returns a flat slice of the composed style object.

export const youStyles = (C) => ({
  // ── You ─────────────────────────────────────────
  youCrest: {
    textAlign: "center",
    background: C.parchmentDeep,
    border: `1px solid ${C.hair}`,
    borderRadius: 18,
    padding: "22px 20px 18px",
    marginBottom: 12,
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  youNumeral: {
    fontFamily: "'Cinzel', serif",
    fontSize: 44,
    fontWeight: 600,
    lineHeight: 1,
  },
  youRankName: {
    fontFamily: "'Cinzel', serif",
    fontSize: 20,
    color: C.ink,
    fontWeight: 600,
    marginTop: 4,
  },
  youProgressTrack: {
    height: 5,
    background: C.hair,
    borderRadius: 5,
    margin: "14px 0 6px",
    overflow: "hidden",
  },
  youProgressFill: { height: "100%", borderRadius: 5 },
  youNext: { fontFamily: "system-ui", fontSize: 12, color: C.inkSoft },
  youStats: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  youStat: {
    flex: 1,
    background: C.parchmentDeep,
    border: `1px solid ${C.hair}`,
    borderRadius: 14,
    padding: "14px 12px",
    textAlign: "center",
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  youStatNum: {
    fontFamily: "system-ui",
    fontSize: 20,
    fontWeight: 700,
  },
  youStatLabel: {
    fontFamily: "system-ui",
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: C.inkSoft,
    fontWeight: 600,
    marginTop: 3,
  },
  youStatSub: {
    fontFamily: "system-ui",
    fontSize: 11,
    color: C.inkSoft,
    marginTop: 5,
  },
  topUpBtn: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 12,
    fontFamily: "'Cinzel', serif",
    fontWeight: 500,
    cursor: "pointer",
    marginTop: 7,
  },
  histRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 4px",
    borderBottom: `1px solid ${C.hair}`,
    transition: "border-color 0.5s ease",
  },
  verdictBtns: { display: "flex", gap: 6, flexShrink: 0 },
  verdictYes: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: 12.5,
    fontFamily: "'Cinzel', serif",
    fontWeight: 500,
    cursor: "pointer",
  },
  verdictNo: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: 12.5,
    fontFamily: "'Cinzel', serif",
    fontWeight: 500,
    cursor: "pointer",
  },
  verdictTag: {
    fontFamily: "system-ui",
    fontSize: 12.5,
    fontWeight: 600,
    flexShrink: 0,
  }
});
