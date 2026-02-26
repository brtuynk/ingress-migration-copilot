# Homebrew Packaging

This project is distributed via a Homebrew tap.

## Files in this repo

- Formula source: `Formula/ingress-migration-copilot.rb`
- Update script: `scripts/update-homebrew-formula.sh`

## Install command for users

```bash
brew tap YOUR_ORG/tap https://github.com/YOUR_ORG/homebrew-tap
brew install ingress-migration-copilot
mig --help
```

## Formula source URL

The formula points to GitHub tag archives:

```text
https://github.com/<owner>/<repo>/archive/refs/tags/v<version>.tar.gz
```

## Update formula after each release

Run from project root:

```bash
npm run brew:formula:update -- 1.0.0
```

This updates `url` and `sha256` in `Formula/ingress-migration-copilot.rb`.

## Optional automation workflow

`release-homebrew.yml` can sync formula updates to your tap repository.

Required repository settings:

- variable: `HOMEBREW_TAP_REPO` (example: `YOUR_ORG/homebrew-tap`)
- variable: `HOMEBREW_TAP_BRANCH` (optional, default: `main`)
- secret: `HOMEBREW_TAP_TOKEN` (token with push access to tap repo)

## Validate formula locally

```bash
ruby -c Formula/ingress-migration-copilot.rb
```
