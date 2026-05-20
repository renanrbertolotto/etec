const { By, until } = require('selenium-webdriver');
const { tiraFoto } = require('./helpers/tiraFoto');
const { setupDriver } = require('./helpers/setupDriver');
const { limparCampo } = require('./helpers/limparCampo');

const BASE_URL = process.env.APP_URL || 'http://localhost:5173';

let driver;

async function fazerLogin() {
    await driver.get(BASE_URL);
    await driver.wait(
        until.elementLocated(By.css('[data-testid="login-form"]')),
        10000
    );
    await driver.findElement(By.css('[data-testid="login-user"]')).sendKeys('admin');
    await driver.findElement(By.css('[data-testid="login-pass"]')).sendKeys('1234');
    await driver.findElement(By.css('[data-testid="login-submit"]')).click();
    await driver.wait(
        until.elementLocated(By.css('[data-testid="main-app"]')),
        5000
    );
}

async function abrirDecimo() {
    await driver.findElement(By.css('[data-testid="nav-decimo"]')).click();
    await driver.wait(
        until.elementLocated(By.css('[data-testid="decimo-terceiro-form"]')),
        5000
    );
}

async function preencherDecimo(salario, meses) {
    const inputSalario = await driver.findElement(By.css('[data-testid="salario-bruto"]'));
    const inputMeses   = await driver.findElement(By.css('[data-testid="meses-trabalhados"]'));
    const submit       = await driver.findElement(By.css('[data-testid="decimo-terceiro-submit"]'));

    await limparCampo(inputSalario);
    if (salario !== '' && salario !== null && salario !== undefined) {
        await inputSalario.sendKeys(String(salario));
    }

    await limparCampo(inputMeses);
    if (meses !== '' && meses !== null && meses !== undefined) {
        await inputMeses.sendKeys(String(meses));
    }

    await submit.click();
}

async function testaSalarioInvalido() {
    console.log('▶ Teste: Salário inválido (vazio)');
    await preencherDecimo('', 4);

    const erro = await driver.wait(
        until.elementLocated(By.css('[data-testid="decimo-terceiro-error"]')),
        5000
    );
    const texto = await erro.getText();
    if (!texto.includes('válido')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }
    await tiraFoto(driver, 'decimo-salario-erro');
    console.log('✔ Salário inválido OK');
}

async function testaMesesInvalido() {
    console.log('▶ Teste: 13° com meses vazio');
    await preencherDecimo(2000, '');

    const erro = await driver.wait(
        until.elementLocated(By.css('[data-testid="decimo-terceiro-error"]')),
        5000
    );
    const texto = await erro.getText();
    if (!texto.includes('entre 1 e 12')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }

    await tiraFoto(driver, 'decimo-erro-meses');
    console.log('✔ Meses inválido OK');
}

async function testaMesesForaDoIntervalo() {
    console.log('▶ Teste: 13° com mês 13');
    await preencherDecimo(2000, 13);

    const erro = await driver.wait(
        until.elementLocated(By.css('[data-testid="decimo-terceiro-error"]')),
        5000
    );
    const texto = await erro.getText();
    if (!texto.includes('entre 1 e 12')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }

    await tiraFoto(driver, 'decimo-erro-mes-13');
    console.log('✔ Mês 13 inválido OK');
}

async function testaDecimoValido() {
    console.log('▶ Teste: 13° válido');
    await preencherDecimo(2000, 12);

    await driver.wait(async () => {
        const erros = await driver.findElements(By.css('[data-testid="decimo-terceiro-error"]'));
        if (erros.length > 0) {
            const msg = await erros[0].getText();
            throw new Error(`API retornou erro: "${msg}".`);
        }
        const els = await driver.findElements(By.xpath("//*[contains(text(), 'Resultado')]"));
        return els.length > 0;
    }, 8000);

    await tiraFoto(driver, 'decimo-sucesso');
    console.log('✔ 13° válido OK');
}

async function main() {
    let exitCode = 0;
    try {
        driver = await setupDriver();
        await fazerLogin();
        await abrirDecimo();
        await testaSalarioInvalido();
        await testaMesesInvalido();
        await testaMesesForaDoIntervalo();
        await testaDecimoValido();
    } catch (e) {
        console.error('✘ Falha:', e.message);
        await tiraFoto(driver, 'falha-decimo');
        exitCode = 1;
    } finally {
        if (driver) await driver.quit();
        process.exit(exitCode);
    }
}

main();
