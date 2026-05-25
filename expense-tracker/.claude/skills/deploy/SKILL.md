---
description: Deploy the finance-tracker app — runs lint, builds the production bundle, and pushes dist/ to the staging area.
---

# deploy

Deploy finance-tracker to staging.

## Steps

### 1. Run tests (lint gate)

No test runner is configured yet. Run ESLint as the quality gate.
If a test runner is added later, run it here first, before lint.

```bash
npm run lint
```

Fail immediately if lint reports any errors. Do not proceed to build.

### 2. Build the production bundle

```bash
npm run build
```

This writes output to `dist/`. Fail if the build exits non-zero.

### 3. Push to staging

Copy the `dist/` folder to the staging area:

```bash
STAGING_DIR="../staging"
mkdir -p "$STAGING_DIR"
rsync -av --delete dist/ "$STAGING_DIR/"
echo "Deployed to $STAGING_DIR"
```

`STAGING_DIR` defaults to `../staging` (a sibling of the project root).
Override it by setting the `STAGING_DIR` environment variable before invoking the skill.

## Usage

Invoke from any Claude Code session in this repo:

```
/deploy
```

Or ask Claude: "deploy the app to staging".

## Notes

- Always run steps in order: lint → build → push. Never skip lint.
- If any step fails, stop and report the error. Do not push a broken build.
- The `--delete` flag on rsync removes files in staging that no longer exist in `dist/`.
