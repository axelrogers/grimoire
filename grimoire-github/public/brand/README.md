# Brand assets — BROKEN, do not use

`logo-wordmark-cream.png` and `logo-wordmark-ink.png` (546×129) are **truncated**.
They render as "GRIMOI" — the final letters are cut off mid-stroke. The same
fault appears in `grimoire-logo-primary.png` / `-inverse.png` (744×360) in the
`grimoire-prototype` repo, which read "GRIMOII".

`logo-monogram-*.png` (159×134) is a single "G" and appears intentional.

Until working artwork exists, the wordmark is set in the display face. Replace
these files and update `social-card.html`, then re-run
`node scripts/make-social-card.mjs`.

Copied from axelrogers/grimoire-prototype, 2026-08-03.
