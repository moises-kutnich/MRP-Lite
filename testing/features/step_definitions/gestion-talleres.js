const { Given, When, Then } = require('cucumber');
const request = require('sync-request');
const assert = require('assert');
const { BACKEND_URL } = require('./global-responses');

Given('que se ingresa el tipo de equipo con {string}', function (tipoEquipo) {
    this.url = `${BACKEND_URL}/tipos-equipos`;
    this.tipoEquipoActual = { codigo: tipoEquipo.toUpperCase(), nombre: tipoEquipo };
});

When('presiono el botón de guardar tipoEquipo', function () {
    try {
        request('POST', this.url, {
            headers: { 'Content-Type': 'application/json' },
            json: this.tipoEquipoActual
        });
    } catch (err) {}
});

Given('que se ingresa el nuevo taller con {string} y {string}', function (codigo, descripcion) {
    this.url = `${BACKEND_URL}/talleres`;
    this.tallerActual = { codigo: codigo, nombre: descripcion, equipos: [] };
});

When('presiono el botón de guardar taller', function () {
    try {
        request('POST', this.url, {
            headers: { 'Content-Type': 'application/json' },
            json: this.tallerActual
        });
    } catch (err) {}
});

Given('que existe el taller {string}', function (codigo) {
    this.url = `${BACKEND_URL}/talleres`;
    this.tallerActual = { codigo: codigo, nombre: "Taller " + codigo, equipos: [] };
});

Given('se agrega el equipo {string} del tipo {string} y {int}', function (nombreEquipo, tipoEquipo, cantidad) {
    if (!this.tallerActual.equipos) this.tallerActual.equipos = [];
    this.tallerActual.equipos.push({
        codigo: nombreEquipo,
        capacidad: cantidad,
        tipo: { codigo: tipoEquipo.toUpperCase(), nombre: tipoEquipo }
    });
});

When('presiono el botón de actualizar taller', function () {
    try {
        request('POST', this.url, {
            headers: { 'Content-Type': 'application/json' },
            json: this.tallerActual
        });
        this.tallerActualizado = true;
    } catch (err) {
        this.tallerActualizado = false;
    }
});