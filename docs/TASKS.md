# Tasks — Grimoire App

Open, in priority order. Checkpoint keeps this current.

Launch scope (18 Sep) = **the practice log**: auth + persistence, twelve
authored spells, cast → hold → verdict, history that survives refresh, rank
from real casts. Marketplace / feed / subscriptions are v2.

## Next
- [ ] Build **Salt Line at the Threshold** out completely as the reference
      spell (full schema, real content — Axel writes the rite).
- [ ] Render the payload in `SuccessState` / `CastSheet` so a cast delivers
      something. This is the prototype → product change.
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
