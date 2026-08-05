import { TYPE } from "./fonts.js";
// ─── Grimoire · browse styles ─────────────────────────────────────────────
// The Grand Index. Ported from the prototype: a table of contents, not a
// grid. Index masthead, TOC rows with dotted leaders, chapter heads and
// ledger rows. Flat keys, global namespace — keep them unique.

export const browseStyles = () => ({
  // ── Index masthead ────────────────────────────────────
  indexEyebrowRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "2px 0 14px",
  },
  indexRule: { flex: 1, height: 1, background: "var(--p-rule)" },
  indexEyebrow: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.32em",           // --track-ultra: the masthead moment
    textTransform: "uppercase",
    color: "var(--p-text)",
    opacity: 0.6,
    whiteSpace: "nowrap",
  },
  indexTitle: {
    fontFamily: TYPE.display,
    fontSize: 34,                       // --t-display, as measured
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.05,
    color: "var(--p-text)",
    textAlign: "center",
  },
  indexSub: {
    fontFamily: TYPE.body,
    fontSize: 16,
    color: "var(--p-text)",
    opacity: 0.7,
    textAlign: "center",
    margin: "10px 0 18px",
  },
  concordWrap: {
    borderBottom: "1px solid var(--p-rule)",
    margin: "0 4px 22px",
  },
  concordInput: {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    padding: "4px 2px 12px",
    fontFamily: TYPE.body,
    fontSize: 16,
    color: "var(--p-text)",
  },

  // ── The volume card + TOC rows ────────────────────────
  volCard: {
    background: "var(--p-glass)",
    border: "1px solid var(--p-glassBorder)",
    borderRadius: 20,
    boxShadow: "var(--p-cardShadow)",
    padding: "16px 18px 8px",
  },
  volLabel: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--p-text)",
    opacity: 0.6,
    marginBottom: 6,
  },
  tocRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    width: "100%",
    background: "transparent",
    border: "none",
    borderTop: "1px solid var(--p-hair)",
    padding: "13px 0",
    cursor: "pointer",
    textAlign: "left",
  },
  tocNumeral: {
    fontFamily: TYPE.display,
    fontSize: 14,
    color: "var(--p-text)",
    opacity: 0.45,
    width: 26,
    flexShrink: 0,
  },
  tocName: {
    fontFamily: TYPE.display,
    fontSize: 16,
    fontWeight: 500,
    color: "var(--p-text)",
    whiteSpace: "nowrap",
  },
  // The dotted leader — the line that makes it read as an index page.
  tocLeader: {
    flex: 1,
    borderBottom: "1px dotted var(--p-rule)",
    margin: "0 2px",
    transform: "translateY(-4px)",
  },
  tocCount: {
    fontFamily: TYPE.mono,              // numerals wear the mono (DESIGN.md §3)
    fontSize: 12,
    color: "var(--p-accent)",
    flexShrink: 0,
  },
  tocPage: {
    fontFamily: TYPE.body,
    fontSize: 12,
    color: "var(--p-text)",
    opacity: 0.5,
    width: 40,
    textAlign: "right",
    flexShrink: 0,
  },
  indexFoot: {
    fontFamily: TYPE.body,
    fontSize: 12,
    color: "var(--p-text)",
    opacity: 0.5,
    textAlign: "center",
    marginTop: 16,
  },

  // ── Chapter level ─────────────────────────────────────
  backLink: {
    background: "transparent",
    border: "none",
    padding: "0 0 14px",
    fontFamily: TYPE.ui,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--p-accent)",
    cursor: "pointer",
    textAlign: "left",
  },
  chapterHead: { textAlign: "center", marginBottom: 20 },
  chapterEyebrow: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    color: "var(--p-text)",
    opacity: 0.6,
    marginBottom: 10,
  },
  chapterTitle: {
    fontFamily: TYPE.display,
    fontSize: 44,                       // --t-title, as the prototype sets it
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1,
    color: "var(--p-text)",
  },
  chapterEpigraph: {
    fontFamily: TYPE.body,
    fontSize: 16,
    lineHeight: 1.45,
    color: "var(--p-text)",
    opacity: 0.75,
    maxWidth: 250,
    margin: "13px auto 0",
  },
  chapterMeta: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--p-text)",
    opacity: 0.5,
    marginTop: 12,
  },

  // ── Ledger rows (a chapter's workings) ────────────────
  ledgerRow: {
    display: "block",
    width: "100%",
    background: "transparent",
    border: "none",
    borderTop: "1px solid var(--p-hair)",
    padding: "13px 0 14px",
    cursor: "pointer",
    textAlign: "left",
  },
  ledgerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 10,
  },
  ledgerTitle: {
    fontFamily: TYPE.display,
    fontSize: 19,
    fontWeight: 500,
    color: "var(--p-text)",
    lineHeight: 1.15,
  },
  ledgerPrice: {
    fontFamily: TYPE.mono,
    fontSize: 12,
    color: "var(--p-accent)",
    flexShrink: 0,
  },
  ledgerKept: {
    fontFamily: TYPE.body,
    fontSize: 12,
    color: "var(--p-text)",
    opacity: 0.6,
    marginTop: 3,
  },
  ledgerMeta: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--p-text)",
    opacity: 0.5,
    marginTop: 6,
  },

  // Kept for the empty search state and any residual use.
  emptyState: { textAlign: "center", padding: "40px 0" },
  emptyGlyph: { fontSize: 30, color: "var(--p-accent)", opacity: 0.5 },
  emptyText: {
    fontFamily: TYPE.body,
    fontSize: 14,
    color: "var(--p-text)",
    opacity: 0.6,
    marginTop: 10,
  },
});
