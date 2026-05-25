const { readdirSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');

const testsDir = join(__dirname, 'tests');
const testFiles = readdirSync(testsDir)
    .filter((file) => file.endsWith('.test.js'))
    .sort();

let failed = false;

for (const file of testFiles) {
    const testPath = join(testsDir, file);
    console.log(`\n=== Executando ${file} ===`);
    const result = spawnSync(process.execPath, [testPath], { stdio: 'inherit' });

    if (result.status !== 0) {
        failed = true;
        console.error(`✘ Teste falhou: ${file}`);
    }
}

process.exit(failed ? 1 : 0);
