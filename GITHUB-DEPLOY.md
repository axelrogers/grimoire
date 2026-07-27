# Deploying Grimoire

**This file is superseded. See [`docs/WORKFLOW.md`](docs/WORKFLOW.md).**

It used to describe uploading files by hand through the GitHub web UI. That
workflow is retired as of 2026-07-27 — changes now push straight from the
Cowork workspace and GitHub Pages redeploys automatically.

Kept as a stub so any old link or bookmark lands somewhere useful.

- **Ship a change:** `scripts/gitsync.sh push "what changed"`
- **Deploy runs:** https://github.com/axelrogers/grimoire/actions
- **Live site:** https://axelrogers.github.io/grimoire/

The repo must stay named `grimoire` (lowercase) — `base: '/grimoire/'` in
`grimoire-github/vite.config.js` depends on it, and a mismatch renders a blank
page.
