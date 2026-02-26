const { loadManifests } = require('../lib/file-loader');
const { convertIngresses, writeConvertedManifests } = require('../lib/converter');
const { writeOutput } = require('../lib/io');

async function convertCommand(options) {
  const input = options.input;
  const outDir = options.out;

  if (!input) {
    throw new Error('Missing required option --input <file|dir>');
  }

  if (!outDir) {
    throw new Error('Missing required option --out <dir>');
  }

  const target = options.target || 'gateway-api';
  if (target !== 'gateway-api') {
    throw new Error('Only --target gateway-api is supported in v0.1.0');
  }

  const manifests = loadManifests(input);
  const result = convertIngresses(manifests, options);
  const writtenFiles = writeConvertedManifests(result, outDir);

  const summary = {
    target,
    written: writtenFiles.length,
    files: writtenFiles,
    totals: result.analysis.totals,
  };

  const output = JSON.stringify(summary, null, 2);
  writeOutput(output, options.output);
}

module.exports = {
  convertCommand,
};
