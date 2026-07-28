# Tasks — Grimoire App

Open, in priority order. Checkpoint keeps this current.

Launch scope (18 Sep) = **the practice log**: auth + persistence, twelve
authored spells, cast → hold → verdict, history that survives refresh, rank
from real casts. Marketplace / feed / subscriptions are v2.

## Next
- [ ] **Write Salt Line at the Threshold.** The vessel is built and renders;
      every unwritten field shows as a ⟨slot⟩ in the running app. ~400 words,
      Axel's voice. Template issued 2026-07-28. `unwrittenSlots(spell)` in
      `data.js` counts what's left — wire it into a launch check so no spell
      with slots can ship to a paying caster.
- [ ] Write the remaining eleven spells against the reference template.
- [ ] **The app is off the design system.** `DESIGN.md` + `tokens.css` were
      found in `axelrogers/grimoire-prototype` (a second repo — design
      artifacts, HTML prototypes, logo assets). DESIGN.md is dated July 2026
      and calls itself "the source of truth for all visual work — prototype
      iterations and the app rebuild", so **the code is the stale record, not
      the docs**. Specifically:
      - System: EB Garamond (display) / Source Serif 4 (body, upright) /
        Instrument Sans (UI) / Martian Mono (numerals); Cinzel Decorative is
        **brand/wordmark only, never UI copy**.
      - App loads: Cinzel + Crimson Pro only — and uses Cinzel throughout the
        UI, which the system explicitly forbids.
      - Also unimplemented: the amber/amethyst palette axis, the semantic
        `--p-*` / `--g-*` token layer, the 12-step type scale.
      Decide the size of this: retrofit the token layer now, or ship the
      practice log on the current look and align after. Not a small job.
- [ ] Bring `DESIGN.md` + `tokens.css` into the app repo (or a shared
      location) so the design system and the code can't drift again.
- [ ] Decide on `rate`: derive from real verdicts or hide it. Hardcoded
      success rates are a fabricated trust signal at launch.

## Later
- [ ] Persistence + auth (schema follows the spell shape — do not model first).
- [ ] Real payments behind the Apple Pay mock.
- [ ] Strip the dev viewer switcher from `App.jsx` before launch.
- [ ] Pre-existing lint: unused `taps` state in `CastSheet` + `TodayView`,
      unused `setIsMember` / `accent`, and setState-inside-effect in both cast
      funnels (React 19 rule). Left alone — touching the effects risks the
      cast animation timing.

## Done
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
