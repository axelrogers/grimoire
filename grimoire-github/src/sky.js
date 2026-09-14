// ─── Grimoire · the live sky ──────────────────────────────────────────────
// One module everything reads: the arrival's plates, Today's sky line, and
// the remembered line. Computed locally from the clock — no network, no key.
//
// Accuracy: the moon uses the principal terms of Meeus, *Astronomical
// Algorithms* ch. 47 (longitude good to ~0.02°) and ch. 48 for illumination.
// That is enough to name the sign honestly except in the few minutes the moon
// sits on a cusp — and there the sign is left out rather than guessed
// (ARRIVAL.md: "never show a wrong sky").

const RAD = Math.PI / 180;
const sin = (d) => Math.sin(d * RAD);
const cos = (d) => Math.cos(d * RAD);
const norm = (d) => ((d % 360) + 360) % 360;

// Julian centuries since J2000, in Terrestrial Time. ΔT (~69 s this decade)
// moves the moon ~0.01°; included so the cusp guard has honest margins.
function centuries(date) {
  const jd = date.getTime() / 86400000 + 2440587.5 + 69 / 86400;
  return (jd - 2451545.0) / 36525;
}

// Principal periodic terms for the moon's longitude, Meeus table 47.A.
// [D, M, M', F, Σl coefficient in 1e-6 degrees]
const LON_TERMS = [
  [0, 0, 1, 0, 6288774], [2, 0, -1, 0, 1274027], [2, 0, 0, 0, 658314],
  [0, 0, 2, 0, 213618], [0, 1, 0, 0, -185116], [0, 0, 0, 2, -114332],
  [2, 0, -2, 0, 58793], [2, -1, -1, 0, 57066], [2, 0, 1, 0, 53322],
  [2, -1, 0, 0, 45758], [0, 1, -1, 0, -40923], [1, 0, 0, 0, -34720],
  [0, 1, 1, 0, -30383], [2, 0, 0, -2, 15327], [0, 0, 1, 2, -12528],
  [0, 0, 1, -2, 10980], [4, 0, -1, 0, 10675], [0, 0, 3, 0, 10034],
  [4, 0, -2, 0, 8548], [2, 1, -1, 0, -7888], [2, 1, 0, 0, -6766],
  [1, 0, -1, 0, -5163], [1, 1, 0, 0, 4987], [2, -1, 1, 0, 4036],
  [2, 0, 2, 0, 3994], [4, 0, 0, 0, 3861], [2, 0, -3, 0, 3665],
  [0, 1, -2, 0, -2689], [2, 0, -1, 2, -2602], [2, -1, -2, 0, 2390],
  [1, 0, 1, 0, -2348], [2, -2, 0, 0, 2236], [0, 1, 2, 0, -2120],
  [0, 2, 0, 0, -2069],
];

function moonAndSun(date) {
  const T = centuries(date);
  const Lp = norm(218.3164477 + 481267.88123421 * T); // moon mean longitude
  const D = norm(297.8501921 + 445267.1114034 * T);   // mean elongation
  const M = norm(357.5291092 + 35999.0502909 * T);    // sun mean anomaly
  const Mp = norm(134.9633964 + 477198.8675055 * T);  // moon mean anomaly
  const F = norm(93.272095 + 483202.0175233 * T);     // argument of latitude
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;

  let sl = 0;
  for (const [d, m, mp, f, c] of LON_TERMS) {
    const e = Math.abs(m) === 1 ? E : Math.abs(m) === 2 ? E * E : 1;
    sl += c * e * sin(d * D + m * M + mp * Mp + f * F);
  }
  const A1 = 119.75 + 131.849 * T;
  const A2 = 53.09 + 479264.29 * T;
  sl += 3958 * sin(A1) + 1962 * sin(Lp - F) + 318 * sin(A2);
  const moonLon = norm(Lp + sl / 1e6);

  // Sun, Meeus ch. 25 (low precision, ~0.01°), apparent longitude.
  const L0 = 280.46646 + 36000.76983 * T;
  const C =
    (1.914602 - 0.004817 * T) * sin(M) + (0.019993 - 0.000101 * T) * sin(2 * M) +
    0.000289 * sin(3 * M);
  const omega = 125.04 - 1934.136 * T;
  const sunLon = norm(L0 + C - 0.00569 - 0.00478 * sin(omega));

  // Phase angle and illuminated fraction, Meeus 48.4 / 48.1.
  const i =
    180 - D - 6.289 * sin(Mp) + 2.1 * sin(M) - 1.274 * sin(2 * D - Mp) -
    0.658 * sin(2 * D) - 0.214 * sin(2 * Mp) - 0.11 * sin(D);
  const illumination = (1 + cos(i)) / 2;

  return { T, moonLon, sunLon, elongation: norm(moonLon - sunLon), illumination };
}

const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

// Principal phases are named within ±7° of elongation (~13 hours either side
// of the exact moment); between them, crescent or gibbous.
function phaseName(e) {
  const near = (a) => Math.abs(((e - a + 540) % 360) - 180) < 7;
  if (near(0)) return "New moon";
  if (near(90)) return "First quarter";
  if (near(180)) return "Full moon";
  if (near(270)) return "Last quarter";
  if (e < 90) return "Waxing crescent";
  if (e < 180) return "Waxing gibbous";
  if (e < 270) return "Waning gibbous";
  return "Waning crescent";
}

/** The moon at `date`: phase, illumination, and sign when it can be named honestly. */
export function moonAt(date = new Date()) {
  const { moonLon, elongation, illumination } = moonAndSun(date);
  const intoSign = moonLon % 30;
  const onCusp = intoSign < 0.1 || intoSign > 29.9; // inside our error bar
  return {
    phase: phaseName(elongation),
    waxing: elongation < 180,
    /** 0 = new, 0.5 = full, → 1 = new again. Places the moon plate. */
    age: elongation / 360,
    illumination,
    longitude: moonLon,
    sign: onCusp ? null : SIGNS[Math.floor(moonLon / 30)],
  };
}

// Sun altitude for a known place — used only when the viewer has already
// granted location. Low-precision (Meeus ch. 12 + 25), fine to a fraction of
// a degree, which is all day/night needs.
function sunAltitude(date, lat, lon) {
  const { T, sunLon } = moonAndSun(date);
  const eps = 23.439291 - 0.0130042 * T;
  const ra = Math.atan2(cos(eps) * sin(sunLon), cos(sunLon)) / RAD;
  const dec = Math.asin(sin(eps) * sin(sunLon)) / RAD;
  const jd = date.getTime() / 86400000 + 2440587.5;
  const gmst = norm(280.46061837 + 360.98564736629 * (jd - 2451545));
  const H = gmst + lon - ra;
  return Math.asin(sin(lat) * sin(dec) + cos(lat) * cos(dec) * cos(H)) / RAD;
}

/**
 * Night or day. With a place: after sunset / before sunrise. Without one, a
 * local-time split (19:00–06:00 is night) — sensible, not astronomical.
 */
export function isNightAt(date = new Date(), coords = null) {
  if (coords) return sunAltitude(date, coords.lat, coords.lon) < -0.833;
  const h = date.getHours();
  return h >= 19 || h < 6;
}

// Which way the moon's lit limb faces: waxing is lit on the right in the
// north, on the left in the south. Latitude when known; otherwise the time
// zone's region, which only orients the drawing and is never shown as a fact.
const SOUTHERN_ZONES = /^(Australia|Antarctica)\/|^Pacific\/(Auckland|Chatham|Fiji|Tongatapu|Noumea)|^America\/(Argentina|Santiago|Sao_Paulo|Montevideo|Asuncion|La_Paz|Lima)|^Africa\/(Johannesburg|Maputo|Harare|Windhoek|Lusaka)|^Indian\/(Mauritius|Reunion)/;
function isSouthern(coords) {
  if (coords) return coords.lat < 0;
  try {
    return SOUTHERN_ZONES.test(Intl.DateTimeFormat().resolvedOptions().timeZone || "");
  } catch {
    return false;
  }
}

/** The whole sky for a moment. `weather` is null until location is granted. */
export function skyAt(date = new Date(), { coords = null, weather = null } = {}) {
  return {
    at: date,
    moon: moonAt(date),
    night: isNightAt(date, coords),
    southern: isSouthern(coords),
    weather,
  };
}

/** "Waxing gibbous · Moon in Pisces · 81% lit" — Today's sky line. */
export function skyLine(sky) {
  const { moon } = sky;
  const parts = [moon.phase];
  if (moon.sign) parts.push(`Moon in ${moon.sign}`);
  parts.push(`${Math.round(moon.illumination * 100)}% lit`);
  return parts.join(" · ");
}
