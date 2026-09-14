// ─── Grimoire · Palettes ──────────────────────────────────────────────────
// Two locked axes, four combinations (DESIGN.md §1):
//   palette — amethyst (default) | amber   ·   mode — day | night
// Palette is a user-selectable identity, not seasonal skinning. Night is
// candlelight, not inversion: grounds go deep, accents stay *lit*.
//
// This file is the ONLY place raw hex is allowed (DESIGN.md rule 1).
// Everything downstream consumes the semantic --p-* / --g-* tokens that
// tokensFor() emits. Adding a palette means adding a ramp here; nothing
// else changes.
//
// Ramps and the token mapping are ported verbatim from the prototype's
// palettesDef()/applyTheme() so the app and the design source agree.

export const PALETTES = {
  amber: {
    accent: "#A97E3F", lit: "#D8A85C", litDeep: "#A97634",
    ink: "#26190E", cream: "#EFE6D6", ground: "#EFE6D6",
    field: "#3E2A1A", fieldHi: "#4A3423", fieldDeep: "#33200F", ctaHi: "#4A3117",
    nightGround: "#16100A", nightPlate1: "#3A2812", nightPlate2: "#1E1204",
    washA: "#D9BE8C", washB: "#C7A06B", glowA: "#8A5A20", glowB: "#6B4415",
    desk: "#BEBAB2", deskText: "#1c1a16",
    nightDesk: "#141009", nightDeskText: "#C9B996",
    glassDay: "rgba(255,253,247,0.6)",
    litRGB: "216,168,92", inkRGB: "38,25,14",
    accentRGB: "169,126,63", fieldRGB: "62,42,26",
  },
  amethyst: {
    accent: "#7B5AA6", lit: "#C3A4E3", litDeep: "#8E6BB8",
    ink: "#241629", cream: "#F0EAF4", ground: "#EFEAF0",
    field: "#3A2547", fieldHi: "#47305A", fieldDeep: "#2B1836", ctaHi: "#4E3563",
    nightGround: "#150E1C", nightPlate1: "#342040", nightPlate2: "#1D1128",
    washA: "#C9B3DE", washB: "#B195CF", glowA: "#5E3E85", glowB: "#4A2F6B",
    desk: "#B9B1BE", deskText: "#1d1822",
    nightDesk: "#110B17", nightDeskText: "#BFAED2",
    glassDay: "rgba(253,251,255,0.6)",
    litRGB: "195,164,227", inkRGB: "36,22,41",
    accentRGB: "123,90,166", fieldRGB: "58,37,71",
  },
};

// Amethyst is the default (Axel, 2026-08-03); amber remains a selectable
// identity. Order here drives the switcher, so the default leads.
export const PALETTE_KEYS = ["amethyst", "amber"];

// The semantic layer. Returns the --p-* / --g-* map for one palette × mode,
// which the app sets on its root element. Mirrors applyTheme() in the
// prototype — if the two ever diverge, the prototype is the source of truth.
export function tokensFor(palette = "amethyst", mode = "day") {
  const P = PALETTES[palette] || PALETTES.amber;
  const night = mode === "night";
  const lit = (a) => `rgba(${P.litRGB},${a})`;
  const inkA = (a) => `rgba(${P.inkRGB},${a})`;

  const v = night
    ? {
        "--p-desk": P.nightDesk,
        "--p-deskText": P.nightDeskText,
        "--p-ground": P.nightGround,
        "--p-text": P.cream,
        "--p-frameBorder": lit(0.22),
        "--p-glow1": P.glowA,
        "--p-glow2": P.glowB,
        "--p-rule": lit(0.3),
        "--p-rule2": lit(0.4),
        "--p-hair": lit(0.12),
        "--p-glass": `rgba(${P.fieldRGB},0.38)`,
        "--p-glassBorder": lit(0.24),
        "--p-cardShadow": "0 12px 30px -14px rgba(0,0,0,0.4)",
        "--p-accent": P.lit,
        "--p-accentSoft": lit(0.16),
        "--p-ctaBg": P.ctaHi,
        "--p-ctaText": P.cream,
        "--p-ctaGold": P.lit,
        "--p-quote": lit(0.5),
        "--p-plate1": P.nightPlate1,
        "--p-plate2": P.nightPlate2,
        "--p-dockActiveBg": P.lit,
        "--p-dockActiveText": P.ink,
      }
    : {
        "--p-desk": P.desk,
        "--p-deskText": P.deskText,
        "--p-ground": P.ground,
        "--p-text": P.ink,
        "--p-frameBorder": inkA(0.12),
        "--p-glow1": P.washA,
        "--p-glow2": P.washB,
        "--p-rule": inkA(0.3),
        "--p-rule2": inkA(0.35),
        "--p-hair": inkA(0.08),
        "--p-glass": P.glassDay,
        "--p-glassBorder": "rgba(255,255,255,0.75)",
        "--p-cardShadow": `0 12px 30px -14px ${inkA(0.22)}`,
        "--p-accent": P.accent,
        "--p-accentSoft": `rgba(${P.accentRGB},0.14)`,
        "--p-ctaBg": P.field,
        "--p-ctaText": P.cream,
        "--p-ctaGold": P.lit,
        "--p-quote": `rgba(${P.accentRGB},0.5)`,
        "--p-plate1": P.fieldHi,
        "--p-plate2": P.fieldDeep,
        "--p-dockActiveBg": inkA(0.88),
        "--p-dockActiveText": P.cream,
      };

  // Plates are dark in both modes, so they need their own text colour.
  // Without this, day mode puts dark ink on a dark plate — invisible.
  v["--p-plateText"] = P.cream;
  v["--p-plateTextSoft"] = `rgba(${rgbOf(P.cream)},0.66)`;

  v["--g-lit"] = P.lit;
  v["--g-ink"] = P.ink;
  v["--p-litDeep"] = P.litDeep;
  v["--p-litSoft"] = lit(0.16);
  v["--p-litLine"] = lit(0.55);

  // ── System-change proposal, not a one-off exception (DESIGN.md rule 4) ──
  // The design system has one text token and mutes secondary copy with
  // `opacity` (the prototype uses 0.45–0.7 throughout). Inline React styles
  // apply opacity to an element *and its children*, so that technique breaks
  // on any node that isn't a leaf. These two tokens express the same intent
  // as colour instead, at the two opacities the prototype actually uses.
  // If DESIGN.md is updated, they belong in it.
  //
  // Derived from --p-text itself (cream by night, ink by day) — NOT from the
  // lit accent, or muted copy would come out gold/lilac tinted.
  const textA = (a) => `rgba(${night ? rgbOf(P.cream) : P.inkRGB},${a})`;
  v["--p-textSoft"] = textA(0.62);
  v["--p-textFaint"] = textA(0.45);
  return v;
}

// "#EFE6D6" → "239,230,214"
function rgbOf(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h,
    16,
  );
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

// ── The arrival's stand-in plates ──────────────────────────────────────
// Neutral greys for the provisional house (ARRIVAL.md decision 9). They are
// set by the REAL sky's day/night, not the app's mode toggle — the house is
// outside, and it's dark when it's dark. Palette reaches the house as a
// colour grade over these (--p-glow1), never as separate art; the lamp burns
// in the lit accent (--g-lit). Final paintings replace the plates, and most
// of these tokens go with them.
export function arrivalTokens(night) {
  return night
    ? {
        "--a-skyTop": "#0B0F1C", "--a-skyLow": "#1E2536", "--a-star": "rgba(255,255,255,0.75)",
        "--a-sea": "#10172A", "--a-land": "#090C13", "--a-stone": "#252A34",
        "--a-stoneHi": "#343A46", "--a-roof": "#171A21", "--a-glass": "#0E1117",
        "--a-path": "#1B1F28", "--a-wall": "#221F1C", "--a-wallLow": "#171513",
        "--a-table": "#3A2D21", "--a-tableHi": "#4A3A2B", "--a-book": "#2B1E18",
        "--a-page": "#EDE6D8", "--a-moon": "#E9E5D9", "--a-moonDark": "rgba(233,229,217,0.07)",
        "--a-mist": "rgba(196,202,214,0.20)", "--a-rain": "rgba(196,206,222,0.34)",
        "--a-label": "rgba(255,255,255,0.5)", "--a-gradeOpacity": "0.42",
      }
    : {
        "--a-skyTop": "#9DB2C6", "--a-skyLow": "#DBE1E4", "--a-star": "rgba(255,255,255,0)",
        "--a-sea": "#6D8596", "--a-land": "#56604E", "--a-stone": "#8B8983",
        "--a-stoneHi": "#A5A39C", "--a-roof": "#5D5953", "--a-glass": "#3B3F45",
        "--a-path": "#A49B88", "--a-wall": "#B7AA97", "--a-wallLow": "#998D7B",
        "--a-table": "#6D5943", "--a-tableHi": "#846F59", "--a-book": "#4A3428",
        "--a-page": "#F4EEE2", "--a-moon": "#F4F2EC", "--a-moonDark": "rgba(244,242,236,0.12)",
        "--a-mist": "rgba(238,240,244,0.45)", "--a-rain": "rgba(88,98,114,0.34)",
        "--a-label": "rgba(0,0,0,0.45)", "--a-gradeOpacity": "0.3",
      };
}

// ── Compatibility shim ─────────────────────────────────────────────────
// Some components still take a palette object and read a couple of concrete
// values (the casting beat needs a real colour for its glow, and the Apple
// Pay sheet is iOS system UI that sits outside the design system). They get
// resolved values here rather than reaching for hex themselves.
export function paletteMeta(palette = "amethyst", mode = "day") {
  const P = PALETTES[palette] || PALETTES.amber;
  const night = mode === "night";
  return {
    night,
    accent: night ? P.lit : P.accent,
    glow: night ? `rgba(${P.litRGB},0.35)` : "transparent",
  };
}
