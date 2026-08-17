// ─── Grimoire · payment (soft-launch shape) ───────────────────────────────
// DECIDED 2026-08-17: the ~26 Aug soft launch takes money through Stripe
// PAYMENT LINKS, not full in-app checkout. Links are an afternoon of clicking
// instead of two weeks of building, they carry real promo codes, and they are
// entirely reversible — full checkout replaces this module during the press
// build-up if the links prove out.
//
// PRICES LIVE IN data.js AND NOWHERE ELSE. This file maps a spell to the link
// that charges for it. If the two ever disagree, data.js is what the app shows
// and Stripe is what the caster is charged, which is exactly the bug you do not
// want — so re-check both after any price change (`npm run check:prices` prints
// the pairing).
//
// ── WHAT THIS BUYS, HONESTLY ──────────────────────────────────────────────
// A payment link sends the caster out to Stripe's page and back. The return
// trip carries a checkout session id, but NOTHING HERE CAN VERIFY IT — that
// needs a server, and a server is the thing we deliberately did not build yet.
// So a determined person can hand-type a return URL and get a free casting.
//
// That is an accepted trade for the soft launch, not an oversight:
//   · the exposure is one spell at a time, at $36–$48;
//   · every claim is written to a local receipt trail (below) so takings can
//     be reconciled against Stripe's dashboard by hand at this volume;
//   · full checkout, server-verified, is already scoped for the build-up.
// If takings and Stripe stop agreeing, that is the signal to bring checkout
// forward — not to bolt more client-side "verification" onto this.

/**
 * Spell id → Stripe Payment Link URL.
 *
 * PASTE THE FOUR LINKS HERE once they exist in the Stripe dashboard — this is
 * the only file to edit, and it is the whole integration. Instructions:
 * docs/STRIPE-payment-links.md (test mode first, card 4242 4242 4242 4242).
 *
 * A spell with no link falls back to the simulated pay sheet, so the app stays
 * demoable and the click-through keeps working with no Stripe account at all.
 * The eight unwritten slots (s5–s12) are priced at 0 and have nothing to sell
 * yet; they get links when Axel writes them.
 */
export const PAYMENT_LINKS = {
  s1: "", // Inbox Severance      $48
  s2: "", // Ghost Unbinding      $36
  s3: "", // Deadline Ward        $42
  s4: "", // Small-Hours Tether   $36
};

/**
 * Which catalogue entry a thing on screen refers to. Today's hero is a
 * selection-engine object, not a catalogue row: the authored one carries
 * `catalogueId`, the two stubs (Still Water Reflection, Rent Money Coming In)
 * carry neither and are therefore correctly unsellable.
 */
export const spellIdOf = (spell) => spell?.id ?? spell?.catalogueId ?? null;

/** The live link for a spell, or null if it is not on sale yet. */
export function payLinkFor(spell) {
  const url = PAYMENT_LINKS[spellIdOf(spell)];
  return url && url.startsWith("https://") ? url : null;
}

/** True when Stripe is actually wired for this spell. */
export const isPaidLive = (spell) => payLinkFor(spell) !== null;

/**
 * Leave for Stripe. The caster comes back to `?paid=<spellId>&ref=<session>`
 * because that is how the payment link's redirect is configured — see the doc.
 * `client_reference_id` puts the spell id on the Stripe payment itself, which
 * is what makes manual reconciliation possible.
 */
export function beginPayment(spell) {
  const url = payLinkFor(spell);
  if (!url) return false;
  const u = new URL(url);
  u.searchParams.set("client_reference_id", spellIdOf(spell));
  window.location.assign(u.toString());
  return true;
}

const RECEIPTS = "grimoire.receipts";

/**
 * Read a completed payment out of the URL, exactly once, and clean the address
 * bar so a refresh cannot replay it. Returns { spellId, ref } or null.
 */
export function consumeReturn() {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search);
  const spellId = q.get("paid");
  if (!spellId) return null;
  const ref = q.get("ref") || null;

  // Receipt trail: what the app believes it was paid, for reconciliation
  // against Stripe. Local and unverified — see the note at the top.
  try {
    const log = JSON.parse(localStorage.getItem(RECEIPTS) || "[]");
    log.push({ spellId, ref, at: Date.now() });
    localStorage.setItem(RECEIPTS, JSON.stringify(log.slice(-200)));
  } catch {
    // A blocked or full localStorage must never cost someone the cast they
    // just paid for. Lose the receipt, keep the working.
  }

  q.delete("paid");
  q.delete("ref");
  const rest = q.toString();
  window.history.replaceState(
    {},
    "",
    window.location.pathname + (rest ? `?${rest}` : "") + window.location.hash,
  );

  return { spellId, ref };
}

/**
 * `consumeReturn` memoised for the life of the page. The return trip is read
 * exactly once, at module load, so React can ask for it during render (and
 * ask twice under StrictMode) without a paid cast ever going missing.
 */
let claimOnce;
export function paidClaim() {
  if (claimOnce === undefined) claimOnce = consumeReturn();
  return claimOnce;
}

// ── A paid cast that could not be recorded yet ────────────────────────────
// Someone can return from Stripe without a live session — the session expired
// while they were on Stripe's page, or they finished payment in a different
// browser. They have paid, so they get the working either way; but the cast
// must not evaporate. It is held here and recorded the moment a session
// exists. This is the one piece of payment state that outlives the page.
const PENDING = "grimoire.pendingCast";

export function holdClaim(claim) {
  try {
    localStorage.setItem(PENDING, JSON.stringify(claim));
  } catch {
    // Nothing more we can do; the receipt trail still has it.
  }
}

export function heldClaim() {
  try {
    return JSON.parse(localStorage.getItem(PENDING) || "null");
  } catch {
    return null;
  }
}

export function releaseClaim() {
  try {
    localStorage.removeItem(PENDING);
  } catch {
    /* ignore */
  }
}

/** Everything the app thinks it has been paid, newest last. */
export function receipts() {
  try {
    return JSON.parse(localStorage.getItem(RECEIPTS) || "[]");
  } catch {
    return [];
  }
}
