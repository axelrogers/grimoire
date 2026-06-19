import React, { useState, useEffect } from "react";

// ─── Grimoire · Today hero + three-tap cast funnel ───────────────────────
// Design system (locked prior): parchment / near-black, Cinzel display,
// Crimson Pro body, heraldic gold for high accents. Day theme shown here.
//
// THE CONSTRAINT: intent → cast in three taps.
//   Tap 1  select the hero spell (pre-chosen by the cascade, so no browsing)
//   Tap 2  Apple Pay confirm (Face ID is the auth, not counted as a tap)
//   Tap 3  Cast → success
//
// HERO SELECTION CASCADE:
//   member?  → personalised (their chart + cast history)
//   else     → transits available? astro-aligned : trending
// The card is identical across states; only the selection engine swaps.

// Two modes — Day and Night (locked brand language, not system dark-mode).
// Night is not an inversion: surfaces go to deep ink-blue, text to warm
// parchment, but the accents stay *lit* — gold glows, oxblood/sage deepen.
// Candlelight in a dark room, not a greyscale flip.
const THEME = {
  day: {
    bgFrame: "#2A2622",
    parchment: "#F4EFE4",
    parchmentDeep: "#EBE3D3",
    ink: "#1B1714",
    inkSoft: "#4A423A",
    gold: "#B08544",
    goldDeep: "#8A6630",
    oxblood: "#6E2A2A",
    sage: "#5B6650",
    hair: "#D8CDB8",
    glow: "transparent", // no halo by day
  },
  night: {
    bgFrame: "#08060B",
    parchment: "#15131C", // card/base surface
    parchmentDeep: "#1E1B27", // raised surface
    ink: "#EDE6D6", // primary text (warm parchment)
    inkSoft: "#9C93A8", // secondary text (muted lilac-grey)
    gold: "#E0B868", // lifted, luminous
    goldDeep: "#C99B4A",
    oxblood: "#B65555", // deepened but still lit against dark
    sage: "#8AA07E",
    hair: "#2C2838",
    glow: "rgba(224,184,104,0.35)", // accent halo by night
  },
};

// Candidate heroes per selection strategy. In production these come from the
// selection engine; here they're stubbed so both states render real content.
const HEROES = {
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
function selectStrategy({ isMember, hasChart, hasTransits }) {
  if (isMember) return "personalised";
  if (hasTransits || hasChart) return "astro";
  return "trending";
}

// ── Module data ─────────────────────────────────────────────────────────
// Today's supporting modules are glanceable summaries that tap through to
// their full screen — not the feature itself. Stubbed here.

const PROFILE = {
  rank: "Keeper",
  rankNumeral: "II",
  nextRank: "Practitioner",
  progress: 0.62, // toward next rank
  grimoins: 248,
};

const DAILY_CARD = {
  drawn: false, // becomes true once they pull today
  name: "The Star",
  meaning: "Hope, renewal, a clear sky after weather",
};

const COMMUNITY = [
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
const HISTORY = [
  { id: "h1", title: "Deep Water Severance", when: "Tonight", worked: null, glyph: "☽" },
  { id: "h2", title: "Salt Line at the Threshold", when: "3 days ago", worked: null, glyph: "⊕" },
  { id: "h3", title: "Rent Money Coming In", when: "Last week", worked: true, glyph: "✦" },
  { id: "h4", title: "Smoke & Running Water", when: "Last week", worked: true, glyph: "≈" },
  { id: "h5", title: "Ask the Dark Moon", when: "2 weeks ago", worked: false, glyph: "◉" },
  { id: "h6", title: "Mend the Quiet Ache", when: "Last month", worked: true, glyph: "❋" },
];

const COVEN = [
  { id: "c1", name: "Maeve Rowan", handle: "@maeve", rank: "Adept", numeral: "IV", practitioner: true, craft: "Severance & release", rate: 96, glyph: "☽", last: "cast Still Water Reflection", when: "2m" },
  { id: "c2", name: "Sol", handle: "@sol", rank: "Adept", numeral: "IV", practitioner: false, glyph: "☉", last: "reached Adept", when: "18m" },
  { id: "c3", name: "House of Salt", handle: "@houseofsalt", rank: "Elder", numeral: "V", practitioner: true, craft: "Protection work", rate: 94, glyph: "⊕", last: "warded three thresholds", when: "40m" },
  { id: "c4", name: "June Park", handle: "@junep", rank: "Practitioner", numeral: "III", practitioner: false, glyph: "❋", last: "marked a spell worked", when: "1h" },
  { id: "c5", name: "Wren", handle: "@wren", rank: "Practitioner", numeral: "III", practitioner: true, craft: "Prosperity draws", rate: 91, glyph: "✦", last: "cast The Open Hand", when: "3h" },
  { id: "c6", name: "Tamsin", handle: "@tam", rank: "Keeper", numeral: "II", practitioner: false, glyph: "◐", last: "pulled The Star", when: "5h" },
];

// Testimony surfaced from your circle — community meets the trust mechanic.
const TESTIMONY = [
  { id: "t1", who: "June Park", spell: "Mend the Quiet Ache", note: "Three weeks in. The weight lifted. I didn't expect it to.", when: "1h" },
  { id: "t2", who: "Sol", spell: "Salt Line at the Threshold", note: "House feels like mine again.", when: "yesterday" },
];

const FEATURED = [
  { name: "Oracle Vey", craft: "Severance & release", rate: 96, glyph: "☽" },
  { name: "House of Salt", craft: "Protection work", rate: 94, glyph: "⊕" },
  { name: "Wren", craft: "Prosperity draws", rate: 91, glyph: "✦" },
];

// ── Browse: categories + catalogue ──────────────────────────────────────
// Six categories. Grimoire leans toward inner work and protection — no love
// or influence-over-others spells. That omission is an editorial stance.
const CATEGORIES = [
  { id: "all", label: "All", glyph: "✶" },
  { id: "protection", label: "Protection", glyph: "⊕" },
  { id: "prosperity", label: "Prosperity", glyph: "✦" },
  { id: "severance", label: "Severance", glyph: "☽" },
  { id: "healing", label: "Healing", glyph: "❋" },
  { id: "divination", label: "Divination", glyph: "◉" },
  { id: "cleansing", label: "Cleansing", glyph: "≈" },
];

const CATALOGUE = [
  { id: "s1", cat: "severance", title: "Deep Water Severance", sub: "Cut a tie that's outlived its season", price: 14, rate: 94, glyph: "☽" },
  { id: "s2", cat: "divination", title: "Still Water Reflection", sub: "A scrying rite for what's surfacing", price: 12, rate: 91, glyph: "◉" },
  { id: "s3", cat: "prosperity", title: "Rent Money Coming In", sub: "A fast prosperity draw", price: 9, rate: 89, glyph: "✦" },
  { id: "s4", cat: "protection", title: "Salt Line at the Threshold", sub: "Ward the door against what's unwanted", price: 11, rate: 96, glyph: "⊕" },
  { id: "s5", cat: "cleansing", title: "Smoke & Running Water", sub: "Clear a space that's gone heavy", price: 8, rate: 92, glyph: "≈" },
  { id: "s6", cat: "healing", title: "Mend the Quiet Ache", sub: "Slow healing for a long grief", price: 13, rate: 88, glyph: "❋" },
  { id: "s7", cat: "protection", title: "Mirror Turned Outward", sub: "Return ill intent to its sender", price: 15, rate: 93, glyph: "⊕" },
  { id: "s8", cat: "prosperity", title: "The Open Hand", sub: "Draw steady abundance, not luck", price: 12, rate: 90, glyph: "✦" },
  { id: "s9", cat: "divination", title: "Ask the Dark Moon", sub: "A question put to the new moon", price: 10, rate: 87, glyph: "◉" },
  { id: "s10", cat: "severance", title: "Burn the Last Letter", sub: "Release what you can't stop rereading", price: 11, rate: 91, glyph: "☽" },
  { id: "s11", cat: "cleansing", title: "Wash the Year Off", sub: "A threshold cleanse between seasons", price: 9, rate: 90, glyph: "≈" },
  { id: "s12", cat: "healing", title: "Root & Recover", sub: "Steady the body after depletion", price: 13, rate: 89, glyph: "❋" },
];

// ── APP SHELL ── owns theme + viewer + tab state, draws the phone frame and
// the persistent tab bar, and renders the active view. Today and Browse are
// views inside this shell; the bar is always present.
const TABS = [
  { id: "today", label: "Today", glyph: "✦" },
  { id: "browse", label: "Browse", glyph: "⌕" },
  { id: "coven", label: "Coven", glyph: "◎" },
  { id: "you", label: "You", glyph: "☉" },
];

export default function App() {
  const [mode, setMode] = useState("day");
  const [isMember, setIsMember] = useState(true);
  const [tab, setTab] = useState("today");
  const C = THEME[mode];
  const S = makeStyles(C, mode);

  return (
    <div style={S.frame}>
      <style>{FONTS}</style>

      {/* Dev switcher — not part of the product UI */}
      <div style={S.switcher}>
        <span style={S.switcherLabel}>Viewer</span>
        <button style={seg(isMember, C)} onClick={() => setIsMember(true)}>
          Member
        </button>
        <button style={seg(!isMember, C)} onClick={() => setIsMember(false)}>
          Logged out
        </button>
      </div>

      <div style={S.phone}>
        <div style={S.viewport}>
          {tab === "today" && (
            <TodayView
              mode={mode}
              setMode={setMode}
              isMember={isMember}
              setIsMember={setIsMember}
              C={C}
              S={S}
            />
          )}
          {tab === "browse" && <BrowseView C={C} S={S} />}
          {tab === "coven" && <CovenView C={C} S={S} />}
          {tab === "you" && <YouView C={C} S={S} />}
        </div>

        {/* Persistent tab bar */}
        <div style={S.tabBar}>
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                style={S.tabBtn}
                onClick={() => setTab(t.id)}
              >
                <span
                  style={{
                    ...S.tabGlyph,
                    color: active ? C.gold : C.inkSoft,
                  }}
                >
                  {t.glyph}
                </span>
                <span
                  style={{
                    ...S.tabLabel,
                    color: active ? C.ink : C.inkSoft,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Placeholder for tabs not yet built.
function StubView({ title, S }) {
  return (
    <>
      <div style={S.todayHead}>
        <div style={S.todayTitle}>{title}</div>
      </div>
      <div style={S.emptyState}>
        <div style={S.emptyGlyph}>✦</div>
        <div style={S.emptyText}>{title} is coming soon.</div>
      </div>
    </>
  );
}

function TodayView({ mode, setMode, isMember, setIsMember, C, S }) {
  // Funnel state. idle → pay → cast(tap3) → casting[hold→send] → done
  const [step, setStep] = useState("idle");
  const [phase, setPhase] = useState(null); // hold | send  (within "casting")
  const [taps, setTaps] = useState(0);

  // The held beat. Tap 3 sets step→casting; this drives the timed sequence:
  // stillness (hold) → release (send) → resolve into the success state.
  useEffect(() => {
    if (step !== "casting") return;
    setPhase("hold");
    const t1 = setTimeout(() => setPhase("send"), 2200); // hold, then release
    const t2 = setTimeout(() => {
      setStep("done");
      setPhase(null);
    }, 3600); // send completes → success
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [step]);

  const strategy = selectStrategy({
    isMember,
    hasChart: !isMember,
    hasTransits: true,
  });
  const hero = HEROES[strategy];
  const accent = C[hero.accentKey]; // resolve accent against active theme

  const tap = (next) => {
    setTaps((t) => t + 1);
    setStep(next);
  };

  const reset = () => {
    setStep("idle");
    setPhase(null);
    setTaps(0);
  };

  return (
    <>
      {/* Today header */}
      <div style={S.todayHead}>
        <div style={S.headRow}>
          <div>
            <div style={S.eyebrow}>Thursday · 18 June</div>
            <div style={S.todayTitle}>Today</div>
          </div>
          <button
            style={S.themeToggle}
            onClick={() => setMode(mode === "day" ? "night" : "day")}
            aria-label={mode === "day" ? "Switch to Night" : "Switch to Day"}
          >
            {mode === "day" ? "☾" : "☀"}
          </button>
        </div>
      </div>

      {/* HERO CARD */}
      <div
        style={{
          ...S.card,
          borderTopColor: accent,
          ...(step === "casting" ? S.cardCasting : {}),
        }}
      >
        {/* Card content — dims and recedes while the spell is cast */}
        <div
          style={{
              ...S.cardBody,
              ...(step === "casting" || step === "done"
                ? S.cardBodyMuted
                : {}),
            }}
          >
            <div style={S.cardEyebrow}>{hero.eyebrow}</div>

            {step !== "casting" && step !== "done" && (
              <div style={S.glyphWrap}>
                <span style={{ ...S.glyph, color: accent }}>
                  {hero.glyph}
                </span>
              </div>
            )}

            <div style={S.cardTitle}>{hero.title}</div>
            {step !== "done" && <div style={S.cardSub}>{hero.sub}</div>}
            {step === "idle" && (
              <div style={S.rationale}>{hero.rationale}</div>
            )}
          </div>

          {/* ── FUNNEL ────────────────────────────── */}
          {step === "idle" && (
            // TAP 1 — select the pre-chosen hero
            <button style={S.castBtn} onClick={() => tap("pay")}>
              <span>Cast tonight</span>
            </button>
          )}

          {step === "pay" && (
            <ApplePaySheet
              price={hero.price}
              title={hero.title}
              onConfirm={() => tap("cast")} // TAP 2
              onCancel={reset}
              S={S}
            />
          )}

          {step === "cast" && (
            // TAP 3 — the deliberate act. No price, no checkout language.
            <button
              style={{ ...S.castBtn, background: accent }}
              onClick={() => tap("casting")}
            >
              <span>Cast now</span>
            </button>
          )}

          {/* THE HELD BEAT — stillness, then send. Auto-advances. */}
          {step === "casting" && (
            <CastingBeat
              phase={phase}
              accent={accent}
              glyph={hero.glyph}
              S={S}
              glow={C.glow}
              mode={mode}
            />
          )}

          {step === "done" && (
            <SuccessState hero={hero} accent={accent} onDone={reset} S={S} />
          )}
        </div>

        {/* ── SUPPORTING MODULES ───────────────────────────────
            Glanceable summaries that tap through to their full screen.
            They recede while a cast is in progress so the ritual holds
            the screen, but stay in place (no scroll, no disappearance). */}
        <div
          style={{
            ...S.modules,
            ...(step === "idle" || step === "done" ? {} : S.modulesMuted),
          }}
        >
        <PersonalStrip C={C} S={S} accent={accent} />
        <DailyCard C={C} S={S} />
        <CommunityPeek C={C} S={S} />
        <FeaturedStrip C={C} S={S} />
      </div>
    </>
  );
}

// ── BROWSE ── search, category chips, filtered grid. Tapping a spell opens
// the CastSheet, which routes into the same three-tap cast as Today.
function BrowseView({ C, S }) {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null); // the spell being cast, or null

  const results = CATALOGUE.filter((s) => {
    const inCat = cat === "all" || s.cat === cat;
    const q = query.trim().toLowerCase();
    const inQuery =
      !q || s.title.toLowerCase().includes(q) || s.sub.toLowerCase().includes(q);
    return inCat && inQuery;
  });

  return (
    <>
      <div style={S.todayHead}>
        <div style={S.eyebrow}>Find your spell</div>
        <div style={S.todayTitle}>Browse</div>
      </div>

      {/* Search */}
      <div style={S.searchWrap}>
        <span style={S.searchGlyph}>⌕</span>
        <input
          style={S.searchInput}
          placeholder="Search spells…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Category chips */}
      <div style={S.chipRow}>
        {CATEGORIES.map((c) => {
          const active = c.id === cat;
          return (
            <button
              key={c.id}
              style={{
                ...S.chip,
                ...(active
                  ? { background: C.ink, color: C.parchment, borderColor: C.ink }
                  : {}),
              }}
              onClick={() => setCat(c.id)}
            >
              <span style={{ ...S.chipGlyph, color: active ? C.gold : C.goldDeep }}>
                {c.glyph}
              </span>
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {results.length === 0 ? (
        <div style={S.emptyState}>
          <div style={{ ...S.emptyGlyph, color: C.goldDeep }}>☽</div>
          <div style={S.emptyText}>No spells here yet. Try another category.</div>
        </div>
      ) : (
        <div style={S.grid}>
          {results.map((s) => (
            <button key={s.id} style={S.gridCard} onClick={() => setOpen(s)}>
              <span style={{ ...S.gridGlyph, color: C[catAccent(s.cat)] }}>
                {s.glyph}
              </span>
              <div style={S.gridTitle}>{s.title}</div>
              <div style={S.gridSub}>{s.sub}</div>
              <div style={S.gridFoot}>
                <span style={{ ...S.gridRate, color: C.sage }}>
                  {s.rate}% worked
                </span>
                <span style={S.gridPrice}>${s.price}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {open && (
        <CastSheet
          spell={open}
          C={C}
          S={S}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}

// map a category to its accent theme key
function catAccent(cat) {
  if (cat === "severance") return "oxblood";
  if (cat === "protection") return "gold";
  if (cat === "healing" || cat === "cleansing") return "sage";
  return "goldDeep";
}

// ── CAST SHEET ── opened from Browse. Runs the identical three-tap cast:
// Cast → Apple Pay → Cast now → held beat → success. Same promise everywhere.
function CastSheet({ spell, C, S, onClose }) {
  const accent = C[catAccent(spell.cat)];
  const [step, setStep] = useState("idle");
  const [phase, setPhase] = useState(null);
  const [taps, setTaps] = useState(0);

  useEffect(() => {
    if (step !== "casting") return;
    setPhase("hold");
    const t1 = setTimeout(() => setPhase("send"), 2200);
    const t2 = setTimeout(() => {
      setStep("done");
      setPhase(null);
    }, 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [step]);

  const tap = (next) => {
    setTaps((t) => t + 1);
    setStep(next);
  };

  return (
    <div style={S.sheetScrim} onClick={step === "idle" ? onClose : undefined}>
      <div style={S.sheet} onClick={(e) => e.stopPropagation()}>
        <div style={S.sheetGrip} />
        <div
          style={{
            ...S.card,
            borderTopColor: accent,
            marginTop: 6,
            ...(step === "casting" ? S.cardCasting : {}),
          }}
        >
          <div
            style={{
              ...S.cardBody,
              ...(step === "casting" || step === "done" ? S.cardBodyMuted : {}),
            }}
          >
            <div style={S.cardEyebrow}>
              {CATEGORIES.find((c) => c.id === spell.cat)?.label}
            </div>
            {step !== "casting" && step !== "done" && (
              <div style={S.glyphWrap}>
                <span style={{ ...S.glyph, color: accent }}>{spell.glyph}</span>
              </div>
            )}
            <div style={S.cardTitle}>{spell.title}</div>
            {step !== "done" && <div style={S.cardSub}>{spell.sub}</div>}
            {step === "idle" && (
              <div style={S.rationale}>
                {spell.rate}% of casters marked this one worked.
              </div>
            )}
          </div>

          {step === "idle" && (
            <button style={S.castBtn} onClick={() => tap("pay")}>
              <span>Cast tonight</span>
            </button>
          )}
          {step === "pay" && (
            <ApplePaySheet
              price={spell.price}
              title={spell.title}
              onConfirm={() => tap("cast")}
              onCancel={() => setStep("idle")}
              S={S}
            />
          )}
          {step === "cast" && (
            <button
              style={{ ...S.castBtn, background: accent }}
              onClick={() => tap("casting")}
            >
              <span>Cast now</span>
            </button>
          )}
          {step === "casting" && (
            <CastingBeat
              phase={phase}
              accent={accent}
              glyph={spell.glyph}
              S={S}
              glow={C.glow}
              mode={C.bgFrame === "#08060B" ? "night" : "day"}
            />
          )}
          {step === "done" && (
            <SuccessState
              hero={spell}
              accent={accent}
              onDone={onClose}
              S={S}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── COVEN ── your circle. Members and practitioners; practitioners carry a
// success rate and a "cast with them" affordance. Testimony from the circle
// is woven in — where community meets the trust mechanic. Plus a way to grow.
function CovenView({ C, S }) {
  const [castWith, setCastWith] = useState(null); // practitioner → their spell

  // a practitioner's "cast with" routes into the same three-tap cast,
  // pre-filled with a representative spell from their craft.
  const openCast = (p) => {
    const spell = CATALOGUE.find((s) => p.craft && p.craft.toLowerCase().includes(s.cat))
      || { id: p.id, cat: "protection", title: `Work with ${p.name.split(" ")[0]}`, sub: p.craft, price: 14, rate: p.rate, glyph: p.glyph };
    setCastWith(spell);
  };

  return (
    <>
      <div style={S.todayHead}>
        <div style={S.headRow}>
          <div>
            <div style={S.eyebrow}>Your circle</div>
            <div style={S.todayTitle}>Coven</div>
          </div>
          <button style={S.inviteBtn}>+ Gather</button>
        </div>
      </div>

      {/* Testimony from the circle */}
      {TESTIMONY.length > 0 && (
        <div style={S.testimonyWrap}>
          <div style={S.moduleEyebrow}>Worked, lately</div>
          {TESTIMONY.map((t) => (
            <div key={t.id} style={S.testimony}>
              <div style={S.testimonyNote}>"{t.note}"</div>
              <div style={S.testimonyMeta}>
                <strong style={S.testimonyWho}>{t.who}</strong> · {t.spell} ·{" "}
                {t.when}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* The circle */}
      <div style={S.covenLabel}>
        <span style={S.moduleEyebrow}>Your coven · {COVEN.length}</span>
      </div>
      <div style={S.covenList}>
        {COVEN.map((p) => (
          <div key={p.id} style={S.covenRow}>
            <span style={{ ...S.covenGlyph, color: C.gold }}>{p.glyph}</span>
            <div style={S.covenMid}>
              <div style={S.covenNameRow}>
                <span style={S.covenName}>{p.name}</span>
                {p.practitioner && (
                  <span style={{ ...S.covenBadge, color: C.sage, borderColor: C.hair }}>
                    {p.rate}%
                  </span>
                )}
              </div>
              <div style={S.covenLast}>
                <span style={{ ...S.covenNumeral, color: C.goldDeep }}>
                  {p.numeral}
                </span>{" "}
                {p.practitioner ? p.craft : p.last} · {p.when}
              </div>
            </div>
            {p.practitioner ? (
              <button
                style={{ ...S.castWithBtn, borderColor: C.ink, color: C.ink }}
                onClick={() => openCast(p)}
              >
                Cast
              </button>
            ) : (
              <span style={{ ...S.covenRank, color: C.inkSoft }}>{p.rank}</span>
            )}
          </div>
        ))}
      </div>

      {/* Grow the circle */}
      <button style={S.findMore}>Find practitioners to gather →</button>

      {castWith && (
        <CastSheet
          spell={castWith}
          C={C}
          S={S}
          onClose={() => setCastWith(null)}
        />
      )}
    </>
  );
}

// ── YOU ── progression up top (rank, journey, Grimoins), practice below
// (cast history with the "did it work?" verdict). Pending casts are live —
// marking one feeds the success data that drives the whole trust mechanic.
function YouView({ C, S }) {
  const [history, setHistory] = useState(HISTORY);

  const verdict = (id, worked) =>
    setHistory((h) => h.map((c) => (c.id === id ? { ...c, worked } : c)));

  const resolved = history.filter((c) => c.worked !== null);
  const workedCount = resolved.filter((c) => c.worked).length;
  const successRate = resolved.length
    ? Math.round((workedCount / resolved.length) * 100)
    : null;

  return (
    <>
      <div style={S.todayHead}>
        <div style={S.eyebrow}>Your practice</div>
        <div style={S.todayTitle}>You</div>
      </div>

      {/* PROGRESSION */}
      <div style={S.youCrest}>
        <span style={{ ...S.youNumeral, color: C.gold }}>
          {PROFILE.rankNumeral}
        </span>
        <div style={S.youRankName}>{PROFILE.rank}</div>
        <div style={S.youProgressTrack}>
          <div
            style={{
              ...S.youProgressFill,
              width: `${Math.round(PROFILE.progress * 100)}%`,
              background: C.gold,
            }}
          />
        </div>
        <div style={S.youNext}>
          {Math.round((1 - PROFILE.progress) * 100)}% to {PROFILE.nextRank}
        </div>
      </div>

      {/* Stat row */}
      <div style={S.youStats}>
        <div style={S.youStat}>
          <div style={{ ...S.youStatNum, color: C.gold }}>
            ◉ {PROFILE.grimoins}
          </div>
          <div style={S.youStatLabel}>Grimoins</div>
          <button style={{ ...S.topUpBtn, color: C.goldDeep, borderColor: C.hair }}>
            Top up
          </button>
        </div>
        <div style={S.youStat}>
          <div style={{ ...S.youStatNum, color: C.sage }}>
            {successRate !== null ? `${successRate}%` : "—"}
          </div>
          <div style={S.youStatLabel}>Worked</div>
          <div style={S.youStatSub}>{resolved.length} resolved</div>
        </div>
      </div>

      {/* PRACTICE — cast history */}
      <div style={S.covenLabel}>
        <span style={S.moduleEyebrow}>Cast history</span>
      </div>
      <div style={S.covenList}>
        {history.map((c) => (
          <div key={c.id} style={S.histRow}>
            <span style={{ ...S.covenGlyph, color: C.gold }}>{c.glyph}</span>
            <div style={S.covenMid}>
              <div style={S.covenName}>{c.title}</div>
              <div style={S.covenLast}>{c.when}</div>
            </div>
            {c.worked === null ? (
              <div style={S.verdictBtns}>
                <button
                  style={{ ...S.verdictYes, borderColor: C.sage, color: C.sage }}
                  onClick={() => verdict(c.id, true)}
                >
                  Worked
                </button>
                <button
                  style={{ ...S.verdictNo, borderColor: C.hair, color: C.inkSoft }}
                  onClick={() => verdict(c.id, false)}
                >
                  Not yet
                </button>
              </div>
            ) : c.worked ? (
              <span style={{ ...S.verdictTag, color: C.sage }}>✓ Worked</span>
            ) : (
              <span style={{ ...S.verdictTag, color: C.inkSoft }}>Didn't</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// Apple Pay sheet — Face ID stands in for the system auth; confirm is the tap.
function ApplePaySheet({ price, title, onConfirm, onCancel, S }) {
  return (
    <div style={S.paySheet}>
      <div style={S.payTop}>
        <span style={S.payMark}> Pay</span>
        <button style={S.payClose} onClick={onCancel}>
          ✕
        </button>
      </div>
      <div style={S.payRow}>
        <span style={S.payLabel}>Grimoire</span>
        <span style={S.payVal}>{title}</span>
      </div>
      <div style={S.payRow}>
        <span style={S.payLabel}>Total</span>
        <span style={S.payTotal}>${price}.00</span>
      </div>
      <button style={S.payConfirm} onClick={onConfirm}>
        Confirm with Face ID
      </button>
      <div style={S.payHint}>Double-click the side button</div>
    </div>
  );
}

// The held beat. hold = stillness, the glyph breathing; send = it releases
// upward and dissolves. Drained of UI chrome on purpose — this is the ritual.
function CastingBeat({ phase, accent, glyph, S, glow, mode }) {
  const night = mode === "night";
  // By night the glyph carries a halo and the rings emit light.
  const glyphGlow = night
    ? { textShadow: `0 0 18px ${accent}, 0 0 36px ${glow}` }
    : {};
  const ringGlow = night
    ? { boxShadow: `0 0 14px ${accent}`, borderColor: accent }
    : { borderColor: accent };
  return (
    <div style={S.beat}>
      <div style={S.beatGlyphWrap}>
        {/* concentric rings that pulse outward on send */}
        <span
          style={{
            ...S.ring,
            ...ringGlow,
            ...(phase === "send" ? S.ringSend : {}),
          }}
        />
        <span
          style={{
            ...S.ring,
            ...S.ring2,
            ...ringGlow,
            ...(phase === "send" ? S.ringSend2 : {}),
          }}
        />
        <span
          style={{
            ...S.beatGlyph,
            color: accent,
            ...glyphGlow,
            ...(phase === "hold" ? S.beatGlyphHold : {}),
            ...(phase === "send" ? S.beatGlyphSend : {}),
          }}
        >
          {glyph}
        </span>
      </div>
      <div style={S.beatWord}>
        {phase === "send" ? "Released" : "Casting"}
      </div>
    </div>
  );
}

// The payoff. Not a receipt — confirmation that something is now in motion.
function SuccessState({ hero, accent, onDone, S }) {
  return (
    <div style={S.success}>
      <div style={{ ...S.successGlyph, color: accent }}>{hero.glyph}</div>
      <div style={S.successKicker}>It's done</div>
      <div style={S.successSub}>
        {hero.title} is in motion. Let it work. We'll ask how it landed
        tomorrow.
      </div>
      <button style={S.ghostBtn} onClick={onDone}>
        Back to Today
      </button>
    </div>
  );
}

// ── PERSONAL STRIP ── rank progress + Grimoins, a thin glanceable bar.
function PersonalStrip({ C, S, accent }) {
  return (
    <button style={S.strip}>
      <div style={S.stripRank}>
        <span style={{ ...S.stripNumeral, color: C.gold }}>
          {PROFILE.rankNumeral}
        </span>
        <div style={S.stripRankText}>
          <div style={S.stripRankName}>{PROFILE.rank}</div>
          <div style={S.stripProgressTrack}>
            <div
              style={{
                ...S.stripProgressFill,
                width: `${Math.round(PROFILE.progress * 100)}%`,
                background: C.gold,
              }}
            />
          </div>
          <div style={S.stripNext}>
            {Math.round((1 - PROFILE.progress) * 100)}% to {PROFILE.nextRank}
          </div>
        </div>
      </div>
      <div style={S.stripCoins}>
        <span style={{ ...S.coinGlyph, color: C.gold }}>◉</span>
        <span style={S.coinAmount}>{PROFILE.grimoins}</span>
      </div>
    </button>
  );
}

// ── DAILY CARD ── the free daily ritual draw. No Grimoins cost.
function DailyCard({ C, S }) {
  return (
    <button style={S.module}>
      <div style={S.moduleHead}>
        <span style={S.moduleEyebrow}>Daily draw</span>
        <span style={S.moduleFree}>Free</span>
      </div>
      {DAILY_CARD.drawn ? (
        <div style={S.cardDrawn}>
          <span style={{ ...S.tarotGlyph, color: C.gold }}>✦</span>
          <div>
            <div style={S.tarotName}>{DAILY_CARD.name}</div>
            <div style={S.tarotMeaning}>{DAILY_CARD.meaning}</div>
          </div>
        </div>
      ) : (
        <div style={S.cardUndrawn}>
          <div style={{ ...S.cardBack, borderColor: C.gold }}>
            <span style={{ color: C.gold }}>✦</span>
          </div>
          <div style={S.undrawnText}>Pull today's card</div>
        </div>
      )}
    </button>
  );
}

// ── COMMUNITY PEEK ── three recent acts; taps through to the full feed.
function CommunityPeek({ C, S }) {
  return (
    <div style={S.module}>
      <div style={S.moduleHead}>
        <span style={S.moduleEyebrow}>The coven</span>
        <span style={S.moduleLink}>All activity →</span>
      </div>
      <div style={S.feedList}>
        {COMMUNITY.map((item, i) => (
          <div key={i} style={S.feedRow}>
            <span style={{ ...S.feedDot, background: C.sage }} />
            <span style={S.feedText}>
              <strong style={S.feedWho}>{item.who}</strong> {item.did}
            </span>
            <span style={S.feedWhen}>{item.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FEATURED STRIP ── trusted practitioners; taps through to Browse.
function FeaturedStrip({ C, S }) {
  return (
    <div style={S.module}>
      <div style={S.moduleHead}>
        <span style={S.moduleEyebrow}>Trusted practitioners</span>
        <span style={S.moduleLink}>Browse →</span>
      </div>
      <div style={S.featRow}>
        {FEATURED.map((p, i) => (
          <button key={i} style={S.featCard}>
            <span style={{ ...S.featGlyph, color: C.gold }}>{p.glyph}</span>
            <div style={S.featName}>{p.name}</div>
            <div style={S.featCraft}>{p.craft}</div>
            <div style={{ ...S.featRate, color: C.sage }}>{p.rate}% worked</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Crimson+Pro:ital,wght@0,400;0,500;1,400&display=swap');

@keyframes breathe {
  0%, 100% { transform: scale(1);   opacity: 0.85; }
  50%      { transform: scale(1.07); opacity: 1; }
}
@keyframes rise {
  0%   { transform: translateY(0)    scale(1);   opacity: 1; }
  60%  { transform: translateY(-26px) scale(1.1); opacity: 1; }
  100% { transform: translateY(-70px) scale(0.7); opacity: 0; }
}
@keyframes ringOut {
  0%   { transform: scale(0.6); opacity: 0.5; }
  100% { transform: scale(2.4); opacity: 0;   }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes settleIn {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes sheetUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
`;

const seg = (active, C) => ({
  padding: "5px 12px",
  borderRadius: 7,
  border: "none",
  cursor: "pointer",
  fontSize: 12,
  fontFamily: "system-ui",
  fontWeight: 600,
  background: active ? C.ink : "transparent",
  color: active ? C.parchment : C.inkSoft,
});

const makeStyles = (C, mode = "day") => {
  // The Apple Pay sheet is system UI — it renders dark in dark mode.
  const n = mode === "night";
  const sheet = {
    bg: n ? "#1C1C1E" : "#fff",
    text: n ? "#fff" : "#111",
    textDim: n ? "#8E8E93" : "#888",
    hair: n ? "#2C2C2E" : "#EEE",
    close: n ? "#2C2C2E" : "#EFEFEF",
    closeText: n ? "#aaa" : "#555",
    btnBg: n ? "#fff" : "#000",
    btnText: n ? "#000" : "#fff",
    hint: n ? "#7C7C82" : "#999",
  };
  return {
  frame: {
    minHeight: "100vh",
    background: C.bgFrame,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 16px",
    fontFamily: "'Crimson Pro', Georgia, serif",
    transition: "background 0.5s ease",
  },
  switcher: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: C.parchment,
    padding: "6px 8px",
    borderRadius: 10,
    marginBottom: 18,
  },
  switcherLabel: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: C.inkSoft,
    fontFamily: "system-ui",
    fontWeight: 600,
    marginRight: 2,
  },
  tapCount: {
    fontSize: 11,
    color: C.goldDeep,
    fontFamily: "system-ui",
    fontWeight: 700,
    marginLeft: 4,
    minWidth: 44,
  },
  phone: {
    width: 360,
    maxWidth: "100%",
    height: 720,
    maxHeight: "85vh",
    background: C.parchment,
    borderRadius: 28,
    boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
    transition: "background 0.5s ease",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  viewport: {
    flex: 1,
    overflowY: "auto",
    padding: "26px 20px 16px",
  },
  tabBar: {
    display: "flex",
    borderTop: `1px solid ${C.hair}`,
    background: C.parchment,
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  tabBtn: {
    flex: 1,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "10px 0 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    fontFamily: "'Crimson Pro', Georgia, serif",
  },
  tabGlyph: { fontSize: 18, lineHeight: 1, transition: "color 0.3s ease" },
  tabLabel: {
    fontFamily: "system-ui",
    fontSize: 11,
    letterSpacing: 0.3,
    transition: "color 0.3s ease",
  },
  todayHead: { marginBottom: 20 },
  headRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  themeToggle: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: `1px solid ${C.hair}`,
    background: "transparent",
    color: C.gold,
    fontSize: 17,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    transition: "all 0.3s ease",
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: C.inkSoft,
    fontFamily: "system-ui",
    fontWeight: 600,
  },
  todayTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 30,
    color: C.ink,
    fontWeight: 600,
    marginTop: 2,
  },
  card: {
    background: C.parchmentDeep,
    borderRadius: 18,
    borderTop: "3px solid",
    padding: "22px 20px 20px",
    boxShadow: "0 2px 0 rgba(0,0,0,0.04)",
    transition: "background 0.5s ease",
  },
  cardEyebrow: {
    fontSize: 11.5,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: C.goldDeep,
    fontFamily: "system-ui",
    fontWeight: 700,
  },
  glyphWrap: { textAlign: "center", margin: "10px 0 4px" },
  glyph: { fontSize: 52, lineHeight: 1 },
  cardTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 23,
    color: C.ink,
    fontWeight: 600,
    textAlign: "center",
    marginTop: 6,
  },
  cardSub: {
    fontSize: 16,
    fontStyle: "italic",
    color: C.inkSoft,
    textAlign: "center",
    marginTop: 4,
  },
  rationale: {
    fontSize: 14.5,
    lineHeight: 1.45,
    color: C.inkSoft,
    textAlign: "center",
    margin: "14px 6px 18px",
  },
  castBtn: {
    width: "100%",
    background: C.ink,
    color: C.parchment,
    border: "none",
    borderRadius: 13,
    padding: "15px 18px",
    fontSize: 17,
    fontFamily: "'Cinzel', serif",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  // Apple Pay
  paySheet: {
    background: sheet.bg,
    borderRadius: 14,
    padding: "16px 16px 14px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
  },
  payTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  payMark: {
    fontFamily: "system-ui",
    fontWeight: 600,
    fontSize: 17,
    color: sheet.text,
  },
  payClose: {
    border: "none",
    background: sheet.close,
    width: 26,
    height: 26,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: 12,
    color: sheet.closeText,
  },
  payRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: `1px solid ${sheet.hair}`,
    fontFamily: "system-ui",
    fontSize: 14,
  },
  payLabel: { color: sheet.textDim },
  payVal: { color: sheet.text, fontWeight: 500 },
  payTotal: { color: sheet.text, fontWeight: 700 },
  payConfirm: {
    width: "100%",
    background: sheet.btnBg,
    color: sheet.btnText,
    border: "none",
    borderRadius: 11,
    padding: "13px",
    fontSize: 16,
    fontFamily: "system-ui",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 14,
  },
  payHint: {
    textAlign: "center",
    fontSize: 12,
    color: sheet.hint,
    fontFamily: "system-ui",
    marginTop: 8,
  },
  // Success
  success: {
    textAlign: "center",
    padding: "10px 0 4px",
    animation: "settleIn 0.6s ease both",
  },
  successGlyph: {
    fontSize: 46,
    animation: "settleIn 0.7s ease both",
  },
  successKicker: {
    fontFamily: "'Cinzel', serif",
    fontSize: 21,
    color: C.ink,
    fontWeight: 600,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  successSub: {
    fontSize: 15,
    color: C.inkSoft,
    margin: "10px 18px 20px",
    lineHeight: 1.5,
    fontStyle: "italic",
  },
  ghostBtn: {
    background: "transparent",
    border: `1px solid ${C.hair}`,
    color: C.inkSoft,
    borderRadius: 11,
    padding: "11px 18px",
    fontSize: 14,
    fontFamily: "system-ui",
    fontWeight: 600,
    cursor: "pointer",
  },

  // ── Casting card + held beat ──────────────────────────
  cardBody: { transition: "opacity 0.7s ease" },
  cardBodyMuted: { opacity: 0.32 },
  cardCasting: {
    boxShadow: "0 0 0 1px rgba(0,0,0,0.04), 0 10px 40px rgba(0,0,0,0.10)",
    transition: "box-shadow 0.7s ease",
  },
  beat: {
    textAlign: "center",
    padding: "8px 0 6px",
  },
  beatGlyphWrap: {
    position: "relative",
    height: 110,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  beatGlyph: {
    fontSize: 58,
    lineHeight: 1,
    position: "relative",
    zIndex: 2,
  },
  beatGlyphHold: { animation: "breathe 2.2s ease-in-out infinite" },
  beatGlyphSend: { animation: "rise 1.4s cubic-bezier(.4,0,.2,1) forwards" },
  ring: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: "50%",
    border: "1.5px solid",
    opacity: 0,
    zIndex: 1,
  },
  ring2: { width: 90, height: 90 },
  ringSend: { animation: "ringOut 1.3s ease-out forwards" },
  ringSend2: { animation: "ringOut 1.3s ease-out 0.15s forwards" },
  beatWord: {
    fontFamily: "system-ui",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: C.inkSoft,
    marginTop: 10,
    animation: "fadeUp 0.6s ease both",
  },

  // ── Modules container ──────────────────────────
  modules: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    transition: "opacity 0.5s ease",
  },
  modulesMuted: { opacity: 0.25, pointerEvents: "none" },

  // shared module shell
  module: {
    width: "100%",
    background: C.parchmentDeep,
    border: `1px solid ${C.hair}`,
    borderRadius: 16,
    padding: "14px 16px",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "'Crimson Pro', Georgia, serif",
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  moduleHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  moduleEyebrow: {
    fontFamily: "system-ui",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: 700,
    color: C.inkSoft,
  },
  moduleLink: {
    fontFamily: "system-ui",
    fontSize: 12,
    color: C.goldDeep,
    fontWeight: 600,
  },
  moduleFree: {
    fontFamily: "system-ui",
    fontSize: 10.5,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: 700,
    color: C.sage,
    border: `1px solid ${C.hair}`,
    borderRadius: 20,
    padding: "2px 8px",
  },

  // Personal strip
  strip: {
    width: "100%",
    background: C.parchmentDeep,
    border: `1px solid ${C.hair}`,
    borderRadius: 16,
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    fontFamily: "'Crimson Pro', Georgia, serif",
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  stripRank: { display: "flex", alignItems: "center", gap: 12, flex: 1 },
  stripNumeral: {
    fontFamily: "'Cinzel', serif",
    fontSize: 26,
    fontWeight: 600,
    minWidth: 26,
    textAlign: "center",
  },
  stripRankText: { flex: 1 },
  stripRankName: {
    fontFamily: "'Cinzel', serif",
    fontSize: 15,
    color: C.ink,
    fontWeight: 600,
  },
  stripProgressTrack: {
    height: 4,
    background: C.hair,
    borderRadius: 4,
    margin: "5px 0 3px",
    overflow: "hidden",
  },
  stripProgressFill: { height: "100%", borderRadius: 4 },
  stripNext: {
    fontFamily: "system-ui",
    fontSize: 11,
    color: C.inkSoft,
  },
  stripCoins: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    paddingLeft: 14,
    borderLeft: `1px solid ${C.hair}`,
    marginLeft: 14,
  },
  coinGlyph: { fontSize: 15 },
  coinAmount: {
    fontFamily: "system-ui",
    fontWeight: 700,
    fontSize: 16,
    color: C.ink,
  },

  // Daily card
  cardDrawn: { display: "flex", alignItems: "center", gap: 12 },
  tarotGlyph: { fontSize: 30 },
  tarotName: {
    fontFamily: "'Cinzel', serif",
    fontSize: 16,
    color: C.ink,
    fontWeight: 600,
  },
  tarotMeaning: {
    fontSize: 14,
    fontStyle: "italic",
    color: C.inkSoft,
    marginTop: 1,
  },
  cardUndrawn: { display: "flex", alignItems: "center", gap: 12 },
  cardBack: {
    width: 38,
    height: 52,
    borderRadius: 6,
    border: "1.5px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  undrawnText: {
    fontFamily: "'Cinzel', serif",
    fontSize: 15,
    color: C.ink,
    fontWeight: 500,
  },

  // Community feed
  feedList: { display: "flex", flexDirection: "column", gap: 9 },
  feedRow: { display: "flex", alignItems: "center", gap: 9 },
  feedDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    flexShrink: 0,
  },
  feedText: { fontSize: 14.5, color: C.inkSoft, flex: 1, lineHeight: 1.3 },
  feedWho: { color: C.ink, fontWeight: 600 },
  feedWhen: {
    fontFamily: "system-ui",
    fontSize: 11,
    color: C.inkSoft,
    flexShrink: 0,
  },

  // Featured practitioners
  featRow: { display: "flex", gap: 9 },
  featCard: {
    flex: 1,
    background: C.parchment,
    border: `1px solid ${C.hair}`,
    borderRadius: 12,
    padding: "12px 8px",
    textAlign: "center",
    cursor: "pointer",
    fontFamily: "'Crimson Pro', Georgia, serif",
    transition: "background 0.5s ease",
  },
  featGlyph: { fontSize: 22 },
  featName: {
    fontFamily: "'Cinzel', serif",
    fontSize: 12.5,
    color: C.ink,
    fontWeight: 600,
    marginTop: 5,
    lineHeight: 1.15,
  },
  featCraft: {
    fontSize: 11.5,
    color: C.inkSoft,
    marginTop: 2,
    lineHeight: 1.2,
  },
  featRate: {
    fontFamily: "system-ui",
    fontSize: 10.5,
    fontWeight: 700,
    marginTop: 6,
  },

  // ── Browse ──────────────────────────────────────
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: C.parchmentDeep,
    border: `1px solid ${C.hair}`,
    borderRadius: 12,
    padding: "10px 14px",
    marginBottom: 14,
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  searchGlyph: { fontSize: 16, color: C.inkSoft },
  searchInput: {
    flex: 1,
    border: "none",
    background: "transparent",
    outline: "none",
    fontFamily: "'Crimson Pro', Georgia, serif",
    fontSize: 16,
    color: C.ink,
  },
  chipRow: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    paddingBottom: 4,
    marginBottom: 16,
  },
  chip: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: 5,
    background: C.parchmentDeep,
    border: `1px solid ${C.hair}`,
    borderRadius: 20,
    padding: "7px 13px",
    fontFamily: "'Crimson Pro', Georgia, serif",
    fontSize: 14,
    color: C.ink,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.2s ease, border-color 0.2s ease",
  },
  chipGlyph: { fontSize: 13 },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  gridCard: {
    background: C.parchmentDeep,
    border: `1px solid ${C.hair}`,
    borderRadius: 14,
    padding: "14px 12px 12px",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "'Crimson Pro', Georgia, serif",
    display: "flex",
    flexDirection: "column",
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  gridGlyph: { fontSize: 26, marginBottom: 8 },
  gridTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 14.5,
    color: C.ink,
    fontWeight: 600,
    lineHeight: 1.2,
  },
  gridSub: {
    fontSize: 13.5,
    fontStyle: "italic",
    color: C.inkSoft,
    marginTop: 3,
    lineHeight: 1.3,
    flex: 1,
  },
  gridFoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  gridRate: { fontFamily: "system-ui", fontSize: 10.5, fontWeight: 700 },
  gridPrice: {
    fontFamily: "system-ui",
    fontSize: 14,
    fontWeight: 700,
    color: C.ink,
  },
  emptyState: { textAlign: "center", padding: "48px 20px" },
  emptyGlyph: { fontSize: 34, color: C.inkSoft },
  emptyText: {
    fontSize: 15,
    fontStyle: "italic",
    color: C.inkSoft,
    marginTop: 10,
  },

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
  },

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
  },

  // ── You ─────────────────────────────────────────
  youCrest: {
    textAlign: "center",
    background: C.parchmentDeep,
    border: `1px solid ${C.hair}`,
    borderRadius: 18,
    padding: "22px 20px 18px",
    marginBottom: 12,
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  youNumeral: {
    fontFamily: "'Cinzel', serif",
    fontSize: 44,
    fontWeight: 600,
    lineHeight: 1,
  },
  youRankName: {
    fontFamily: "'Cinzel', serif",
    fontSize: 20,
    color: C.ink,
    fontWeight: 600,
    marginTop: 4,
  },
  youProgressTrack: {
    height: 5,
    background: C.hair,
    borderRadius: 5,
    margin: "14px 0 6px",
    overflow: "hidden",
  },
  youProgressFill: { height: "100%", borderRadius: 5 },
  youNext: { fontFamily: "system-ui", fontSize: 12, color: C.inkSoft },
  youStats: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  youStat: {
    flex: 1,
    background: C.parchmentDeep,
    border: `1px solid ${C.hair}`,
    borderRadius: 14,
    padding: "14px 12px",
    textAlign: "center",
    transition: "background 0.5s ease, border-color 0.5s ease",
  },
  youStatNum: {
    fontFamily: "system-ui",
    fontSize: 20,
    fontWeight: 700,
  },
  youStatLabel: {
    fontFamily: "system-ui",
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: C.inkSoft,
    fontWeight: 600,
    marginTop: 3,
  },
  youStatSub: {
    fontFamily: "system-ui",
    fontSize: 11,
    color: C.inkSoft,
    marginTop: 5,
  },
  topUpBtn: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 12,
    fontFamily: "'Cinzel', serif",
    fontWeight: 500,
    cursor: "pointer",
    marginTop: 7,
  },
  histRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 4px",
    borderBottom: `1px solid ${C.hair}`,
    transition: "border-color 0.5s ease",
  },
  verdictBtns: { display: "flex", gap: 6, flexShrink: 0 },
  verdictYes: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: 12.5,
    fontFamily: "'Cinzel', serif",
    fontWeight: 500,
    cursor: "pointer",
  },
  verdictNo: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: 12.5,
    fontFamily: "'Cinzel', serif",
    fontWeight: 500,
    cursor: "pointer",
  },
  verdictTag: {
    fontFamily: "system-ui",
    fontSize: 12.5,
    fontWeight: 600,
    flexShrink: 0,
  },
  };
};
