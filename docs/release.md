# Release Guide

## Goal

Ship the CLI publicly through GitHub releases and Homebrew tap.

## 1. Prerequisites

1. Ensure repository URLs in `package.json` are correct:
   - `homepage`
   - `repository.url`
   - `bugs.url`
2. Add GitHub repository settings:
   - variable: `HOMEBREW_TAP_REPO` (example: `YOUR_ORG/homebrew-tap`)
   - variable: `HOMEBREW_TAP_BRANCH` (optional, default: `main`)
   - secret: `HOMEBREW_TAP_TOKEN` (token with push access to the tap repo)

## 2. Validate before release

Run from `migration-copilot/`:

```bash
npm install
npm test
node ./bin/mig.js --help
```

## 3. Publish release

1. Create a Git tag and GitHub release (`v1.0.0`, `v1.0.1`, etc.).
2. `release-homebrew` workflow will:
   - compute SHA from `archive/refs/tags/vX.Y.Z.tar.gz`,
   - update `Formula/ingress-migration-copilot.rb`,
   - push formula update to your tap repo.

## 4. Post-release smoke tests

```bash
brew update
brew tap YOUR_ORG/tap https://github.com/YOUR_ORG/homebrew-tap
brew reinstall ingress-migration-copilot
mig --help
```

## 5. Manual formula update (optional)

```bash
npm run brew:formula:update -- 1.0.0
```
