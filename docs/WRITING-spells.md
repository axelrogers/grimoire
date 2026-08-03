# Writing the remaining eight spells

**Supersedes `WRITING-salt-line.md`, which was wrong.** That template asked for
a materials list and three to six numbered rite steps. The prototype — which is
the voice source — does none of that. A spell is about **130 words**, not 400,
and the caster's part is *one instruction*.

Four are already written and live in `data.js`. They are the target. Eight to go.

---

## The shape

Four fields carry the spell. Everything else is metadata.

| field | what it is | length |
|---|---|---|
| `working` | what the spell does, and its limit | 2–3 sentences |
| `theirs` | what Grimoire does, in the book's voice | 1 line |
| `yours` | one concrete thing the caster does tonight | 1–2 lines |
| `quote` + `quoteBy` | a voice from the margin | 1 line + attribution |

Plus: `title`, `sub` (the blurb), `price`, `chapter`, `keeper`, `plate`.

---

## The four that work — read these before writing

**Ghost Unbinding** · $36 · Ch. II — Severance

> **working:** For the one who left without ending it. Severance is not
> forgetting; it is letting go of the answer you were owed. Cast once. Do not
> cast it twice for the same ghost.
> **theirs:** The ward, cast at moonrise, held for seven days.
> **yours:** Delete the thread, tonight, without reading it back.
> **quote:** "My part was deleting the thread. The ward held after that."
> — Theo · Adept I · from the margin

**Deadline Ward** · $42 · Ch. III — Protection

> **working:** A ward for the week the work tries to bury you. It does not move
> the deadline; it moves you out from underneath it, one named hour at a time.
> **theirs:** The ward, renewed at each dawn for five days.
> **yours:** Close the laptop at a named hour tonight. Write the hour down.

**Inbox Severance** · $48 · Ch. II — Severance

> **working:** Quietly close the loop with someone you keep almost-texting. Not
> an unsending; an ending. The working holds for a moon, or until you reply —
> whichever you choose.
> **theirs:** The seal, written at moonrise and kept for seven days.
> **yours:** Archive the conversation before you sleep. Do not reread it.

**Small-Hours Tether** · $36 · Ch. V — Sleep & Dreams

> **working:** For the mind that will not come home at night. The tether does
> not force sleep; it shortens the rope, hour by hour, until the bed is nearer
> than the worry.
> **theirs:** The tether, sung at moonrise and kept until dawn.
> **yours:** No screen after the named hour. Leave a glass of water by the bed.

---

## What those four are doing (worth naming, so the next eight match)

**Each `working` states a limit.** *It does not move the deadline.* *Not an
unsending; an ending.* *Do not cast it twice for the same ghost.* The spell says
what it won't do — that's what makes it credible rather than salesy.

**Each `yours` is checkable tonight.** Delete the thread. Close the laptop at a
named hour. Archive it before you sleep. Not "reflect on" or "set an
intention" — a thing that either happened or didn't. This is also what earns the
caster standing to mark the spell worked.

**Each `theirs` is one clause in the same grammar.** *The ward, renewed at each
dawn for five days.* Noun, then when, then how long. Never explained, never
justified.

**The subject is modern, the register isn't.** Inboxes, deadlines, people who
ghost you. The tension between contemporary problem and old-book voice is the
product.

**No second person plural, no reassurance.** Nobody is told it will be okay.

---

## The eight to write

Slots are already in `data.js` as `⟨spell 5⟩` … `⟨spell 12⟩`:

| id | chapter | note |
|---|---|---|
| s5, s6 | Ch. III — Protection | one has *Deadline Ward* as a neighbour, so go somewhere else |
| s7 | Ch. II — Severance | third severance; the other two are relational — a non-relational one would widen the chapter |
| s8 | Ch. V — Sleep & Dreams | pairs with *Small-Hours Tether* |
| s9, s10 | Ch. IV — Divination | no divination spell exists yet; these set the chapter's tone |
| s11, s12 | Ch. VI — Healing | likewise |

Pricing sits between $36 and $48 in the four written. Anything outside that
wants a reason.

---

## How to send them

Write them however's fastest — the four fields per spell, in any format. Paste
back here and I'll put them into `data.js`, rebuild, and send you the real
screen. Rough is fine; pressure-testing, cutting, and catching where a line goes
explanatory instead of transmitting is work I can do on your draft.

**I don't draft the rites.** The voice is the product and it's yours.

---

## Two things still undecided that touch this

- **`rate` is hardcoded** (96%, 89%, 93%, 91% came across with the spells). At
  launch it either derives from real verdicts or gets hidden — a fabricated
  trust signal is the one thing this product can't afford.
- **`stats` carries cast counts and "entered 2016" dates** for spells that have
  never been cast. Same problem, same choice.
