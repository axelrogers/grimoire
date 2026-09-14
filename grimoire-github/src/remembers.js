// ─── Grimoire · the page remembers you ────────────────────────────────────
// The one line written onto the page as the book opens (ARRIVAL.md,
// decision 10). Phrasings live here as data, each carrying the condition it
// needs, so Axel adds lines without touching a component.
//
// THE PHRASINGS ARE AXEL'S. Claude may edit; never drafts. The three below are
// the brief's illustrative lines, marked `placeholder: true` — they render
// with a visible "placeholder" mark and must be replaced before shipping.
//
// Facts a phrasing may use — all read from the real record, never invented:
//   hasRecord       at least one recorded cast
//   nightsAway      nights since the previous day's visit (null on a first visit)
//   weather         "rain" | "mist" | "clear" | null (null until location is granted)
//   path            the approach taken — "front" until Phase 2
//   waitingVerdict  a cast is waiting for its verdict ("the book asks")
//
// No true fact → no line. Never invent a fact to fill the slot.

const WORDS = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
  "Eight", "Nine", "Ten", "Eleven", "Twelve"];
const count = (n) => WORDS[n] || String(n);

export const REMEMBERS = [
  {
    id: "lamp-nights",
    placeholder: true,
    when: (f) => f.nightsAway >= 2,
    line: (f) => `${count(f.nightsAway)} nights since the lamp was lit for you.`,
  },
  {
    id: "rain-followed",
    placeholder: true,
    when: (f) => f.weather === "rain",
    line: () => "The rain has followed you in.",
  },
  {
    id: "garden-missed",
    placeholder: true,
    when: (f) => f.path === "garden" && f.nightsAway >= 1,
    line: () => "The garden has missed you.",
  },
];

// Stable within a day, varied across days, when more than one line is true.
function daySeed(date) {
  const k = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  let h = 0;
  for (const ch of k) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

/**
 * The line for today, or null. With no record yet (first visit, signed out,
 * nothing cast) the page carries the date and the sky only (decision 11).
 * @returns {{ id, text, placeholder } | null}
 */
export function rememberedLine(facts, date = new Date()) {
  if (!facts.hasRecord) return null;
  const true_ = REMEMBERS.filter((r) => {
    try {
      return r.when(facts);
    } catch {
      return false;
    }
  });
  if (!true_.length) return null;
  const r = true_[daySeed(date) % true_.length];
  return { id: r.id, text: r.line(facts), placeholder: Boolean(r.placeholder) };
}
