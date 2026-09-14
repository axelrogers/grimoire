// ─── Grimoire · useSky ────────────────────────────────────────────────────
// The live sky as React state. Moon and time of day are computed at once from
// the clock; weather joins later, and only if the viewer has ALREADY granted
// location. This never prompts for location — nothing interrupts the arrival
// (ARRIVAL.md, Phase 1 step 2; pencilled, Axel to confirm).

import { useEffect, useState } from "react";
import { skyAt } from "./sky.js";

// Dev-only overrides for tuning the arrival: ?at=2025-03-14T06:55Z to stand
// under another night's moon, ?weather=rain|mist|clear to see the overlays.
// Stripped from production builds by the DEV guard.
function devOverrides() {
  if (!import.meta.env.DEV || typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const at = q.get("at") ? new Date(q.get("at")) : null;
  return {
    at: at && !isNaN(at) ? at : null,
    weather: q.get("weather"),
  };
}

// WMO weather codes (Open-Meteo) → the overlays the house has. Snow and plain
// cloud have no plate yet, so they read as no weather rather than a wrong one.
function overlayFor(code) {
  if (code == null) return null;
  if (code === 45 || code === 48) return "mist";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) return "rain";
  if (code <= 1) return "clear";
  return null;
}

// Coordinates only if permission is already "granted" — `query` never prompts.
// Rounded to ~1 km before they go anywhere.
async function grantedCoords() {
  try {
    if (!navigator.permissions || !navigator.geolocation) return null;
    const p = await navigator.permissions.query({ name: "geolocation" });
    if (p.state !== "granted") return null;
  } catch {
    return null;
  }
  return new Promise((resolve) =>
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: Math.round(pos.coords.latitude * 100) / 100,
          lon: Math.round(pos.coords.longitude * 100) / 100,
        }),
      () => resolve(null),
      { maximumAge: 3600000, timeout: 4000 },
    ),
  );
}

// Open-Meteo: keyless, so no secret in the build.
async function weatherAt({ lat, lon }) {
  try {
    const r = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code`,
    );
    if (!r.ok) return null;
    return overlayFor((await r.json())?.current?.weather_code);
  } catch {
    return null; // no weather is always an honest answer
  }
}

// One sky per page load, shared by every reader.
const dev = devOverrides();
let snapshot = skyAt(dev.at || new Date(), { weather: dev.weather || null });
const subs = new Set();
let started = false;

async function joinWeather() {
  if (dev.weather) return;
  const coords = await grantedCoords();
  if (!coords) return;
  const weather = await weatherAt(coords);
  snapshot = skyAt(snapshot.at, { coords, weather });
  subs.forEach((fn) => fn(snapshot));
}

export function useSky() {
  const [sky, setSky] = useState(snapshot);
  useEffect(() => {
    subs.add(setSky);
    if (!started) {
      started = true;
      joinWeather();
    }
    return () => subs.delete(setSky);
  }, []);
  return sky;
}
