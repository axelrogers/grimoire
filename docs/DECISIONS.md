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

- **Push to GitHub from the workspace; retire browser-upload.** Hand-uploading
  through the web UI stranded a twelve-file change for two sessions and made
  every refactor cost more than it was worth. `scripts/gitsync.sh` now pushes
  directly, gated on a passing build. The credential is a fine-grained PAT
  scoped to `axelrogers/grimoire` with Contents: read+write, held in Drive and
  loaded into `$GRIMOIRE_GH_TOKEN` — chosen over pasting it per session
  (breaks unattended runs) and over the desktop bridge (only works when the
  desktop app is open). Blast radius if it leaks is one already-public repo.

- **GitHub is the backup; Drive keeps only the state card.** The tar → base64
  → Drive snapshot path failed twice in one session: the tarball outgrew a
  single Drive upload and had to be hand-split, and one part arrived with a
  corrupt gzip trailer. A real git remote gives real history, diffs and
  integrity checking for free. Drive still holds the small state card, because
  briefing the next session shouldn't require cloning anything.

- **The harness clones; it never re-`git init`s.** The old restore path
  initialised a fresh repo, producing history unrelated to GitHub's — a push
  would be rejected and a force-push would erase the repo's real history.
  Cloning inherits history, so pushes are ordinary fast-forwards.

- **Commits are authored `Grimoire Dev <grimoire@local>`.** A tooling hook
  wanted them rewritten to an Anthropic address on the grounds that it would
  make GitHub show them as Verified. It wouldn't: that badge requires a
  cryptographic signature (GPG/SSH/S-MIME) with the key registered to the
  account, or a commit made through GitHub's own UI — the committer email has
  nothing to do with it. Keeping the project's own identity. If verified
  commits are ever actually wanted, the answer is an SSH signing key, not an
  email change.

- **`docs/` lives in the repo.** Project memory is versioned with the code it
  describes, so the two can't drift the way the harness and the repo did.

## 2026-07-28 — design system

- **Retrofit the design system now, before spell content.** Reverses the
  27 July "ship the practice log first, align after" call. Axel's read: the
  aesthetic was too far from finished to keep building on. Doing it first
  means everything written afterwards lands correct instead of needing a
  second pass.

- **One accent per palette; `catAccent()` is gone.** DESIGN.md §1 defines
  accent at the palette level (amber `#A97E3F`, amethyst `#7B5AA6`). The app
  had per-category accents — gold/oxblood/sage by spell category. Those two
  models can't both hold, and the system wins. Cost, accepted knowingly: a
  severance spell and a prosperity spell now look identical.

- **Cinzel and Crimson Pro are gone.** They predated DESIGN.md. The app now
  loads EB Garamond (display), Source Serif 4 (body, upright), Instrument
  Sans (UI) and Martian Mono (numerals). Cinzel Decorative is defined as the
  brand face but deliberately NOT loaded — no wordmark component exists yet,
  and loading a decorative face nobody renders is pure download cost.

- **Italics removed app-wide** (DESIGN.md rule 2). Nine uses, including the
  spoken-line style added earlier the same day.

- **Font sizes snapped to the 12-step scale.** Thirty distinct sizes became
  eleven on-scale ones; 41 individual values moved (e.g. 14.5→14, 15→16,
  58→68). This changes visual rhythm and wants Axel's eye.

- **Colour lives in tokens, not in components.** `tokensFor(palette, mode)`
  emits the `--p-*`/`--g-*` map ported verbatim from the prototype's
  `applyTheme()`; the app sets it on its own frame rather than `:root`, so
  the system is scoped to the subtree and two palettes could be rendered
  side by side. `palettes.js` is the only file allowed raw hex.

### Open — system-change proposals, not silent exceptions (DESIGN.md rule 4)

- **`--p-textSoft` / `--p-textFaint` were added.** The system has one text
  token and mutes secondary copy with `opacity`, but inline React styles
  apply opacity to an element *and its children*, so that technique breaks on
  any non-leaf node. These express the same intent as colour, at the
  opacities the prototype actually uses. If accepted, they belong in
  DESIGN.md.
- **There is no verdict colour.** `C.sage` was carrying real meaning —
  "worked" on cast history, the affirmative verdict button, success rates.
  Collapsing to one accent means worked and not-yet-answered now render
  identically. The product's core mechanic is a binary verdict and the design
  system has no token for it. Needs Axel.

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

## 2026-07-28 — composition

- **Port the prototype's composition, screen by screen.** The React app and
  `axelrogers/grimoire-prototype` are the same product at two different
  levels of finish, and the prototype is the further along. The gap isn't
  colour — that was fixed by the token retrofit — it's *scale contrast,
  spacing and atmosphere*. The app had no dominant element, so nothing read
  as ceremonial; it read as a list.

- **What the prototype actually does** (measured, not eyeballed, by running
  it locally with React/Babel vendored from npm since the sandbox blocks
  unpkg): display line at 44px EB Garamond, tracking −0.01em, line-height 1;
  hero folio as a glass card (radius 20, `--p-glass`, `--p-glassBorder`,
  `--p-cardShadow`) leading with a 150px image well; spell title 30px;
  body 16px Source Serif 4 at 1.4; eyebrows 10px uppercase at 0.22em tracking
  and 0.6 opacity; CTA a 100-radius pill in `--p-ctaBg`/`--p-ctaGold`,
  Instrument Sans 12px at 0.14em; dock a floating pill, not a bordered strip;
  frame radius 48 with a lit hairline.

- **Two blurred glow orbs carry the atmosphere.** 300×300 circles at
  `blur(80px)/0.33` and `blur(85px)/0.25` behind the content, in `--p-glow1`
  and `--p-glow2`. This is most of the depth. Without them the ground reads
  flat and each card has to carry the mood alone.

- **Deferred v2 features stay out of the port.** The prototype's hero carries
  a verified-practitioner row and an oath module — marketplace and
  subscription, both cut to v2. The composition is adapted around their
  absence rather than dragging the scope back in.

### Open
- **Content is not reconciled.** The prototype and the app have different
  spells (*Deadline Ward*, *Still Life No. 11* vs *Deep Water Severance*),
  different copy voice and a different Today IA. Which is canonical is
  undecided, and it directly affects the spell-writing task.
