const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, '..', '..', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function tiraFoto(driver, name) {
    try {
        const img = await driver.takeScreenshot();
        const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`);
        fs.writeFileSync(filePath, img, 'base64');
        console.log(`Foto tirada ${name}.png`);
    } catch (e) {
        console.warn('Erro ao tirar foto:', e.message);
    }
}

module.exports = { tiraFoto };
