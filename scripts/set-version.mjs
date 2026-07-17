// Writes the released version into the plugin manifest and the marketplace
// catalog, keeping their key order and 2-space formatting. Called by
// semantic-release (@semantic-release/exec) with the next version as argv[2].
import { readFileSync, writeFileSync } from 'node:fs';

const version = process.argv[2];
if (!version) {
  console.error('usage: set-version.mjs <version>');
  process.exit(1);
}

const files = [
  'plugins/aidd-async/.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
];

for (const file of files) {
  const json = JSON.parse(readFileSync(file, 'utf8'));
  json.version = version;
  writeFileSync(file, JSON.stringify(json, null, 2) + '\n');
  console.log(`set ${file} to ${version}`);
}
