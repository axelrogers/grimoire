// ─── Grimoire · local adapter ─────────────────────────────────────────────
// Persists to this browser only. It exists so the app is genuinely usable
// before Supabase arrives — a cast survives a refresh, a verdict sticks, rank
// reflects real casts — and so every screen can be built and tested against
// the real interface rather than hardcoded arrays.
//
// What it is NOT: a launch backend. It cannot share a practice across devices,
// cannot aggregate verdicts across casters, and therefore cannot produce the
// success rates the trust layer needs. `spellStats` here returns only THIS
// caster's history, and the UI must not present that as a community rate.

const KEY = "grimoire.v1";

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "") || blank();
  } catch {
    return blank();
  }
};
const write = (s) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* private mode / quota — the session still works, it just won't persist */
  }
  return s;
};
const blank = () => ({ session: null, casts: [] });

// Stable enough for one browser; the real ids come from the database later.
const newId = () =>
  `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

export function localAdapter() {
  return {
    name: "local",

    session() {
      return read().session;
    },

    signIn({ email } = {}) {
      const s = read();
      s.session = { userId: email || "local", anonymous: !email };
      write(s);
      return s.session;
    },

    signOut() {
      const s = read();
      s.session = null;
      write(s);
    },

    listCasts() {
      return read().casts.slice().sort((a, b) => b.castAt - a.castAt);
    },

    recordCast({ spell }) {
      const s = read();
      const cast = {
        id: newId(),
        spellId: spell.id,
        title: spell.title,
        glyph: spell.glyph,
        castAt: Date.now(),
        worked: null,
        verdictAt: null,
      };
      s.casts.push(cast);
      write(s);
      return cast;
    },

    recordVerdict({ castId, worked }) {
      const s = read();
      const c = s.casts.find((x) => x.id === castId);
      if (!c) return null;
      c.worked = worked;
      c.verdictAt = Date.now();
      write(s);
      return c;
    },

    // This caster's own history with a spell — NOT a community success rate.
    spellStats(spellId) {
      const mine = read().casts.filter((c) => c.spellId === spellId);
      const answered = mine.filter((c) => c.worked !== null);
      return {
        casts: mine.length,
        worked: answered.filter((c) => c.worked).length,
        rate: answered.length
          ? Math.round((answered.filter((c) => c.worked).length / answered.length) * 100)
          : null,
      };
    },

    profile() {
      const casts = read().casts;
      const answered = casts.filter((c) => c.worked !== null);
      const worked = answered.filter((c) => c.worked).length;
      return {
        castCount: casts.length,
        workedCount: worked,
        rate: answered.length ? Math.round((worked / answered.length) * 100) : null,
      };
    },
  };
}
