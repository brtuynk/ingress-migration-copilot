# Homebrew Packaging

This project supports Homebrew distribution via a tap repository.

## Files in this repo

- Formula source: `Formula/ingress-migration-copilot.rb`
- Update script: `scripts/update-homebrew-formula.sh`

## Recommended setup

1. Keep app source in this repository.
2. Create a separate tap repository: `homebrew-tap`.
3. Copy `Formula/ingress-migration-copilot.rb` into the tap repo under `Formula/`.

## Install command for users

```bash
brew tap YOUR_ORG/tap https://github.com/YOUR_ORG/homebrew-tap
brew install ingress-migration-copilot
mig --help
```

## Update formula after each npm release

Run from project root:

```bash
npm run brew:formula:update -- 0.1.0
```

This updates `url` and `sha256` in `Formula/ingress-migration-copilot.rb` using the npm tarball.

If npm is not published yet, pass a local tarball:

```bash
npm pack
npm run brew:formula:update -- 0.1.0 ./ingress-migration-copilot-0.1.0.tgz
```

## Optional automation workflow

`release-homebrew.yml` can sync the formula to your tap repository.

Required repository settings:

- variable: `HOMEBREW_TAP_REPO` (example: `YOUR_ORG/homebrew-tap`)
- secret: `HOMEBREW_TAP_TOKEN` (token with push access to tap repo)

## Validate formula locally

```bash
ruby -c Formula/ingress-migration-copilot.rb
```

Optional with local tap checkout:

```bash
brew install --build-from-source ./Formula/ingress-migration-copilot.rb
mig --help
```
