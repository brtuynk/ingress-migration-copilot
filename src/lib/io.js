const fs = require('node:fs');
const path = require('node:path');

function writeOutput(value, outputPath) {
  if (!outputPath) {
    console.log(value);
    return;
  }

  const resolved = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, value, 'utf8');
}

function readJson(filePath) {
  const raw = fs.readFileSync(path.resolve(filePath), 'utf8');
  return JSON.parse(raw);
}

module.exports = {
  writeOutput,
  readJson,
};
