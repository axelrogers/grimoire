# How changes reach the live site

**Superseded 2026-07-27:** the browser-upload workflow (drag files into the
GitHub web UI) is gone. It cost a file-by-file hand-upload for every change,
and it stranded the twelve-file theme split for two sessions. Changes now go
straight from the Cowork workspace to GitHub, and GitHub Pages redeploys.

```
Cowork workspace  ──git push──▶  github.com/axelrogers/grimoire  ──Actions──▶  Pages
```

---

## One-time setup (Axel, ~3 minutes)

### 1. Create a fine-grained token

Go to **https://github.com/settings/personal-access-tokens/new**

| Field | Value |
|---|---|
| Token name | `grimoire-cowork` |
| Expiration | 90 days (set a reminder to rotate) |
| Repository access | **Only select repositories** → `axelrogers/grimoire` |
| Permissions → Contents | **Read and write** |
| Permissions → Actions | **Read-only** *(optional — lets me report deploy status)* |

Nothing else. Not "all repositories", not account-level scopes. If this token
leaks, the blast radius is one public repo that already shows its whole
contents to the world.

Click **Generate token** and copy it. It starts with `github_pat_`.

### 2. Store it in Drive

In the **Grimoire App** folder in Google Drive, create a plain text file named
exactly:

```
grimoire-gh-token
```

with the token as its only contents. That's it.

### 3. Rotation

When it expires, repeat step 1 and save a **new** file named
`grimoire-gh-token-YYYY-MM-DD`. Resume always takes the newest matching file,
so the new one wins automatically — the Drive connector can't delete, so
superseding by date is how everything in this project is versioned.

---

## Per-session use (Claude)

At the start of a working session:

```bash
# read the newest grimoire-gh-token* from the Grimoire App Drive folder
export GRIMOIRE_GH_TOKEN='github_pat_...'
scripts/gitsync.sh setup
scripts/gitsync.sh status
```

To ship:

```bash
scripts/gitsync.sh push "what changed"
scripts/gitsync.sh deploy-status
```

`push` runs `npm run build` first and **refuses to push if the build fails**.
That guard matters more now than it did under browser-upload: a bad commit
auto-deploys to the live site within two minutes.

### The token never lands on disk

`gitsync.sh` builds the authenticated URL in memory for the duration of one
`git push`. `.git/config` holds only the plain `https://github.com/...` fetch
URL. Any output that could contain the token is scrubbed before printing.
Do not add the token to `.git/config`, a `.env`, or any file in the repo —
`.gitignore` blocks the obvious names, but the rule is "it lives in Drive and
in the environment variable, nowhere else".

---

## Deploying

Nothing to do. `.github/workflows/deploy.yml` fires on every push to `main`,
builds `grimoire-github/`, and publishes to Pages.

- Runs: https://github.com/axelrogers/grimoire/actions
- Live: https://axelrogers.github.io/grimoire/

First-time Pages setup (already done, recorded here so it isn't lost):
Settings → Pages → Build and deployment → Source = **GitHub Actions**.

If the site loads blank, `base` in `grimoire-github/vite.config.js` no longer
matches the repo name. It must be `'/grimoire/'`.

---

## What's in the repo now

The repo used to hold only the app. As of 2026-07-27 it also holds the project
memory, so the code and the reasoning behind it are versioned together and
neither can drift from the other:

```
docs/            WORKLOG, TASKS, DECISIONS, SPELL-SCHEMA, WORKFLOW (this file)
scripts/         gitsync.sh
grimoire-github/ the Vite + React app
.github/         Pages deploy workflow
```

Still missing and worth finding: `DESIGN.md` and `tokens.css`, which live
somewhere outside version control and will drift until they're committed here.
