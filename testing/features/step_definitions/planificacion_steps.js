const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');

When('se solicita planificar el producto en el taller el día {string}', async function (fecha) {
    await this.driver.get('http://localhost:4200/pedidos/nuevo');

    await this.driver.findElement(By.id('select-producto')).sendKeys("Andamio básico 2x2x4");
    await this.driver.findElement(By.id('select-taller')).sendKeys("BETA");
    await this.driver.findElement(By.id('input-fecha')).sendKeys(fecha);

    await this.driver.findElement(By.id('btn-guardar')).click();
});

Then('se espera el siguiente 200 con {string}', async function (mensajeEsperado) {
    // Esperar a que el div del mensaje aparezca y contenga el texto
    const elementoMensaje = await this.driver.wait(until.elementLocated(By.id('mensaje-exito')), 5000);
    const textoActual = await elementoMensaje.getText();
    if (!textoActual.includes(mensajeEsperado)) {
        throw new Error(`Se esperaba "${mensajeEsperado}" pero se recibió "${textoActual}"`);
    }
});