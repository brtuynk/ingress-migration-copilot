# Contributing

## Development setup

```bash
npm install
npm test
```

## Pull request checklist

- Add or update tests for behavior changes.
- Keep command outputs deterministic.
- For rule changes, include fixture + golden-style expectation updates.
- Keep compatibility labels accurate: `mapped`, `manual`, `unsupported`.

## Commit conventions

Use concise prefixes:

- `feat:` new functionality
- `fix:` bug fix
- `docs:` documentation
- `test:` tests only

## Review policy

A PR should include:

- clear before/after behavior,
- risk notes for migration correctness,
- test evidence (`npm test` output).
