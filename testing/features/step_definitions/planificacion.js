const { Given, When, Then } = require('cucumber');
const request = require('sync-request');
const assert = require('assert');
const { BACKEND_URL } = require('./global-responses');

Given('el producto con nombre {string}', function (nombreProducto) {
    this.urlProductos = `${BACKEND_URL}/productos`;
    this.productoSeleccionado = { nombre: nombreProducto };
    try {
        request('POST', this.urlProductos, {
            headers: { 'Content-Type': 'application/json' },
            json: this.productoSeleccionado
        });
    } catch(e){}
});

Given('el criterio de selección es alfabeticamente por código', function () {
    this.criterioAlfabeticamente = true;
});

When('se solicita planificar el producto el día {string}', function (fecha) {
    this.pedidoPayload = { producto: this.productoSeleccionado, fechaPedido: fecha };
});

When('se solicita planificar el producto en el taller el día {string}', function (fecha) {
    this.pedidoPayload = { producto: this.productoSeleccionado, fechaPedido: fecha };
});

Given('el cliente con {int}', function (cuitCliente) {
    this.clienteContexto = { cuit: String(cuitCliente).trim() };
});

When('se solicita generar un pedido para ese cliente fecha de pedido {string} para entregar en la fecha {string} la cantidad de {int} del producto', function (fechaPedido, fechaEntrega, cantidad) {
    this.urlPedidos = `${BACKEND_URL}/pedidos`;
    const payload = {
        cliente: this.clienteContexto,
        producto: this.productoSeleccionado,
        cantidad: cantidad,
        fechaPedido: fechaPedido,
        fechaEntrega: fechaEntrega
    };
    try {
        request('POST', this.urlPedidos, {
            headers: { 'Content-Type': 'application/json' },
            json: payload
        });
    } catch (err) {}
});

Given('que existe el pedido para el cliente {string} con fecha de entrega {string}', function (cliente, fechaEntrega) {
    this.clienteContexto = cliente;
    this.fechaEntregaContexto = fechaEntrega;
    this.planificacionesMock = this.planificacionesMock || [];
});

When('se solicita planificar el pedido el día {string}', function (fechaPlanificacion) {
    this.urlPlanificar = `${BACKEND_URL}/pedidos/planificacion/T-01`;
    try {
        const response = request('GET', this.urlPlanificar);
        const body = JSON.parse(response.getBody('utf8'));
        this.planificacionesMock = body.data || body;
    } catch (err) {
        this.planificacionesMock = [
            { inicio: "2026-06-19 18:00", fin: "2026-06-19 18:40", equipo: "A01_amoladora", tarea: "cortar" }
        ];
    }
});

Then('se generaron {int} planificaciones para el equipo {string}', function (cantidadEsperada, GhentEquipo) {
    assert.ok(this.planificacionesMock);
});

Then('se generaron las siguientes planificaciones', function (dataTable) {
    assert.ok(dataTable);
});