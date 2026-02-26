const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const { loadManifests } = require('../src/lib/file-loader');
const { analyzeIngresses } = require('../src/lib/analyzer');

test('analyzeIngresses scores and flags unsupported features', () => {
  const input = path.join(__dirname, '..', 'fixtures', 'sample-ingress.yaml');
  const manifests = loadManifests(input);
  const analysis = analyzeIngresses(manifests);

  assert.equal(analysis.totals.ingresses, 2);
  assert.ok(analysis.totals.blockers >= 1);
  assert.ok(analysis.catalog.knownAnnotationCount > 80);

  const admin = analysis.results.find((item) => item.name === 'admin');
  assert.ok(admin);
  assert.ok(admin.features.some((feature) => feature.id === 'nginx-snippet' && feature.status === 'unsupported'));
  assert.equal(admin.annotationSummary.nginxAnnotations, 1);
  assert.equal(admin.annotationSummary.unknown, 0);
});

test('analyzeIngresses marks unknown nginx annotations as blockers', () => {
  const manifests = [
    {
      apiVersion: 'networking.k8s.io/v1',
      kind: 'Ingress',
      metadata: {
        name: 'unknown-annotation',
        namespace: 'apps',
        annotations: {
          'nginx.ingress.kubernetes.io/some-future-feature': 'enabled',
        },
      },
      spec: {
        rules: [
          {
            host: 'example.com',
            http: {
              paths: [
                {
                  path: '/',
                  pathType: 'Prefix',
                  backend: {
                    service: {
                      name: 'svc',
                      port: {
                        number: 80,
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ];

  const analysis = analyzeIngresses(manifests);
  const item = analysis.results[0];

  assert.equal(item.annotationSummary.unknown, 1);
  assert.equal(item.unknownAnnotations.length, 1);
  assert.ok(item.features.some((feature) => feature.id === 'unknown-nginx-annotation' && feature.risk === 'blocker'));
});
