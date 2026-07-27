// ─── Grimoire · Type + motion ─────────────────────────────────────────────
// Webfont imports and the animation vocabulary. Every keyframe the app uses
// is declared here; components reference them by name via the style objects.

export const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Crimson+Pro:ital,wght@0,400;0,500;1,400&display=swap');

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
