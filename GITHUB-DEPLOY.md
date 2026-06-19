# Host Grimoire on GitHub Pages (free, phone-ready)

Use **grimoire-github.zip** — it's the project set up to auto-deploy. Once you
push it to a GitHub repo, GitHub builds and publishes it for you. No terminal,
no manual builds.

The result is a live URL like:
**https://YOUR-USERNAME.github.io/grimoire/**

> IMPORTANT: the repo MUST be named **grimoire** (lowercase). The project is
> configured for that exact name. If you name it something else, the page will
> load blank — see "Different repo name" at the bottom to fix.

---

## Easiest path — upload in the browser (no terminal, works on laptop)

1. Unzip **grimoire-github.zip** on your computer.
2. Go to **https://github.com/new** and create a repo named exactly
   **grimoire**. Set it to Public. Don't add a README. Click "Create".
3. On the new repo page, click **"uploading an existing file"** (the link in
   the middle of the page).
4. Drag in **everything from inside the unzipped folder** — including the
   hidden `.github` folder. (If your file browser hides dotfiles: on Mac press
   Cmd+Shift+. to show them; on Windows enable "Hidden items" in View.)
   The `.github` folder is what does the auto-deploy — it must go up.
5. Click **"Commit changes"** at the bottom.
6. Go to the repo's **Settings -> Pages** (left sidebar).
7. Under "Build and deployment", set **Source** to **GitHub Actions**.
8. Go to the **Actions** tab — you'll see a deploy running. Wait ~1-2 minutes
   for the green check.
9. Your site is live at **https://YOUR-USERNAME.github.io/grimoire/**

Open that on your phone. Share -> Add to Home Screen for a fullscreen app feel.

---

## If the `.github` folder won't upload via drag

GitHub's web uploader sometimes skips hidden folders. If the Actions tab shows
nothing after committing, the workflow didn't upload. Two fixes:

- **Re-drag just the folder:** in the repo, "Add file -> Upload files", and
  drag the `.github` folder in on its own.
- **Or create it by hand:** "Add file -> Create new file", name it exactly
  `.github/workflows/deploy.yml` (typing the slashes creates the folders),
  paste the contents of that file from your unzipped copy, commit.

---

## Different repo name?

If you named the repo something other than `grimoire`, open
`vite.config.js`, change:

```
base: '/grimoire/',
```

to match your repo name, e.g. `base: '/my-repo-name/'`, commit the change,
and the next deploy will fix the blank page.

---

## What this is

The demo build: all four tabs, the three-tap cast, Day/Night, the success
loop — all live. No backend yet, so state resets on reload and Apple Pay is
the visual flow, not real payment. This is the correct first step toward the
Supabase + Stripe build, not throwaway work.
