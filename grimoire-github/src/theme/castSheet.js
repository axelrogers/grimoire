// ─── Grimoire · castSheet styles ─────────────────────────────────────────────
// The Browse to cast bottom sheet.
// Receives the active palette (C) — plus the system-sheet palette where the
// surface needs it. Returns a flat slice of the composed style object.

export const castSheetStyles = (C) => ({
  // ── Cast sheet (Browse → cast) ──────────────────
  sheetScrim: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "flex-end",
    borderRadius: 28,
    zIndex: 10,
  },
  sheet: {
    width: "100%",
    background: C.parchment,
    borderRadius: "22px 22px 28px 28px",
    padding: "10px 18px 24px",
    boxShadow: "0 -12px 40px rgba(0,0,0,0.25)",
    transition: "background 0.5s ease",
    animation: "sheetUp 0.32s cubic-bezier(.2,.7,.2,1) both",
  },
  sheetGrip: {
    width: 38,
    height: 4,
    borderRadius: 4,
    background: C.hair,
    margin: "0 auto 8px",
  }
});
