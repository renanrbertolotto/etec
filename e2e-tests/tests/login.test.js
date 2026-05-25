const { By, until } = require('selenium-webdriver');
const { tiraFoto } = require('./helpers/tiraFoto');
const { setupDriver } = require('./helpers/setupDriver');
const { limparCampo } = require('./helpers/limparCampo');

const BASE_URL = process.env.APP_URL || 'http://localhost:5173';

let driver;

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

    await limparCampo(userInput);
    await userInput.sendKeys(usuario);
    await limparCampo(passInput);
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
    await tiraFoto(driver, 'login-sucesso');
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
    await tiraFoto(driver, 'login-erro');
    console.log('✔ Login inválido OK');
}

async function main() {
    let exitCode = 0;
    try {
        driver = await setupDriver();
        await testaLoginInvalido();
        await testaLoginValido();
    } catch (e) {
        console.error('✘ Falha:', e.message);
        await tiraFoto(driver, 'falha');
        exitCode = 1;
    } finally {
        if (driver) await driver.quit();
        process.exit(exitCode);
    }
}

main();
