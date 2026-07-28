import { TYPE } from "./fonts.js";
// ─── Grimoire · browse styles ─────────────────────────────────────────────
// Search, category rail, catalogue grid.
// Receives the active palette (C) — plus the system-sheet palette where the
// surface needs it. Returns a flat slice of the composed style object.

export const browseStyles = () => ({
  // ── Browse ──────────────────────────────────────
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "var(--p-plate1)",
    border: `1px solid var(--p-hair)`,
    borderRadius: 12,
    padding: "10px 14px",
    marginBottom: 14,
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  searchGlyph: { fontSize: 16, color: "var(--p-textSoft)" },
  searchInput: {
    flex: 1,
    border: "none",
    background: "transparent",
    outline: "none",
    fontFamily: TYPE.body,
    fontSize: 16,
    color: "var(--p-text)",
  },
  chipRow: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    paddingBottom: 4,
    marginBottom: 16,
  },
  chip: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: 5,
    background: "var(--p-plate1)",
    border: `1px solid var(--p-hair)`,
    borderRadius: 20,
    padding: "7px 13px",
    fontFamily: TYPE.body,
    fontSize: 14,
    color: "var(--p-text)",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.2s ease, border-color 0.2s ease",
  },
  chipGlyph: { fontSize: 14 },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  gridCard: {
    background: "var(--p-plate1)",
    border: `1px solid var(--p-hair)`,
    borderRadius: 14,
    padding: "14px 12px 12px",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: TYPE.body,
    display: "flex",
    flexDirection: "column",
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  gridGlyph: { fontSize: 26, marginBottom: 8 },
  gridTitle: {
    fontFamily: TYPE.display,
    fontSize: 14,
    color: "var(--p-text)",
    fontWeight: 600,
    lineHeight: 1.2,
  },
  gridSub: {
    fontSize: 14,
    color: "var(--p-textSoft)",
    marginTop: 3,
    lineHeight: 1.3,
    flex: 1,
  },
  gridFoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  gridRate: { fontFamily: TYPE.ui, fontSize: 10, fontWeight: 700 },
  gridPrice: {
    fontFamily: TYPE.ui,
    fontSize: 14,
    fontWeight: 700,
    color: "var(--p-text)",
  },
  emptyState: { textAlign: "center", padding: "48px 20px" },
  emptyGlyph: { fontSize: 34, color: "var(--p-textSoft)" },
  emptyText: {
    fontSize: 16,
    color: "var(--p-textSoft)",
    marginTop: 10,
  }
});
