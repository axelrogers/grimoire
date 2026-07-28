import { TYPE } from "./fonts.js";
// ─── Grimoire · modules styles ─────────────────────────────────────────────
// Today's supporting modules — daily card, rank, community.
// Receives the active palette (C) — plus the system-sheet palette where the
// surface needs it. Returns a flat slice of the composed style object.

export const modulesStyles = () => ({
  // ── Modules container ──────────────────────────
  modules: {
    marginTop: 26,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    transition: "opacity 0.5s ease",
  },
  modulesMuted: { opacity: 0.25, pointerEvents: "none" },

  // shared module shell
  module: {
    width: "100%",
    background: "var(--p-glass)",
    border: `1px solid var(--p-glassBorder)`,
    borderRadius: 20,               // --r-xl, same as the folio
    boxShadow: "var(--p-cardShadow)",
    padding: "15px 18px",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: TYPE.body,
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  moduleHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 10,
    marginBottom: 6,
  },
  moduleEyebrow: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontWeight: 600,
    color: "var(--p-text)",
    opacity: 0.6,
  },
  // Module titles carry the display face at --t-h4. This is what stops the
  // modules reading as a list of equal-weight rows.
  moduleTitle: {
    fontFamily: TYPE.display,
    fontSize: 19,
    fontWeight: 500,
    color: "var(--p-text)",
    lineHeight: 1.15,
  },
  moduleMeta: {
    fontFamily: TYPE.body,
    fontSize: 12,
    color: "var(--p-text)",
    opacity: 0.6,
    marginTop: 3,
  },
  moduleLink: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--p-accent)",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  moduleFree: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: 700,
    color: "var(--p-accent)",
    border: `1px solid var(--p-hair)`,
    borderRadius: 20,
    padding: "2px 8px",
  },

  // Personal strip
  strip: {
    width: "100%",
    background: "var(--p-plate1)",
    border: `1px solid var(--p-hair)`,
    borderRadius: 16,
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    fontFamily: TYPE.body,
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  stripRank: { display: "flex", alignItems: "center", gap: 12, flex: 1 },
  stripNumeral: {
    fontFamily: TYPE.display,
    fontSize: 26,
    fontWeight: 600,
    minWidth: 26,
    textAlign: "center",
  },
  stripRankText: { flex: 1 },
  stripRankName: {
    fontFamily: TYPE.display,
    fontSize: 16,
    color: "var(--p-text)",
    fontWeight: 600,
  },
  stripProgressTrack: {
    height: 4,
    background: "var(--p-hair)",
    borderRadius: 4,
    margin: "5px 0 3px",
    overflow: "hidden",
  },
  stripProgressFill: { height: "100%", borderRadius: 4 },
  stripNext: {
    fontFamily: TYPE.ui,
    fontSize: 12,
    color: "var(--p-textSoft)",
  },
  stripCoins: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    paddingLeft: 14,
    borderLeft: `1px solid var(--p-hair)`,
    marginLeft: 14,
  },
  coinGlyph: { fontSize: 16 },
  coinAmount: {
    fontFamily: TYPE.ui,
    fontWeight: 700,
    fontSize: 16,
    color: "var(--p-text)",
  },

  // Daily card
  cardDrawn: { display: "flex", alignItems: "center", gap: 12 },
  tarotGlyph: { fontSize: 30 },
  tarotName: {
    fontFamily: TYPE.display,
    fontSize: 19,
    fontWeight: 500,
    lineHeight: 1.15,
    color: "var(--p-text)",
  },
  tarotMeaning: {
    fontSize: 14,
    color: "var(--p-textSoft)",
    marginTop: 1,
  },
  cardUndrawn: { display: "flex", alignItems: "center", gap: 12 },
  cardBack: {
    width: 38,
    height: 52,
    borderRadius: 6,
    border: "1.5px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  undrawnText: {
    fontFamily: TYPE.display,
    fontSize: 19,
    fontWeight: 500,
    color: "var(--p-text)",
  },

  // Community feed
  feedList: { display: "flex", flexDirection: "column", gap: 9 },
  feedRow: { display: "flex", alignItems: "center", gap: 9 },
  feedDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    flexShrink: 0,
  },
  feedText: { fontSize: 14, color: "var(--p-textSoft)", flex: 1, lineHeight: 1.3 },
  feedWho: { color: "var(--p-text)", fontWeight: 600 },
  feedWhen: {
    fontFamily: TYPE.ui,
    fontSize: 12,
    color: "var(--p-textSoft)",
    flexShrink: 0,
  },

  // Featured practitioners
  featRow: { display: "flex", gap: 9 },
  featCard: {
    flex: 1,
    background: "var(--p-ground)",
    border: `1px solid var(--p-hair)`,
    borderRadius: 12,
    padding: "12px 8px",
    textAlign: "center",
    cursor: "pointer",
    fontFamily: TYPE.body,
    transition: "background 0.5s ease",
  },
  featGlyph: { fontSize: 22 },
  featName: {
    fontFamily: TYPE.display,
    fontSize: 12,
    color: "var(--p-text)",
    fontWeight: 600,
    marginTop: 5,
    lineHeight: 1.15,
  },
  featCraft: {
    fontSize: 12,
    color: "var(--p-textSoft)",
    marginTop: 2,
    lineHeight: 1.2,
  },
  featRate: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    fontWeight: 700,
    marginTop: 6,
  }
});
