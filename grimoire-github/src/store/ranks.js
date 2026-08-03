// ─── Grimoire · rank ──────────────────────────────────────────────────────
// Rank is computed from real casts, never stored as a constant — that was one
// of the five things the launch scope actually commits to.
//
// Deliberately NOT a streak, a level bar or a daily-login reward. The
// competitive read (DECISIONS.md, 2026-08-03) is that over-gamification is
// what's costing Astrea its users; rank here is a record of practice, not a
// engagement mechanic.

export const RANKS = [
  { name: "Novice", numeral: "I", at: 0 },
  { name: "Keeper", numeral: "II", at: 3 },
  { name: "Practitioner", numeral: "III", at: 10 },
  { name: "Adept", numeral: "IV", at: 25 },
  { name: "Elder", numeral: "V", at: 60 },
];

/**
 * @param {number} castCount casts actually recorded
 * @returns {{name, numeral, next: string|null, toNext: number|null, progress: number}}
 */
export function rankFor(castCount = 0) {
  const n = Math.max(0, Math.floor(castCount));
  let i = 0;
  for (let k = 0; k < RANKS.length; k++) if (n >= RANKS[k].at) i = k;
  const cur = RANKS[i];
  const next = RANKS[i + 1] || null;
  if (!next) {
    return { name: cur.name, numeral: cur.numeral, next: null, toNext: null, progress: 1 };
  }
  const span = next.at - cur.at;
  return {
    name: cur.name,
    numeral: cur.numeral,
    next: next.name,
    toNext: next.at - n,
    progress: span > 0 ? Math.min(1, (n - cur.at) / span) : 0,
  };
}
