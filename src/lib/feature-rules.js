const FEATURE_RULES = {
  rewriteTarget: {
    id: 'rewrite-target',
    label: 'URL rewrite',
    mappedHint: 'Mapped to HTTPRoute URLRewrite filter for simple prefix/regex-free paths.',
    manualHint: 'Regex or advanced rewrite patterns require manual verification.',
  },
  auth: {
    id: 'external-auth',
    label: 'External auth',
    unsupportedHint: 'No 1:1 standard Gateway API mapping; use auth policy/extension.',
  },
  rateLimit: {
    id: 'rate-limit',
    label: 'Rate limiting',
    manualHint: 'Requires implementation-specific policy attachment.',
  },
  canary: {
    id: 'canary',
    label: 'Canary traffic',
    manualHint: 'Can be modeled with weighted backendRefs but needs route design validation.',
  },
  snippets: {
    id: 'nginx-snippets',
    label: 'NGINX snippets',
    unsupportedHint: 'Nginx snippet annotations have no portable Gateway API equivalent.',
  },
  timeouts: {
    id: 'upstream-timeouts',
    label: 'Upstream timeout',
    manualHint: 'Map with implementation-specific timeout policy.',
  },
  sslRedirect: {
    id: 'ssl-redirect',
    label: 'HTTP to HTTPS redirect',
    manualHint: 'Typically modeled with HTTPRoute redirect filter or gateway-level policy.',
  },
  sourceRange: {
    id: 'source-range',
    label: 'Source IP allowlist',
    manualHint: 'Requires L7/L4 policy integration (implementation-specific).',
  },
  pathRouting: {
    id: 'path-routing',
    label: 'Host/path routing',
    mappedHint: 'Native mapping to HTTPRoute hostnames + path matches.',
  },
  tls: {
    id: 'tls-hosts',
    label: 'TLS host binding',
    mappedHint: 'Hostnames are preserved; certificate attachment is gateway-level concern.',
  },
};

module.exports = {
  FEATURE_RULES,
};
