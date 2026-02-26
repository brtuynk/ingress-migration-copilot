# ingress-migration-copilot

Open-source CLI for helping teams migrate from `ingress-nginx` to `Gateway API` with an explainable compatibility score.

## One-command usage

No install required:

```bash
npx ingress-migration-copilot@latest --help
```

Example:

```bash
npx ingress-migration-copilot@latest analyze --input ./ingress --format md
```

Global install:

```bash
npm i -g ingress-migration-copilot
mig --help
```

## Homebrew (macOS)

```bash
brew tap YOUR_ORG/tap https://github.com/YOUR_ORG/homebrew-tap
brew install ingress-migration-copilot
mig --help
```

## What it does in v0.1

- Analyzes `Ingress` manifests and detects migration risks.
- Covers all detected `nginx.ingress.kubernetes.io/*` annotations with:
  - known catalog mapping (currently 138 known annotation keys),
  - unknown-annotation blocker fallback.
- Converts compatible routes to `HTTPRoute` resources.
- Tags non-parity features as `manual` or `unsupported`.
- Produces JSON/Markdown outputs for CI or migration reports.
- Adds CI-friendly gate command (`validate`) to block risky cutovers.

## Scope

- Target: `ingress-nginx` -> `Gateway API`.
- Not in scope yet: `Traefik` emitter, full behavior replay, vendor-specific policy generation.

## Quick start

```bash
cd migration-copilot
npm install
node ./bin/mig.js analyze --input ./fixtures/sample-ingress.yaml --format md
node ./bin/mig.js analyze --input ./fixtures/sample-ingress.yaml --format json --output ./out/analysis.json
node ./bin/mig.js convert --input ./fixtures/sample-ingress.yaml --out ./out --gateway shared-gateway --gateway-namespace infra
node ./bin/mig.js validate --analysis ./out/analysis.json --min-score 85 --max-blockers 0
node ./bin/mig.js catalog --format md --output ./docs/annotation-catalog.md
```

## Commands

### `analyze`

```bash
mig analyze --input <file|dir> [--format md|json] [--output <path>]
```

Outputs feature-level migration findings, catalog coverage, unknown annotation blockers, and compatibility score.

### `convert`

```bash
mig convert --input <file|dir> --out <dir> [--target gateway-api] [--gateway <name>] [--gateway-namespace <ns>]
```

Writes converted `HTTPRoute` YAML files.

### `validate`

```bash
mig validate --analysis <analysis.json> [--min-score 85] [--max-blockers 0]
```

Returns non-zero exit code when risk thresholds are not met.

### `catalog`

```bash
mig catalog [--format md|json] [--output <path>]
```

Exports the known ingress-nginx annotation catalog and mapping status.

## Rule model

Each detected feature is labeled as one of:

- `mapped`: automatic conversion is available in v0.1.
- `manual`: conversion exists but requires human design validation.
- `unsupported`: no safe 1:1 portable mapping.

Every unknown `nginx.ingress.kubernetes.io/*` key is treated as `unsupported` with `blocker` risk.

## Project layout

- `bin/`: executable entrypoint
- `src/commands/`: command handlers
- `src/lib/`: analyzer, scoring, converter and report utilities
- `fixtures/`: sample ingress manifests
- `test/`: unit tests

## Docs

- Annotation catalog: [`docs/annotation-catalog.md`](./docs/annotation-catalog.md)
- Mapping matrix: [`docs/mapping-matrix.md`](./docs/mapping-matrix.md)
- RFC: [`docs/rfc-v0.1.md`](./docs/rfc-v0.1.md)
- Release guide: [`docs/release.md`](./docs/release.md)
- Homebrew guide: [`docs/homebrew.md`](./docs/homebrew.md)

## Roadmap

- `v0.2`: behavior comparison harness (baseline vs candidate), richer score model.
- `v0.3`: Traefik emitter based on same intermediate model.
- `v0.4`: pluggable policy adapters for auth/rate-limit/timeouts.

## License

Apache-2.0
