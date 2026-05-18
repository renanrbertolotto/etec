const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.APP_URL || 'http://localhost:5173';
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

let driver;

async function tiraFoto(name) {
    try {
        const img = await driver.takeScreenshot();
        const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`);
        fs.writeFileSync(filePath, img, 'base64');
        console.log(`Foto tirada ${name}.png`);
    } catch (e) {
        console.warn('Erro ao tirar foto:', e.message);
    }
}

async function setupDriver() {
    const opts = new chrome.Options();
    opts.addArguments(
        '--headless=new',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--window-size=800,640',
        '--disable-gpu',
    );
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(opts)
        .build();
    await driver.manage().setTimeouts({ implicit: 5000, pageLoad: 15000 });
}

async function abrirLogin() {
    await driver.get(BASE_URL);
    // Aguarda a splash screen (2800ms) e o form aparecer
    await driver.wait(
        until.elementLocated(By.css('[data-testid="login-form"]')),
        10000
    );
}

async function preencherLogin(usuario, senha) {
    const userInput = await driver.findElement(By.css('[data-testid="login-user"]'));
    const passInput = await driver.findElement(By.css('[data-testid="login-pass"]'));
    const submitBtn = await driver.findElement(By.css('[data-testid="login-submit"]'));

    await userInput.clear();
    await userInput.sendKeys(usuario);
    await passInput.clear();
    await passInput.sendKeys(senha);
    await submitBtn.click();
}

async function testaLoginValido() {
    console.log('▶ Teste: login válido');
    await abrirLogin();
    await preencherLogin('admin', '1234');

    await driver.wait(
        until.elementLocated(By.css('[data-testid="main-app"]')),
        5000
    );
    await tiraFoto('login-sucesso');
    console.log('✔ Login válido OK');
}

async function testaLoginInvalido() {
    console.log('▶ Teste: login inválido');
    await abrirLogin();
    await preencherLogin('errado', 'errado');

    const erro = await driver.wait(
        until.elementLocated(By.css('[data-testid="login-error"]')),
        5000
    );
    const texto = await erro.getText();
    if (!texto.includes('incorretos')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }
    await tiraFoto('login-erro');
    console.log('✔ Login inválido OK');
}

async function main() {
    let exitCode = 0;
    try {
        await setupDriver();
        await testaLoginInvalido();
        await testaLoginValido();
    } catch (e) {
        console.error('✘ Falha:', e.message);
        await tiraFoto('falha');
        exitCode = 1;
    } finally {
        if (driver) await driver.quit();
        process.exit(exitCode);
    }
}

main();
