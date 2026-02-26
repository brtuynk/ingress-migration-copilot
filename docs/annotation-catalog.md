# NGINX Annotation Catalog

Total known annotations: 138

| Annotation | Capability | Status | Risk | Gateway Equivalent |
| --- | --- | --- | --- | --- |
| nginx.ingress.kubernetes.io/access-log-level | access-log | manual | low | implementation-specific policy |
| nginx.ingress.kubernetes.io/add-base-url | response-header-mutation | manual | medium | HTTPRoute ResponseHeaderModifier filter |
| nginx.ingress.kubernetes.io/affinity | session-affinity | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/affinity-canary-behavior | session-affinity-canary | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/affinity-mode | session-affinity | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/allowlist-source-range | source-ip-filter | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/app-root | app-root-redirect | manual | medium | HTTPRoute RequestRedirect filter |
| nginx.ingress.kubernetes.io/auth-always-set-cookie | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-cache-duration | external-auth-cache | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-cache-key | external-auth-cache | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-keepalive | external-auth-connection | unsupported | medium | none |
| nginx.ingress.kubernetes.io/auth-keepalive-requests | external-auth-connection | unsupported | medium | none |
| nginx.ingress.kubernetes.io/auth-keepalive-timeout | external-auth-connection | unsupported | medium | none |
| nginx.ingress.kubernetes.io/auth-method | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-realm | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-request-redirect | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-response-headers | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-secret | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-secret-type | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-signin | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-signin-redirect-param | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-snippet | nginx-auth-snippet | unsupported | blocker | none |
| nginx.ingress.kubernetes.io/auth-type | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/auth-url | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/backend-protocol | backend-protocol | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/brotli-level | compression | unsupported | low | none |
| nginx.ingress.kubernetes.io/brotli-types | compression | unsupported | low | none |
| nginx.ingress.kubernetes.io/canary | canary-routing | manual | high | HTTPRoute.backendRefs[].weight |
| nginx.ingress.kubernetes.io/canary-by-cookie | canary-routing | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/canary-by-header | canary-routing | manual | high | HTTPRoute.matches[].headers |
| nginx.ingress.kubernetes.io/canary-by-header-pattern | canary-routing | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/canary-by-header-value | canary-routing | manual | high | HTTPRoute.matches[].headers |
| nginx.ingress.kubernetes.io/canary-weight | canary-routing | manual | high | HTTPRoute.backendRefs[].weight |
| nginx.ingress.kubernetes.io/canary-weight-total | canary-routing | manual | high | HTTPRoute.backendRefs[].weight |
| nginx.ingress.kubernetes.io/client-body-buffer-size | request-body-buffer | unsupported | medium | none |
| nginx.ingress.kubernetes.io/configuration-snippet | nginx-snippet | unsupported | blocker | none |
| nginx.ingress.kubernetes.io/connection-proxy-header | connection-header | unsupported | medium | none |
| nginx.ingress.kubernetes.io/cors-allow-credentials | cors | manual | medium | HTTPRoute CORS filter or extension policy |
| nginx.ingress.kubernetes.io/cors-allow-headers | cors | manual | medium | HTTPRoute CORS filter or extension policy |
| nginx.ingress.kubernetes.io/cors-allow-methods | cors | manual | medium | HTTPRoute CORS filter or extension policy |
| nginx.ingress.kubernetes.io/cors-allow-origin | cors | manual | medium | HTTPRoute CORS filter or extension policy |
| nginx.ingress.kubernetes.io/cors-expose-headers | cors | manual | medium | HTTPRoute CORS filter or extension policy |
| nginx.ingress.kubernetes.io/cors-max-age | cors | manual | medium | HTTPRoute CORS filter or extension policy |
| nginx.ingress.kubernetes.io/custom-headers | response-header-mutation | manual | medium | HTTPRoute ResponseHeaderModifier filter |
| nginx.ingress.kubernetes.io/custom-http-errors | custom-errors | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/default-backend | default-backend | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/denylist-source-range | source-ip-filter | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/enable-access-log | access-log | manual | low | implementation-specific policy |
| nginx.ingress.kubernetes.io/enable-brotli | compression | unsupported | low | none |
| nginx.ingress.kubernetes.io/enable-cors | cors | manual | medium | HTTPRoute CORS filter or extension policy |
| nginx.ingress.kubernetes.io/enable-global-auth | external-auth | unsupported | high | none |
| nginx.ingress.kubernetes.io/enable-gzip | compression | unsupported | low | none |
| nginx.ingress.kubernetes.io/enable-modsecurity | waf | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/enable-opentelemetry | telemetry | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/enable-owasp-modsecurity-crs | waf | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/enable-rewrite-log | rewrite-debugging | unsupported | low | none |
| nginx.ingress.kubernetes.io/enable-underscores-in-headers | header-validation | unsupported | low | none |
| nginx.ingress.kubernetes.io/fastcgi-index | fastcgi | unsupported | medium | none |
| nginx.ingress.kubernetes.io/fastcgi-params-configmap | fastcgi | unsupported | medium | none |
| nginx.ingress.kubernetes.io/fastcgi-pass-header | fastcgi | unsupported | medium | none |
| nginx.ingress.kubernetes.io/force-ssl-redirect | https-redirect | manual | medium | HTTPRoute RequestRedirect filter |
| nginx.ingress.kubernetes.io/from-to-www-redirect | host-redirect | manual | medium | HTTPRoute RequestRedirect filter |
| nginx.ingress.kubernetes.io/gzip-level | compression | unsupported | low | none |
| nginx.ingress.kubernetes.io/gzip-types | compression | unsupported | low | none |
| nginx.ingress.kubernetes.io/http2-push-preload | http2-push | unsupported | low | none |
| nginx.ingress.kubernetes.io/ignore-invalid-headers | header-validation | unsupported | low | none |
| nginx.ingress.kubernetes.io/limit-allowlist | rate-limit-exclusion | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/limit-burst-multiplier | rate-limit | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/limit-connections | rate-limit | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/limit-rate | response-throttle | unsupported | medium | none |
| nginx.ingress.kubernetes.io/limit-rate-after | response-throttle | unsupported | medium | none |
| nginx.ingress.kubernetes.io/limit-rpm | rate-limit | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/limit-rps | rate-limit | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/limit-whitelist | rate-limit-exclusion | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/load-balance | load-balancing | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/location-snippet | nginx-snippet | unsupported | blocker | none |
| nginx.ingress.kubernetes.io/mirror-host | traffic-mirroring | manual | high | HTTPRoute RequestMirror filter |
| nginx.ingress.kubernetes.io/mirror-ignore-uri-case | traffic-mirroring | manual | high | HTTPRoute RequestMirror filter |
| nginx.ingress.kubernetes.io/mirror-request-body | traffic-mirroring | manual | high | HTTPRoute RequestMirror filter |
| nginx.ingress.kubernetes.io/mirror-target | traffic-mirroring | manual | high | HTTPRoute RequestMirror filter |
| nginx.ingress.kubernetes.io/modsecurity-snippet | waf-snippet | unsupported | blocker | none |
| nginx.ingress.kubernetes.io/opentelemetry-trust-incoming-span | telemetry | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/permanent-redirect | static-redirect | manual | medium | HTTPRoute RequestRedirect filter |
| nginx.ingress.kubernetes.io/permanent-redirect-code | static-redirect | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/preserve-trailing-slash | redirect-shape | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-body-size | request-body-limits | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-buffer-size | response-buffering | unsupported | medium | none |
| nginx.ingress.kubernetes.io/proxy-buffering | response-buffering | unsupported | medium | none |
| nginx.ingress.kubernetes.io/proxy-buffers-number | response-buffering | unsupported | medium | none |
| nginx.ingress.kubernetes.io/proxy-busy-buffers-size | response-buffering | unsupported | medium | none |
| nginx.ingress.kubernetes.io/proxy-connect-timeout | upstream-timeout | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-cookie-domain | cookie-rewrite | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-cookie-flags | cookie-rewrite | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-cookie-path | cookie-rewrite | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-http-version | upstream-protocol | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-intercept-errors | custom-errors | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-max-temp-file-size | response-buffering | unsupported | medium | none |
| nginx.ingress.kubernetes.io/proxy-next-upstream | retry-policy | manual | high | HTTPRoute Retry policy (if supported) |
| nginx.ingress.kubernetes.io/proxy-next-upstream-timeout | retry-policy | manual | high | HTTPRoute Retry policy (if supported) |
| nginx.ingress.kubernetes.io/proxy-next-upstream-tries | retry-policy | manual | high | HTTPRoute Retry policy (if supported) |
| nginx.ingress.kubernetes.io/proxy-read-timeout | upstream-timeout | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-redirect-from | upstream-redirect-rewrite | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-redirect-to | upstream-redirect-rewrite | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-request-buffering | request-buffering | unsupported | medium | none |
| nginx.ingress.kubernetes.io/proxy-send-timeout | upstream-timeout | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-set-headers | request-header-mutation | manual | medium | HTTPRoute RequestHeaderModifier filter |
| nginx.ingress.kubernetes.io/proxy-ssl-ciphers | upstream-tls | unsupported | medium | none |
| nginx.ingress.kubernetes.io/proxy-ssl-name | upstream-tls | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-ssl-protocols | upstream-tls | unsupported | medium | none |
| nginx.ingress.kubernetes.io/proxy-ssl-secret | upstream-tls | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-ssl-server-name | upstream-tls | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-ssl-session-reuse | upstream-tls | unsupported | low | none |
| nginx.ingress.kubernetes.io/proxy-ssl-verify | upstream-tls | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/proxy-ssl-verify-depth | upstream-tls | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/rewrite-target | url-rewrite | mapped | low | HTTPRoute.filters[].urlRewrite |
| nginx.ingress.kubernetes.io/satisfy | auth-satisfy | unsupported | high | none |
| nginx.ingress.kubernetes.io/server-alias | hostname-alias | manual | medium | HTTPRoute.spec.hostnames |
| nginx.ingress.kubernetes.io/server-snippet | nginx-snippet | unsupported | blocker | none |
| nginx.ingress.kubernetes.io/service-upstream | upstream-selection | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/session-cookie-change-on-failure | session-affinity | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/session-cookie-conditional-samesite-none | session-affinity | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/session-cookie-domain | session-affinity | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/session-cookie-expires | session-affinity | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/session-cookie-max-age | session-affinity | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/session-cookie-name | session-affinity | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/session-cookie-path | session-affinity | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/session-cookie-samesite | session-affinity | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/session-cookie-secure | session-affinity | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/ssl-redirect | https-redirect | manual | medium | HTTPRoute RequestRedirect filter |
| nginx.ingress.kubernetes.io/temporal-redirect | static-redirect | manual | medium | HTTPRoute RequestRedirect filter |
| nginx.ingress.kubernetes.io/upstream-hash-by | load-balancing | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/upstream-hash-by-subset | load-balancing | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/upstream-hash-by-subset-size | load-balancing | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/upstream-vhost | upstream-host-rewrite | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/use-port-in-redirects | redirect-shape | manual | medium | implementation-specific policy |
| nginx.ingress.kubernetes.io/use-regex | regex-routing | manual | high | Controller-dependent path matching |
| nginx.ingress.kubernetes.io/whitelist-source-range | source-ip-filter | manual | high | implementation-specific policy |
| nginx.ingress.kubernetes.io/x-forwarded-prefix | request-header-mutation | manual | medium | HTTPRoute RequestHeaderModifier filter |