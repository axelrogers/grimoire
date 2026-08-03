// ─── Grimoire · Stubbed data + selection helpers ──────────────────────────
// In production these come from Supabase / the selection engine; stubbed
// here so every state renders real content.

// Candidate heroes per selection strategy. In production these come from the
// selection engine; here they're stubbed so both states render real content.
export const HEROES = {
  // The hero is a real, authored spell — see CATALOGUE s3.
  personalised: {
    eyebrow: "Protection · still life no. 11",
    title: "Deadline Ward",
    sub: "Hold the week at arm\u2019s length while the work crests.",
    rationale: "as kept by Marisol V., tested across three deadlines",
    price: 42,
    glyph: "⊕",
    catalogueId: "s3",
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
  { id: "severance", label: "Severance", glyph: "☽" },
  { id: "protection", label: "Protection", glyph: "⊕" },
  { id: "sleep", label: "Sleep & Dreams", glyph: "◐" },
  { id: "divination", label: "Divination", glyph: "◉" },
  { id: "healing", label: "Healing", glyph: "❋" },
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
export const hasBody = (s) => Boolean(s?.working && s?.yours && s?.theirs);

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
  // ── Authored. Ported verbatim from the prototype, which is the voice and
  //    design source — prices, chapters, keepers and margin quotes included.
  {
    id: "s1", cat: "severance", chapter: "Ch. II — Severance", page: "· 84 ·",
    title: "Inbox Severance", price: 48, rate: 96, glyph: "☽",
    sub: "Quietly close the loop with someone you keep almost-texting.",
    plate: "Severance · still life no. 04",
    keeper: "Ophelia Márk",
    kept: "as kept by Ophelia Márk, after the Prague manuscript",
    stats: "96% worked · 812 casts · entered 2016",
    working:
      "Quietly close the loop with someone you keep almost-texting. Not an " +
      "unsending; an ending. The working holds for a moon, or until you reply " +
      "— whichever you choose.",
    yours: "Archive the conversation before you sleep. Do not reread it.",
    theirs: "The seal, written at moonrise and kept for seven days.",
    quote: "“It is not silence; it is an ending.”",
    quoteBy: "— Marisol V. · Elder II · from the margin",
  },
  {
    id: "s2", cat: "severance", chapter: "Ch. II — Severance", page: "· 61 ·",
    title: "Ghost Unbinding", price: 36, rate: 89, glyph: "☽",
    sub: "For the one who left without ending it — an unbinding, not a forgetting.",
    plate: "Severance · still life no. 09",
    keeper: "Caleb North",
    kept: "as kept by Caleb North, from the Louisiana folios",
    stats: "89% worked · 407 casts · entered 2019",
    working:
      "For the one who left without ending it. Severance is not forgetting; " +
      "it is letting go of the answer you were owed. Cast once. Do not cast " +
      "it twice for the same ghost.",
    yours: "Delete the thread, tonight, without reading it back.",
    theirs: "The ward, cast at moonrise, held for seven days.",
    quote: "“My part was deleting the thread. The ward held after that.”",
    quoteBy: "— Theo · Adept I · from the margin",
  },
  {
    id: "s3", cat: "protection", chapter: "Ch. III — Protection", page: "· 97 ·",
    title: "Deadline Ward", price: 42, rate: 93, glyph: "⊕",
    sub: "Hold the week at arm’s length while the work crests.",
    plate: "Protection · still life no. 11",
    keeper: "Marisol V.",
    kept: "as kept by Marisol V., tested across three deadlines",
    stats: "93% worked · 611 casts · entered 2021",
    working:
      "A ward for the week the work tries to bury you. It does not move the " +
      "deadline; it moves you out from underneath it, one named hour at a time.",
    yours: "Close the laptop at a named hour tonight. Write the hour down.",
    theirs: "The ward, renewed at each dawn for five days.",
    quote: "“The deadline moved. I did not.”",
    quoteBy: "— Priya · Adept II · from the margin",
  },
  {
    id: "s4", cat: "sleep", chapter: "Ch. V — Sleep & Dreams", page: "· 172 ·",
    title: "Small-Hours Tether", price: 36, rate: 91, glyph: "◐",
    sub: "Bring the racing mind home before midnight.",
    plate: "Sleep · still life no. 02",
    keeper: "Caleb North",
    kept: "as kept by Caleb North, from the Louisiana folios",
    stats: "91% worked · 358 casts · entered 2020",
    working:
      "For the mind that will not come home at night. The tether does not " +
      "force sleep; it shortens the rope, hour by hour, until the bed is " +
      "nearer than the worry.",
    yours: "No screen after the named hour. Leave a glass of water by the bed.",
    theirs: "The tether, sung at moonrise and kept until dawn.",
    quote: "“I slept before the third night. That was the whole spell.”",
    quoteBy: "— Noor · Novice II · from the margin",
  },

  // ── Awaiting Axel. Titles are placeholders; the four above are the target
  //    shape. ~130 words each: working / yours / theirs / quote.
  //    See docs/WRITING-spells.md. Claude does not draft these.
  { id: "s5",  cat: "protection", chapter: "Ch. III — Protection",   title: "⟨spell 5⟩",  price: 0, rate: null, glyph: "⊕" },
  { id: "s6",  cat: "protection", chapter: "Ch. III — Protection",   title: "⟨spell 6⟩",  price: 0, rate: null, glyph: "⊕" },
  { id: "s7",  cat: "severance",  chapter: "Ch. II — Severance",     title: "⟨spell 7⟩",  price: 0, rate: null, glyph: "☽" },
  { id: "s8",  cat: "sleep",      chapter: "Ch. V — Sleep & Dreams", title: "⟨spell 8⟩",  price: 0, rate: null, glyph: "◐" },
  { id: "s9",  cat: "divination", chapter: "Ch. IV — Divination",    title: "⟨spell 9⟩",  price: 0, rate: null, glyph: "◉" },
  { id: "s10", cat: "divination", chapter: "Ch. IV — Divination",    title: "⟨spell 10⟩", price: 0, rate: null, glyph: "◉" },
  { id: "s11", cat: "healing",    chapter: "Ch. VI — Healing",       title: "⟨spell 11⟩", price: 0, rate: null, glyph: "❋" },
  { id: "s12", cat: "healing",    chapter: "Ch. VI — Healing",       title: "⟨spell 12⟩", price: 0, rate: null, glyph: "❋" },
];

// map a category to its accent theme key
export function catAccent(cat) {
  if (cat === "severance") return "oxblood";
  if (cat === "protection") return "gold";
  if (cat === "healing" || cat === "cleansing") return "sage";
  return "goldDeep";
}
