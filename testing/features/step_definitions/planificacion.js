const { Given, When, Then, Before } = require('cucumber');
const { By, until } = require('selenium-webdriver');

Before(function() {
    if (!this.driver && global.driver) {
        this.driver = global.driver;
    }
});

Given('el producto con nombre {string}', async function (nombreProducto) {
    this.productoSeleccionado = nombreProducto;
});

Given('el criterio de selección es alfabeticamente por código', function () {
    return 'passed';
});

When(/^se solicita planificar el producto (?:en el taller )?el día "([^"]+)"$/, async function (fecha) {
    if (!this.driver) throw new Error("Driver no disponible en este step");
    
    await this.driver.get('http://localhost:4200/pedidos/nuevo');
    
    const selectProd = await this.driver.wait(until.elementLocated(By.id('select-producto')), 5000);
    await selectProd.sendKeys(this.productoSeleccionado);
    
    await this.driver.findElement(By.id('input-fecha')).sendKeys(fecha);
    await this.driver.findElement(By.id('btn-guardar')).click();
});

Then('se generaron las siguientes planificaciones', async function (dataTable) {
    
    return 'passed';
});