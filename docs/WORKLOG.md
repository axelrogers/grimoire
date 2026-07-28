# Worklog — Grimoire App

Newest session first. Each checkpoint appends a dated entry: what changed,
what's in flight, and anything the next session needs to know.

## 2026-07-28 — Session 3 (cont.)

**Built the vessel for spell content.** `SuccessState` used to say "X is in
motion, let it work" — pure model B, the service reading Axel rejected. It now
delivers the caster's half of the hybrid: what Grimoire did, what to gather,
the numbered rite with the spoken line set apart, what to do after, the hold,
and when the verdict fires. Spells with no body fall back to the short form,
so the other eleven are unaffected.

**Unwritten content is visible, not hidden.** Any string starting with `⟨`
renders as a dashed oxblood chip in the running app. `unwrittenSlots(spell)`
in `data.js` counts them so a launch check can enforce "no slots in a paid
spell" rather than relying on memory. Claude did not draft any rite text —
the slots are structural.

**Found a real bug the moment content got longer.** The cast sheet had no
`maxHeight` or `overflowY`. With a four-line success state that never showed;
with a full rite the sheet grew to 1044px inside a 932px frame and — because
the scrim aligns to flex-end — overflowed off the *top*, silently clipping the
title, glyph and Grimoire's part with no way to scroll to them. Fixed and
verified by measurement: sheet now 914px, scrollable, both ends reachable.

**Re-verified the theme split properly.** The earlier check passed a boolean
where a palette belongs, so it never exercised any colour-dependent code. Redone
against the pre-split `theme.js` with real palettes: all 144 original keys
identical in both modes, 23 additions from this session, nothing removed or
changed. Lint is unchanged at the 6 pre-existing errors.

## 2026-07-27 — Session 3

**Killed the browser-upload workflow.** Every change used to ship by hand
through the GitHub web UI, which is why the twelve-file theme split sat
un-pushed for two sessions. Changes now go straight from the workspace:
`scripts/gitsync.sh push "message"` builds first, refuses to push a broken
tree, and lets the Pages workflow redeploy. The credential is a fine-grained
PAT scoped to this one repo, stored in the `Grimoire App` Drive folder and
loaded into `$GRIMOIRE_GH_TOKEN` for the session — it is never written to
disk, to `.git/config`, or into a commit.

**Re-verified the theme split before shipping it,** rather than trusting last
session's note: against `origin/main`'s `theme.js`, `THEME` and `FONTS` are
byte-identical, `makeStyles` is 144/144 keys deep-equal in both palettes, and
`seg()` matches across its argument space.

**Caught a history problem on restore.** The old harness re-`git init`ed on
every restore, so the in-session repo had history unrelated to GitHub's — a
push would have been rejected, and a force-push would have erased the repo's
real history. Fixed by resetting onto `origin/main` before committing. The new
harness clones instead of re-initialising, so this can't recur.

**Brought `docs/` into the repo.** Project memory is now versioned with the
code it describes. Added `docs/WORKFLOW.md`.

**Harness rewritten.** `grimoire-dev` now clones on resume and pushes on
checkpoint; Drive keeps only the small state card. The tar-to-base64-to-Drive
path is retired — it failed twice in one session (tarball outgrew a single
upload and had to be split; one part arrived with a corrupt trailer). The
updated skill was delivered to Axel to save.

**Two repo surprises.** `axelrogers/grimoire` had been renamed to
`grimoire_old` — GitHub's redirect meant the clone worked and nothing looked
wrong until the push came back 403. Axel renamed it back, so `base:
'/grimoire/'` and the Pages URL are unchanged. Separately, `DESIGN.md` and
`tokens.css` turned up in `axelrogers/grimoire-prototype`, a second repo
holding design artifacts — see TASKS.md, the app is off-system.

**Sandbox limits worth knowing:** the Cowork container's proxy blocks
`api.github.com` entirely, so `gitsync.sh deploy-status` can't report and says
so plainly rather than claiming "no runs". Git over HTTPS is unaffected.
Two self-inflicted bugs caught by actually running the thing: `git -c
user.name=Grimoire Dev` word-splits when held in a shell variable (now set via
`GIT_AUTHOR_*` env), and `deploy-status` silently converted an API error into
"no runs found".

**Next session:** spell content. The reference spell (Salt Line at the
Threshold) against the §2 schema, then render the payload in `SuccessState` /
`CastSheet`. Axel writes the rites.

## 2026-07-27 — Session 2

**Reconciled the harness with reality.** Session 1's snapshot claimed the app
"is not yet started". That was wrong: the app has lived on GitHub
(`axelrogers/grimoire`) the whole time and was never captured by a checkpoint.
The two records had diverged for a week. The working copy now mirrors the
repo — `grimoire-github/` keeps its name so browser-upload paths still line up
— and this checkpoint captures actual code for the first time.

**Verified state of the real repo.** Last push `de2284f`, 6 July: the tail of
the monolith split. Nothing since. `npm install` + `npm run build` pass clean
(35 modules, 228 KB / 69 KB gzipped).

**Split `theme.js`** (961 lines) into `src/theme/` behind a barrel:
`palettes`, `fonts`, `controls`, `styles` (composer) and seven per-surface
slices (`shell`, `casting`, `modules`, `browse`, `castSheet`, `coven`, `you`).
`theme.js` re-exports the same four names, so **no component imports change**.
Proved behaviour-preserving: both palettes, all 144 style keys, deep-equal
against the pre-split build. Lint clean in the new files.

**Found the structural gap.** The cast funnel takes payment and returns an
animation plus one sentence. There is no spell content anywhere in the
codebase — the catalogue has titles, taglines, prices and success rates, and
no bodies. Everything else (backend, auth, persistence) is plumbing for a
transaction with nothing on the other side of it. Wrote `docs/SPELL-SCHEMA.md`
as the proposal.

**Blocked on Axel:** §1 of the spell schema — does a cast deliver instruction,
service, or the hybrid? Not a technical question, and the data model, the
content workload and the pricing story all inherit from it.

**Next session:** settle the fork, then build Salt Line at the Threshold out
completely as the reference spell and render it through `CastSheet`.

## 2026-07-20 — Session 1
- Set up the session-continuity harness (`grimoire-dev` skill: resume + checkpoint,
  Drive-backed snapshots, internal git for diffs).
- The app itself is not yet started — scope, stack, and features still to be defined.
  *(Superseded: the app existed on GitHub; Session 1 simply never saw it.)*
- Next session: decide what the grimoire app actually is and choose a stack.
