import { useEffect, useState } from "react";
import { Plate, MoonPlate } from "./plates.jsx";
import { DOOR, FRAME } from "./standins.jsx";
import { arrivalTokens } from "../theme.js";

// ─── Grimoire · the arrival ───────────────────────────────────────────────
// One continuous movement, ~5 s (ARRIVAL.md decision 3): at the door with the
// lamp lit and the live sky behind → drawn in through the doorway's light →
// the table where the book waits → the book opens → its page becomes Today.
// The house carries mood only; every word is on the page (TodayView).
// A tap anywhere skips to the page. Reduced motion: a short crossfade.

/** The thing to tune with Axel. Milliseconds from the first frame. */
export const TIMING = {
  drawIn: 1500, // lamp has woken; start moving toward the door
  table: 2700,  // through the doorway's light; the table resolves
  open: 3300,   // the book opens
  page: 4300,   // its page grows to fill
  end: 5000,    // hand over to Today; the ink settles in
};

const ORDER = ["door", "drawIn", "table", "open", "page"];
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  // Dev-only: ?motion=reduced / ?motion=full, for walking through both paths
  // without changing a system setting.
  if (import.meta.env.DEV) {
    const m = new URLSearchParams(window.location.search).get("motion");
    if (m === "reduced") return true;
    if (m === "full") return false;
  }
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}

export default function Arrival({ sky, S, onReveal, onDone }) {
  const [reduced] = useState(prefersReducedMotion);
  const [stage, setStage] = useState(reduced ? "page" : "door");
  const [skipped, setSkipped] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const at = (s) => ORDER.indexOf(stage) >= ORDER.indexOf(s);

  // The timeline. Cleared the moment someone taps through.
  useEffect(() => {
    if (skipped) return;
    if (reduced) {
      const t = setTimeout(() => setLeaving(true), 120);
      return () => clearTimeout(t);
    }
    const ts = ["drawIn", "table", "open", "page"].map((s) =>
      setTimeout(() => setStage(s), TIMING[s]),
    );
    ts.push(setTimeout(() => setLeaving(true), TIMING.end));
    return () => ts.forEach(clearTimeout);
  }, [reduced, skipped]);

  // Leaving: Today's page starts writing itself in as the house fades.
  useEffect(() => {
    if (!leaving) return;
    onReveal();
    const t = setTimeout(onDone, reduced ? 650 : 520);
    return () => clearTimeout(t);
  }, [leaving, reduced, onReveal, onDone]);

  const skip = () => {
    if (leaving) return;
    setSkipped(true);
    setStage("page");
    setLeaving(true);
  };

  const tod = sky.night ? "night" : "day";
  const doorOrigin = `${(DOOR.x / FRAME.w) * 100}% ${(DOOR.y / FRAME.h) * 100}%`;
  const drawMs = TIMING.table - TIMING.drawIn;
  const weather = (
    <>
      {sky.weather === "mist" && <Plate slot="mist" style={{ animation: "gp-lampwake 1.2s ease-out both" }} />}
      {sky.weather === "rain" && <Plate slot="rain" style={{ animation: "gp-lampwake 1.2s ease-out both" }} />}
    </>
  );

  return (
    <div
      style={{ ...S.arrival, ...arrivalTokens(sky.night), ...(leaving ? S.arrivalLeaving : {}) }}
      onPointerDown={skip}
      aria-hidden="true"
    >
      {!reduced && !at("open") && (
        // Outside: sky, moon, the house, weather, the lamp — drawn in to the door.
        <div
          style={{
            ...S.arrivalScene,
            transformOrigin: doorOrigin,
            animation: at("drawIn") ? `gp-drawin ${drawMs}ms cubic-bezier(.55,0,.35,1) forwards` : "none",
          }}
        >
          <Plate slot="sky" />
          <MoonPlate moon={sky.moon} southern={sky.southern} night={sky.night} />
          <Plate slot={`approach-front-${tod}`} />
          {weather}
          <div style={S.arrivalGrade} />
          <Plate
            slot="lamplight"
            style={{ animation: "gp-lampwake 1.3s ease-out both, gp-lampbreath 3.2s ease-in-out 1.3s infinite" }}
          />
        </div>
      )}

      {!reduced && at("table") && (
        // Inside: the table, and the book waiting on it.
        <div style={{ ...S.arrivalScene, animation: "gp-tablein 0.9s ease-out both" }}>
          <Plate slot={`table-${tod}`} />
          {sky.weather === "rain" && <Plate slot="rain" style={{ opacity: 0.45 }} />}
          <div style={S.arrivalGrade} />
          <div style={{ ...S.arrivalBookWrap, transform: `translateX(${at("open") ? 0 : -58}px)` }}>
            <div style={S.arrivalRightPage} />
            <div
              style={{
                ...S.arrivalCover,
                animation: at("open") ? "gp-bookopen 1s ease-in-out forwards" : "none",
              }}
            >
              <div style={S.arrivalCoverFront}>✦</div>
              <div style={S.arrivalCoverInside} />
            </div>
          </div>
        </div>
      )}

      {!reduced && (
        <div
          style={{
            ...S.arrivalDoorLight,
            opacity: stage === "drawIn" ? 1 : 0,
            transition: stage === "drawIn" ? `opacity ${drawMs - 300}ms ease-in 300ms` : "opacity 0.8s ease-out",
          }}
        />
      )}

      {at("page") && (
        // The page — it becomes Today.
        <div
          style={{
            ...S.arrivalPage,
            transformOrigin: "50% calc(70% + 69px)",
            animation: reduced || skipped ? "none" : "gp-pagefill 0.8s cubic-bezier(.4,0,.2,1) both",
          }}
        />
      )}
    </div>
  );
}
