# Worklog — Grimoire App

Newest session first. Each checkpoint appends a dated entry: what changed,
what's in flight, and anything the next session needs to know.

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
