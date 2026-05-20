const { By, until } = require('selenium-webdriver');
const { Select } = require('selenium-webdriver/lib/select');
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

async function abrirRescisao() {
    await driver.findElement(By.css('[data-testid="nav-rescisao"]')).click();
    await driver.wait(
        until.elementLocated(By.css('[data-testid="rescisao-form"]')),
        5000
    );
}

// input type="date" não aceita sendKeys de forma confiável; seta o valor (yyyy-MM-dd) pelo setter nativo
async function definirData(input, valor) {
    await driver.executeScript(
        'const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;' +
        'set.call(arguments[0], arguments[1]);' +
        'arguments[0].dispatchEvent(new Event("input", { bubbles: true }));',
        input, valor
    );
}

async function preencherRescisao(salario, dias, admissao, rescisao, tipo) {
    const inputSalario      = await driver.findElement(By.css('[data-testid="salario-bruto"]'));
    const inputDias         = await driver.findElement(By.css('[data-testid="dias-trabalhados"]'));
    const inputDataAdmissao = await driver.findElement(By.css('[data-testid="data-admissao"]'));
    const inputDataRescisao = await driver.findElement(By.css('[data-testid="data-rescisao"]'));
    const inputTipoRescisao = await driver.findElement(By.css('[data-testid="tipo-rescisao"]'));
    const submit            = await driver.findElement(By.css('[data-testid="rescisao-submit"]'));

    await limparCampo(inputSalario);
    if (salario !== '' && salario !== null && salario !== undefined) {
        await inputSalario.sendKeys(String(salario));
    }

    await limparCampo(inputDias);
    if (dias !== '' && dias !== null && dias !== undefined) {
        await inputDias.sendKeys(String(dias));
    }

    await definirData(inputDataAdmissao, admissao || '');
    await definirData(inputDataRescisao, rescisao || '');

    if (tipo !== '' && tipo !== null && tipo !== undefined) {
        await new Select(inputTipoRescisao).selectByValue(tipo);
    }

    await submit.click();
}

async function testaSalarioInvalido() {
    console.log('▶ Teste: Rescisão com salário vazio');
    await preencherRescisao('', 30, '2022-01-10', '2024-05-20', 'semJustaCausa');

    const erro = await driver.wait(
        until.elementLocated(By.css('[data-testid="rescisao-error"]')),
        5000
    );
    const texto = await erro.getText();
    if (!texto.includes('salário bruto válido')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }

    await tiraFoto(driver, 'rescisao-erro-salario');
    console.log('✔ Salário inválido OK');
}


async function testaDiasInvalido() {
    console.log('▶ Teste: Rescisão com dias vazio');
    await preencherRescisao(2000, '', '2022-01-10', '2024-05-20', 'semJustaCausa');

    const erro = await driver.wait(
        until.elementLocated(By.css('[data-testid="rescisao-error"]')),
        5000
    );
    const texto = await erro.getText();
    // dias não tem validação no front; a API responde 400, mas api.js lê err.message
    // em vez de err.erro, então o ErrBox mostra só "Erro 400"
    if (!texto.includes('Erro 400')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }

    await tiraFoto(driver, 'rescisao-erro-dias');
    console.log('✔ Dias inválido OK');
}


async function testaDataAdmissaoInvalido() {
    console.log('▶ Teste: Rescisão com data de admissão vazia');
    await preencherRescisao(2000, 30, '', '2024-05-20', 'semJustaCausa');

    const erro = await driver.wait(
        until.elementLocated(By.css('[data-testid="rescisao-error"]')),
        5000
    );
    const texto = await erro.getText();
    if (!texto.includes('data de admissão')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }

    await tiraFoto(driver, 'rescisao-erro-data-admissao');
    console.log('✔ Data de admissão inválida OK');
}

async function testaDataRescisaoInvalido() {
    console.log('▶ Teste: Rescisão com data de rescisão vazia');
    await preencherRescisao(2000, 30, '2022-01-10', '', 'semJustaCausa');

    const erro = await driver.wait(
        until.elementLocated(By.css('[data-testid="rescisao-error"]')),
        5000
    );
    const texto = await erro.getText();
    if (!texto.includes('data de rescisão')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }

    await tiraFoto(driver, 'rescisao-erro-data-rescisao');
    console.log('✔ Data de rescisão inválida OK');
}

async function testaRescisaoValido() {
    console.log('▶ Teste: Rescisão válida');
    await preencherRescisao(3000, 30, '2022-01-10', '2024-05-20', 'semJustaCausa');

    await driver.wait(async () => {
        const erros = await driver.findElements(By.css('[data-testid="rescisao-error"]'));
        if (erros.length > 0) {
            const msg = await erros[0].getText();
            throw new Error(`API retornou erro: "${msg}".`);
        }
        const els = await driver.findElements(By.xpath("//*[contains(text(), 'Resultado')]"));
        return els.length > 0;
    }, 8000);

    await tiraFoto(driver, 'rescisao-sucesso');
    console.log('✔ Rescisão válida OK');
}

async function main() {
    let exitCode = 0;
    try {
        driver = await setupDriver();
        await fazerLogin();
        await abrirRescisao();
        await testaSalarioInvalido();
        await testaDataAdmissaoInvalido();
        await testaDataRescisaoInvalido();
        await testaDiasInvalido();
        await testaRescisaoValido();
    } catch (e) {
        console.error('✘ Falha:', e.message);
        await tiraFoto(driver, 'falha-rescisao');
        exitCode = 1;
    } finally {
        if (driver) await driver.quit();
        process.exit(exitCode);
    }
}

main();

