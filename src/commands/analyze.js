const path = require('node:path');
const { loadManifests } = require('../lib/file-loader');
const { analyzeIngresses } = require('../lib/analyzer');
const { toMarkdown } = require('../lib/report');
const { writeOutput } = require('../lib/io');

async function analyzeCommand(options) {
  const input = options.input;
  if (!input) {
    throw new Error('Missing required option --input <file|dir>');
  }

  const format = options.format || 'md';
  if (!['md', 'json'].includes(format)) {
    throw new Error('Invalid --format value. Use md or json.');
  }

  const manifests = loadManifests(input);
  const analysis = analyzeIngresses(manifests);

  const output =
    format === 'json'
      ? JSON.stringify(analysis, null, 2)
      : toMarkdown(analysis, path.resolve(input));

  writeOutput(output, options.output);
}

module.exports = {
  analyzeCommand,
};
