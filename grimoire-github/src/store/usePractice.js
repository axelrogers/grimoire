// ─── Grimoire · usePractice ───────────────────────────────────────────────
// One hook the screens share so a cast recorded on Today shows up instantly
// on You, without prop-drilling or a state library.
//
// Deliberately small: a module-level snapshot plus subscribers. The adapters
// are async-capable (Supabase returns promises), so every call is awaited even
// though the local one resolves immediately — that way nothing here changes
// when the backend swaps.

import { useEffect, useState, useCallback } from "react";
import { store, rankFor } from "./index.js";

let snapshot = {
  casts: [],
  profile: { castCount: 0, workedCount: 0, rate: null },
  session: null,
  signInPending: null, // email a magic link was sent to, while we wait
  loading: true,
};
const subs = new Set();
const emit = () => subs.forEach((fn) => fn(snapshot));

async function refresh() {
  try {
    const [casts, profile] = await Promise.all([store.listCasts(), store.profile()]);
    snapshot = { ...snapshot, casts, profile, session: store.session(), loading: false };
  } catch (e) {
    // Never let a backend hiccup blank the screen — keep the last good data.
    console.error("[grimoire] practice refresh failed:", e);
    snapshot = { ...snapshot, loading: false };
  }
  emit();
}

let started = false;

export function usePractice() {
  const [state, setState] = useState(snapshot);

  useEffect(() => {
    subs.add(setState);
    if (!started) {
      started = true;
      refresh();
    }
    return () => subs.delete(setState);
  }, []);

  const cast = useCallback(async (spell) => {
    const c = await store.recordCast({ spell });
    await refresh();
    return c;
  }, []);

  const answer = useCallback(async (castId, worked) => {
    await store.recordVerdict({ castId, worked });
    await refresh();
  }, []);

  const signIn = useCallback(async (email) => {
    const r = await store.signIn({ email });
    // Supabase sends a magic link and returns pending; the local store signs
    // in immediately. Either way the snapshot reflects it.
    snapshot = { ...snapshot, signInPending: r?.pending ? email : null };
    await refresh();
    return r;
  }, []);

  const signOut = useCallback(async () => {
    await store.signOut();
    snapshot = { ...snapshot, signInPending: null };
    await refresh();
  }, []);

  // "The book asks" — pending verdicts whose cast is from before today.
  // A working is held overnight before the book asks how it landed; asking
  // in the same breath as casting would make the verdict worthless.
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  const asks = state.casts.filter((c) => c.worked === null && c.castAt < midnight.getTime());

  return {
    ...state,
    rank: rankFor(state.profile.castCount),
    pending: state.casts.filter((c) => c.worked === null),
    asks,
    cast,
    answer,
    signIn,
    signOut,
    backend: store.backend,
  };
}

// "3 days ago" — casts are read the morning after, so relative reads better
// than a date. Deliberately vague past a week; precision isn't the point.
export function when(ts) {
  const d = Math.floor((Date.now() - ts) / 86400000);
  if (d <= 0) return "Tonight";
  if (d === 1) return "Yesterday";
  if (d < 7) return `${d} days ago`;
  if (d < 14) return "Last week";
  if (d < 31) return `${Math.floor(d / 7)} weeks ago`;
  return "Last month";
}
