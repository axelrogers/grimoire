import { TYPE } from "./fonts.js";
// ─── Grimoire · you styles ─────────────────────────────────────────────
// Crest, rank progress, cast history.
// Receives the active palette (C) — plus the system-sheet palette where the
// surface needs it. Returns a flat slice of the composed style object.

export const youStyles = () => ({
  // ── You ─────────────────────────────────────────
  youCrest: {
    textAlign: "center",
    background: "var(--p-plate1)",
    border: `1px solid var(--p-hair)`,
    borderRadius: 18,
    padding: "22px 20px 18px",
    marginBottom: 12,
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  youNumeral: {
    fontFamily: TYPE.display,
    fontSize: 44,
    fontWeight: 600,
    lineHeight: 1,
  },
  youRankName: {
    fontFamily: TYPE.display,
    fontSize: 19,
    color: "var(--p-text)",
    fontWeight: 600,
    marginTop: 4,
  },
  youProgressTrack: {
    height: 5,
    background: "var(--p-hair)",
    borderRadius: 5,
    margin: "14px 0 6px",
    overflow: "hidden",
  },
  youProgressFill: { height: "100%", borderRadius: 5 },
  youNext: { fontFamily: TYPE.ui, fontSize: 12, color: "var(--p-textSoft)" },
  youStats: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  youStat: {
    flex: 1,
    background: "var(--p-plate1)",
    border: `1px solid var(--p-hair)`,
    borderRadius: 14,
    padding: "14px 12px",
    textAlign: "center",
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  youStatNum: {
    fontFamily: TYPE.ui,
    fontSize: 19,
    fontWeight: 700,
  },
  youStatLabel: {
    fontFamily: TYPE.ui,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "var(--p-textSoft)",
    fontWeight: 600,
    marginTop: 3,
  },
  youStatSub: {
    fontFamily: TYPE.ui,
    fontSize: 12,
    color: "var(--p-textSoft)",
    marginTop: 5,
  },
  topUpBtn: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 12,
    fontFamily: TYPE.display,
    fontWeight: 500,
    cursor: "pointer",
    marginTop: 7,
  },
  histRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 4px",
    borderBottom: `1px solid var(--p-hair)`,
    transition: "border-color 0.5s ease",
  },
  verdictBtns: { display: "flex", gap: 6, flexShrink: 0 },
  verdictYes: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: 12,
    fontFamily: TYPE.display,
    fontWeight: 500,
    cursor: "pointer",
  },
  verdictNo: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: 12,
    fontFamily: TYPE.display,
    fontWeight: 500,
    cursor: "pointer",
  },
  verdictTag: {
    fontFamily: TYPE.ui,
    fontSize: 12,
    fontWeight: 600,
    flexShrink: 0,
  }
});
