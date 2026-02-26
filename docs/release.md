# Release Guide

## Goal

Enable users to run the tool with one command:

```bash
npx ingress-migration-copilot@latest --help
```

## 1. NPM package prerequisites

1. Ensure package name is available on npm (`ingress-migration-copilot`).
2. Set correct repository URLs in `package.json`:
   - `homepage`
   - `repository.url`
   - `bugs.url`
3. Add `NPM_TOKEN` secret in GitHub repository settings.

## 2. Local release check

Run from `migration-copilot/`:

```bash
npm install
npm run release:check
```

`release:check` runs `npm pack --dry-run` and shows exactly what will be published.

## 3. Publish a release

Preferred path:

1. Create a GitHub release (`v0.1.0`, `v0.1.1`, etc.).
2. `release-npm` workflow publishes to npm automatically.
3. Users can run:

```bash
npx ingress-migration-copilot@latest --help
```

## 4. Emergency manual publish

From `migration-copilot/`:

```bash
npm publish --access public
```

## 5. Post-release smoke tests

```bash
npx ingress-migration-copilot@latest --help
npx ingress-migration-copilot@latest catalog --format json
```

## 6. Homebrew sync (optional)

If you maintain a tap, run the `Release Homebrew` workflow or update formula manually:

```bash
npm run brew:formula:update -- 0.1.0
```
