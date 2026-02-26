# Roadmap

## v0.1.0 (current)

- Ingress manifest analyzer with feature-level risk labels
- Gateway API HTTPRoute emitter
- Compatibility scoring + validate gate
- Markdown/JSON report outputs

## v0.2.0

- Intermediate model abstraction and explicit translation graph
- Behavior test harness for baseline vs candidate endpoints
- Per-route weighted scoring based on traffic criticality input

## v0.3.0

- Traefik emitter built from the same intermediate model
- Shared unsupported-pattern diagnostics across emitters

## v0.4.0

- Policy adapter interface for auth/rate-limit/timeout
- Pluggable provider policies (envoy/traefik/vendor adapters)
