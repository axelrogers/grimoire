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
  // Brand only. NOT in the @import below — the app has no wordmark component
  // yet, so loading a decorative face nobody renders is pure download cost.
  // When a wordmark lands, add Cinzel+Decorative back to the import or this
  // will silently fall back to a system serif.
  brand: "'Cinzel Decorative', serif",
};

export const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Instrument+Sans:wght@400;500;600;700&family=Martian+Mono:wght@400;500&display=swap');

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
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
`;
