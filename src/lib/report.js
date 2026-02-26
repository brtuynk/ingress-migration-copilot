function toMarkdown(analysis, inputPath) {
  const lines = [];
  lines.push('# ingress-nginx Migration Report');
  lines.push('');
  lines.push(`- Input: ${inputPath}`);
  lines.push(`- Generated: ${analysis.generatedAt}`);
  lines.push(`- Ingresses: ${analysis.totals.ingresses}`);
  lines.push(`- Detected nginx annotations: ${analysis.totals.nginxAnnotations}`);
  lines.push(`- Unknown nginx annotations: ${analysis.totals.unknownNginxAnnotations}`);
  lines.push(`- Catalog size: ${analysis.catalog?.knownAnnotationCount || 0}`);
  lines.push(`- Compatibility score: ${analysis.totals.score}`);
  lines.push(`- Blockers: ${analysis.totals.blockers}`);
  lines.push(`- Manual checks: ${analysis.totals.manual}`);
  lines.push(`- Unsupported features: ${analysis.totals.unsupported}`);
  lines.push('');

  if (analysis.results.length === 0) {
    lines.push('No Ingress resources found.');
    return lines.join('\n');
  }

  lines.push('| Namespace | Ingress | Score | Blockers | Manual | Unsupported | NGINX Annotations | Unknown |');
  lines.push('| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |');
  for (const row of analysis.results) {
    lines.push(
      `| ${row.namespace} | ${row.name} | ${row.score} | ${row.blockers} | ${row.manual} | ${row.unsupported} | ${row.annotationSummary.nginxAnnotations} | ${row.annotationSummary.unknown} |`,
    );
  }
  lines.push('');
  lines.push('## Findings');
  lines.push('');

  for (const row of analysis.results) {
    lines.push(`### ${row.namespace}/${row.name}`);

    if (row.unknownAnnotations.length > 0) {
      lines.push(`- Unknown annotations: ${row.unknownAnnotations.join(', ')}`);
    }

    const flagged = row.features.filter((feature) => feature.status !== 'mapped');
    if (flagged.length === 0) {
      lines.push('- No manual or unsupported items detected.');
      lines.push('');
      continue;
    }

    for (const feature of flagged) {
      const annotationRef = Array.isArray(feature.annotations) && feature.annotations.length > 0
        ? ` (${feature.annotations.join(', ')})`
        : '';
      lines.push(`- [${feature.status.toUpperCase()}][${feature.risk}] ${feature.label}: ${feature.detail}${annotationRef}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

module.exports = {
  toMarkdown,
};
