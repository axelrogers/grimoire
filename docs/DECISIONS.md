# Decisions — Grimoire App

Architecture and key choices, with the "why", so settled ground isn't relitigated.

## 2026-07-20
- **Continuity via Drive snapshots + internal git.** The Cowork workspace is
  ephemeral across sessions, so the project is snapshotted (tar.gz of the whole
  dir incl. .git) to Google Drive at each checkpoint and restored on resume.
  Internal git gives per-session diffs and history without needing a remote host.
  Chosen because Google Drive is already connected and reliable, and no external
  git host was set up.

## Open questions

## 2026-07-27

- **GitHub is the source of truth; Drive is the session harness.** Session 1
  snapshotted an empty scaffold while the real app sat in `axelrogers/grimoire`.
  From here: resume pulls the repo, and a checkpoint is only meaningful if the
  code in it matches what's on GitHub. The working copy keeps the repo's
  `grimoire-github/` folder name so browser-upload paths line up unchanged.

- **`theme.js` split behind a barrel, not a rewrite.** 961 lines in one file
  was going to fight every subsequent change. Split into `src/theme/` by
  surface, with `theme.js` re-exporting `THEME`, `FONTS`, `seg`, `makeStyles`.
  Chosen over changing import sites because the workflow is browser-upload
  only — this way nothing outside `src/theme/` has to be re-uploaded, and the
  split is provably behaviour-preserving (144 style keys deep-equal in both
  palettes) rather than trusted.

- **Content before backend.** The instinct is to start with Supabase, but the
  schema is downstream of what a spell actually contains, and a cast currently
  delivers nothing. Modelling first would mean rebuilding the model. See
  `docs/SPELL-SCHEMA.md`.

- **Claude does not draft the rites.** Structure, pressure-test, edit — yes.
  The spell voice is the product and has to be Axel's.

- **Cast delivery = HYBRID (model C).** Settled by Axel after the 1340
  checkpoint. The app performs the working *and* the caster gets their part —
  a line to say, one thing to do, a window to hold. Chosen over pure
  instruction (copyable, no moat) and pure service (caster receives nothing
  tangible; hardest to defend commercially). The caster's participation is
  also what earns them standing to mark a spell worked, which is what makes
  the verdict data mean anything. `SPELL-SCHEMA.md` §1 is closed; the shape
  in §2 is live.

- **Launch scope cut to THE PRACTICE LOG.** 18 September ships: auth +
  persistence, twelve authored spells with real content, cast → hold →
  verdict, cast history that survives refresh, and rank computed from real
  casts rather than a constant. Deferred to v2: practitioner marketplace and
  payouts, community feed and user-generated testimony, subscriptions;
  Grimoins simplified or cut. Reason: the full pillar set is a funded team's
  quarter. The practice log is a real product on its own, is honest about its
  own numbers, and accumulates the verdict data the v2 trust layer needs —
  which cannot be bought or faked.

## Critical path to 18 September
1. **Spell content** — ~5000 words across twelve spells, Axel writing.
   Reference spell (Salt Line at the Threshold) first; template issued
   2026-07-27.
2. **Workflow off browser-upload** before any backend work begins.
3. **Persistence + auth (Supabase)** — schema follows the spell shape.

## Open questions
- Where do `DESIGN.md` and `tokens.css` live, and why aren't they in the repo?
- Documented font stack (EB Garamond / Source Serif 4 / Instrument Sans /
  Martian Mono / Cinzel Decorative) doesn't match what the code loads
  (Cinzel + Crimson Pro). One record is stale.
- `rate` is hardcoded per spell — derive from real verdicts or hide it.
