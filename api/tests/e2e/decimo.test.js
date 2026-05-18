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

    await inputSalario.clear();
    await inputSalario.sendKeys(String(salario));

    await inputMeses.clear();
    await inputMeses.sendKeys(String(meses));
    await submit.click();
}

async function esperarErroDecimo(textoEsperado) {
    await driver.wait(async () => {
        const erros = await driver.findElements(By.css('[data-testid="decimo-terceiro-error"]'));
        if (erros.length === 0) return false;

        const texto = await erros[0].getText();
        return texto.includes(textoEsperado);
    }, 10000);

    const erro = await driver.findElement(By.css('[data-testid="decimo-terceiro-error"]'));
    return erro.getText();
}

async function testaSalarioInvalido() {
    console.log('▶ Teste: 13° com salário vazio');
    await preencherDecimo('', 10);

    const texto = await esperarErroDecimo('salário bruto válido');
    if (!texto.includes('salário bruto válido')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }

    await tiraFoto('decimo-erro-salario');
    console.log('✔ Salário inválido OK');
}

async function testaMesesInvalido() {
    console.log('▶ Teste: 13° com meses vazio');
    await preencherDecimo(2000, 0);

    const texto = await esperarErroDecimo('entre 1 e 12');
    if (!texto.includes('entre 1 e 12')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }

    await tiraFoto('decimo-erro-meses');
    console.log('✔ Meses inválido OK');
}

async function testaMesesForaDoIntervalo() {
    console.log('▶ Teste: 13° com mês 13');
    await preencherDecimo(2000, 13);

    const texto = await esperarErroDecimo('entre 1 e 12');
    if (!texto.includes('Meses trabalhados deve ser entre 1 e 12.')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }

    await tiraFoto('decimo-erro-mes-13');
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

    await tiraFoto('decimo-sucesso');
    console.log('✔ 13° válido OK');
}

async function main() {
    let exitCode = 0;
    try {
        await setupDriver();
        await fazerLogin();
        await abrirDecimo();
        await testaMesesForaDoIntervalo();
        await testaSalarioInvalido();
        await testaDecimoValido();
    } catch (e) {
        console.error('✘ Falha:', e.message);
        await tiraFoto('falha-decimo');
        exitCode = 1;
    } finally {
        if (driver) await driver.quit();
        process.exit(exitCode);
    }
}

main();
