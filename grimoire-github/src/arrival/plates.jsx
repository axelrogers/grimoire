// ─── Grimoire · plate slots ───────────────────────────────────────────────
// Every layer of the house loads from a named slot. A final painting drops
// into src/arrival/plates/ named for its slot (approach-front-night.webp,
// table-day.png, …) and is picked up at build — no code change. Until then the
// slot draws its labelled stand-in. Slot list and framing: plates/README.md.

import { STANDINS, MoonDisc } from "./standins.jsx";
import { TYPE } from "../theme/fonts.js";

const FILES = import.meta.glob("./plates/*.{png,webp,jpg,jpeg,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

export const SLOTS = [
  "sky", "moon",
  "approach-front-day", "approach-front-night",
  "table-day", "table-night",
  "rain", "mist", "lamplight",
];

export function plateUrl(slot) {
  for (const [path, url] of Object.entries(FILES)) {
    if (path.replace(/^.*\//, "").replace(/\.[^.]+$/, "") === slot) return url;
  }
  return null;
}

const fill = { position: "absolute", inset: 0, width: "100%", height: "100%" };

export function Plate({ slot, style }) {
  const url = plateUrl(slot);
  if (url) {
    return <img src={url} alt="" draggable={false} style={{ ...fill, objectFit: "cover", ...style }} />;
  }
  const StandIn = STANDINS[slot];
  return <div style={{ ...fill, ...style }}>{StandIn && <StandIn slot={slot} />}</div>;
}

// Where the moon hangs: a young moon low on the right, full over the tower,
// an old moon low on the left. Percentages of the portrait frame.
function moonPlace(age) {
  const x = age < 0.5 ? 88 - (age / 0.5) * 19 : 69 - ((age - 0.5) / 0.5) * 49;
  const y = 12 + 18 * Math.abs(age - 0.5) * 2;
  return { left: `${x}%`, top: `${y}%` };
}

/**
 * The moon slot, cut to tonight's phase. Lit limb on the right while waxing
 * in the north; mirrored when waning, and again in the south.
 */
export function MoonPlate({ moon, southern, night }) {
  const r = 48;
  const k = moon.illumination;
  const rx = r * Math.abs(1 - 2 * k);
  const lit = `M0,${-r} A${r},${r} 0 0 1 0,${r} A${rx},${r} 0 0 ${k < 0.5 ? 0 : 1} 0,${-r} Z`;
  const flip = moon.waxing === southern;
  const url = plateUrl("moon");
  return (
    <div
      style={{
        position: "absolute", width: 56, height: 56, transform: "translate(-50%, -50%)",
        opacity: night ? 1 : 0.55, ...moonPlace(moon.age),
      }}
    >
      <svg viewBox="-50 -50 100 100" width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <mask id="gp-moon-lit">
            <path d={lit} fill="white" transform={flip ? "scale(-1,1)" : undefined} />
          </mask>
        </defs>
        <circle r={r} style={{ fill: "var(--a-moonDark)" }} />
        <g mask="url(#gp-moon-lit)">
          {url ? <image href={url} x="-50" y="-50" width="100" height="100" /> : <MoonDisc />}
        </g>
        {!url && (
          <text y="76" textAnchor="middle" style={{ fill: "var(--a-label)", fontFamily: TYPE.ui, fontSize: 14, letterSpacing: "0.22em", fontWeight: 600 }}>
            MOON
          </text>
        )}
      </svg>
    </div>
  );
}
