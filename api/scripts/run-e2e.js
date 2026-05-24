const { readdirSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');

const e2eDir = join(__dirname, '..', 'tests', 'e2e');
const testFiles = readdirSync(e2eDir)
  .filter((file) => file.endsWith('.test.js'))
  .sort();

for (const file of testFiles) {
  const testPath = join(e2eDir, file);
  const result = spawnSync(process.execPath, [testPath], { stdio: 'inherit' });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}
