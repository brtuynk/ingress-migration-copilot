function parseOptions(args) {
  const options = {};
  const positional = [];

  for (let i = 0; i < args.length; i += 1) {
    const token = args[i];
    if (!token.startsWith('--')) {
      positional.push(token);
      continue;
    }

    const key = token.slice(2);
    const next = args[i + 1];

    if (!next || next.startsWith('--')) {
      options[key] = true;
      continue;
    }

    options[key] = next;
    i += 1;
  }

  return { options, positional };
}

function helpText() {
  return [
    'Migration Copilot CLI',
    '',
    'Commands:',
    '  mig analyze --input <file|dir> [--format md|json] [--output <path>]',
    '  mig convert --input <file|dir> --out <dir> [--gateway <name>] [--gateway-namespace <ns>]',
    '  mig validate --analysis <analysis.json> [--min-score 85] [--max-blockers 0]',
    '  mig catalog [--format md|json] [--output <path>]',
    '',
    'Examples:',
    '  mig analyze --input ./fixtures --format md',
    '  mig convert --input ./fixtures/sample-ingress.yaml --out ./out --gateway shared-gw --gateway-namespace infra',
    '  mig validate --analysis ./analysis.json --min-score 85 --max-blockers 0',
    '  mig catalog --format md --output ./docs/annotation-catalog.md',
  ].join('\n');
}

module.exports = {
  parseOptions,
  helpText,
};
