# language: es
Característica: Proceso de planificación progresivo
  Realiza de forma progresiva todo el camino de planificacion desde la creación de los productos, talleres y equipos.
  Aquí solo se prueban los casos positivos, los errores iran por otra característica.

  Escenario: Planificación de un pedido con muchos productos para estar terminado en la fecha de entrega.
    Dado que existe el pedido para el cliente "23176843593" con fecha de entrega "10-02-2025"
    Cuando se solicita planificar el pedido el día "08-02-2025"
    Entonces se espera el siguiente 200 con "Pedido planificado con éxito"
    Y se generaron 40 planificaciones para el equipo "A01_amoladora"
    Y se generaron 20 planificaciones para el equipo "A02_soldadora"
