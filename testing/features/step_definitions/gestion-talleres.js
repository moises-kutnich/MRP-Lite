const { Given, When, Then } = require('cucumber');
const assert = require('assert');

Given('que se ingresa el tipo de equipo con {string}', function (tipoEquipo) {
    this.tipoEquipoActual = tipoEquipo;
});

When('presiono el botón de guardar tipoEquipo', function () {
    this.tipoEquipoRegistrado = this.tipoEquipoActual;
});

Given('que se ingresa el nuevo taller con {string} y {string}', function (codigo, descripcion) {
    this.tallerActual = { codigo: codigo, descripcion: descripcion, equipos: [] };
});

When('presiono el botón de guardar taller', function () {
    this.tallerRegistrado = this.tallerActual;
});

Given('que existe el taller {string}', function (codigo) {
    this.tallerActual = { codigo: codigo, equipos: [] };
});

Given('se agrega el equipo {string} del tipo {string} y {int}', function (nombreEquipo, tipoEquipo, cantidad) {
    if (!this.tallerActual.equipos) this.tallerActual.equipos = [];
    this.tallerActual.equipos.push({ nombre: nombreEquipo, tipo: tipoEquipo, cantidad: cantidad });
});

When('presiono el botón de actualizar taller', function () {
    this.tallerActualizado = true;
});