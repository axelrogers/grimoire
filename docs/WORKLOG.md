# Worklog — Grimoire App

Newest session first. Each checkpoint appends a dated entry: what changed,
what's in flight, and anything the next session needs to know.

## 2026-08-17 — Session 6

**The backlog shipped.** Axel pushed the three stranded commits from his Mac
overnight, so `origin/main` opened this session at `d1eb7df` and the 12-day
block is over. Pushes are still refused from Cowork sessions by the git proxy —
that is unchanged and not worth retrying. The working pattern now is: commit
locally, `git bundle create <file> origin/main..main`, and send the bundle
straight to Axel as a file. No base64, no Drive round trip, no splitting.

**Supabase is wired.** Keys arrived in Drive; `.env.local` (gitignored)
activates the hosted backend and `store.backend === "supabase"` is verified —
by building a probe entry through Vite and running it under node, since
`*.supabase.co` is blocked here and always will be. **The thing that would
have bitten at launch:** Vite inlines `VITE_*` at build time and GitHub Actions
never sees `.env.local`, so the Pages build was going to ship the browser-local
store — sign-in working per-browser, nothing persisting across devices, and no
error anywhere. `deploy.yml` now takes both values from repository secrets and
warns loudly in the run summary if they are missing. Axel adds the secrets;
sign-in itself is unverifiable from here and is his to test in a real browser.

**Stripe, app side.** Payment links, per the 17 Aug decision. `src/payment.js`
is the whole integration: four link slots, `beginPayment` out, `consumeReturn`
back. A caster with a live link leaves for Stripe and returns to `?paid=<id>`;
App resumes the sheet at the held beat and the working is delivered. The
dashboard half is a click-list (`docs/STRIPE-payment-links.md`) because
`api.stripe.com` is blocked and because links made by hand need no key in the
app at all.

Two things worth carrying forward. A paid return **with no session** used to
deliver the working and silently lose the cast; the claim is now held in
`localStorage` and written the moment a session exists — App owns that write,
CastSheet deliberately does not, or it would record twice. And the return trip
**cannot be verified without a server**: that is inherent to payment links, and
the trade, its exposure and the signal to escalate are written into
`payment.js` rather than left as folklore.

**Coven and You ported** to the prototype's composition, following Browse:
ruled masthead, volume cards, rows with dotted leaders. Both read as sections
of one book now. What did not come across: the invented aggregates ("12,048
hands", "341 gathered") — every figure is counted from data present — and
"Tonight's circle", which draws a feature that does not exist. Two smaller
corrections fell out of the port: the Grimoins label and "Top up" button were
still sitting on the real cast count months after DECISIONS said Grimoins were
cut, and Coven's "cast with a practitioner" invented a $14 spell when nothing
in the catalogue matched. Both gone.

**Verified this session:** build passes; lint at the 5 pre-existing errors;
all four palette x mode combinations render both new screens with no page
errors; payment return resumes the cast, records it exactly once, does not
replay on reload, refuses an unknown spell id, and holds the claim when
unsigned. Not verified, and not verifiable from here: Supabase sign-in, any
Stripe call, and typography (`fonts.googleapis.com` is blocked).

**Next session:** if Axel has added the secrets and tested sign-in, the live
e2e is done and the remaining launch work is the eight seeds (his), the amber
day-mode contrast, the verdict colour token, and a launch-readiness pass
(error states, device sizes, strip the dev switcher).

## 2026-08-05 — Session 5

**PUSHES ARE BLOCKED BY THE SANDBOX** as of this session: the git proxy
refuses to forward ANY credential for axelrogers/grimoire ("not in this
session's authorized repository set"). Reads work; the token is valid (same
token pushed fine on 08-03). NOT a token problem — do not chase the PAT.
Fix: a session with the repo attached as a source, or apply the Drive bundle
from any push-capable environment. Unpushed commits are bundled to the
Grimoire App Drive folder (grimoire-unpushed-*.bundle.b64) with restore
instructions inline. Update the bundle at every checkpoint.

**Built this session:** the auth surface (sign the record on You, prototype
onboarding voice, magic-link pending state, cast guard so payment is never
taken for a cast that can't be kept); the verdict loop ("The book asks" on
Today for casts held overnight — nothing is asked before the day turns, or
the verdict is worthless); and the Browse port — the Grand Index, measured
from the prototype's index screen (34px masthead, TOC rows with dotted
leaders, real counts and page ranges computed from the catalogue, chapter
view with 44px head, the one authored epigraph ported verbatim, ledger rows,
a voice from the margin, concordance search in-voice).

**Two testing lessons:** innerText returns CSS-uppercased text, so
case-sensitive assertions silently lie about visible content (an hour of
debugging a sheet that was open the whole time); and the four-way suite
needed updating for the new Browse IA — a ported screen changes navigation,
so the tests that walk it must move too.

## 2026-08-03 — Session 4

**The spells were already written.** Reading the prototype's source for the
content-reconciliation decision turned up four fully authored spells — Inbox
Severance, Ghost Unbinding, Deadline Ward, Small-Hours Tether — in a settled
voice, with chapters, keepers, prices ($36–48) and margin quotes. More
importantly they already implement the hybrid model as `yours` / `theirs`,
which the app decided independently on 27 July. `SPELL-SCHEMA.md` had
reinvented, more heavily, something that already existed.

**Three corrections to what I told Axel earlier the same session:** the
writing was not "~5000 words not started" — four of twelve exist and the
prototype's spells run ~130 words, so the remaining work is nearer 1000 words
across eight. The template I issued on 28 July was wrong for this voice (it
asked for materials lists and numbered rite steps the prototype never uses)
and has been deleted. And the app's prices were 3–4× under.

**Adopted the prototype as canonical.** Catalogue rewritten to its shape, the
four spells ported verbatim, categories reworked to its chapters (Severance,
Protection, Sleep & Dreams, Divination, Healing), eight ⟨slots⟩ left for
Axel. `SuccessState` rebuilt to the lean form: what the working is, ours,
yours, and a voice from the margin. `hasBody()` now keys off the authored
fields rather than a rite array.

**A test that was asserting the wrong thing.** The four-way check required the
cast sheet to be scrollable — true for the long rite, meaningless for the lean
form, which fits. Rewritten to assert what matters: the end of the working is
reachable, whether by fitting or by scrolling.

## 2026-07-28 — Session 3 (design system)

**Retrofitted the design system**, reversing the "ship first, align later"
call — Axel's read was that the aesthetic was too far off to keep building on.
`DESIGN.md` and `tokens.css` are now in the repo, and colour flows through the
`--p-*`/`--g-*` token layer ported verbatim from the prototype's
`applyTheme()`. `palettes.js` is the only file holding raw hex. Two palettes
(amber, amethyst) × two modes, all four verified end to end.

**Cinzel and Crimson Pro are gone** — EB Garamond, Source Serif 4, Instrument
Sans and Martian Mono in their place. Italics removed app-wide per rule 2.
197 palette references and 41 font sizes rewritten.

**Two bugs the mechanical sweep introduced, both caught before pushing:**
`CastSheet` detected night mode by comparing a hex string that the sweep had
turned into `"var(--p-desk)"`, so the condition was permanently false and the
casting beat silently lost its glow. And stripping the now-unused `C` prop
from `BrowseView`/`CovenView` broke the `CastSheet` they render — lint caught
`'C' is not defined` where the build did not, since Vite doesn't type-check.

**What I could not verify here:** the sandbox proxy blocks
`fonts.googleapis.com`, so Chromium falls back to Times New Roman in my
screenshots. The font *loading* is wired and the families are correct in the
CSS, but how the real typefaces look is unverified — that needs a browser
outside this container.

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
