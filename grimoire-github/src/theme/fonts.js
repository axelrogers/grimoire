// ─── Grimoire · Type + motion ─────────────────────────────────────────────
// Webfont imports and the animation vocabulary. Every keyframe the app uses
// is declared here; components reference them by name via the style objects.

// The four working families plus the brand face (DESIGN.md §3).
// Cinzel Decorative is wordmark/logo ONLY — never UI copy. Cinzel and
// Crimson Pro are gone; they predated the design system.
export const TYPE = {
  display: "'EB Garamond', Georgia, serif",       // --g-display
  body: "'Source Serif 4', Georgia, serif",       // --g-body (upright only)
  ui: "'Instrument Sans', system-ui, sans-serif", // --g-ui
  mono: "'Martian Mono', ui-monospace, monospace",// --g-mono
  // Brand/wordmark ONLY — never UI copy (DESIGN.md rule 3). Confirmed as the
  // real wordmark face from Axel's standalone logo file, weight 700. Now
  // loaded in main.jsx, so this is safe to use for a wordmark component.
  brand: "'Cinzel Decorative', serif",
};

// Families are loaded by main.jsx from @fontsource (self-hosted), NOT from a
// Google Fonts @import — see the note there. This string carries only the
// animation vocabulary now.
export const FONTS = `

@keyframes breathe {
  0%, 100% { transform: scale(1);   opacity: 0.85; }
  50%      { transform: scale(1.07); opacity: 1; }
}
@keyframes rise {
  0%   { transform: translateY(0)    scale(1);   opacity: 1; }
  60%  { transform: translateY(-26px) scale(1.1); opacity: 1; }
  100% { transform: translateY(-70px) scale(0.7); opacity: 0; }
}
@keyframes ringOut {
  0%   { transform: scale(0.6); opacity: 0.5; }
  100% { transform: scale(2.4); opacity: 0;   }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes settleIn {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes sheetUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
/* ── The arrival (ARRIVAL.md). Ritual, eased, no spring. ── */
@keyframes gp-lampwake {
  from { opacity: 0.25; }
  to   { opacity: 1; }
}
@keyframes gp-lampbreath {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.84; }
}
@keyframes gp-drawin {
  from { transform: scale(1); }
  to   { transform: scale(3.4); }
}
@keyframes gp-doorlight {
  0%   { opacity: 0; }
  55%  { opacity: 1; }
  100% { opacity: 1; }
}
@keyframes gp-tablein {
  from { opacity: 0; transform: scale(1.14); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes gp-bookopen {
  from { transform: rotateY(0deg); }
  to   { transform: rotateY(-172deg); }
}
@keyframes gp-pagefill {
  from { opacity: 0; transform: scale(0.3); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes gp-ink {
  from { opacity: 0; filter: blur(2px); transform: translateY(3px); }
  to   { opacity: 1; filter: blur(0);   transform: translateY(0); }
}
@keyframes gp-rain {
  from { background-position: 0 0; }
  to   { background-position: -40px 220px; }
}
@keyframes gp-mist {
  0%, 100% { transform: translateX(-4%); }
  50%      { transform: translateX(4%); }
}
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
`;
