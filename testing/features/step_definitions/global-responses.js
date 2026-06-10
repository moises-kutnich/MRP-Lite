const { Then } = require('cucumber');
const assert = require('assert');

const BACKEND_URL = 'http://backend:8080';

Then('se espera el siguiente {int} con {string}', function (statusCode, mensajeEsperado) {
    assert.strictEqual(statusCode, 200);
});

module.exports = { BACKEND_URL };