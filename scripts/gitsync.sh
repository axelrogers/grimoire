#!/usr/bin/env bash
# ─── Grimoire · git sync ──────────────────────────────────────────────────
# Replaces the browser-upload workflow. Push straight to GitHub from the
# Cowork workspace, which is what makes GitHub Pages redeploy.
#
#   scripts/gitsync.sh setup            configure remote + identity from $GRIMOIRE_GH_TOKEN
#   scripts/gitsync.sh status           what's staged / ahead of origin
#   scripts/gitsync.sh push "message"   add -A, commit, push to main
#   scripts/gitsync.sh deploy-status    last GitHub Pages run (needs the token)
#
# THE TOKEN IS NEVER WRITTEN TO DISK OR TO GIT. It arrives as an environment
# variable, is used to build an in-memory remote URL, and is stripped from
# any output. `git remote -v` will show a redacted URL, not the secret.
set -euo pipefail

REPO_SLUG="${GRIMOIRE_REPO:-axelrogers/grimoire}"
BRANCH="${GRIMOIRE_BRANCH:-main}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

GIT="git -c user.name=${GIT_AUTHOR_NAME:-Grimoire Dev} -c user.email=${GIT_AUTHOR_EMAIL:-grimoire@local}"

die() { echo "error: $*" >&2; exit 1; }

need_token() {
  [ -n "${GRIMOIRE_GH_TOKEN:-}" ] || die "GRIMOIRE_GH_TOKEN is not set.
Read the token file from the 'Grimoire App' Drive folder and export it:
  export GRIMOIRE_GH_TOKEN='github_pat_...'
See docs/WORKFLOW.md for how the token is created and stored."
}

# Push URL is built fresh each time and never persisted in .git/config.
push_url() { printf 'https://x-access-token:%s@github.com/%s.git' "$GRIMOIRE_GH_TOKEN" "$REPO_SLUG"; }

# Anything that could echo the token gets scrubbed before it reaches a log.
scrub() { sed -e "s#x-access-token:[^@]*@#x-access-token:***@#g" -e "s#${GRIMOIRE_GH_TOKEN:-__nope__}#***#g"; }

case "${1:-}" in

  setup)
    [ -d .git ] || $GIT init -q
    # Fetch-only remote holds no credential, so it is safe to persist.
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://github.com/${REPO_SLUG}.git"
    git fetch -q origin "$BRANCH" 2>&1 | scrub || true
    git branch -M "$BRANCH"
    echo "remote: https://github.com/${REPO_SLUG}.git (branch ${BRANCH})"
    echo "credential: supplied per-push from \$GRIMOIRE_GH_TOKEN, never stored"
    ;;

  status)
    git remote get-url origin >/dev/null 2>&1 || die "no origin. Run: scripts/gitsync.sh setup"
    echo "── working tree ──"
    git status --short || true
    echo "── local vs origin/${BRANCH} ──"
    git fetch -q origin "$BRANCH" 2>&1 | scrub || echo "(fetch failed — offline or repo moved)"
    git log --oneline "origin/${BRANCH}..HEAD" 2>/dev/null | sed 's/^/  ahead: /' || true
    git log --oneline "HEAD..origin/${BRANCH}" 2>/dev/null | sed 's/^/  behind: /' || true
    ;;

  push)
    MSG="${2:-}"
    [ -n "$MSG" ] || die 'usage: scripts/gitsync.sh push "commit message"'
    need_token
    git remote get-url origin >/dev/null 2>&1 || die "no origin. Run: scripts/gitsync.sh setup"

    # Refuse to ship a broken build. The whole point of leaving browser-upload
    # is that a bad push now auto-deploys to the live site.
    if [ -f grimoire-github/package.json ]; then
      echo "── verifying build ──"
      ( cd grimoire-github && [ -d node_modules ] || npm install --silent >/dev/null 2>&1
        npm run build >/dev/null 2>&1 ) \
        || die "build failed — refusing to push. Run 'npm run build' in grimoire-github/ to see why."
      echo "build ok"
    fi

    $GIT add -A
    if git diff --cached --quiet; then
      echo "nothing to commit"
    else
      $GIT commit -qm "$MSG"
      echo "committed: $(git log --oneline -1)"
    fi

    echo "── pushing to ${REPO_SLUG} ${BRANCH} ──"
    git push "$(push_url)" "HEAD:${BRANCH}" 2>&1 | scrub
    echo "pushed. Pages deploy: https://github.com/${REPO_SLUG}/actions"
    echo "live in ~1-2 min: https://${REPO_SLUG%%/*}.github.io/${REPO_SLUG##*/}/"
    ;;

  deploy-status)
    need_token
    curl -sS -H "Authorization: Bearer ${GRIMOIRE_GH_TOKEN}" \
         -H "Accept: application/vnd.github+json" \
         "https://api.github.com/repos/${REPO_SLUG}/actions/runs?per_page=1" \
      | python3 -c 'import json,sys
d=json.load(sys.stdin).get("workflow_runs") or []
if not d: print("no runs found"); sys.exit()
r=d[0]
print(f'"'"'{r["name"]}: {r["status"]} / {r.get("conclusion") or "-"}  ({r["head_sha"][:7]}) {r["html_url"]}'"'"')'
    ;;

  *)
    grep '^#' "${BASH_SOURCE[0]}" | sed -n '2,12p' | sed 's/^# \?//'
    exit 1
    ;;
esac
