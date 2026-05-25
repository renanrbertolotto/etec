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

async function abrirFerias() {
    await driver.findElement(By.css('[data-testid="nav-ferias"]')).click();
    await driver.wait(
        until.elementLocated(By.css('[data-testid="ferias-form"]')),
        5000
    );
}

async function preencherFerias(salario, dias) {
    const inputSalario = await driver.findElement(By.css('[data-testid="salario-bruto"]'));
    const inputDias    = await driver.findElement(By.css('[data-testid="dias-de-ferias"]'));
    const submit       = await driver.findElement(By.css('[data-testid="ferias-submit"]'));

    await limparCampo(inputSalario);
    if (salario !== '' && salario !== null && salario !== undefined) {
        await inputSalario.sendKeys(String(salario));
    }

    await limparCampo(inputDias);
    if (dias !== '' && dias !== null && dias !== undefined) {
        await inputDias.sendKeys(String(dias));
    }

    await submit.click();
}

async function testaSalarioInvalido() {
    console.log('▶ Teste: Férias com salário vazio');
    await preencherFerias('', 10);

    const erro = await driver.wait(
        until.elementLocated(By.css('[data-testid="ferias-error"]')),
        5000
    );
    const texto = await erro.getText();
    if (!texto.includes('salário bruto válido')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }

    await tiraFoto(driver, 'ferias-erro-salario');
    console.log('✔ Salário inválido OK');
}

async function testaDiasInvalido() {
    console.log('▶ Teste: Férias com dias vazio');
    await preencherFerias(2000, '');

    const erro = await driver.wait(
        until.elementLocated(By.css('[data-testid="ferias-error"]')),
        5000
    );
    const texto = await erro.getText();
    if (!texto.includes('Dias Concedidos deve ser um número entre 10 e 30')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }

    await tiraFoto(driver, 'ferias-erro-dias');
    console.log('✔ Dias inválido OK');
}

async function testaFeriasValido() {
    console.log('▶ Teste: Férias valido ');
    await preencherFerias(2000, 20);

    await driver.wait(async () => {
        const erros = await driver.findElements(By.css('[data-testid="ferias-error"]'));
        if (erros.length > 0) {
            const msg = await erros[0].getText();
            throw new Error(`API retornou erro: "${msg}".`);
        }
        const els = await driver.findElements(By.xpath("//*[contains(text(), 'Resultado')]"));
        return els.length > 0;
    }, 8000);

    await tiraFoto(driver, 'ferias-valido');
    console.log('✔ Férias valido OK');
}

async function main() {
    let exitCode = 0;
    try {
        driver = await setupDriver();
        await fazerLogin();
        await abrirFerias();
        await testaSalarioInvalido();
        await testaDiasInvalido();
        await testaFeriasValido();
    } catch (e) {
        console.error('✘ Falha:', e.message);
        await tiraFoto(driver, 'falha-ferias');
        exitCode = 1;
    } finally {
        if (driver) await driver.quit();
        process.exit(exitCode);
    }
}

main();


