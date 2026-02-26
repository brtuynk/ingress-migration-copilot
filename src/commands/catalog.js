const { KNOWN_ANNOTATIONS, NGINX_ANNOTATION_PREFIX } = require('../lib/nginx-annotation-catalog');
const { writeOutput } = require('../lib/io');

function toRows() {
  return Object.entries(KNOWN_ANNOTATIONS)
    .map(([shortKey, value]) => ({
      annotation: `${NGINX_ANNOTATION_PREFIX}${shortKey}`,
      capability: value.capability,
      status: value.status,
      risk: value.risk,
      gatewayEquivalent: value.gatewayEquivalent,
      detail: value.detail,
    }))
    .sort((a, b) => a.annotation.localeCompare(b.annotation));
}

function toMarkdown(rows) {
  const lines = [];
  lines.push('# NGINX Annotation Catalog');
  lines.push('');
  lines.push(`Total known annotations: ${rows.length}`);
  lines.push('');
  lines.push('| Annotation | Capability | Status | Risk | Gateway Equivalent |');
  lines.push('| --- | --- | --- | --- | --- |');

  for (const row of rows) {
    lines.push(`| ${row.annotation} | ${row.capability} | ${row.status} | ${row.risk} | ${row.gatewayEquivalent} |`);
  }

  return lines.join('\n');
}

async function catalogCommand(options) {
  const format = options.format || 'md';
  if (!['md', 'json'].includes(format)) {
    throw new Error('Invalid --format value. Use md or json.');
  }

  const rows = toRows();
  const output = format === 'json' ? JSON.stringify(rows, null, 2) : toMarkdown(rows);
  writeOutput(output, options.output);
}

module.exports = {
  catalogCommand,
};
