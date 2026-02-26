const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');

function listManifestFiles(inputPath) {
  const full = path.resolve(inputPath);
  if (!fs.existsSync(full)) {
    throw new Error(`Input path does not exist: ${full}`);
  }

  const stat = fs.statSync(full);
  if (stat.isFile()) {
    return [full];
  }

  const queue = [full];
  const files = [];
  while (queue.length > 0) {
    const current = queue.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const joined = path.join(current, entry.name);
      if (entry.isDirectory()) {
        queue.push(joined);
      } else if (entry.isFile() && /\.(yaml|yml|json)$/i.test(entry.name)) {
        files.push(joined);
      }
    }
  }

  return files.sort();
}

function parseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (/\.json$/i.test(filePath)) {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [parsed];
  }

  const docs = [];
  yaml.loadAll(content, (doc) => {
    if (doc && typeof doc === 'object') {
      docs.push(doc);
    }
  });

  return docs;
}

function loadManifests(inputPath) {
  const manifests = [];
  for (const filePath of listManifestFiles(inputPath)) {
    for (const doc of parseFile(filePath)) {
      manifests.push({ ...doc, __sourceFile: filePath });
    }
  }
  return manifests;
}

module.exports = {
  loadManifests,
};
