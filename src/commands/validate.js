const { readJson } = require('../lib/io');

async function validateCommand(options) {
  const analysisPath = options.analysis;
  if (!analysisPath) {
    throw new Error('Missing required option --analysis <analysis.json>');
  }

  const minScore = Number(options['min-score'] || 85);
  const maxBlockers = Number(options['max-blockers'] || 0);

  const analysis = readJson(analysisPath);
  const score = Number(analysis.totals?.score || 0);
  const blockers = Number(analysis.totals?.blockers || 0);

  const pass = score >= minScore && blockers <= maxBlockers;
  const summary = {
    pass,
    score,
    minScore,
    blockers,
    maxBlockers,
    ingresses: analysis.totals?.ingresses || 0,
  };

  console.log(JSON.stringify(summary, null, 2));
  if (!pass) {
    process.exitCode = 1;
  }
}

module.exports = {
  validateCommand,
};
