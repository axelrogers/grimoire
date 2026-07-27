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
- [ ] Locate `DESIGN.md` + `tokens.css` and commit them into the repo — they
      aren't versioned with the code and will drift.
- [ ] Reconcile the documented font stack (EB Garamond / Source Serif 4 /
      Instrument Sans / Martian Mono / Cinzel Decorative) with what the code
      actually loads (Cinzel + Crimson Pro). One of the two is out of date.
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
