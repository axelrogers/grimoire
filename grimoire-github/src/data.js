// ─── Grimoire · Stubbed data + selection helpers ──────────────────────────
// In production these come from Supabase / the selection engine; stubbed
// here so every state renders real content.

// Candidate heroes per selection strategy. In production these come from the
// selection engine; here they're stubbed so both states render real content.
export const HEROES = {
  personalised: {
    eyebrow: "For you · Moon in your 8th",
    title: "Deep Water Severance",
    sub: "Cut a tie that's outlived its season",
    rationale:
      "You've cast three release spells this month. With the Moon transiting your 8th, this one lands.",
    price: 14,
    glyph: "☽",
    accentKey: "oxblood",
  },
  astro: {
    eyebrow: "Tonight · Waning Moon in Scorpio",
    title: "Still Water Reflection",
    sub: "A scrying rite for what's surfacing",
    rationale:
      "Scorpio's waning moon favours looking inward. A strong night for water work.",
    price: 12,
    glyph: "♏",
    accentKey: "sage",
  },
  trending: {
    eyebrow: "Most cast right now",
    title: "Rent Money Coming In",
    sub: "A fast prosperity draw",
    rationale: "412 casts in the last 24 hours. The coven's favourite this week.",
    price: 9,
    glyph: "✦",
    accentKey: "gold",
  },
};

// The cascade. Returns the strategy key for the current viewer.
export function selectStrategy({ isMember, hasChart, hasTransits }) {
  if (isMember) return "personalised";
  if (hasTransits || hasChart) return "astro";
  return "trending";
}

// ── Module data ─────────────────────────────────────────────────────────
// Today's supporting modules are glanceable summaries that tap through to
// their full screen — not the feature itself. Stubbed here.

export const PROFILE = {
  rank: "Keeper",
  rankNumeral: "II",
  nextRank: "Practitioner",
  progress: 0.62, // toward next rank
  grimoins: 248,
};

export const DAILY_CARD = {
  drawn: false, // becomes true once they pull today
  name: "The Star",
  meaning: "Hope, renewal, a clear sky after weather",
};

export const COMMUNITY = [
  { who: "Maeve R.", did: "cast Still Water Reflection", when: "2m" },
  { who: "Sol", did: "reached Adept", when: "18m" },
  { who: "June P.", did: "marked a spell worked", when: "1h" },
];

// ── Coven: your circle ──────────────────────────────────────────────────
// The people you've gathered. Holds both fellow members and practitioners;
// practitioners carry a success rate and a "cast with them" affordance.
// ── You: your practice ──────────────────────────────────────────────────
// Cast history with the "did it work?" state on each — the surface that
// generates the success data feeding the whole trust mechanic. Pending
// verdicts are the hook that brings you back.
export const HISTORY = [
  { id: "h1", title: "Deep Water Severance", when: "Tonight", worked: null, glyph: "☽" },
  { id: "h2", title: "Salt Line at the Threshold", when: "3 days ago", worked: null, glyph: "⊕" },
  { id: "h3", title: "Rent Money Coming In", when: "Last week", worked: true, glyph: "✦" },
  { id: "h4", title: "Smoke & Running Water", when: "Last week", worked: true, glyph: "≈" },
  { id: "h5", title: "Ask the Dark Moon", when: "2 weeks ago", worked: false, glyph: "◉" },
  { id: "h6", title: "Mend the Quiet Ache", when: "Last month", worked: true, glyph: "❋" },
];

export const COVEN = [
  { id: "c1", name: "Maeve Rowan", handle: "@maeve", rank: "Adept", numeral: "IV", practitioner: true, craft: "Severance & release", rate: 96, glyph: "☽", last: "cast Still Water Reflection", when: "2m" },
  { id: "c2", name: "Sol", handle: "@sol", rank: "Adept", numeral: "IV", practitioner: false, glyph: "☉", last: "reached Adept", when: "18m" },
  { id: "c3", name: "House of Salt", handle: "@houseofsalt", rank: "Elder", numeral: "V", practitioner: true, craft: "Protection work", rate: 94, glyph: "⊕", last: "warded three thresholds", when: "40m" },
  { id: "c4", name: "June Park", handle: "@junep", rank: "Practitioner", numeral: "III", practitioner: false, glyph: "❋", last: "marked a spell worked", when: "1h" },
  { id: "c5", name: "Wren", handle: "@wren", rank: "Practitioner", numeral: "III", practitioner: true, craft: "Prosperity draws", rate: 91, glyph: "✦", last: "cast The Open Hand", when: "3h" },
  { id: "c6", name: "Tamsin", handle: "@tam", rank: "Keeper", numeral: "II", practitioner: false, glyph: "◐", last: "pulled The Star", when: "5h" },
];

// Testimony surfaced from your circle — community meets the trust mechanic.
export const TESTIMONY = [
  { id: "t1", who: "June Park", spell: "Mend the Quiet Ache", note: "Three weeks in. The weight lifted. I didn't expect it to.", when: "1h" },
  { id: "t2", who: "Sol", spell: "Salt Line at the Threshold", note: "House feels like mine again.", when: "yesterday" },
];

export const FEATURED = [
  { name: "Oracle Vey", craft: "Severance & release", rate: 96, glyph: "☽" },
  { name: "House of Salt", craft: "Protection work", rate: 94, glyph: "⊕" },
  { name: "Wren", craft: "Prosperity draws", rate: 91, glyph: "✦" },
];

// ── Browse: categories + catalogue ──────────────────────────────────────
// Six categories. Grimoire leans toward inner work and protection — no love
// or influence-over-others spells. That omission is an editorial stance.
export const CATEGORIES = [
  { id: "all", label: "All", glyph: "✶" },
  { id: "protection", label: "Protection", glyph: "⊕" },
  { id: "prosperity", label: "Prosperity", glyph: "✦" },
  { id: "severance", label: "Severance", glyph: "☽" },
  { id: "healing", label: "Healing", glyph: "❋" },
  { id: "divination", label: "Divination", glyph: "◉" },
  { id: "cleansing", label: "Cleansing", glyph: "≈" },
];

// ── The spell body ──────────────────────────────────────────────────────
// A cast is hybrid (DECISIONS.md, 2026-07-27): Grimoire performs the working
// AND the caster gets their part. `performed` is Grimoire's half; materials /
// rite / after / hold are the caster's. Full shape in docs/SPELL-SCHEMA.md §2.
//
// UNWRITTEN CONTENT IS MARKED ⟨like this⟩ and renders visibly as a gap. The
// rites are Axel's to write — these are structural slots, not drafts. Nothing
// with a ⟨slot⟩ left in it should reach a paying caster; `unwrittenSlots()`
// below counts them so that can be enforced rather than remembered.
export const isSlot = (v) => typeof v === "string" && v.startsWith("⟨");
export const hasBody = (s) => Array.isArray(s?.rite) && s.rite.length > 0;

export function unwrittenSlots(spell) {
  const found = [];
  const walk = (v, path) => {
    if (isSlot(v)) found.push(path);
    else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`));
    else if (v && typeof v === "object")
      Object.entries(v).forEach(([k, x]) => walk(x, path ? `${path}.${k}` : k));
  };
  walk(spell, "");
  return found;
}

export const CATALOGUE = [
  { id: "s1", cat: "severance", title: "Deep Water Severance", sub: "Cut a tie that's outlived its season", price: 14, rate: 94, glyph: "☽" },
  { id: "s2", cat: "divination", title: "Still Water Reflection", sub: "A scrying rite for what's surfacing", price: 12, rate: 91, glyph: "◉" },
  { id: "s3", cat: "prosperity", title: "Rent Money Coming In", sub: "A fast prosperity draw", price: 9, rate: 89, glyph: "✦" },
  // s4 is the reference spell — the first built out to the full shape.
  // The other eleven are still title-only and render the short success state.
  {
    id: "s4", cat: "protection", title: "Salt Line at the Threshold",
    sub: "Ward the door against what's unwanted", price: 11, rate: 96, glyph: "⊕",

    premise: "⟨premise — 2–3 sentences, what the working does⟩",

    timing: { window: "after dark", moon: ["waning", "dark"], urgency: "same night" },

    materials: [
      { item: "Coarse salt", note: "Sea or rock. Not table salt.", optional: false },
      { item: "⟨second material⟩", note: "⟨note⟩", optional: false },
    ],
    preparation: "⟨preparation — or delete this line⟩",
    rite: [
      { step: 1, text: "⟨step 1⟩" },
      { step: 2, text: "⟨step 2⟩", spoken: "⟨the line said aloud⟩" },
      { step: 3, text: "⟨step 3⟩" },
    ],
    after: "⟨what to do with what's left⟩",
    hold: "⟨hold — what keeps them with the working until the verdict⟩",

    performed: { at: "the moment of casting", text: "⟨what Grimoire does on their behalf⟩" },

    verdict: { askAfter: "P3D", prompt: "⟨verdict prompt — specific, not 'did it work?'⟩" },

    authored: { by: "Grimoire", rank: null },
  },
  { id: "s5", cat: "cleansing", title: "Smoke & Running Water", sub: "Clear a space that's gone heavy", price: 8, rate: 92, glyph: "≈" },
  { id: "s6", cat: "healing", title: "Mend the Quiet Ache", sub: "Slow healing for a long grief", price: 13, rate: 88, glyph: "❋" },
  { id: "s7", cat: "protection", title: "Mirror Turned Outward", sub: "Return ill intent to its sender", price: 15, rate: 93, glyph: "⊕" },
  { id: "s8", cat: "prosperity", title: "The Open Hand", sub: "Draw steady abundance, not luck", price: 12, rate: 90, glyph: "✦" },
  { id: "s9", cat: "divination", title: "Ask the Dark Moon", sub: "A question put to the new moon", price: 10, rate: 87, glyph: "◉" },
  { id: "s10", cat: "severance", title: "Burn the Last Letter", sub: "Release what you can't stop rereading", price: 11, rate: 91, glyph: "☽" },
  { id: "s11", cat: "cleansing", title: "Wash the Year Off", sub: "A threshold cleanse between seasons", price: 9, rate: 90, glyph: "≈" },
  { id: "s12", cat: "healing", title: "Root & Recover", sub: "Steady the body after depletion", price: 13, rate: 89, glyph: "❋" },
];

// map a category to its accent theme key
export function catAccent(cat) {
  if (cat === "severance") return "oxblood";
  if (cat === "protection") return "gold";
  if (cat === "healing" || cat === "cleansing") return "sage";
  return "goldDeep";
}
