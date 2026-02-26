const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const { loadManifests } = require('../src/lib/file-loader');
const { convertIngresses } = require('../src/lib/converter');

test('convertIngresses builds HTTPRoute resources', () => {
  const input = path.join(__dirname, '..', 'fixtures', 'sample-ingress.yaml');
  const manifests = loadManifests(input);
  const result = convertIngresses(manifests, { gateway: 'edge', 'gateway-namespace': 'infra' });

  assert.equal(result.converted.length, 2);
  const webshop = result.converted.find((item) => item.route.metadata.name === 'webshop-route');
  assert.ok(webshop);
  assert.equal(webshop.route.spec.parentRefs[0].name, 'edge');
  assert.equal(webshop.route.spec.parentRefs[0].namespace, 'infra');
  assert.equal(webshop.route.kind, 'HTTPRoute');
});
