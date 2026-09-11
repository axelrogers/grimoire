# Arrival — build brief

**Status:** decided with Axel in Cowork, 11 Sep 2026. Ready to build.
**For Claude Code:** this file is the whole handover. Build **Phase 1** first
(see "Build plan"), run it for Axel, and stop for his eye before Phase 2.
Nothing here needs the conversation it came from.

**Context.** The app opens straight onto Today, with no arrival, and Today's
moon line is hard-coded text. This is the first piece of the depth direction
Axel set in Sep 2026 — the app should feel like opening a house you return to,
with a live sky and a book that ages with use. Launch dates are
deliberately de-prioritised; build it well rather than fast.

---

## The arrival, in one paragraph

On the first open of each day you arrive at a stone keeper's cottage on the
cliffs, its old light tower's lamp still burning for you. In one continuous
movement of about five seconds you're drawn through the door to the table
where the book waits; it opens, and its page — written in as you watch with
the date, the real sky, and a line that remembers you — becomes Today. Tonight's
real moon and weather play across the house. Everyone starts at the front
door; as your practice leans toward the garden, the cliff or the kitchen, the
book notices and invites you to come in that way instead.

---

## Decisions

1. **When:** a full arrival on the first open of each day. Later opens that
   day go straight to Today.
   - Day boundary: local midnight — the same boundary the verdict loop uses
     (`store/usePractice.js`: "the book asks" surfaces casts from before
     midnight), so the arrival and the day's verdicts turn together.

2. **What:** arriving at the house, then being led to the book. The house is
   the threshold; the book is where it lands.
   - Considered and set aside: sky-only, book-only, words-only.

3. **Shape:** one continuous movement, not two scenes. About five seconds;
   a tap anywhere skips to the page.
   1. At the door as it opens — the lit lamp and the live sky behind the house.
   2. Drawn in toward the table, where the book waits.
   3. The book opens; its page becomes Today.
   - The house carries mood only. Every word — date, sky, the remembered line,
     anything the book asks — is on the page, never in the house.
   - The house changes with the live sky (rain on the glass, a full moon over
     the tower), so it never plays as the same intro twice.
   - The table *is* the desk: DESIGN.md already has `--p-desk` ("desk chrome
     behind the book").
   - Motion per DESIGN.md §5: ritual, eased, no spring physics, `gp-`
     namespaced keyframes. `prefers-reduced-motion`: a short crossfade
     straight to the written page.

4. **Painted.** The house is a painted illustration (photographic, line
   drawing and light-only were considered and set aside).
   - Built as **layered plates** so the live sky doesn't multiply the artwork:
     house plates, a separate sky and moon, weather and light overlays,
     composited in code.
   - Palette (amethyst/amber) is a colour grade over the plates, not separate
     art. Day/night are separate plates.
   - The door → table move bridges two plates through the doorway's light.

5. **Inspired by, never copied.** A particular film and its house are the
   openly acknowledged reference for mood and feeling — study them, moodboard
   them. What gets made is our own house.
   - The line is in the *making*: never feed film stills into an image
     generator (image-to-image, style reference, etc.), and never put the
     film's title, character or actor names in a generation prompt —
     generators copy what they're pointed at.
   - Every plate passes one test: nobody should look at it and say "that's
     the house from…". If they would, repaint it.
   - The product never names the film: no title, character names, quotes or
     taglines in the app, its copy, metadata or marketing — including around
     the sequel's release.
   - Not legal advice: if the arrival is used in marketing near the film's
     release, get a quick legal read first.

6. **The house:** a stone keeper's cottage grown into a headland above the
   sea, beside an old light tower whose lamp room is still lit, with a walled
   garden.
   - Cottage: low, thick weathered stone, deep-set windows, a roof bowed with
     age; it looks as if the headland grew it.
   - Tower: no longer a working lighthouse, but the lamp is kept burning — a
     light left on for whoever is coming home. **The lit lamp is the first
     thing seen on arrival.**
   - Garden: walled, in the lee of the cottage and tower, out of the wind;
     herbs in the shelter.
   - Weather has real work to do here: sea mist, storms coming in, clear
     moonlit water.

7. **Four ways in, earned by practice.** Everyone starts on the path to the
   front door. As you progress, the arrival changes to reflect where you lean.
   - **Front door** (everyone's start) · **garden** · **cliff / sky** ·
     **kitchen**.
   - All four end at the same table and the same book; only the approach
     changes. The live sky plays across all of them.
   - Where each comes in *(pencilled — Axel to confirm)*: front door ← the
     path up to the cottage door · garden ← the gate in the garden wall ·
     cliff / sky ← the cliff steps past the foot of the tower · kitchen ← the
     back door, lamplight in its window.
   - Which work leans which way *(pencilled — Axel to confirm)*, from the five
     categories in `src/data.js`: garden ← Healing · cliff / sky ←
     Divination, Sleep & Dreams · kitchen ← Protection · front door ←
     Severance, and anyone whose practice is evenly spread.

8. **Noticed, then invited.** The house counts where you lean from casts you
   actually recorded; when the pattern is clear, the book asks — e.g. "You
   keep coming back to the garden. Shall we come in that way?" — and you
   accept or keep your door.
   - Uses the existing "the book asks" pattern (`screens/TodayView.jsx`), on
     the page after the arrival, never mid-movement.
   - Not a reward or unlock notification. Rank is a record of practice, not
     an engagement mechanic (`store/ranks.js`); the invitation keeps that tone.
   - Starting numbers *(tune once running)*: no invitation before
     Practitioner (10 casts); "clear lean" = one approach holds ≥60% of the
     last 10 casts; a decline isn't asked again for that path until 10 more
     casts; if the lean moves later, the book may invite onward again.
   - The accepted approach is **stored**, not re-derived daily, so the
     arrival never flickers between paths.

9. **Stand-ins first, finals later.**
   - **Now:** build the whole arrival with rough stand-in plates, so timing,
     the lamp, the movement and the live sky can be felt and tuned before any
     art exists. Stand-ins must look obviously provisional (simple
     painted-feel shapes and silhouettes, labelled) — never like finished art.
   - **Meanwhile (Axel):** explores the look with generated concept images,
     under decision 5's rules.
   - **Later:** commission an illustrator for the finals once the arrival runs
     and the look is settled. That brief gets written from what's been seen
     working.

10. **The page remembers you.** As the book opens, the page is written in:
    the date, the live sky, and one line built from your own record.
    - Axel writes the phrasings (starting with about a dozen); the app fills
      in facts from the practice record — nights since you were last in, the
      weather you arrived in, the path you came by, a cast waiting for a
      verdict.
    - Illustrative only, **not copy to ship**: "Three nights since the lamp
      was lit for you." / "The rain has followed you in." / "The garden has
      missed you." Final lines are Axel's. Claude may edit; never drafts.
    - Nothing true to say → no line; date and sky only. **Never invent a fact
      to fill the slot** (same rule as the counted figures on Coven and You).
    - Ink settles in, then the page *is* Today.

11. **First visit and signed-out:** the same front-door arrival as everyone,
    from day one — it's the shop window. With no record yet, the page shows
    the date and the sky only.
    - A longer one-time first arrival was considered; it can be added later
      without changing anything above.

---

## Build plan

### Phase 1 — the arrival (build now)

1. **Arrival gate.** Decide once per app load whether today's arrival has
   played (last-arrival date per device, local midnight). Signed-out and
   first-ever visitors included. Skip it when App is resuming a paid cast
   (`paidClaim()` in `App.jsx`) — someone returning from Stripe must land
   straight back in their working.
2. **The live sky, computed locally** — one module (e.g. `src/sky.js`) that
   everything reads:
   - Moon phase and illumination: compute from the date (no network, no key).
     Moon *sign* too if it's cheap and correct; if not, leave it out rather
     than approximate — never show a wrong sky.
   - Day or night from local time (sunrise/sunset if location is known,
     otherwise a sensible local-time split).
   - Weather *(pencilled — Axel to confirm)*: only if the user has given
     location. **Don't ask for location during the arrival** — nothing
     interrupts it. Until granted, the sky is moon + time of day, no weather
     overlay. A keyless source such as Open-Meteo avoids secrets in the build.
   - Replace Today's hard-coded moon line with this module.
3. **Plate slots.** Each layer loads from a named slot so final paintings drop
   in with no code change: `sky` · `moon` (placed by phase) ·
   `approach-front-{day,night}` · `table-{day,night}` · overlays `rain`,
   `mist`, `lamplight`. Portrait phone framing with safe margins; transparent
   PNG/WebP where layers stack. Fill every slot with a labelled stand-in.
4. **The movement.** Door with lit lamp → through the doorway's light → the
   table → the book opens → the page becomes Today. ~5 s. Tap anywhere skips.
   Reduced-motion crossfade. Both palettes × both modes.
5. **The remembered line.** Phrasings in data (e.g. `src/remembers.js`), each
   entry carrying the condition it needs, so Axel adds lines without touching
   components. Ship with the three illustrative lines above **clearly marked
   as placeholders**, plus the no-line fallback.
6. **Show Axel.** Run it locally and walk him through it. Tune timing with
   him before Phase 2.

Checks before calling Phase 1 done: plays once per day and not on the second
open; skip works mid-movement; a Stripe return never shows it; reduced motion
honoured; no page errors in amethyst/amber × day/night; the moon phase matches
a real ephemeris for three sample dates; with an empty record the page shows
no remembered line.

### Phase 2 — four ways in (after Axel has seen Phase 1)

- Lean counting: map each cast's `spell_id` → `CATALOGUE` category → approach
  (decision 7 mapping, once Axel confirms it).
- Store the accepted approach and declines on the practice record — a new
  `profiles` column in `supabase/schema.sql` (e.g. `approach text default
  'front'`, plus decline bookkeeping) and the same shape in the local adapter.
- The invitation on the page, via the "book asks" pattern; accept/keep.
- Stand-in slots `approach-{garden,cliff,kitchen}-{day,night}`.

### Phase 3 — the daily line (separate feature, after the arrival)

See below.

### Out of scope for now
Final paintings · the longer first-ever arrival · the house ageing visibly
with use (worn edges, margin notes — its own piece of the depth work).

### Traps already known in this codebase
- `innerText` is CSS-uppercased in places — case-sensitive text assertions lie.
- `dist-single/` is gitignored; never commit build artifacts.
- The dev viewer switcher in `App.jsx` is not product UI; don't build the
  arrival into it.
- Rate/stats stay `null` until real verdicts exist — not placeholders to fill.

---

## Related feature — the daily line (push)

Axel, 11 Sep 2026. Separate from the arrival page: a daily line from a pool
Axel writes, matched to moon phase, weather and season, sent as a push
notification — in the spirit of Co-Star's daily notification, in Grimoire's
warmer voice.

- **Voice:** Axel writes the pool. Claude may edit; never drafts.
- **Two lines, two jobs:** the push line speaks to the day and the sky; the
  arrival line (decision 10) speaks to *you*. Never the same words on the same
  day.
- **Joins the arrival:** tapping the notification opens into that day's
  arrival — the lamp was lit, now you walk up the path.
- **Keeps the house rule** (no streaks, no daily-login rewards): opt-in, at
  most one a day, at a time the user chooses, and worth reading even if they
  never open the app. Never "you haven't cast in a while".
- **Platform — plan before building:**
  - This is a web app on GitHub Pages, so it's web push: a service worker, the
    Push API, VAPID keys, and something that sends on a schedule. Supabase
    (already in the stack) can hold subscriptions and send from a scheduled
    Edge Function.
  - On iPhone, web push only works once the app is added to the Home Screen
    (iOS 16.4+). Needs a gentle "keep the book on your Home Screen" moment,
    or a native wrapper later if the App Store matters.
  - Choosing a line by weather server-side needs the user's rough location
    and timezone — ask, don't infer.

---

## Axel to confirm (none of these block Phase 1)
1. Which work leans which way (decision 7).
2. Where each approach comes into the house (decision 7).
3. Weather only after location is granted, never asked during the arrival
   (Phase 1, step 2).
4. The first dozen remembered-line phrasings (decision 10) — his to write.
