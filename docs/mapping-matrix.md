# ingress-nginx -> Gateway API Mapping Matrix (v0.1)

This project now uses an annotation catalog for `nginx.ingress.kubernetes.io/*` keys.

- Full catalog (currently 138 known keys): [`annotation-catalog.md`](./annotation-catalog.md)
- Unknown nginx annotation keys are automatically marked as `unsupported` + `blocker`.

## Status model

| Status | Meaning |
| --- | --- |
| mapped | Automatically translated in v0.1 and safe enough for default output |
| manual | Requires target-controller design and behavior validation |
| unsupported | No safe portable translation in Gateway API core |

## Risk model

| Risk | Meaning |
| --- | --- |
| low | Expected low migration risk |
| medium | Moderate behavior-drift risk |
| high | Significant behavior-drift risk |
| blocker | Cutover should be blocked until addressed |

## Core built-in features (non-annotation)

| Feature | Gateway API target | Status |
| --- | --- | --- |
| Host/path routing | `HTTPRoute.spec.rules[].matches[]` | mapped |
| TLS host binding | `HTTPRoute.spec.hostnames[]` | mapped |
