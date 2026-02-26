const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
const { analyzeIngresses } = require('./analyzer');

function mapPathType(pathType) {
  if (pathType === 'Exact') return 'Exact';
  return 'PathPrefix';
}

function buildHTTPRoute(ingress, gatewayName, gatewayNamespace) {
  const metadata = ingress.metadata || {};
  const spec = ingress.spec || {};
  const annotations = metadata.annotations || {};

  const parentRef = { name: gatewayName };
  if (gatewayNamespace) {
    parentRef.namespace = gatewayNamespace;
  }

  const hostnames = (spec.rules || [])
    .map((rule) => rule.host)
    .filter(Boolean);

  const rewriteTarget = annotations['nginx.ingress.kubernetes.io/rewrite-target'];
  const useRegex = annotations['nginx.ingress.kubernetes.io/use-regex'] === 'true';

  const rules = [];

  for (const rule of spec.rules || []) {
    for (const rulePath of (rule.http && rule.http.paths) || []) {
      const service = rulePath.backend && rulePath.backend.service;
      if (!service || !service.name) {
        continue;
      }

      const routeRule = {
        matches: [
          {
            path: {
              type: mapPathType(rulePath.pathType),
              value: rulePath.path || '/',
            },
          },
        ],
        backendRefs: [
          {
            name: service.name,
          },
        ],
      };

      if (service.port && typeof service.port.number === 'number') {
        routeRule.backendRefs[0].port = service.port.number;
      }

      if (service.port && typeof service.port.name === 'string') {
        routeRule.backendRefs[0].port = service.port.name;
      }

      if (rewriteTarget && !useRegex) {
        routeRule.filters = [
          {
            type: 'URLRewrite',
            urlRewrite: {
              path: {
                type: 'ReplaceFullPath',
                replaceFullPath: rewriteTarget,
              },
            },
          },
        ];
      }

      rules.push(routeRule);
    }
  }

  const output = {
    apiVersion: 'gateway.networking.k8s.io/v1',
    kind: 'HTTPRoute',
    metadata: {
      name: `${metadata.name || 'ingress'}-route`,
      namespace: metadata.namespace || 'default',
      annotations: {
        'migration.copilot/source-ingress': `${metadata.namespace || 'default'}/${metadata.name || 'unknown'}`,
      },
    },
    spec: {
      parentRefs: [parentRef],
      hostnames,
      rules,
    },
  };

  return output;
}

function convertIngresses(manifests, options) {
  const gatewayName = options.gateway || 'shared-gateway';
  const gatewayNamespace = options['gateway-namespace'];
  const analysis = analyzeIngresses(manifests);

  const converted = [];
  for (const manifest of manifests) {
    if (manifest.kind !== 'Ingress') continue;
    const route = buildHTTPRoute(manifest, gatewayName, gatewayNamespace);
    if (!route.spec.rules || route.spec.rules.length === 0) {
      continue;
    }

    const resultKey = `${manifest.metadata?.namespace || 'default'}/${manifest.metadata?.name || 'unknown'}`;
    const analysisResult = analysis.results.find((item) => `${item.namespace}/${item.name}` === resultKey);

    const migrationNotes = (analysisResult?.features || [])
      .filter((feature) => feature.status !== 'mapped')
      .map((feature) => `${feature.id}:${feature.status}`);

    if (migrationNotes.length > 0) {
      route.metadata.annotations['migration.copilot/manual-checks'] = migrationNotes.join(',');
    }

    converted.push({
      key: resultKey,
      route,
      analysis: analysisResult,
    });
  }

  return {
    converted,
    analysis,
  };
}

function writeConvertedManifests(result, outDir) {
  const resolvedOutDir = path.resolve(outDir);
  fs.mkdirSync(resolvedOutDir, { recursive: true });

  const written = [];
  for (const item of result.converted) {
    const fileName = `${item.route.metadata.namespace}-${item.route.metadata.name}.yaml`;
    const filePath = path.join(resolvedOutDir, fileName);
    fs.writeFileSync(filePath, yaml.dump(item.route, { noRefs: true, lineWidth: 120 }), 'utf8');
    written.push(filePath);
  }

  return written;
}

module.exports = {
  convertIngresses,
  writeConvertedManifests,
};
