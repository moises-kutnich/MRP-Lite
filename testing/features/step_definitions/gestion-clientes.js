const { Given, When, Then } = require('cucumber');
const assert = require('assert');

Given('que se ingresa el cliente con {}, {int} y <observaciones>', function (razonSocial, cuit) {
    this.clienteActual = {
        razonSocial: razonSocial.trim(),
        cuit: cuit,
        observaciones: ''
    };
});

When('presiono el botón de guardar', function () {
    this.clientePersistido = { 
        id: 1, 
        ...this.clienteActual 
    };
});

Then('se espera el siguientes {int} con la Cliente {} {word} registrado correctamente', function (statusCode, razonSocialEsperada, cuitConParentesis) {
    assert.strictEqual(statusCode, 200);
    assert.ok(this.clientePersistido, 'El cliente no fue guardado.');
    
    const cuitLimpio = cuitConParentesis.replace('(', '').replace(')', '');
    
    assert.strictEqual(String(this.clientePersistido.cuit), cuitLimpio);
});

Given('que se ingresa el cliente con {string} y {int}', function (razonSocial, cuit) {
    this.clienteActual = {
        razonSocial: razonSocial,
        cuit: cuit,
        observaciones: ''
    };
});

When('presiono el botón de guardar cliente', function () {
    this.clientePersistido = { 
        id: 2, 
        ...this.clienteActual 
    };
});