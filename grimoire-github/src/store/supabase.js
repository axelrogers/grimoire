// ─── Grimoire · Supabase adapter ──────────────────────────────────────────
// Implements the same contract as local.js (see store/index.js). Activated
// automatically once VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set —
// no component changes, no imports to rewire.
//
// Schema lives in supabase/schema.sql. Row-level security means these queries
// are already scoped to the signed-in user by the database; the client never
// filters by user_id itself, because a client-side filter is not a security
// boundary.

import { createClient } from "@supabase/supabase-js";

export function supabaseAdapter(url, anonKey) {
  const db = createClient(url, anonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });

  // Cheap in-memory cache of the current user so synchronous callers (the
  // store contract is sync) have something to read between auth events.
  let current = null;
  db.auth.getSession().then(({ data }) => {
    current = data?.session?.user ? { userId: data.session.user.id, anonymous: false } : null;
  });
  db.auth.onAuthStateChange((_e, session) => {
    current = session?.user ? { userId: session.user.id, anonymous: false } : null;
  });

  const row = (r) => ({
    id: r.id,
    spellId: r.spell_id,
    title: r.title,
    glyph: r.glyph,
    castAt: new Date(r.cast_at).getTime(),
    worked: r.worked,
    verdictAt: r.verdict_at ? new Date(r.verdict_at).getTime() : null,
  });

  return {
    name: "supabase",
    client: db,

    session: () => current,

    // Magic-link sign-in: no passwords to store, lose or leak.
    async signIn({ email }) {
      const { error } = await db.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.href },
      });
      if (error) throw error;
      return { pending: true, email };
    },

    async signOut() {
      await db.auth.signOut();
      current = null;
    },

    async listCasts() {
      const { data, error } = await db
        .from("casts")
        .select("*")
        .order("cast_at", { ascending: false });
      if (error) throw error;
      return (data || []).map(row);
    },

    async recordCast({ spell }) {
      if (!current) throw new Error("not signed in");
      const { data, error } = await db
        .from("casts")
        .insert({
          user_id: current.userId,
          spell_id: spell.id,
          title: spell.title,
          glyph: spell.glyph,
          price_cents: spell.price != null ? Math.round(spell.price * 100) : null,
        })
        .select()
        .single();
      if (error) throw error;
      return row(data);
    },

    async recordVerdict({ castId, worked }) {
      const { data, error } = await db
        .from("casts")
        .update({ worked, verdict_at: new Date().toISOString() })
        .eq("id", castId)
        .select()
        .single();
      if (error) throw error;
      return row(data);
    },

    // Community aggregate, not this caster's history — the view returns
    // counts only, and `rate` is null below five verdicts.
    async spellStats(spellId) {
      const { data, error } = await db
        .from("spell_stats")
        .select("*")
        .eq("spell_id", spellId)
        .maybeSingle();
      if (error) throw error;
      return data
        ? { casts: data.casts, worked: data.worked, rate: data.rate }
        : { casts: 0, worked: 0, rate: null };
    },

    async profile() {
      const { data, error } = await db.from("casts").select("worked");
      if (error) throw error;
      const rows = data || [];
      const answered = rows.filter((r) => r.worked !== null);
      const worked = answered.filter((r) => r.worked).length;
      return {
        castCount: rows.length,
        workedCount: worked,
        rate: answered.length ? Math.round((worked / answered.length) * 100) : null,
      };
    },
  };
}
