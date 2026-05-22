const { Then } = require('cucumber');
const assert = require('assert');

Then('se espera el siguiente {int} con {string}', function (statusCode, mensajeEsperado) {
    assert.strictEqual(statusCode, 200, `Se esperaba código 200 pero falló la petición.`);
});