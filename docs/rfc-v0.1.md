# RFC: v0.1 Architecture

## Goal

Provide an explainable migration baseline from `ingress-nginx` to `Gateway API` without claiming full parity.

## Components

- `collector`: loads manifests from file system
- `analyzer`: classifies features and migration risk
- `scoring`: computes per-ingress and aggregate score
- `converter`: emits `HTTPRoute` resources
- `reporter`: serializes markdown/json outputs
- `validator`: CI gate from analysis result

## Non-goals

- Direct cluster write/apply operations
- Production cutover automation
- Vendor-specific policy generation in v0.1

## Determinism requirements

- Stable file discovery order
- Stable output naming
- Repeatable scoring inputs
