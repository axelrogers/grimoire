import { TYPE } from "./fonts.js";
// ─── Grimoire · coven styles ─────────────────────────────────────────────
// Your circle — members, practitioners, testimony.
// Receives the active palette (C) — plus the system-sheet palette where the
// surface needs it. Returns a flat slice of the composed style object.

export const covenStyles = () => ({
  // ── Coven ───────────────────────────────────────
  inviteBtn: {
    background: "transparent",
    border: `1px solid var(--p-hair)`,
    color: "var(--p-text)",
    borderRadius: 20,
    padding: "8px 14px",
    fontSize: 14,
    fontFamily: TYPE.display,
    fontWeight: 500,
    cursor: "pointer",
    transition: "border-color 0.5s ease, color 0.5s ease",
  },
  testimonyWrap: {
    background: "var(--p-plate1)",
    border: `1px solid var(--p-hair)`,
    borderRadius: 16,
    padding: "14px 16px",
    marginBottom: 18,
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  testimony: { marginTop: 10 },
  testimonyNote: {
    fontSize: 16,
    color: "var(--p-text)",
    lineHeight: 1.4,
  },
  testimonyMeta: {
    fontFamily: TYPE.ui,
    fontSize: 12,
    color: "var(--p-textSoft)",
    marginTop: 4,
  },
  testimonyWho: { color: "var(--p-text)", fontWeight: 600 },
  covenLabel: { marginBottom: 10 },
  covenList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  covenRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 4px",
    borderBottom: `1px solid var(--p-hair)`,
    transition: "border-color 0.5s ease",
  },
  covenGlyph: { fontSize: 22, width: 24, textAlign: "center", flexShrink: 0 },
  covenMid: { flex: 1, minWidth: 0 },
  covenNameRow: { display: "flex", alignItems: "center", gap: 7 },
  covenName: {
    fontFamily: TYPE.display,
    fontSize: 16,
    color: "var(--p-text)",
    fontWeight: 600,
  },
  covenBadge: {
    fontFamily: TYPE.ui,
    fontSize: 10,
    fontWeight: 700,
    border: "1px solid",
    borderRadius: 20,
    padding: "1px 6px",
  },
  covenLast: {
    fontSize: 14,
    color: "var(--p-textSoft)",
    marginTop: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  covenNumeral: {
    fontFamily: TYPE.display,
    fontWeight: 600,
  },
  castWithBtn: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 20,
    padding: "6px 16px",
    fontFamily: TYPE.display,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    flexShrink: 0,
  },
  covenRank: {
    fontFamily: TYPE.ui,
    fontSize: 12,
    flexShrink: 0,
  },
  findMore: {
    width: "100%",
    background: "transparent",
    border: `1px dashed var(--p-hair)`,
    color: "var(--p-litDeep)",
    borderRadius: 14,
    padding: "13px",
    marginTop: 18,
    fontFamily: TYPE.body,
    fontSize: 14,
    cursor: "pointer",
    transition: "border-color 0.5s ease",
  }
});
