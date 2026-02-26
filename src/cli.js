const { analyzeCommand } = require('./commands/analyze');
const { convertCommand } = require('./commands/convert');
const { validateCommand } = require('./commands/validate');
const { catalogCommand } = require('./commands/catalog');
const { helpText, parseOptions } = require('./lib/cli-options');

async function runCli(argv) {
  const [command, ...rest] = argv;

  if (!command || command === '--help' || command === '-h') {
    console.log(helpText());
    return;
  }

  const { options, positional } = parseOptions(rest);
  switch (command) {
    case 'analyze':
      await analyzeCommand(options, positional);
      return;
    case 'convert':
      await convertCommand(options, positional);
      return;
    case 'validate':
      await validateCommand(options, positional);
      return;
    case 'catalog':
      await catalogCommand(options, positional);
      return;
    default:
      throw new Error(`Unknown command: ${command}\n\n${helpText()}`);
  }
}

module.exports = {
  runCli,
};
