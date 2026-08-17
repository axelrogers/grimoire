# Stripe payment links — the click-list

Written 2026-08-17. **This is a doing document**: work top to bottom in the
Stripe dashboard, then paste four URLs into one file and the app takes money.
Allow about 25 minutes, plus 5 to test.

`api.stripe.com` is blocked from the build sandbox (verified 17 Aug, same class
of block as `api.github.com` and `*.supabase.co`), so none of this could be
scripted from there — and it shouldn't be. Payment links made by hand in the
dashboard are the point: no server, no webhooks, no secret key in the app.

**Stay in TEST MODE for all of it.** The toggle is top-right. Everything below
is reversible; nothing here touches live money until §6.

---

## 0 · Before you start

| | |
|---|---|
| **Currency** | Decide **AUD or USD** before making the first product — the currency is fixed per price and a change means remaking the links. See §5; the default is AUD. |
| **App side** | Already built and merged. `src/payment.js` holds the four link slots and nothing else needs editing. |
| **What a caster sees** | Tap *Cast tonight* → Stripe's page → pay → land back in the app with the ritual already running. |

---

## 1 · Four products

**Product catalogue → Add product.** One per spell. Name them exactly as the
app names them, so your Stripe reports read like the catalogue:

| Product name | Price | Spell id |
|---|---|---|
| Inbox Severance | 48.00 | `s1` |
| Ghost Unbinding | 36.00 | `s2` |
| Deadline Ward | 42.00 | `s3` |
| Small-Hours Tether | 36.00 | `s4` |

For each: **One-off**, not recurring. Description optional — if you write one,
use the spell's own line from the catalogue rather than inventing marketing.

Prices come from `src/data.js` and that file stays the single source of truth.
If you change a price in Stripe, change it there too, then run
`npm run check:prices` — it prints the pairing so the two can be eyeballed.
**Stripe is what the caster is charged; data.js is only what they are shown.**
Those disagreeing is the single worst bug this system can have.

The other eight spells are unwritten slots priced at 0. They get no products
and cannot take money — the check script enforces that.

---

## 2 · Four payment links

**Payment links → New.** For each product above:

1. **Product**: the one you just made. Quantity fixed at 1 — untick *let
   customers adjust quantity*.
2. Tick **Allow promotion codes**. (This is the whole promo mechanic — §4.)
3. Leave shipping/billing address collection **off**. Nothing ships.
4. **After payment** → *Don't show a confirmation page* → **Redirect customers
   to your website**, and paste the URL for that spell:

```
https://axelrogers.github.io/grimoire/?paid=s1&ref={CHECKOUT_SESSION_ID}
https://axelrogers.github.io/grimoire/?paid=s2&ref={CHECKOUT_SESSION_ID}
https://axelrogers.github.io/grimoire/?paid=s3&ref={CHECKOUT_SESSION_ID}
https://axelrogers.github.io/grimoire/?paid=s4&ref={CHECKOUT_SESSION_ID}
```

> Type `{CHECKOUT_SESSION_ID}` literally, braces and all — Stripe substitutes
> the real id on the way back. **The `paid=` value must match the spell id in
> the table above.** Get it wrong and the caster pays for one working and
> receives another, which is the kind of mistake people don't come back from.

5. **Create link**, then **Copy link**.

---

## 3 · Paste them into the app

Open `grimoire-github/src/payment.js` and fill the four slots — this is the
entire integration, and the only file to touch:

```js
export const PAYMENT_LINKS = {
  s1: "https://buy.stripe.com/test_xxxxxxxxxxxx", // Inbox Severance    $48
  s2: "https://buy.stripe.com/test_xxxxxxxxxxxx", // Ghost Unbinding    $36
  s3: "https://buy.stripe.com/test_xxxxxxxxxxxx", // Deadline Ward      $42
  s4: "https://buy.stripe.com/test_xxxxxxxxxxxx", // Small-Hours Tether $36
};
```

Then:

```bash
cd grimoire-github
npm run check:prices     # should say "4 of 12 spells can actually take money"
npm run build            # must pass before pushing — the push guard enforces it
```

A spell with an empty slot keeps the old simulated pay sheet, so the app stays
demoable and the click-through file keeps working with no Stripe at all.

---

## 4 · Promo codes

**Product catalogue → Coupons → New.** Make the coupon first, then attach a
code to it.

- **Percentage** off is the readable one for a launch (`25% off`).
- **Duration**: *once* — these are one-off purchases, not subscriptions.
- Cap it: *limit the number of redemptions* and/or *set an expiry*. An
  uncapped code that reaches a film audience is an uncapped liability.
- Then **Promotion code → New**, pick the coupon, and type the customer-facing
  code. Suggestions that fit the voice rather than the funnel: `FIRSTWORKING`,
  `OPENINGNIGHT`, `KEPT`.

A promotion code works across every link that has *Allow promotion codes*
ticked, so one code can cover the whole catalogue.

---

## 5 · The currency decision (worth ten minutes now)

A film-driven audience is mostly American, and this is an Australian Stripe
account. Checked 3 Aug, worth re-confirming at signing:

| | Domestic AU card | International card |
|---|---|---|
| Stripe fee | 1.7% + A$0.30 | 3.5% + A$0.30, **plus ~2% conversion** |

On a $42 spell that is roughly 2.4% versus 5.5%. Options, in increasing order
of effort: price in AUD and accept the spread; price in USD (Stripe AU accounts
can, and it reads better to a US buyer, but you carry the FX on payout); or a
merchant-of-record like Paddle or Lemon Squeezy (~5%+, absorbs sales-tax
compliance) later. **The launch-blocking part is only choosing the currency**,
because it is baked into each price the moment you create it.

---

## 6 · Testing, then going live

**Test mode** — card `4242 4242 4242 4242`, any future expiry, any CVC:

1. Open the live site on your phone, tap through to a paid spell.
2. Pay. You should land back in the app with the casting beat already running,
   and the working on screen when it resolves.
3. Check **You** — the cast should be in your history.
4. Do it once more with a promo code to confirm the discount applies.

**Going live**, when you're ready to charge real money:

1. Complete Stripe business activation (business details, bank account). The
   description stays plain: *digital ritual and wellbeing content, delivered
   in-app*.
2. Flip the dashboard to live mode and **remake the four products, links and
   coupons there** — test-mode objects do not carry over, and the link URLs
   change.
3. Paste the live URLs into `src/payment.js`, `npm run check:prices`, push.
4. Buy one spell with a real card. Refund yourself. Confirm both appear in the
   dashboard.

Live *keys* aren't needed for any of this — payment links need no key in the
app at all. If live keys ever do get created, they go in a new Drive file
`grimoire-stripe-live` and never into the repo.

---

## What this deliberately does not do

The return trip from Stripe carries a checkout session id, but the app cannot
verify it — verification needs a server, which is exactly what payment links
let us skip. So a determined person could type a return URL and get a free
casting.

That is an accepted trade for the soft launch, not an oversight: the exposure
is one spell at a time at $36–$48, every claim is written to a local receipt
trail for reconciliation against the dashboard, and server-verified checkout is
already scoped for the press build-up. **If takings and Stripe stop agreeing,
that is the signal to bring full checkout forward** — not to bolt more
client-side checking onto a client that cannot be trusted by design.

One more honest limit: because there is no webhook, a payment that succeeds
while the caster's connection drops on the way back is money taken with no cast
recorded. The receipt trail won't have it either. At this volume the fix is
reading the Stripe dashboard; at ten times this volume the fix is checkout.

Before any of this charges a real person, the terms and refund policy want a
lawyer's eye — see the closing note in `SETUP-supabase-stripe.md`.
