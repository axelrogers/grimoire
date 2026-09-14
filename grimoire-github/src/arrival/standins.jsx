// ─── Grimoire · stand-in plates ───────────────────────────────────────────
// Rough, labelled, obviously provisional (ARRIVAL.md decision 9). They exist
// so timing, the lamp, the movement and the live sky can be felt before any
// art does. They must never look finished — if one starts to, rough it up.
//
// All share one portrait frame (390 × 844, sliced to fill) so the finals can
// be painted to the same registration: door at (175, 530), lamp room at
// (270, 222), book at the centre of the table's lower third.

import { TYPE } from "../theme/fonts.js";

export const FRAME = { w: 390, h: 844 };
export const DOOR = { x: 175, y: 530 };
export const LAMP = { x: 270, y: 222 };

const f = (v) => ({ fill: `var(${v})` });

function Label({ slot, y = 770 }) {
  return (
    <text
      x={FRAME.w / 2} y={y} textAnchor="middle"
      style={{ ...f("--a-label"), fontFamily: TYPE.ui, fontSize: 9, letterSpacing: "0.22em", fontWeight: 600 }}
    >
      STAND-IN · {slot.toUpperCase()}
    </text>
  );
}

const svgProps = {
  viewBox: `0 0 ${FRAME.w} ${FRAME.h}`,
  preserveAspectRatio: "xMidYMid slice",
  width: "100%", height: "100%",
  style: { position: "absolute", inset: 0, display: "block" },
};

// A handful of fixed stars — the same sky every night is fine for a stand-in.
const STARS = [[40, 70], [96, 140], [150, 52], [212, 110], [330, 64], [360, 170],
  [60, 230], [120, 300], [300, 280], [355, 350], [24, 360], [190, 200], [250, 40]];

function Sky({ slot }) {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="gp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--a-skyTop)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--a-skyLow)" }} />
        </linearGradient>
      </defs>
      <rect width={FRAME.w} height={FRAME.h} fill="url(#gp-sky)" />
      {STARS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 ? 0.9 : 1.4} style={f("--a-star")} />)}
      <Label slot={slot} y={64} />
    </svg>
  );
}

// The cottage grown into the headland, the tower beside it, the walled garden.
function Approach({ slot }) {
  return (
    <svg {...svgProps}>
      <rect x="0" y="560" width={FRAME.w} height="90" style={f("--a-sea")} />
      {/* headland */}
      <path d="M0 540 C 80 520, 200 548, 300 560 C 340 566, 372 590, 390 640 L390 844 L0 844 Z" style={f("--a-land")} />
      {/* tower, tapered, lamp room glazed */}
      <path d="M252 560 L260 262 L282 262 L290 560 Z" style={f("--a-stoneHi")} />
      <rect x="256" y="208" width="30" height="30" rx="2" style={f("--a-glass")} />
      <path d="M252 208 Q271 184 290 208 Z" style={f("--a-roof")} />
      <rect x="254" y="238" width="34" height="26" style={f("--a-stone")} />
      {/* garden wall, in the lee */}
      <path d="M18 522 L92 518 L92 560 L18 562 Z" style={f("--a-stone")} />
      {/* cottage: low, thick, roof bowed with age */}
      <path d="M86 470 L262 470 L262 562 L86 562 Z" style={f("--a-stone")} />
      <path d="M78 474 Q 172 438 270 474 L 246 432 Q 172 414 102 432 Z" style={f("--a-roof")} />
      <rect x="106" y="486" width="26" height="22" rx="3" style={f("--a-glass")} />
      <rect x="216" y="486" width="26" height="22" rx="3" style={f("--a-glass")} />
      {/* the door, arched, and the path up to it */}
      <path d={`M${DOOR.x - 14} 562 L${DOOR.x - 14} 510 Q${DOOR.x} 494 ${DOOR.x + 14} 510 L${DOOR.x + 14} 562 Z`} style={f("--a-glass")} />
      <path d={`M${DOOR.x - 12} 562 L${DOOR.x + 12} 562 L${DOOR.x + 70} 844 L${DOOR.x - 90} 844 Z`} style={f("--a-path")} />
      <Label slot={slot} />
    </svg>
  );
}

// Inside: the wall, a deep-set window, the table where the book waits. The
// book itself is not painted here — it is the thing that moves.
function Table({ slot }) {
  return (
    <svg {...svgProps}>
      <rect width={FRAME.w} height={FRAME.h} style={f("--a-wall")} />
      <rect x="0" y="420" width={FRAME.w} height="160" style={f("--a-wallLow")} />
      <rect x="44" y="120" width="120" height="170" rx="4" style={f("--a-glass")} />
      <path d="M-20 560 L410 560 L420 844 L-30 844 Z" style={f("--a-table")} />
      <path d="M-20 560 L410 560 L412 580 L-22 580 Z" style={f("--a-tableHi")} />
      <Label slot={slot} />
    </svg>
  );
}

// Light in the lamp room, the doorway and the windows — lit accent, so the
// lamp burns gold in amber and lilac in amethyst.
function Lamplight({ slot }) {
  const glow = (cx, cy, r, o) => <circle cx={cx} cy={cy} r={r} fill="url(#gp-lamp)" opacity={o} />;
  return (
    <svg {...svgProps}>
      <defs>
        <radialGradient id="gp-lamp">
          <stop offset="0" style={{ stopColor: "var(--g-lit)", stopOpacity: 1 }} />
          <stop offset="0.25" style={{ stopColor: "var(--g-lit)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--g-lit)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      {glow(LAMP.x + 1, LAMP.y + 1, 70, 1)}
      <rect x="258" y="210" width="26" height="26" rx="2" style={f("--g-lit")} opacity="0.9" />
      {glow(DOOR.x, DOOR.y + 8, 46, 0.9)}
      {glow(119, 497, 26, 0.7)}
      {glow(229, 497, 26, 0.7)}
      <Label slot={slot} y={92} />
    </svg>
  );
}

function Rain() {
  return (
    <div
      style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "repeating-linear-gradient(100deg, transparent 0 9px, var(--a-rain) 9px 10px, transparent 10px 23px)",
        backgroundSize: "60px 110px",
        animation: "gp-rain 0.9s linear infinite",
      }}
    />
  );
}

function Mist() {
  return (
    <div style={{ position: "absolute", inset: "-10%", animation: "gp-mist 14s ease-in-out infinite" }}>
      <div style={{ position: "absolute", left: "-10%", right: "-10%", top: "52%", height: "22%", borderRadius: "50%", background: "var(--a-mist)", filter: "blur(22px)" }} />
      <div style={{ position: "absolute", left: "10%", right: "-20%", top: "64%", height: "18%", borderRadius: "50%", background: "var(--a-mist)", filter: "blur(28px)" }} />
    </div>
  );
}

// A plain disc in a -50..50 box; the phase is cut by a mask in plates.jsx, so
// a painted moon drops in as a full disc and is shaded the same way.
export function MoonDisc() {
  return (
    <g>
      <circle r="48" style={f("--a-moon")} />
      <circle cx="-14" cy="-10" r="9" style={f("--a-moonDark")} />
      <circle cx="16" cy="14" r="6" style={f("--a-moonDark")} />
    </g>
  );
}
function Moon() {
  return (
    <svg viewBox="-50 -50 100 100" width="100%" height="100%" style={{ display: "block" }}>
      <MoonDisc />
    </svg>
  );
}

export const STANDINS = {
  sky: Sky,
  moon: Moon,
  "approach-front-day": Approach,
  "approach-front-night": Approach,
  "table-day": Table,
  "table-night": Table,
  lamplight: Lamplight,
  rain: Rain,
  mist: Mist,
};
