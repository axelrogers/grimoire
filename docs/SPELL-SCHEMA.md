# Spell schema — proposal

**Status: §1 SETTLED 2026-07-27 — hybrid (model C). The §2 shape is live.**

Written 2026-07-27. The catalogue currently holds twelve spells with a title,
tagline, price, success rate and glyph — and no body. The cast funnel takes
payment and returns an animation. This document is the missing middle.

---

## 1. The fork — what does a cast deliver?

Everything below depends on this, and it isn't a technical question.

**A · Instruction.** The caster buys a working and performs it themselves.
The app supplies words, materials, timing. Value is legible: you can see what
you paid for. Grimoire becomes a spellbook with a very good selection engine.
*Risk:* it's copyable. The moat is curation, voice, and the trust mechanic.

**B · Service.** Grimoire performs the working on the caster's behalf. They
pay, it's done, they wait. This is what the current `SuccessState` copy
implies — *it's in motion, let it work, we'll ask how it landed tomorrow*.
*Risk:* the caster receives nothing tangible. All value rests on belief plus
the success-rate mechanic, and it is the reading most likely to land as
selling nothing — particularly with an audience that is sharp about that.

**C · Hybrid (recommended).** The app carries the working *and* gives the
caster their part: a line to say, one thing to do, a window to hold. The
ritual weight survives, the money has an object, and the caster's
participation is what generates the verdict data the whole trust layer feeds
on. A caster who did nothing has no basis to mark a spell worked.

The schema below assumes **C**, and degrades cleanly to A (drop `performed`)
or B (drop `rite` and `spoken`).

---

## 2. Shape

```js
{
  // ── identity (exists today) ─────────────────────────────
  id: "s4",
  cat: "protection",
  title: "Salt Line at the Threshold",
  sub: "Ward the door against what's unwanted",
  glyph: "⊕",
  price: 11,
  rate: 96,                    // % who marked it worked — derived, not authored

  // ── framing: what this is and when it lands ─────────────
  premise: "",                 // 2–3 sentences. What the working does, plainly.
  timing: {
    window: "after dark",      // human phrasing, shown to the caster
    moon: ["waning", "dark"],  // optional — drives the selection engine
    urgency: "same night",     // or "when you're ready"
  },

  // ── the caster's part ───────────────────────────────────
  materials: [
    { item: "Coarse salt", note: "Sea or rock. Not table salt.", optional: false },
    { item: "A steady hand", note: "", optional: false },
  ],
  preparation: "",             // what to do before. Can be empty.
  rite: [                      // ordered. 3–6 steps is the target.
    { step: 1, text: "" },
    { step: 2, text: "", spoken: "" },   // `spoken` renders as the said line
  ],
  after: "",                   // what to do with what's left
  hold: "Leave the line until it's walked away by itself.",

  // ── Grimoire's part (model C only) ──────────────────────
  performed: {
    at: "the moment of casting",
    text: "",                  // what the app does on their behalf, stated plainly
  },

  // ── the verdict loop ────────────────────────────────────
  verdict: {
    askAfter: "P3D",           // ISO duration — when "did it work?" fires
    prompt: "Did the house settle?",   // spell-specific, not generic
  },

  // ── provenance ──────────────────────────────────────────
  authored: { by: "Grimoire", rank: null },   // later: practitioner-authored
}
```

### Notes on specific fields

- **`rate` is derived, never authored.** It's currently hardcoded per spell,
  which is fine for the prototype and dishonest at launch. It has to come
  from real verdicts or it's a fabricated trust signal — the exact thing the
  mechanic exists to earn. If there isn't enough data at launch, hide the
  number rather than invent it.
- **`verdict.prompt` is per-spell on purpose.** "Did it work?" is weak.
  "Did the house settle?" is the product.
- **`hold`** is the instruction that keeps the caster in relationship with
  the working between cast and verdict. It's the retention mechanic hiding
  inside the ritual, and it costs nothing to write.
- **`performed.text`** is the field that decides whether model C reads as
  substantial or as filler. It should be specific and it should be true to
  the practice, not marketing.

---

## 3. What this costs

Twelve spells × (premise + materials + 3–6 rite steps + spoken lines + after
+ hold + verdict prompt) ≈ **300–500 words of authored content each**.

That is the real work between now and 18 September, and it is **Axel's to
write**, not Claude's. The voice is the product — it's the one thing in the
build that can't be reconstructed from a spec, and a reader will feel the
difference immediately. Claude can structure, pressure-test, edit, and catch
where a line goes explanatory instead of transmitting. Claude should not
draft the rites.

Suggested order: build one out completely as the reference (Salt Line at the
Threshold — protection is the most instructable), confirm it renders through
`CastSheet`, then write the remaining eleven against that template.

---

## 4. Downstream, once §1 is settled

1. `data.js` — extend `CATALOGUE` to the full shape, one spell populated.
2. `CastSheet` / `TodayView` — render the payload in `SuccessState` instead
   of the generic line. This is the change that turns the prototype into a
   product.
3. Then, and only then, the backend: the schema is the table.
