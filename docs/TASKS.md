# Tasks — Grimoire App

Open, in priority order. Checkpoint keeps this current.

**SOFT LAUNCH ~LATE AUGUST**, ahead of the Practical Magic 2 press build-up
(the film releases 18 Sep — that is where the original date came from).
Ship lean and honest, then thicken through the cycle.

Soft-launch scope: accounts + persistence, a seeded catalogue, cast → verdict
that actually records, history that survives refresh. Payment via manual links
or free at first; full Stripe checkout by 18 Sep. Practitioner submission,
moderation and payouts come after launch.

## Next
- [ ] **Write eight thin category seeds** (was: eight full spells). Spells are
      practitioner-driven; these only need to open each category credibly.
      Divination and Healing have nothing at all yet.
- [ ] **BLOCKING: a Supabase project + keys.** Accounts and persistence are the
      long pole and cannot start without them. The schema follows the settled
      spell shape.
- [ ] ~~Write the remaining eight full spells.~~ Superseded: Four are authored and live
      (ported from the prototype); eight slots wait in `data.js` as
      ⟨spell 5⟩…⟨spell 12⟩. ~130 words each — working / theirs / yours /
      quote. Guide at `docs/WRITING-spells.md`. Axel's voice; Claude edits
      but does not draft. `unwrittenSlots()` counts what's left — wire it
      into a launch check so no slot reaches a paying caster.
- [ ] **Payments (Stripe) — now on the critical path.** Blocked on Axel: a
      Stripe account, the selling entity + GST position, and legal input on
      efficacy claims and refunds. ~2 weeks; expect to cut the Browse/Coven/You
      composition port to fit.
- [ ] **Verdict colour has no token.** Collapsing to one accent means
      "worked" and "not yet answered" render identically on cast history and
      the verdict buttons. The trust mechanic is binary and the system has no
      colour for it — needs a decision (see DECISIONS.md).
- [ ] **Eyeball the type-scale snap.** 41 font sizes moved onto the 12-step
      scale; visual rhythm changed and wants a human look, especially the
      casting glyph (58→68).


## Later
- [ ] Persistence + auth (schema follows the spell shape — do not model first).

- [ ] Strip the dev viewer switcher from `App.jsx` before launch.
- [ ] Pre-existing lint: unused `taps` state in `CastSheet` + `TodayView`,
      unused `setIsMember` / `accent`, and setState-inside-effect in both cast
      funnels (React 19 rule). Left alone — touching the effects risks the
      cast animation timing.

## Done
- [x] **Removed the fabricated trust numbers.** `stats` deleted, every `rate`
      nulled; surfaces render "Not yet rated". They return only when derived
      from real verdicts. (2026-08-03)
- [x] **Settled the money question — Stripe on the critical path.** (2026-08-03)
- [x] **Adopt the prototype as canonical content.** Catalogue rewritten to its
      shape and voice; four authored spells ported verbatim with their
      chapters, keepers, prices and margin quotes. (2026-08-03)
- [x] Rebuild the delivered screen to the lean form — working / ours / yours /
      margin quote. No materials list, no numbered steps. (2026-08-03)
- [x] **Retrofit the design system.** Tokens, two palettes × two modes, the
      four real typefaces, italics removed, type scale snapped. (2026-07-28)
- [x] Bring `DESIGN.md` + `tokens.css` into the app repo. (2026-07-28)
- [x] Render the cast payload in `SuccessState` — a cast now delivers the
      caster's part instead of "it's in motion". The prototype → product
      change. (2026-07-28)
- [x] Extend the catalogue to the §2 schema for the reference spell, with
      unwritten content marked as visible ⟨slots⟩. (2026-07-28)
- [x] Fix the cast sheet clipping its own contents — no `maxHeight`/
      `overflowY`, so a full rite overflowed off the *top* of the phone with
      no way to scroll back. (2026-07-28)
- [x] **Get off browser-upload.** `scripts/gitsync.sh` pushes from the
      workspace; build-gated; token never touches disk. See
      `docs/WORKFLOW.md`. (2026-07-27)
- [x] Bring `docs/` into the repo so memory is versioned with the code. (2026-07-27)
- [x] Rewrite the `grimoire-dev` harness around git instead of tarballs. (2026-07-27)
- [x] Settle the cast-delivery model → **hybrid (model C)**. (2026-07-27)
- [x] Cut launch scope to the practice log; marketplace/feed/subs → v2. (2026-07-27)
- [x] Reconcile the Drive harness with the live GitHub repo. (2026-07-27)
- [x] Split `theme.js` into per-surface modules behind a barrel, verified
      behaviour-preserving. (2026-07-27)
- [x] Stand up the resume/checkpoint continuity harness. (2026-07-20)
