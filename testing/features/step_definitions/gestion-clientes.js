const { Given, When, Then, After, setDefaultTimeout } = require('cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

setDefaultTimeout(30000); 

let driver;

Given('que se ingresa el cliente con {string}, {string} y {string}', async function (razonSocial, cuit, observaciones) {
    const options = new chrome.Options();
    
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--remote-debugging-port=9222');

    try {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    } catch (error) {
        console.error("ERROR CRÍTICO: El contenedor no tiene navegador instalado.");
        throw error;
    }
    
    await driver.get('http://frontend:4200/clientes/nuevo');

    const inputs = await driver.findElements(By.css('input'));
    await inputs[0].sendKeys(razonSocial);
    await inputs[1].sendKeys(cuit);
    await driver.findElement(By.css('textarea')).sendKeys(observaciones);
});

When('presiono el botón de guardar', async function () {
    const btn = await driver.findElement(By.css('.btn-primary'));
    await btn.click();
});

Then('se espera el siguientes {int} con la {string}', async function (status, respuestaEsperada) {
    const alert = await driver.wait(until.elementLocated(By.className('alert-success')), 5000);
    const texto = await alert.getText();
    assert.strictEqual(texto.trim(), respuestaEsperada.trim());
});

After(async function() {
    if (driver) await driver.quit();
});