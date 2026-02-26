const NGINX_ANNOTATION_PREFIX = 'nginx.ingress.kubernetes.io/';

function rule({
  capability,
  label,
  status,
  risk,
  detail,
  gatewayEquivalent = 'implementation-specific policy',
}) {
  return {
    capability,
    label,
    status,
    risk,
    detail,
    gatewayEquivalent,
  };
}

const KNOWN_ANNOTATIONS = {
  'rewrite-target': rule({
    capability: 'url-rewrite',
    label: 'URL rewrite',
    status: 'mapped',
    risk: 'low',
    detail: 'Mapped to HTTPRoute URLRewrite for regex-free paths.',
    gatewayEquivalent: 'HTTPRoute.filters[].urlRewrite',
  }),
  'use-regex': rule({
    capability: 'regex-routing',
    label: 'Regex path matching',
    status: 'manual',
    risk: 'high',
    detail: 'Regex matching depends on implementation and route design.',
    gatewayEquivalent: 'Controller-dependent path matching',
  }),
  'app-root': rule({
    capability: 'app-root-redirect',
    label: 'Application root redirect',
    status: 'manual',
    risk: 'medium',
    detail: 'Can be modeled with request redirect rules.',
    gatewayEquivalent: 'HTTPRoute RequestRedirect filter',
  }),
  'ssl-redirect': rule({
    capability: 'https-redirect',
    label: 'HTTP to HTTPS redirect',
    status: 'manual',
    risk: 'medium',
    detail: 'Needs explicit redirect policy at route or gateway layer.',
    gatewayEquivalent: 'HTTPRoute RequestRedirect filter',
  }),
  'force-ssl-redirect': rule({
    capability: 'https-redirect',
    label: 'Forced HTTPS redirect',
    status: 'manual',
    risk: 'medium',
    detail: 'Needs explicit redirect policy at route or gateway layer.',
    gatewayEquivalent: 'HTTPRoute RequestRedirect filter',
  }),
  'preserve-trailing-slash': rule({
    capability: 'redirect-shape',
    label: 'Preserve trailing slash',
    status: 'manual',
    risk: 'medium',
    detail: 'Redirect normalization behavior requires explicit testing.',
  }),
  'from-to-www-redirect': rule({
    capability: 'host-redirect',
    label: 'WWW host redirect',
    status: 'manual',
    risk: 'medium',
    detail: 'Host redirect requires explicit route-level redirect rule.',
    gatewayEquivalent: 'HTTPRoute RequestRedirect filter',
  }),
  'permanent-redirect': rule({
    capability: 'static-redirect',
    label: 'Permanent redirect',
    status: 'manual',
    risk: 'medium',
    detail: 'Redirect target can be translated but behavior must be validated.',
    gatewayEquivalent: 'HTTPRoute RequestRedirect filter',
  }),
  'permanent-redirect-code': rule({
    capability: 'static-redirect',
    label: 'Permanent redirect code',
    status: 'manual',
    risk: 'medium',
    detail: 'Status code translation must be validated in target controller.',
  }),
  'temporal-redirect': rule({
    capability: 'static-redirect',
    label: 'Temporary redirect',
    status: 'manual',
    risk: 'medium',
    detail: 'Redirect target can be translated but behavior must be validated.',
    gatewayEquivalent: 'HTTPRoute RequestRedirect filter',
  }),
  'enable-rewrite-log': rule({
    capability: 'rewrite-debugging',
    label: 'Rewrite logs',
    status: 'unsupported',
    risk: 'low',
    detail: 'Nginx rewrite logging has no portable Gateway API equivalent.',
    gatewayEquivalent: 'none',
  }),
  'server-alias': rule({
    capability: 'hostname-alias',
    label: 'Server aliases',
    status: 'manual',
    risk: 'medium',
    detail: 'Additional hostnames should be modeled in HTTPRoute hostnames.',
    gatewayEquivalent: 'HTTPRoute.spec.hostnames',
  }),
  'x-forwarded-prefix': rule({
    capability: 'request-header-mutation',
    label: 'X-Forwarded-Prefix header',
    status: 'manual',
    risk: 'medium',
    detail: 'Header behavior should be modeled with explicit request header filters.',
    gatewayEquivalent: 'HTTPRoute RequestHeaderModifier filter',
  }),
  'upstream-vhost': rule({
    capability: 'upstream-host-rewrite',
    label: 'Upstream Host header rewrite',
    status: 'manual',
    risk: 'high',
    detail: 'Host rewrite support is implementation-dependent.',
  }),

  'auth-type': rule({
    capability: 'external-auth',
    label: 'Auth type',
    status: 'unsupported',
    risk: 'high',
    detail: 'No standard portable Gateway API auth policy object.',
    gatewayEquivalent: 'none',
  }),
  'auth-secret': rule({
    capability: 'external-auth',
    label: 'Auth secret',
    status: 'unsupported',
    risk: 'high',
    detail: 'No standard portable Gateway API auth policy object.',
    gatewayEquivalent: 'none',
  }),
  'auth-secret-type': rule({
    capability: 'external-auth',
    label: 'Auth secret type',
    status: 'unsupported',
    risk: 'high',
    detail: 'No standard portable Gateway API auth policy object.',
    gatewayEquivalent: 'none',
  }),
  'auth-realm': rule({
    capability: 'external-auth',
    label: 'Auth realm',
    status: 'unsupported',
    risk: 'high',
    detail: 'No standard portable Gateway API auth policy object.',
    gatewayEquivalent: 'none',
  }),
  'auth-url': rule({
    capability: 'external-auth',
    label: 'External auth URL',
    status: 'unsupported',
    risk: 'high',
    detail: 'External auth must be migrated to implementation-specific policy.',
    gatewayEquivalent: 'none',
  }),
  'auth-method': rule({
    capability: 'external-auth',
    label: 'External auth method',
    status: 'unsupported',
    risk: 'high',
    detail: 'External auth must be migrated to implementation-specific policy.',
    gatewayEquivalent: 'none',
  }),
  'auth-signin': rule({
    capability: 'external-auth',
    label: 'External auth sign-in URL',
    status: 'unsupported',
    risk: 'high',
    detail: 'External auth sign-in flows are controller-specific.',
    gatewayEquivalent: 'none',
  }),
  'auth-signin-redirect-param': rule({
    capability: 'external-auth',
    label: 'External auth redirect param',
    status: 'unsupported',
    risk: 'high',
    detail: 'External auth sign-in flows are controller-specific.',
    gatewayEquivalent: 'none',
  }),
  'auth-response-headers': rule({
    capability: 'external-auth',
    label: 'External auth response headers',
    status: 'unsupported',
    risk: 'high',
    detail: 'External auth header propagation is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'auth-request-redirect': rule({
    capability: 'external-auth',
    label: 'External auth request redirect',
    status: 'unsupported',
    risk: 'high',
    detail: 'External auth redirect logic is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'auth-snippet': rule({
    capability: 'nginx-auth-snippet',
    label: 'Auth snippet',
    status: 'unsupported',
    risk: 'blocker',
    detail: 'Nginx auth snippet has no portable equivalent.',
    gatewayEquivalent: 'none',
  }),
  'auth-cache-key': rule({
    capability: 'external-auth-cache',
    label: 'Auth cache key',
    status: 'unsupported',
    risk: 'high',
    detail: 'Auth cache behavior is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'auth-cache-duration': rule({
    capability: 'external-auth-cache',
    label: 'Auth cache duration',
    status: 'unsupported',
    risk: 'high',
    detail: 'Auth cache behavior is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'auth-keepalive': rule({
    capability: 'external-auth-connection',
    label: 'Auth keepalive',
    status: 'unsupported',
    risk: 'medium',
    detail: 'External auth connection tuning is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'auth-keepalive-requests': rule({
    capability: 'external-auth-connection',
    label: 'Auth keepalive requests',
    status: 'unsupported',
    risk: 'medium',
    detail: 'External auth connection tuning is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'auth-keepalive-timeout': rule({
    capability: 'external-auth-connection',
    label: 'Auth keepalive timeout',
    status: 'unsupported',
    risk: 'medium',
    detail: 'External auth connection tuning is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'auth-always-set-cookie': rule({
    capability: 'external-auth',
    label: 'Auth always set cookie',
    status: 'unsupported',
    risk: 'high',
    detail: 'External auth cookie behavior is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'enable-global-auth': rule({
    capability: 'external-auth',
    label: 'Enable global auth',
    status: 'unsupported',
    risk: 'high',
    detail: 'Global auth requires controller-specific policy attachment.',
    gatewayEquivalent: 'none',
  }),
  satisfy: rule({
    capability: 'auth-satisfy',
    label: 'Auth satisfy rule',
    status: 'unsupported',
    risk: 'high',
    detail: 'Nginx satisfy semantics have no portable equivalent.',
    gatewayEquivalent: 'none',
  }),

  'limit-connections': rule({
    capability: 'rate-limit',
    label: 'Connection rate limiting',
    status: 'manual',
    risk: 'high',
    detail: 'Requires implementation-specific rate-limit policy.',
  }),
  'limit-rps': rule({
    capability: 'rate-limit',
    label: 'Requests per second limit',
    status: 'manual',
    risk: 'high',
    detail: 'Requires implementation-specific rate-limit policy.',
  }),
  'limit-rpm': rule({
    capability: 'rate-limit',
    label: 'Requests per minute limit',
    status: 'manual',
    risk: 'high',
    detail: 'Requires implementation-specific rate-limit policy.',
  }),
  'limit-burst-multiplier': rule({
    capability: 'rate-limit',
    label: 'Rate limit burst multiplier',
    status: 'manual',
    risk: 'high',
    detail: 'Requires implementation-specific rate-limit policy.',
  }),
  'limit-rate-after': rule({
    capability: 'response-throttle',
    label: 'Limit rate after',
    status: 'unsupported',
    risk: 'medium',
    detail: 'Response throttling has no standard Gateway API equivalent.',
    gatewayEquivalent: 'none',
  }),
  'limit-rate': rule({
    capability: 'response-throttle',
    label: 'Response rate limit',
    status: 'unsupported',
    risk: 'medium',
    detail: 'Response throttling has no standard Gateway API equivalent.',
    gatewayEquivalent: 'none',
  }),
  'limit-whitelist': rule({
    capability: 'rate-limit-exclusion',
    label: 'Rate limit whitelist',
    status: 'manual',
    risk: 'high',
    detail: 'Source IP exclusion needs policy integration.',
  }),
  'limit-allowlist': rule({
    capability: 'rate-limit-exclusion',
    label: 'Rate limit allowlist',
    status: 'manual',
    risk: 'high',
    detail: 'Source IP exclusion needs policy integration.',
  }),

  canary: rule({
    capability: 'canary-routing',
    label: 'Canary routing',
    status: 'manual',
    risk: 'high',
    detail: 'Can be translated with weighted backendRefs but route strategy must be reviewed.',
    gatewayEquivalent: 'HTTPRoute.backendRefs[].weight',
  }),
  'canary-by-header': rule({
    capability: 'canary-routing',
    label: 'Canary by header',
    status: 'manual',
    risk: 'high',
    detail: 'Header-driven canary requires explicit match rules and tests.',
    gatewayEquivalent: 'HTTPRoute.matches[].headers',
  }),
  'canary-by-header-pattern': rule({
    capability: 'canary-routing',
    label: 'Canary by header pattern',
    status: 'manual',
    risk: 'high',
    detail: 'Regex-like header patterns are implementation-dependent.',
  }),
  'canary-by-header-value': rule({
    capability: 'canary-routing',
    label: 'Canary by header value',
    status: 'manual',
    risk: 'high',
    detail: 'Header-driven canary requires explicit match rules and tests.',
    gatewayEquivalent: 'HTTPRoute.matches[].headers',
  }),
  'canary-by-cookie': rule({
    capability: 'canary-routing',
    label: 'Canary by cookie',
    status: 'manual',
    risk: 'high',
    detail: 'Cookie matching is implementation-dependent.',
  }),
  'canary-weight': rule({
    capability: 'canary-routing',
    label: 'Canary weight',
    status: 'manual',
    risk: 'high',
    detail: 'Weighted backend routing requires explicit cutover policy.',
    gatewayEquivalent: 'HTTPRoute.backendRefs[].weight',
  }),
  'canary-weight-total': rule({
    capability: 'canary-routing',
    label: 'Canary total weight',
    status: 'manual',
    risk: 'high',
    detail: 'Weighted backend routing requires explicit cutover policy.',
    gatewayEquivalent: 'HTTPRoute.backendRefs[].weight',
  }),

  'affinity': rule({
    capability: 'session-affinity',
    label: 'Session affinity',
    status: 'manual',
    risk: 'high',
    detail: 'Sticky session behavior is implementation-specific.',
  }),
  'affinity-mode': rule({
    capability: 'session-affinity',
    label: 'Session affinity mode',
    status: 'manual',
    risk: 'high',
    detail: 'Sticky session behavior is implementation-specific.',
  }),
  'affinity-canary-behavior': rule({
    capability: 'session-affinity-canary',
    label: 'Affinity canary behavior',
    status: 'manual',
    risk: 'high',
    detail: 'Canary + stickiness coupling requires scenario testing.',
  }),
  'session-cookie-name': rule({
    capability: 'session-affinity',
    label: 'Session cookie name',
    status: 'manual',
    risk: 'high',
    detail: 'Sticky session cookie behavior is implementation-specific.',
  }),
  'session-cookie-path': rule({
    capability: 'session-affinity',
    label: 'Session cookie path',
    status: 'manual',
    risk: 'high',
    detail: 'Sticky session cookie behavior is implementation-specific.',
  }),
  'session-cookie-domain': rule({
    capability: 'session-affinity',
    label: 'Session cookie domain',
    status: 'manual',
    risk: 'high',
    detail: 'Sticky session cookie behavior is implementation-specific.',
  }),
  'session-cookie-change-on-failure': rule({
    capability: 'session-affinity',
    label: 'Session cookie change on failure',
    status: 'manual',
    risk: 'high',
    detail: 'Failover stickiness behavior requires verification.',
  }),
  'session-cookie-max-age': rule({
    capability: 'session-affinity',
    label: 'Session cookie max age',
    status: 'manual',
    risk: 'high',
    detail: 'Sticky session cookie behavior is implementation-specific.',
  }),
  'session-cookie-expires': rule({
    capability: 'session-affinity',
    label: 'Session cookie expires',
    status: 'manual',
    risk: 'high',
    detail: 'Sticky session cookie behavior is implementation-specific.',
  }),
  'session-cookie-samesite': rule({
    capability: 'session-affinity',
    label: 'Session cookie SameSite',
    status: 'manual',
    risk: 'high',
    detail: 'Sticky session cookie behavior is implementation-specific.',
  }),
  'session-cookie-secure': rule({
    capability: 'session-affinity',
    label: 'Session cookie secure',
    status: 'manual',
    risk: 'high',
    detail: 'Sticky session cookie behavior is implementation-specific.',
  }),
  'session-cookie-conditional-samesite-none': rule({
    capability: 'session-affinity',
    label: 'Conditional SameSite None',
    status: 'manual',
    risk: 'high',
    detail: 'Sticky session cookie behavior is implementation-specific.',
  }),

  'enable-cors': rule({
    capability: 'cors',
    label: 'Enable CORS',
    status: 'manual',
    risk: 'medium',
    detail: 'CORS policy portability depends on controller support.',
    gatewayEquivalent: 'HTTPRoute CORS filter or extension policy',
  }),
  'cors-allow-origin': rule({
    capability: 'cors',
    label: 'CORS allow origin',
    status: 'manual',
    risk: 'medium',
    detail: 'CORS policy portability depends on controller support.',
    gatewayEquivalent: 'HTTPRoute CORS filter or extension policy',
  }),
  'cors-allow-methods': rule({
    capability: 'cors',
    label: 'CORS allow methods',
    status: 'manual',
    risk: 'medium',
    detail: 'CORS policy portability depends on controller support.',
    gatewayEquivalent: 'HTTPRoute CORS filter or extension policy',
  }),
  'cors-allow-headers': rule({
    capability: 'cors',
    label: 'CORS allow headers',
    status: 'manual',
    risk: 'medium',
    detail: 'CORS policy portability depends on controller support.',
    gatewayEquivalent: 'HTTPRoute CORS filter or extension policy',
  }),
  'cors-expose-headers': rule({
    capability: 'cors',
    label: 'CORS expose headers',
    status: 'manual',
    risk: 'medium',
    detail: 'CORS policy portability depends on controller support.',
    gatewayEquivalent: 'HTTPRoute CORS filter or extension policy',
  }),
  'cors-allow-credentials': rule({
    capability: 'cors',
    label: 'CORS allow credentials',
    status: 'manual',
    risk: 'medium',
    detail: 'CORS policy portability depends on controller support.',
    gatewayEquivalent: 'HTTPRoute CORS filter or extension policy',
  }),
  'cors-max-age': rule({
    capability: 'cors',
    label: 'CORS max age',
    status: 'manual',
    risk: 'medium',
    detail: 'CORS policy portability depends on controller support.',
    gatewayEquivalent: 'HTTPRoute CORS filter or extension policy',
  }),

  'proxy-body-size': rule({
    capability: 'request-body-limits',
    label: 'Proxy body size',
    status: 'manual',
    risk: 'medium',
    detail: 'Body size limits are implementation-specific.',
  }),
  'client-body-buffer-size': rule({
    capability: 'request-body-buffer',
    label: 'Client body buffer size',
    status: 'unsupported',
    risk: 'medium',
    detail: 'Nginx buffer tuning has no portable equivalent.',
    gatewayEquivalent: 'none',
  }),
  'proxy-connect-timeout': rule({
    capability: 'upstream-timeout',
    label: 'Proxy connect timeout',
    status: 'manual',
    risk: 'medium',
    detail: 'Upstream timeout tuning requires implementation policy.',
  }),
  'proxy-send-timeout': rule({
    capability: 'upstream-timeout',
    label: 'Proxy send timeout',
    status: 'manual',
    risk: 'medium',
    detail: 'Upstream timeout tuning requires implementation policy.',
  }),
  'proxy-read-timeout': rule({
    capability: 'upstream-timeout',
    label: 'Proxy read timeout',
    status: 'manual',
    risk: 'medium',
    detail: 'Upstream timeout tuning requires implementation policy.',
  }),
  'proxy-next-upstream': rule({
    capability: 'retry-policy',
    label: 'Retry conditions',
    status: 'manual',
    risk: 'high',
    detail: 'Retry semantics vary by implementation.',
    gatewayEquivalent: 'HTTPRoute Retry policy (if supported)',
  }),
  'proxy-next-upstream-timeout': rule({
    capability: 'retry-policy',
    label: 'Retry timeout',
    status: 'manual',
    risk: 'high',
    detail: 'Retry semantics vary by implementation.',
    gatewayEquivalent: 'HTTPRoute Retry policy (if supported)',
  }),
  'proxy-next-upstream-tries': rule({
    capability: 'retry-policy',
    label: 'Retry tries',
    status: 'manual',
    risk: 'high',
    detail: 'Retry semantics vary by implementation.',
    gatewayEquivalent: 'HTTPRoute Retry policy (if supported)',
  }),
  'proxy-request-buffering': rule({
    capability: 'request-buffering',
    label: 'Request buffering',
    status: 'unsupported',
    risk: 'medium',
    detail: 'Nginx request buffering has no portable equivalent.',
    gatewayEquivalent: 'none',
  }),
  'proxy-buffering': rule({
    capability: 'response-buffering',
    label: 'Response buffering',
    status: 'unsupported',
    risk: 'medium',
    detail: 'Nginx response buffering has no portable equivalent.',
    gatewayEquivalent: 'none',
  }),
  'proxy-buffers-number': rule({
    capability: 'response-buffering',
    label: 'Proxy buffers number',
    status: 'unsupported',
    risk: 'medium',
    detail: 'Nginx buffer tuning has no portable equivalent.',
    gatewayEquivalent: 'none',
  }),
  'proxy-buffer-size': rule({
    capability: 'response-buffering',
    label: 'Proxy buffer size',
    status: 'unsupported',
    risk: 'medium',
    detail: 'Nginx buffer tuning has no portable equivalent.',
    gatewayEquivalent: 'none',
  }),
  'proxy-busy-buffers-size': rule({
    capability: 'response-buffering',
    label: 'Proxy busy buffers size',
    status: 'unsupported',
    risk: 'medium',
    detail: 'Nginx buffer tuning has no portable equivalent.',
    gatewayEquivalent: 'none',
  }),
  'proxy-max-temp-file-size': rule({
    capability: 'response-buffering',
    label: 'Proxy max temp file size',
    status: 'unsupported',
    risk: 'medium',
    detail: 'Nginx temporary file tuning has no portable equivalent.',
    gatewayEquivalent: 'none',
  }),
  'proxy-http-version': rule({
    capability: 'upstream-protocol',
    label: 'Proxy HTTP version',
    status: 'manual',
    risk: 'medium',
    detail: 'Backend protocol negotiation is implementation-specific.',
  }),
  'proxy-cookie-domain': rule({
    capability: 'cookie-rewrite',
    label: 'Proxy cookie domain',
    status: 'manual',
    risk: 'high',
    detail: 'Cookie rewrite behavior requires explicit test coverage.',
  }),
  'proxy-cookie-path': rule({
    capability: 'cookie-rewrite',
    label: 'Proxy cookie path',
    status: 'manual',
    risk: 'high',
    detail: 'Cookie rewrite behavior requires explicit test coverage.',
  }),
  'proxy-cookie-flags': rule({
    capability: 'cookie-rewrite',
    label: 'Proxy cookie flags',
    status: 'manual',
    risk: 'high',
    detail: 'Cookie rewrite behavior requires explicit test coverage.',
  }),
  'proxy-redirect-from': rule({
    capability: 'upstream-redirect-rewrite',
    label: 'Proxy redirect from',
    status: 'manual',
    risk: 'high',
    detail: 'Backend redirect rewrite is implementation-specific.',
  }),
  'proxy-redirect-to': rule({
    capability: 'upstream-redirect-rewrite',
    label: 'Proxy redirect to',
    status: 'manual',
    risk: 'high',
    detail: 'Backend redirect rewrite is implementation-specific.',
  }),
  'proxy-ssl-secret': rule({
    capability: 'upstream-tls',
    label: 'Proxy upstream TLS secret',
    status: 'manual',
    risk: 'high',
    detail: 'Backend TLS client auth requires implementation-specific configuration.',
  }),
  'proxy-ssl-name': rule({
    capability: 'upstream-tls',
    label: 'Proxy upstream TLS name',
    status: 'manual',
    risk: 'high',
    detail: 'Backend TLS SNI settings are implementation-specific.',
  }),
  'proxy-ssl-server-name': rule({
    capability: 'upstream-tls',
    label: 'Proxy upstream TLS server name',
    status: 'manual',
    risk: 'high',
    detail: 'Backend TLS SNI settings are implementation-specific.',
  }),
  'proxy-ssl-ciphers': rule({
    capability: 'upstream-tls',
    label: 'Proxy upstream TLS ciphers',
    status: 'unsupported',
    risk: 'medium',
    detail: 'Cipher selection is not portable in Gateway API core.',
    gatewayEquivalent: 'none',
  }),
  'proxy-ssl-protocols': rule({
    capability: 'upstream-tls',
    label: 'Proxy upstream TLS protocols',
    status: 'unsupported',
    risk: 'medium',
    detail: 'TLS protocol tuning is not portable in Gateway API core.',
    gatewayEquivalent: 'none',
  }),
  'proxy-ssl-verify': rule({
    capability: 'upstream-tls',
    label: 'Proxy upstream TLS verify',
    status: 'manual',
    risk: 'high',
    detail: 'Backend TLS verification settings require implementation policy.',
  }),
  'proxy-ssl-verify-depth': rule({
    capability: 'upstream-tls',
    label: 'Proxy upstream TLS verify depth',
    status: 'manual',
    risk: 'high',
    detail: 'Backend TLS verification settings require implementation policy.',
  }),
  'proxy-ssl-session-reuse': rule({
    capability: 'upstream-tls',
    label: 'Proxy upstream TLS session reuse',
    status: 'unsupported',
    risk: 'low',
    detail: 'Session reuse tuning has no portable equivalent.',
    gatewayEquivalent: 'none',
  }),

  'enable-modsecurity': rule({
    capability: 'waf',
    label: 'Enable ModSecurity',
    status: 'manual',
    risk: 'high',
    detail: 'WAF integration requires provider-specific policy.',
  }),
  'enable-owasp-modsecurity-crs': rule({
    capability: 'waf',
    label: 'Enable OWASP CRS',
    status: 'manual',
    risk: 'high',
    detail: 'WAF integration requires provider-specific policy.',
  }),
  'modsecurity-snippet': rule({
    capability: 'waf-snippet',
    label: 'ModSecurity snippet',
    status: 'unsupported',
    risk: 'blocker',
    detail: 'Nginx modsecurity snippets are not portable.',
    gatewayEquivalent: 'none',
  }),

  'configuration-snippet': rule({
    capability: 'nginx-snippet',
    label: 'Configuration snippet',
    status: 'unsupported',
    risk: 'blocker',
    detail: 'Nginx snippets have no portable equivalent.',
    gatewayEquivalent: 'none',
  }),
  'server-snippet': rule({
    capability: 'nginx-snippet',
    label: 'Server snippet',
    status: 'unsupported',
    risk: 'blocker',
    detail: 'Nginx snippets have no portable equivalent.',
    gatewayEquivalent: 'none',
  }),
  'location-snippet': rule({
    capability: 'nginx-snippet',
    label: 'Location snippet',
    status: 'unsupported',
    risk: 'blocker',
    detail: 'Nginx snippets have no portable equivalent.',
    gatewayEquivalent: 'none',
  }),

  'whitelist-source-range': rule({
    capability: 'source-ip-filter',
    label: 'Source IP whitelist',
    status: 'manual',
    risk: 'high',
    detail: 'IP allowlist requires implementation-specific policy.',
  }),
  'allowlist-source-range': rule({
    capability: 'source-ip-filter',
    label: 'Source IP allowlist',
    status: 'manual',
    risk: 'high',
    detail: 'IP allowlist requires implementation-specific policy.',
  }),
  'denylist-source-range': rule({
    capability: 'source-ip-filter',
    label: 'Source IP denylist',
    status: 'manual',
    risk: 'high',
    detail: 'IP denylist requires implementation-specific policy.',
  }),

  'enable-access-log': rule({
    capability: 'access-log',
    label: 'Enable access log',
    status: 'manual',
    risk: 'low',
    detail: 'Access logging is implementation-specific at gateway layer.',
  }),
  'access-log-level': rule({
    capability: 'access-log',
    label: 'Access log level',
    status: 'manual',
    risk: 'low',
    detail: 'Access logging is implementation-specific at gateway layer.',
  }),
  'enable-opentelemetry': rule({
    capability: 'telemetry',
    label: 'Enable OpenTelemetry',
    status: 'manual',
    risk: 'medium',
    detail: 'Telemetry export is implementation-specific.',
  }),
  'opentelemetry-trust-incoming-span': rule({
    capability: 'telemetry',
    label: 'Trust incoming span',
    status: 'manual',
    risk: 'medium',
    detail: 'Trace trust behavior is implementation-specific.',
  }),

  'mirror-target': rule({
    capability: 'traffic-mirroring',
    label: 'Mirror target',
    status: 'manual',
    risk: 'high',
    detail: 'Mirroring is supported in Gateway API but behavior must be validated.',
    gatewayEquivalent: 'HTTPRoute RequestMirror filter',
  }),
  'mirror-request-body': rule({
    capability: 'traffic-mirroring',
    label: 'Mirror request body',
    status: 'manual',
    risk: 'high',
    detail: 'Mirror body behavior requires integration testing.',
    gatewayEquivalent: 'HTTPRoute RequestMirror filter',
  }),
  'mirror-host': rule({
    capability: 'traffic-mirroring',
    label: 'Mirror host',
    status: 'manual',
    risk: 'high',
    detail: 'Mirror host override behavior requires integration testing.',
    gatewayEquivalent: 'HTTPRoute RequestMirror filter',
  }),
  'mirror-ignore-uri-case': rule({
    capability: 'traffic-mirroring',
    label: 'Mirror ignore URI case',
    status: 'manual',
    risk: 'high',
    detail: 'Mirror URI matching behavior requires integration testing.',
    gatewayEquivalent: 'HTTPRoute RequestMirror filter',
  }),

  'backend-protocol': rule({
    capability: 'backend-protocol',
    label: 'Backend protocol',
    status: 'manual',
    risk: 'high',
    detail: 'Backend protocol settings are implementation-specific.',
  }),
  'service-upstream': rule({
    capability: 'upstream-selection',
    label: 'Service upstream mode',
    status: 'manual',
    risk: 'medium',
    detail: 'Endpoint selection semantics vary by controller.',
  }),
  'custom-http-errors': rule({
    capability: 'custom-errors',
    label: 'Custom HTTP errors',
    status: 'manual',
    risk: 'medium',
    detail: 'Custom error page behavior needs policy integration.',
  }),
  'default-backend': rule({
    capability: 'default-backend',
    label: 'Default backend service',
    status: 'manual',
    risk: 'medium',
    detail: 'Default backend behavior should be migrated at gateway/listener scope.',
  }),
  'upstream-hash-by': rule({
    capability: 'load-balancing',
    label: 'Upstream hash by',
    status: 'manual',
    risk: 'high',
    detail: 'Hash-based load balancing is implementation-specific.',
  }),
  'upstream-hash-by-subset': rule({
    capability: 'load-balancing',
    label: 'Upstream hash by subset',
    status: 'manual',
    risk: 'high',
    detail: 'Hash-based load balancing is implementation-specific.',
  }),
  'upstream-hash-by-subset-size': rule({
    capability: 'load-balancing',
    label: 'Upstream hash subset size',
    status: 'manual',
    risk: 'high',
    detail: 'Hash-based load balancing is implementation-specific.',
  }),
  'load-balance': rule({
    capability: 'load-balancing',
    label: 'Load balancing algorithm',
    status: 'manual',
    risk: 'high',
    detail: 'Load balancing algorithm is implementation-specific.',
  }),
  'connection-proxy-header': rule({
    capability: 'connection-header',
    label: 'Connection proxy header',
    status: 'unsupported',
    risk: 'medium',
    detail: 'Connection header tuning is not portable.',
    gatewayEquivalent: 'none',
  }),

  'fastcgi-index': rule({
    capability: 'fastcgi',
    label: 'FastCGI index',
    status: 'unsupported',
    risk: 'medium',
    detail: 'FastCGI settings have no Gateway API core equivalent.',
    gatewayEquivalent: 'none',
  }),
  'fastcgi-params-configmap': rule({
    capability: 'fastcgi',
    label: 'FastCGI params configmap',
    status: 'unsupported',
    risk: 'medium',
    detail: 'FastCGI settings have no Gateway API core equivalent.',
    gatewayEquivalent: 'none',
  }),
  'fastcgi-pass-header': rule({
    capability: 'fastcgi',
    label: 'FastCGI pass header',
    status: 'unsupported',
    risk: 'medium',
    detail: 'FastCGI settings have no Gateway API core equivalent.',
    gatewayEquivalent: 'none',
  }),

  'http2-push-preload': rule({
    capability: 'http2-push',
    label: 'HTTP/2 push preload',
    status: 'unsupported',
    risk: 'low',
    detail: 'HTTP/2 push controls are not portable.',
    gatewayEquivalent: 'none',
  }),
  'enable-underscores-in-headers': rule({
    capability: 'header-validation',
    label: 'Enable underscores in headers',
    status: 'unsupported',
    risk: 'low',
    detail: 'Header parser controls are implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'ignore-invalid-headers': rule({
    capability: 'header-validation',
    label: 'Ignore invalid headers',
    status: 'unsupported',
    risk: 'low',
    detail: 'Header parser controls are implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'enable-brotli': rule({
    capability: 'compression',
    label: 'Enable Brotli',
    status: 'unsupported',
    risk: 'low',
    detail: 'Compression toggles are implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'brotli-level': rule({
    capability: 'compression',
    label: 'Brotli level',
    status: 'unsupported',
    risk: 'low',
    detail: 'Compression tuning is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'brotli-types': rule({
    capability: 'compression',
    label: 'Brotli types',
    status: 'unsupported',
    risk: 'low',
    detail: 'Compression tuning is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'enable-gzip': rule({
    capability: 'compression',
    label: 'Enable gzip',
    status: 'unsupported',
    risk: 'low',
    detail: 'Compression toggles are implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'gzip-level': rule({
    capability: 'compression',
    label: 'Gzip level',
    status: 'unsupported',
    risk: 'low',
    detail: 'Compression tuning is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'gzip-types': rule({
    capability: 'compression',
    label: 'Gzip types',
    status: 'unsupported',
    risk: 'low',
    detail: 'Compression tuning is implementation-specific.',
    gatewayEquivalent: 'none',
  }),
  'custom-headers': rule({
    capability: 'response-header-mutation',
    label: 'Custom response headers',
    status: 'manual',
    risk: 'medium',
    detail: 'Header injection can be modeled with response header filters.',
    gatewayEquivalent: 'HTTPRoute ResponseHeaderModifier filter',
  }),
  'proxy-set-headers': rule({
    capability: 'request-header-mutation',
    label: 'Proxy set headers',
    status: 'manual',
    risk: 'medium',
    detail: 'Request header mutation can be modeled with request header filters.',
    gatewayEquivalent: 'HTTPRoute RequestHeaderModifier filter',
  }),
  'add-base-url': rule({
    capability: 'response-header-mutation',
    label: 'Add base URL header',
    status: 'manual',
    risk: 'medium',
    detail: 'Header mutation can be modeled with response header filters.',
    gatewayEquivalent: 'HTTPRoute ResponseHeaderModifier filter',
  }),
  'use-port-in-redirects': rule({
    capability: 'redirect-shape',
    label: 'Use port in redirects',
    status: 'manual',
    risk: 'medium',
    detail: 'Redirect formatting needs explicit rule tests.',
  }),
  'proxy-intercept-errors': rule({
    capability: 'custom-errors',
    label: 'Proxy intercept errors',
    status: 'manual',
    risk: 'medium',
    detail: 'Error interception semantics are implementation-specific.',
  }),
};

const STATUS_PRIORITY = {
  mapped: 0,
  manual: 1,
  unsupported: 2,
};

const RISK_PRIORITY = {
  low: 0,
  medium: 1,
  high: 2,
  blocker: 3,
};

function toKnownKey(fullKey) {
  if (!fullKey.startsWith(NGINX_ANNOTATION_PREFIX)) {
    return null;
  }
  return fullKey.slice(NGINX_ANNOTATION_PREFIX.length);
}

function dynamicAdjust(ruleEntry, fullKey, allAnnotations) {
  if (fullKey === `${NGINX_ANNOTATION_PREFIX}rewrite-target`) {
    if (allAnnotations[`${NGINX_ANNOTATION_PREFIX}use-regex`] === 'true') {
      return {
        ...ruleEntry,
        status: 'manual',
        risk: 'high',
        detail: 'Rewrite with regex requires manual route behavior verification.',
      };
    }
  }

  return ruleEntry;
}

function classifyAnnotation(fullKey, value, allAnnotations) {
  const knownKey = toKnownKey(fullKey);
  if (!knownKey) {
    return null;
  }

  const entry = KNOWN_ANNOTATIONS[knownKey];
  if (!entry) {
    return {
      key: fullKey,
      shortKey: knownKey,
      value,
      capability: 'unknown-nginx-annotation',
      label: 'Unknown nginx annotation',
      status: 'unsupported',
      risk: 'blocker',
      gatewayEquivalent: 'none',
      known: false,
      detail: 'Annotation is not yet in the migration catalog. Manual design and validation are required.',
    };
  }

  const adjusted = dynamicAdjust(entry, fullKey, allAnnotations);
  return {
    key: fullKey,
    shortKey: knownKey,
    value,
    known: true,
    ...adjusted,
  };
}

function classifyNginxAnnotations(annotations) {
  const findings = [];
  const keys = Object.keys(annotations || {}).filter((key) => key.startsWith(NGINX_ANNOTATION_PREFIX)).sort();

  for (const key of keys) {
    findings.push(classifyAnnotation(key, annotations[key], annotations));
  }

  return findings;
}

function worstOf(current, incoming) {
  const currentStatusRank = STATUS_PRIORITY[current.status];
  const incomingStatusRank = STATUS_PRIORITY[incoming.status];

  if (incomingStatusRank > currentStatusRank) {
    return incoming;
  }
  if (incomingStatusRank < currentStatusRank) {
    return current;
  }

  const currentRiskRank = RISK_PRIORITY[current.risk];
  const incomingRiskRank = RISK_PRIORITY[incoming.risk];
  if (incomingRiskRank > currentRiskRank) {
    return incoming;
  }
  return current;
}

function summarizeCapabilities(annotationFindings) {
  const grouped = new Map();

  for (const finding of annotationFindings) {
    const existing = grouped.get(finding.capability);
    if (!existing) {
      grouped.set(finding.capability, {
        id: finding.capability,
        label: finding.label,
        status: finding.status,
        risk: finding.risk,
        detail: finding.detail,
        gatewayEquivalent: finding.gatewayEquivalent,
        annotations: [finding.key],
      });
      continue;
    }

    const worst = worstOf(existing, finding);
    existing.status = worst.status;
    existing.risk = worst.risk;
    existing.detail = worst.detail;
    existing.gatewayEquivalent = worst.gatewayEquivalent;
    existing.annotations.push(finding.key);
  }

  return Array.from(grouped.values()).sort((a, b) => a.id.localeCompare(b.id));
}

function catalogStats() {
  const shortKeys = Object.keys(KNOWN_ANNOTATIONS).sort();
  return {
    knownAnnotationCount: shortKeys.length,
    knownAnnotations: shortKeys.map((item) => `${NGINX_ANNOTATION_PREFIX}${item}`),
  };
}

module.exports = {
  NGINX_ANNOTATION_PREFIX,
  KNOWN_ANNOTATIONS,
  classifyNginxAnnotations,
  summarizeCapabilities,
  catalogStats,
};
