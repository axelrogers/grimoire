# Grimoire App

(One-line description goes here once defined.)

This repository is developed inside the Cowork cloud workspace, which is
per-session/ephemeral. Continuity across sessions is handled by the
`grimoire-dev` skill, which snapshots this whole directory (including .git)
to the "Grimoire App" folder in Google Drive at each checkpoint and restores
it on resume. See docs/ for the living project memory.
