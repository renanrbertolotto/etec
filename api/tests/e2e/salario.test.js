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

async function abrirSalario() {
    await driver.findElement(By.css('[data-testid="nav-salario"]')).click();
    await driver.wait(
        until.elementLocated(By.css('[data-testid="salario-form"]')),
        5000
    );
}

async function preencherSalario(valor) {
    const input = await driver.findElement(By.css('[data-testid="salario-bruto"]'));
    const submit = await driver.findElement(By.css('[data-testid="salario-submit"]'));

    await input.clear();
    if (valor !== '' && valor !== null && valor !== undefined) {
        await input.sendKeys(String(valor));
    }
    await submit.click();
}

async function testaSalarioInvalido() {
    console.log('▶ Teste: Salário inválido (vazio)');
    await preencherSalario('');

    const erro = await driver.wait(
        until.elementLocated(By.css('[data-testid="salario-error"]')),
        5000
    );
    const texto = await erro.getText();
    if (!texto.includes('válido')) {
        throw new Error(`Mensagem inesperada: "${texto}"`);
    }
    await tiraFoto('salario-erro');
    console.log('✔ Salário inválido OK');
}

async function testaSalarioValido() {
    console.log('▶ Teste: Salário válido');
    await preencherSalario(2000);

    // Aguarda a resposta da API (ResultBox aparece quando há resultado)
    await driver.wait(async () => {
        const erros = await driver.findElements(By.css('[data-testid="salario-error"]'));
        if (erros.length > 0) {
            const msg = await erros[0].getText();
            throw new Error(`API retornou erro: "${msg}".`);
        }
        // ResultBox renderiza um div com o texto "Resultado"
        const els = await driver.findElements(By.xpath("//*[contains(text(), 'Resultado')]"));
        return els.length > 0;
    }, 8000);

    await tiraFoto('salario-sucesso');
    console.log('✔ Salário válido OK');
}

async function main() {
    let exitCode = 0;
    try {
        await setupDriver();
        await fazerLogin();
        await abrirSalario();
        await testaSalarioInvalido();
        await testaSalarioValido();
    } catch (e) {
        console.error('✘ Falha:', e.message);
        await tiraFoto('falha-salario');
        exitCode = 1;
    } finally {
        if (driver) await driver.quit();
        process.exit(exitCode);
    }
}

main();
