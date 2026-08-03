# Grimoire — Design System v1

Extracted from `Grimoire Prototype.dc.html` (July 2026). This is the source of
truth for all visual work — prototype iterations and the app rebuild. No
off-scale values; if a design needs a value not on a scale here, that is a
proposal to change the system, not a one-off exception.

## 1. Brand language

Two locked axes, four combinations:

- **Palette** — `amethyst` (default, Axel 2026-08-03) or `amber`. User-selectable identity, not
  seasonal skinning.
- **Mode** — `day` or `night`. Night is candlelight, not inversion: grounds go
  deep, accents stay *lit* (gold/lilac glow), rules and hairlines shift from
  ink-alpha to lit-alpha.

All colour flows through the semantic variables below, set by `applyTheme()`.
Components never touch raw hex.

## 2. Colour tokens (semantic, set per palette x mode)

| var | role |
|---|---|
| `--p-desk` / `--p-deskText` | desk chrome behind the book |
| `--p-ground` | page ground |
| `--p-text` | primary text |
| `--p-accent` / `--p-accentSoft` | palette accent + wash |
| `--g-lit` / `--p-litDeep` / `--p-litSoft` / `--p-litLine` | luminous accent family (gold / lilac) |
| `--g-ink` | palette ink |
| `--p-rule` / `--p-rule2` / `--p-hair` | rules and hairlines |
| `--p-glass` / `--p-glassBorder` | glass surfaces |
| `--p-plate1` / `--p-plate2` | raised plates |
| `--p-cardShadow` | card elevation |
| `--p-ctaBg` / `--p-ctaText` / `--p-ctaGold` | call-to-action |
| `--p-quote` | quotation marks / flourishes |
| `--p-dockActiveBg` / `--p-dockActiveText` | dock active state |
| `--p-glow1` / `--p-glow2` | ambient glow wash |
| `--p-frameBorder` | book frame edge |

Raw palette definitions (amber / amethyst hex ramps) live only in
`palettesDef()`. Add a palette by adding a ramp there — nothing downstream
changes.

## 3. Typography

| token | family | role |
|---|---|---|
| `--g-display` | EB Garamond | display, titles, in-world voice |
| `--g-body` | Source Serif 4 (upright) | body copy. Renamed from `--g-italic`, July 2026 — italics removed app-wide; only the signature remains italic |
| `--g-ui` | Instrument Sans | functional UI |
| `--g-mono` | Martian Mono | numerals, receipts, ledger moments |
| brand | Cinzel Decorative | wordmark/logo only — never in UI copy |

**Type scale (px):** 9 · 10 · 12 · 14 · 16 · 19 · 22 · 26 · 30 · 34 · 44 · 68(hero)

9 = eyebrows/micro-labels, 10 = captions/meta, 12 = secondary, 14 = body,
16 = lead, 19–26 = headings, 30–44 = display, 68 = hero one-off.

**Tracking scale (em):** −0.01 (display tight) · 0 · 0.08 · 0.14 · 0.22 · 0.32
(uppercase eyebrows use 0.14–0.32; body is always 0).

## 4. Shape & elevation

**Radius scale (px):** 2 (xs) · 4 (sm) · 10 (md) · 16 (lg) · 20 (xl, cards) ·
48 (sheet) · 100 (pill) · 50% (circles)

**Surfaces:** ground → glass (`--p-glass` + `--p-glassBorder`) → plate
(`--p-plate1/2`) → sheet. Elevation is one shadow token (`--p-cardShadow`),
mode-aware.

## 5. Animation vocabulary

All keyframes are namespaced `gp-`. Current vocabulary: `fade`, `fadeB`,
`dim`, `rise`, `riseGlow`, `sheet`, `sheetSoft`, `absorb`, `ember`, `stain`,
`inkout`, `askout`, `relfade`, `took`, `oathRing`, `oathStar`.
House rules: motion is ritual, not bounce — eases in/out, no spring physics;
sheets rise, ink settles, embers ascend. Respect `prefers-reduced-motion`.

## 6. Patterns

- **Sheet** — bottom-rising panel, radius 48 top, `gp-sheet` entrance, grip bar.
- **Card / plate** — radius 20, glass or plate surface, `--p-cardShadow`.
- **Chip** — pill (100), hairline border, uppercase 9–10px eyebrow tracking.
- **Hold-to-commit** — press-and-hold with ring animation (`gp-oathRing`) for
  irreversible acts (seal, oath). Tap = browse, hold = commit.
- **Eyebrow** — uppercase, 9px, tracking 0.22–0.32, `--g-ui` or `--g-display`.

## 7. Rules of use

1. Components consume tokens; only `palettesDef()`/`applyTheme()` hold raw hex.
2. No italics anywhere except the signature.
3. Cinzel Decorative is brand-only.
4. New values off-scale = system change proposal, not an exception.
5. Night mode is designed, not derived — check both modes for every change.
