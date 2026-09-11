# Tasks — Grimoire App

Open, in priority order. Checkpoint keeps this current.

**SOFT LAUNCH ~26 AUGUST**, ahead of the Practical Magic 2 press build-up.
The film moved forward: Axel has it at 9 Sep, press reports say 11 Sep — plan
against 9 Sep. (The old 18 Sep target was the film's original date.)
Ship lean and honest, then thicken through the cycle.

Soft-launch scope: accounts + persistence, a seeded catalogue, cast → verdict
that actually records, history that survives refresh. Payment via manual links
or free at first; full Stripe checkout by the film's release. Practitioner submission,
moderation and payouts come after launch.

## Next

**2026-09-11 — the depth direction leads now.** Axel set the launch timing
aside in Sep; the dates below are history, not deadlines. First piece:
**the arrival** (`docs/ARRIVAL.md`).

- [ ] **Arrival, Phase 1** — build in Claude Code from `docs/ARRIVAL.md`
      (daily gate, live sky module, plate slots with stand-ins, the movement,
      remembered line). Show Axel before Phase 2.
- [ ] **Axel: confirm the four pencilled items** at the foot of
      `docs/ARRIVAL.md` (none block Phase 1).
- [ ] **Axel: write the first dozen remembered-line phrasings.** His voice;
      Claude edits, never drafts.
- [ ] **Axel: concept images for the house** — no film stills in, no film
      names in prompts (ARRIVAL.md decision 5).
- [ ] Arrival, Phase 2 — four ways in + the invitation.
- [ ] The daily line (push) — separate feature, after the arrival.
- [ ] Commission final paintings — once the arrival runs and the look is set.

### Earlier launch list (26 Aug plan)


**AXEL — the three that block a 26 Aug launch, in order:**
- [ ] **Two repository secrets**, or the live site persists nothing across
      devices and says nothing about it: `VITE_SUPABASE_URL` and
      `VITE_SUPABASE_ANON_KEY` at Settings → Secrets and variables → Actions.
      `docs/SETUP-supabase-stripe.md` §3. 60 seconds.
- [ ] **Sign in on the live site, in a real browser**, and confirm a cast
      survives into a second browser. This cannot be tested from the sandbox —
      `*.supabase.co` is blocked — so it is unverified until you do it.
- [ ] **The Stripe afternoon**: `docs/STRIPE-payment-links.md`, top to bottom.
      Decide AUD vs USD *first* (§5) — it's fixed when each price is created.

- [ ] **Amber fails contrast in day mode.** 14 items measure 2.9–3.3:1 against
      the light ground where small text needs 4.5:1 — "Open the folio ›",
      "All activity →", the % figures, category glyphs. The amber accent
      (#A97E3F) simply isn't dark enough on #EFE6D6. Amethyst/day is close but
      cleaner; both night modes are fine. Needs a design-system answer (a
      darker accent step for small text on light grounds), not a patch.
- [ ] **Write eight thin category seeds** (was: eight full spells). Spells are
      practitioner-driven; these only need to open each category credibly.
      Divination and Healing have nothing at all yet.
- [x] ~~**BLOCKING: a Supabase project + keys.**~~ DONE 17 Aug — keys arrived,
      `.env.local` wired, `store.backend === "supabase"` verified locally, and
      the deploy takes them from repository secrets. **Axel still owes the two
      secrets and a real-browser sign-in test** (`docs/SETUP-supabase-stripe.md` §3);
      sign-in cannot be tested from the sandbox at all.
- [ ] ~~Write the remaining eight full spells.~~ Superseded: Four are authored and live
      (ported from the prototype); eight slots wait in `data.js` as
      ⟨spell 5⟩…⟨spell 12⟩. ~130 words each — working / theirs / yours /
      quote. Guide at `docs/WRITING-spells.md`. Axel's voice; Claude edits
      but does not draft. `unwrittenSlots()` counts what's left — wire it
      into a launch check so no slot reaches a paying caster.
- [x] ~~**Payments (Stripe).**~~ App side DONE 17 Aug — payment links, return
      handling, held claims, `npm run check:prices`. What remains is Axel's
      dashboard afternoon (above), plus still-open: the selling entity + GST
      position, and legal input on efficacy claims and refunds before charging.
- [x] ~~**Coven + You composition port.**~~ DONE 17 Aug. Both now read as
      volumes of the same book as Browse. Not ported, on purpose: the
      prototype's "Tonight's circle" (no such feature) and its invented
      aggregate counts.
- [ ] **The second Coven level — circles.** The prototype's `isCovenCircle`
      branch is a full composition waiting for real circles to exist. Needs a
      data shape (who, when, which working, who's gathered) before any pixels.
- [ ] **Full Stripe checkout**, server-verified, to replace payment links
      during the press build-up. The trigger is takings and Stripe
      disagreeing, or volume making manual reconciliation silly.
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
- [x] **Auth surface + cast guard.** Sign the record on You (prototype's
      onboarding voice, magic-link pending state for Supabase); funnels refuse
      payment for a cast that can't be kept to a hand. (2026-08-05)
- [x] **The verdict loop is a mechanic.** Casts held overnight surface on
      Today as "The book asks"; answering writes the verdict. (2026-08-05)
- [x] **Browse ported — the Grand Index.** Table of contents with dotted
      leaders, real counts/pages, chapter view with ledger rows and the margin
      voice, concordance search. Measured from the prototype. (2026-08-05)
- [x] **Wired the app to the store.** Casting records, history is real and
      survives reload, verdicts write, rank derives from actual casts. No
      sample data left on You. Verified end to end. (2026-08-03)
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
