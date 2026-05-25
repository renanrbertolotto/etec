const { Key } = require('selenium-webdriver');

// .clear() não dispara onChange no React; limpa via teclado para o estado controlado atualizar
async function limparCampo(input) {
    await input.sendKeys(Key.END, Key.chord(Key.SHIFT, Key.HOME), Key.BACK_SPACE);
}

module.exports = { limparCampo };
