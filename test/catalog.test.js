const test = require('node:test');
const assert = require('node:assert/strict');

const {
  KNOWN_ANNOTATIONS,
  classifyNginxAnnotations,
  catalogStats,
} = require('../src/lib/nginx-annotation-catalog');

test('catalog has broad annotation coverage', () => {
  const stats = catalogStats();
  assert.ok(stats.knownAnnotationCount >= 120);
  assert.ok(KNOWN_ANNOTATIONS['rewrite-target']);
  assert.ok(KNOWN_ANNOTATIONS['auth-url']);
  assert.ok(KNOWN_ANNOTATIONS['configuration-snippet']);
});

test('rewrite-target becomes manual when use-regex=true', () => {
  const findings = classifyNginxAnnotations({
    'nginx.ingress.kubernetes.io/rewrite-target': '/$1',
    'nginx.ingress.kubernetes.io/use-regex': 'true',
  });

  const rewrite = findings.find((item) => item.shortKey === 'rewrite-target');
  assert.ok(rewrite);
  assert.equal(rewrite.status, 'manual');
  assert.equal(rewrite.risk, 'high');
});
