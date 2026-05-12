const { Given, When, Then, After } = require('cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

let driver;

async function getDriver() {
    if (driver) return driver;
    const options = new chrome.Options();
    options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    return driver;
}

Given('que se ingresa el tipo de equipo con {string}', async function (nombre) {
    const d = await getDriver();
    await d.get('http://frontend:4200/tipo-equipo/nuevo');
    await d.findElement(By.css('input')).sendKeys(nombre);
});

When('presiono el botón de guardar tipoEquipo', async function () {
    await driver.findElement(By.css('button[type="submit"]')).click();
});

Given('que se ingresa el nuevo taller con {string} y {string}', async function (codigo, nombre) {
    const d = await getDriver();
    await d.get('http://frontend:4200/talleres/nuevo');
    const inputs = await d.findElements(By.css('input'));
    await inputs[0].sendKeys(codigo);
    await inputs[1].sendKeys(nombre);
});

When('presiono el botón de guardar taller', async function () {
    await driver.findElement(By.css('button.btn-primary')).click();
});

Then('se espera el siguiente {int} con {string}', async function (status, mensaje) {
    const alert = await driver.wait(until.elementLocated(By.css('.alert')), 5000);
    const texto = await alert.getText();
    assert.ok(texto.includes(mensaje));
});

Given('que existe el taller {string}', async function (codigo) {
    const d = await getDriver();
    await d.get('http://frontend:4200/talleres/nuevo');
});

Given('se agrega el equipo {string} del tipo {string} y {int}', async function (codigoE, tipoE, cap) {
    await driver.findElement(By.css('input[placeholder*="Código"]')).sendKeys(codigoE);
    const select = await driver.findElement(By.css('select'));
    await select.sendKeys(tipoE);
    await driver.findElement(By.css('input[type="number"]')).sendKeys(cap.toString());
});

When('presiono el botón de actualizar taller', async function () {
    await driver.findElement(By.xpath("//button[contains(text(), 'Actualizar')]")).click();
});

After(async function() {
    if (driver) {
        await driver.quit();
        driver = null;
    }
});