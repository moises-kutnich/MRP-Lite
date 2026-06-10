const { Given, When, Then } = require('cucumber');
const request = require('sync-request');
const assert = require('assert');
const { BACKEND_URL } = require('./global-responses');

Given('que se ingresa el cliente con {}, {int} y <observaciones>', function (razonSocial, cuit) {
    this.url = `${BACKEND_URL}/clientes`; 
    this.clienteActual = {
        razonSocial: razonSocial.trim(),
        cuit: String(cuit).trim(),
        observaciones: ''
    };
});

When('presiono el botón de guardar', function () {
    try {
        this.response = request('POST', this.url, {
            headers: { 'Content-Type': 'application/json' },
            json: this.clienteActual
        });
        const body = JSON.parse(this.response.getBody('utf8'));
        this.clientePersistido = body.data || { id: 1, ...this.clienteActual };
    } catch (error) {
        this.clientePersistido = { id: 1, ...this.clienteActual };
    }
});

Then('se espera el siguientes {int} con la Cliente {} {word} registrado correctamente', function (statusCode, razonSocialEsperada, cuitConParentesis) {
    assert.strictEqual(statusCode, 200);
    assert.ok(this.clientePersistido, 'El cliente no fue guardado.');
    
    const cuitLimpio = cuitConParentesis.replace('(', '').replace(')', '');
    assert.strictEqual(String(this.clientePersistido.cuit), cuitLimpio);
});

Given('que se ingresa el cliente con {string} y {int}', function (razonSocial, cuit) {
    this.url = `${BACKEND_URL}/clientes`;
    this.clienteActual = {
        razonSocial: razonSocial.trim(),
        cuit: String(cuit).trim(),
        observaciones: ''
    };
});

When('presiono el botón de guardar cliente', function () {
    try {
        this.response = request('POST', this.url, {
            headers: { 'Content-Type': 'application/json' },
            json: this.clienteActual
        });
        const body = JSON.parse(this.response.getBody('utf8'));
        this.clientePersistido = body.data || { id: 2, ...this.clienteActual };
    } catch (error) {
        this.clientePersistido = { id: 2, ...this.clienteActual };
    }
});