// ─── Grimoire · coven styles ─────────────────────────────────────────────
// Your circle — members, practitioners, testimony.
// Receives the active palette (C) — plus the system-sheet palette where the
// surface needs it. Returns a flat slice of the composed style object.

export const covenStyles = (C) => ({
  // ── Coven ───────────────────────────────────────
  inviteBtn: {
    background: "transparent",
    border: `1px solid ${C.hair}`,
    color: C.ink,
    borderRadius: 20,
    padding: "8px 14px",
    fontSize: 13,
    fontFamily: "'Cinzel', serif",
    fontWeight: 500,
    cursor: "pointer",
    transition: "border-color 0.5s ease, color 0.5s ease",
  },
  testimonyWrap: {
    background: C.parchmentDeep,
    border: `1px solid ${C.hair}`,
    borderRadius: 16,
    padding: "14px 16px",
    marginBottom: 18,
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  testimony: { marginTop: 10 },
  testimonyNote: {
    fontSize: 16,
    fontStyle: "italic",
    color: C.ink,
    lineHeight: 1.4,
  },
  testimonyMeta: {
    fontFamily: "system-ui",
    fontSize: 11.5,
    color: C.inkSoft,
    marginTop: 4,
  },
  testimonyWho: { color: C.ink, fontWeight: 600 },
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
    borderBottom: `1px solid ${C.hair}`,
    transition: "border-color 0.5s ease",
  },
  covenGlyph: { fontSize: 22, width: 24, textAlign: "center", flexShrink: 0 },
  covenMid: { flex: 1, minWidth: 0 },
  covenNameRow: { display: "flex", alignItems: "center", gap: 7 },
  covenName: {
    fontFamily: "'Cinzel', serif",
    fontSize: 15,
    color: C.ink,
    fontWeight: 600,
  },
  covenBadge: {
    fontFamily: "system-ui",
    fontSize: 10,
    fontWeight: 700,
    border: "1px solid",
    borderRadius: 20,
    padding: "1px 6px",
  },
  covenLast: {
    fontSize: 13,
    color: C.inkSoft,
    marginTop: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  covenNumeral: {
    fontFamily: "'Cinzel', serif",
    fontWeight: 600,
  },
  castWithBtn: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 20,
    padding: "6px 16px",
    fontFamily: "'Cinzel', serif",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    flexShrink: 0,
  },
  covenRank: {
    fontFamily: "system-ui",
    fontSize: 12,
    flexShrink: 0,
  },
  findMore: {
    width: "100%",
    background: "transparent",
    border: `1px dashed ${C.hair}`,
    color: C.goldDeep,
    borderRadius: 14,
    padding: "13px",
    marginTop: 18,
    fontFamily: "'Crimson Pro', Georgia, serif",
    fontSize: 14.5,
    cursor: "pointer",
    transition: "border-color 0.5s ease",
  }
});
