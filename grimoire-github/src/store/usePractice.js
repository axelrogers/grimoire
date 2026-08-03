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

let snapshot = { casts: [], profile: { castCount: 0, workedCount: 0, rate: null }, loading: true };
const subs = new Set();
const emit = () => subs.forEach((fn) => fn(snapshot));

async function refresh() {
  try {
    const [casts, profile] = await Promise.all([store.listCasts(), store.profile()]);
    snapshot = { casts, profile, loading: false };
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

  return {
    ...state,
    rank: rankFor(state.profile.castCount),
    pending: state.casts.filter((c) => c.worked === null),
    cast,
    answer,
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
