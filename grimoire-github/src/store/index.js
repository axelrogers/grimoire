// ─── Grimoire · the data layer ────────────────────────────────────────────
// Every read and write the app makes goes through this module. Components
// never talk to a backend directly and never import an adapter.
//
// Why: accounts and persistence are the long pole and can't start until a
// Supabase project exists. Putting the seam in first means that arriving is a
// swap — write `supabase.js` against this same interface, change one line in
// `pickAdapter()` — rather than a rewrite of every screen. It also means the
// app keeps working, and stays demoable, with no backend at all.
//
// The contract below is the whole surface. If a screen needs something that
// isn't here, add it HERE first, to every adapter, rather than reaching around.

import { localAdapter } from "./local.js";

/**
 * @typedef {Object} Cast
 * @property {string}  id
 * @property {string}  spellId
 * @property {string}  title
 * @property {string}  glyph
 * @property {number}  castAt       epoch ms
 * @property {boolean|null} worked   null = not yet answered
 * @property {number|null}  verdictAt
 */

/**
 * Every adapter implements exactly this.
 *
 *   session()                       -> { userId, anonymous } | null
 *   signIn({ email })               -> { userId, anonymous }
 *   signOut()                       -> void
 *   listCasts()                     -> Cast[]        newest first
 *   recordCast({ spell })           -> Cast
 *   recordVerdict({ castId, worked })-> Cast
 *   spellStats(spellId)             -> { casts, worked, rate|null }
 *   profile()                       -> { castCount, workedCount, rate|null }
 *
 * `rate` is null until there is at least one verdict. It is NEVER a constant:
 * fabricated success rates were removed on 2026-08-03 and must not return.
 */

function pickAdapter() {
  // When Supabase keys land: read them from import.meta.env and return
  // supabaseAdapter(...) here. Nothing else in the app changes.
  return localAdapter();
}

const adapter = pickAdapter();

export const store = {
  session: (...a) => adapter.session(...a),
  signIn: (...a) => adapter.signIn(...a),
  signOut: (...a) => adapter.signOut(...a),
  listCasts: (...a) => adapter.listCasts(...a),
  recordCast: (...a) => adapter.recordCast(...a),
  recordVerdict: (...a) => adapter.recordVerdict(...a),
  spellStats: (...a) => adapter.spellStats(...a),
  profile: (...a) => adapter.profile(...a),
  /** Which backend is live — surfaced so the UI can be honest about it. */
  backend: adapter.name,
};

export { RANKS, rankFor } from "./ranks.js";
