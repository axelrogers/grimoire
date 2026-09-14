// ─── Grimoire · the arrival gate ──────────────────────────────────────────
// Decides once per page load whether today's arrival plays. First open of the
// local day only — the same midnight the verdict loop turns on
// (usePractice.js), so the arrival and the day's asks change together.
//
// Per device, in localStorage: signed-out and first-ever visitors arrive too.

const KEY = "grimoire.arrival";

const dayKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Whole local nights between two day keys. Date.UTC sidesteps DST.
function nightsBetween(from, to) {
  const utc = (k) => {
    const [y, m, d] = k.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((utc(to) - utc(from)) / 86400000);
}

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
}

let decided;

/**
 * @param {{ resumingPayment: boolean }} opts  true when App is resuming a paid
 *   cast (`paidClaim()`): someone back from Stripe lands straight in their
 *   working, and today's arrival is left for their next open.
 * @returns {{ play: boolean, nightsAway: number|null }} nightsAway is nights
 *   since the previous day's visit, null on a first-ever visit. Stable for the
 *   whole day, so the page's remembered line doesn't change between opens.
 */
export function arrivalToday({ resumingPayment = false } = {}) {
  if (decided) return decided; // memoised: StrictMode renders twice
  const today = dayKey(new Date());
  const last = read();
  const force =
    import.meta.env.DEV && new URLSearchParams(window.location.search).has("arrival");
  const play = !resumingPayment && (force || last?.day !== today);

  let prevDay = last?.day === today ? last.prevDay : last?.day;
  if (play && !resumingPayment && last?.day !== today) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ day: today, prevDay: prevDay ?? null }));
    } catch {
      // Blocked storage: the arrival plays every open. Better than never.
    }
  }
  decided = { play, nightsAway: prevDay ? nightsBetween(prevDay, today) : null };
  return decided;
}
