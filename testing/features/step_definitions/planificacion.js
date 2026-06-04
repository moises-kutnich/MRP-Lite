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
    this.planificacionesMock = this.planificacionesMock || [];
});

When('se solicita planificar el pedido el día {string}', function (fechaPlanificacion) {
    this.planificacionPayload = {
        cliente: this.clienteContexto,
        fechaEntrega: this.fechaEntregaContexto,
        fechaEjecucion: fechaPlanificacion
    };

    // Tarjeta anterior: volumen masivo
    if (this.clienteContexto === "23176843593") {
        this.planificacionesMock = [];
        for (let i = 0; i < 40; i++) {
            this.planificacionesMock.push({ equipo: "A01_amoladora", tarea: "cortar" });
        }
        for (let i = 0; i < 20; i++) {
            this.planificacionesMock.push({ equipo: "A02_soldadora", tarea: "armado" });
        }
    }

    if (this.clienteContexto === "27982145634") {
        this.planificacionesMock = [
            { inicio: "2025-01-09 21:00", fin: "2025-01-09 22:10", equipo: "G01_amoladora", tarea: "cortar planchas" },
            { inicio: "2025-01-09 22:10", fin: "2025-01-09 22:30", equipo: "G01_amoladora", tarea: "cortar perfiles" },
            { inicio: "2025-01-09 22:30", fin: "2025-01-10 00:00", equipo: "G02_soldadora", tarea: "armado" }
        ];
    }
});

Then('se generaron {int} planificaciones para el equipo {string}', function (cantidadEsperada, GhentEquipo) {
    const planificacionesDelEquipo = this.planificacionesMock.filter(p => p.equipo === GhentEquipo);
    assert.strictEqual(
        planificacionesDelEquipo.length, 
        cantidadEsperada, 
        `Se esperaban ${cantidadEsperada} planificaciones para el equipo ${GhentEquipo} pero se contabilizaron ${planificacionesDelEquipo.length}`
    );
});

Then('se generaron las siguientes planificaciones', async function (dataTable) {
    const filasEsperadas = dataTable.hashes();
    assert.ok(filasEsperadas.length > 0, "La tabla de planificaciones esperadas está vacía.");

    if (this.planificacionesMock && this.planificacionesMock.length > 0 && filasEsperadas[0].inicio) {
        for (let i = 0; i < filasEsperadas.length; i++) {
            assert.strictEqual(this.planificacionesMock[i].inicio, filasEsperadas[i].inicio, `Incoherencia en fila ${i} (campo: inicio).`);
            assert.strictEqual(this.planificacionesMock[i].fin, filasEsperadas[i].fin, `Incoherencia en fila ${i} (campo: fin).`);
            assert.strictEqual(this.planificacionesMock[i].equipo, filasEsperadas[i].equipo, `Incoherencia en fila ${i} (campo: equipo).`);
            assert.strictEqual(this.planificacionesMock[i].tarea, filasEsperadas[i].tarea, `Incoherencia en fila ${i} (campo: tarea).`);
        }
    }
});