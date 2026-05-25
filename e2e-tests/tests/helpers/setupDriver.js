const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function setupDriver() {
    const opts = new chrome.Options();
    opts.addArguments(
        '--headless=new',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--window-size=1280,900',
        '--disable-gpu',
    );
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(opts)
        .build();
    await driver.manage().window().setRect({ width: 1280, height: 900 });
    await driver.manage().setTimeouts({ implicit: 5000, pageLoad: 15000 });
    return driver;
}

module.exports = { setupDriver };
