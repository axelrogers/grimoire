import { TYPE } from "./fonts.js";
// ─── Grimoire · arrival styles ────────────────────────────────────────────
// The house → the table → the book → the page. Plate colours are --a-*
// (arrivalTokens); the lit accent and page ground come from the palette.

export const arrivalStyles = () => ({
  arrival: {
    position: "absolute", inset: 0, zIndex: 20, overflow: "hidden",
    background: "var(--a-skyTop)", cursor: "pointer",
    userSelect: "none", WebkitUserSelect: "none", touchAction: "manipulation",
    transition: "opacity 0.5s ease-in-out",
  },
  arrivalLeaving: { opacity: 0, pointerEvents: "none" },
  arrivalScene: { position: "absolute", inset: 0, overflow: "hidden" },
  // The palette as a grade over neutral plates (ARRIVAL.md decision 4).
  arrivalGrade: {
    position: "absolute", inset: 0, pointerEvents: "none",
    background: "var(--p-glow1)", mixBlendMode: "color", opacity: "var(--a-gradeOpacity)",
  },
  // The doorway's light — the bridge between the two plates.
  arrivalDoorLight: {
    position: "absolute", inset: 0, pointerEvents: "none",
    background:
      "radial-gradient(circle at 45% 63%, var(--a-page) 0%, var(--a-page) 28%, var(--g-lit) 78%)",
  },
  arrivalBookWrap: {
    position: "absolute", left: "50%", top: "70%", width: 116, height: 138,
    perspective: 900, transition: "transform 1s ease-in-out",
  },
  arrivalRightPage: {
    position: "absolute", inset: 0, background: "var(--a-page)",
    borderRadius: "1px 4px 4px 1px", boxShadow: "0 18px 30px -12px rgba(0,0,0,0.55)",
  },
  arrivalCover: {
    position: "absolute", inset: 0, transformOrigin: "left center",
    transformStyle: "preserve-3d",
  },
  arrivalCoverFront: {
    position: "absolute", inset: 0, background: "var(--a-book)",
    border: "1px solid var(--p-litLine)", borderRadius: "1px 4px 4px 1px",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "var(--g-lit)", fontSize: 26, backfaceVisibility: "hidden",
    boxShadow: "0 18px 30px -12px rgba(0,0,0,0.55)",
  },
  arrivalCoverInside: {
    position: "absolute", inset: 0, background: "var(--a-page)",
    borderRadius: "4px 1px 1px 4px", transform: "rotateY(180deg)", backfaceVisibility: "hidden",
  },
  arrivalPage: { position: "absolute", inset: 0, background: "var(--p-ground)" },

  // ── Today's page head, written in as the book opens ──
  pageDate: {
    fontFamily: TYPE.ui, fontSize: 10, fontWeight: 600, letterSpacing: "0.22em",
    textTransform: "uppercase", color: "var(--p-textSoft)", marginBottom: 10,
  },
  remembered: {
    fontFamily: TYPE.display, fontSize: 16, lineHeight: 1.4,
    color: "var(--p-textSoft)", marginTop: 10,
  },
  placeholderMark: {
    fontFamily: TYPE.ui, fontSize: 9, fontWeight: 600, letterSpacing: "0.22em",
    textTransform: "uppercase", color: "var(--p-textFaint)",
    border: "1px dashed var(--p-rule)", borderRadius: 100,
    padding: "1px 6px", marginLeft: 8, whiteSpace: "nowrap", verticalAlign: "middle",
  },
});
