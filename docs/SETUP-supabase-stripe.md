# Provisioning guide — Supabase and Stripe

Written so you can do both in one sitting. Supabase is the blocking one; Stripe
can follow. Neither needs any decisions from you beyond what's noted.

Store every key the same way as the GitHub token: a plain text file in the
**Grimoire App** Drive folder. Never paste keys into the repo — `.gitignore`
blocks the obvious filenames but the rule is that they live in Drive and in
environment variables, nowhere else.

---

## 1 · Supabase (~10 minutes) — this unblocks the build

**What it is:** a hosted Postgres database, a login system, and the API between
them. It's what lets the app remember a cast, record a verdict, and know who
you are on a second device.

**Cost:** free tier is ample for launch — 500 MB database, 50,000 monthly
active users. You'd move to Pro (US$25/mo) well after you'd know it was worth it.

### Steps

1. Go to **https://supabase.com** → *Start your project* → sign in with GitHub.
2. **New project.**
   - Name: `grimoire`
   - Database password: generate a strong one and **save it in your password
     manager** — you cannot retrieve it later, only reset it.
   - Region: **Sydney (ap-southeast-2)**. Closest to you; if the audience turns
     out to be mostly US, that's a later migration, not a launch problem.
   - Plan: Free.
3. Wait ~2 minutes for provisioning.
4. Go to **Project Settings → API** and copy these three values:

| Value | Looks like | Safe in the browser? |
|---|---|---|
| Project URL | `https://xxxxx.supabase.co` | yes |
| `anon` public key | long JWT starting `eyJ…` | yes — designed for it |
| `service_role` key | another long JWT | **no — server only** |

5. Save them to Drive as a plain text file named exactly **`grimoire-supabase`**:

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
```

> **On the service_role key:** it bypasses all security rules. It must never
> reach the browser. I'll only use it for migrations, never in app code. If you'd
> rather not hand it over at all, give me the first two and I'll write the schema
> as SQL for you to paste into Supabase's editor yourself — slower, equally fine.

6. Tell me it's there. I'll write the schema (accounts, casts, verdicts),
   turn on row-level security so nobody can read anyone else's practice, and
   wire the app to it.

---

## 2 · Stripe (~15 minutes) — needed before you can charge

**Before you start**, two things worth having straight, because Stripe asks:

- **The selling entity.** Sole trader under your ABN, or a company? Stripe needs
  business details and a bank account in the entity's name.
- **GST.** If Grimoire turns over more than A$75,000 you must register.
  Below that it's optional. This affects how you price and what Stripe collects.
  Worth ten minutes with an accountant rather than a guess.

### Steps

1. **https://dashboard.stripe.com/register** — sign up, choose **Australia**.
2. Complete the business profile. For "what does your business sell", describe
   it plainly: *digital ritual and wellbeing content, delivered in-app*.
   Don't be cute about it — misdescribing the business is what gets accounts
   frozen later.
3. **Stay in test mode** for now (toggle, top right). Everything I build works
   against test keys first.
4. **Developers → API keys**, copy the **test** publishable and secret keys.
5. Save to Drive as **`grimoire-stripe`**:

```
STRIPE_PUBLISHABLE_KEY_TEST=pk_test_...
STRIPE_SECRET_KEY_TEST=sk_test_...
```

Live keys come later, once the flow is proven.

### Payment links — the shortcut worth knowing

If full checkout doesn't fit before soft launch, Stripe **Payment Links** give
you real payment and real promo codes with no build at all:

- **Product catalogue → Add product**, one per spell, at its price.
- **Payment links → New**, tick *Allow promotion codes*.
- **Coupons** creates the promo codes themselves — percentage or fixed, capped
  by number of redemptions or expiry date. That's your promotional mechanic.

The caster leaves the app to pay, which is worse than in-app checkout, but it
takes an afternoon rather than two weeks and is entirely reversible.

---

## What I do once each arrives

| You provide | I build |
|---|---|
| Supabase URL + anon key | Schema, auth, casts and verdicts persisting, history that survives refresh, rank from real casts |
| Stripe test keys | Checkout against test cards, promo code handling, receipts |
| Stripe live keys | Flip to live, verify one real transaction end to end |

---

## Two things I can't do for you

**Legal input on efficacy claims.** Once you charge for a working and display a
success rate, you're making a representation. Australian Consumer Law is strict
about that, and the honest fix — showing only rates derived from real verdicts —
is already implemented, but a lawyer should look at your terms and refund policy
before you take money. I'm not one.

**The Stripe business description.** Only you can accurately say what the
business does, and getting it wrong is the most common cause of a frozen account.
