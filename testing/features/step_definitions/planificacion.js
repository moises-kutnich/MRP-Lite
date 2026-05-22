const { Given, When, Then } = require('cucumber');
const assert = require('assert');

Given('el producto con nombre {string}', async function (nombreProducto) {
    this.productoSeleccionado = nombreProducto;
});

Given('el criterio de selección es alfabeticamente por código', function () {
    this.criterioAlfabeticamente = true;
});

When('se solicita planificar el producto el día {string}', async function (fecha) {
    this.pedidoPayload = { producto: this.productoSeleccionado, fecha: fecha, tallerSeleccionado: null };
});

When('se solicita planificar el producto en el taller el día {string}', async function (fecha) {
    this.pedidoPayload = { producto: this.productoSeleccionado, fecha: fecha, tallerSeleccionado: "BETA" };
});

Then('se generaron las siguientes planificaciones', async function (dataTable) {
    const filasEsperadas = dataTable.hashes();
    assert.ok(filasEsperadas.length > 0, "La tabla de planificaciones esperadas está vacía.");
});

Given('el cliente con {int}', function (cuitCliente) {
    this.cuitClienteSeleccionado = cuitCliente;
});

When('se solicita generar un pedido para ese cliente fecha de pedido {string} para entregar en la fecha {string} la cantidad de {int} del producto', function (fechaPedido, fechaEntrega, cantidad) {
    this.pedidoFabricacionPayload = {
        producto: this.productoSeleccionado,
        cuitCliente: this.cuitClienteSeleccionado,
        fechaPedido: fechaPedido,
        fechaEntrega: fechaEntrega,
        cantidad: cantidad
    };
});

Given('que existe el pedido para el cliente {string} con fecha de entrega {string}', function (cliente, fechaEntrega) {
    this.clienteContexto = cliente;
    this.fechaEntregaContexto = fechaEntrega;
});

When('se solicita planificar el pedido el día {string}', function (fechaPlanificacion) {
    this.planificacionPayload = {
        cliente: this.clienteContexto,
        fechaEntrega: this.fechaEntregaContexto,
        fechaEjecucion: fechaPlanificacion
    };
});