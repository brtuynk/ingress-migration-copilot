const { FEATURE_RULES } = require('./feature-rules');
const { scoreIngress, aggregateScore } = require('./scoring');
const {
  classifyNginxAnnotations,
  summarizeCapabilities,
  catalogStats,
} = require('./nginx-annotation-catalog');

function analyzeSingleIngress(ingress) {
  const metadata = ingress.metadata || {};
  const spec = ingress.spec || {};
  const annotations = metadata.annotations || {};
  const features = [];

  features.push({
    ...FEATURE_RULES.pathRouting,
    status: 'mapped',
    risk: 'low',
    detail: FEATURE_RULES.pathRouting.mappedHint,
  });

  if (Array.isArray(spec.tls) && spec.tls.length > 0) {
    features.push({
      ...FEATURE_RULES.tls,
      status: 'mapped',
      risk: 'low',
      detail: FEATURE_RULES.tls.mappedHint,
    });
  }

  const annotationFindings = classifyNginxAnnotations(annotations);
  const capabilityFindings = summarizeCapabilities(annotationFindings);
  features.push(...capabilityFindings);

  const unknownAnnotations = annotationFindings.filter((item) => !item.known).map((item) => item.key);
  const knownAnnotations = annotationFindings.filter((item) => item.known).map((item) => item.key);

  const perIngressScore = scoreIngress(features);

  return {
    namespace: metadata.namespace || 'default',
    name: metadata.name || 'unknown',
    ingressClassName:
      spec.ingressClassName || annotations['kubernetes.io/ingress.class'] || 'not-set',
    sourceFile: ingress.__sourceFile,
    annotationSummary: {
      nginxAnnotations: annotationFindings.length,
      known: knownAnnotations.length,
      unknown: unknownAnnotations.length,
    },
    knownAnnotations,
    unknownAnnotations,
    annotationFindings,
    features,
    ...perIngressScore,
  };
}

function analyzeIngresses(manifests) {
  const ingresses = manifests.filter(
    (item) => item && item.kind === 'Ingress' && typeof item.apiVersion === 'string' && item.apiVersion.includes('networking.k8s.io/'),
  );

  const results = ingresses.map(analyzeSingleIngress);
  const summary = aggregateScore(results);
  const catalog = catalogStats();

  const totalNginxAnnotations = results.reduce((acc, item) => acc + item.annotationSummary.nginxAnnotations, 0);
  const totalUnknownAnnotations = results.reduce((acc, item) => acc + item.annotationSummary.unknown, 0);

  return {
    schemaVersion: 'v1alpha2',
    generatedAt: new Date().toISOString(),
    catalog,
    totals: {
      ingresses: results.length,
      nginxAnnotations: totalNginxAnnotations,
      unknownNginxAnnotations: totalUnknownAnnotations,
      ...summary,
    },
    results,
  };
}

module.exports = {
  analyzeIngresses,
};
