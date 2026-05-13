const { Given, When, Then } = require('cucumber');
const { By, until } = require('selenium-webdriver');

Given(/^que se ingresa el cliente con (.+), (\d+) y (.+)$/, async function (nombre, documento, observaciones) {
    if (!this.driver) throw new Error("Driver no inicializado");
    
    await this.driver.get('http://localhost:4200/clientes/nuevo');
    
    const inputNombre = await this.driver.wait(until.elementLocated(By.id('input-nombre')), 5000);
    await inputNombre.sendKeys(nombre.trim());
    await this.driver.findElement(By.id('input-documento')).sendKeys(documento.toString());

});

When('presiono el botón de guardar', async function () {
    await this.driver.findElement(By.id('btn-guardar-cliente')).click();
});

Then(/^se espera el siguientes (\d+) con la Cliente (.+) \((\d+)\) registrado correctamente$/, async function (codigo, nombre, documento) {
    const mensajeEsperado = `Cliente ${nombre.trim()} (${documento}) registrado correctamente`;
    const elemento = await this.driver.wait(until.elementLocated(By.id('mensaje-exito')), 5000);
    const textoActual = await elemento.getText();
    
    if (!textoActual.includes(mensajeEsperado)) {
        throw new Error(`Aserción fallida. Esperaba: ${mensajeEsperado}`);
    }
});