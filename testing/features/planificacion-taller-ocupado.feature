# language: es
Característica: Proceso de planificación progresivo
  Realiza de forma progresiva todo el camino de planificacion desde la creación de los productos, talleres y equipos.
  Aquí solo se prueban los casos positivos, los errores iran por otra característica.

  Escenario: Planificación de un pedido con el taller primera opción completamente ocupado.
    Dado que existe el pedido para el cliente "27982145634" con fecha de entrega "10-02-2025"
    Cuando se solicita planificar el pedido el día "09-02-2025"
    Entonces se espera el siguiente 200 con "Pedido planificado con éxito"
    Y se generaron las siguientes planificaciones
      | inicio           | fin              | equipo        | tarea               |
      | 2025-01-09 21:00 | 2025-01-09 22:10 | G01_amoladora | cortar planchas     |
      | 2025-01-09 22:10 | 2025-01-09 22:30 | G01_amoladora | cortar perfiles     |
      | 2025-01-09 22:30 | 2025-01-10 00:00 | G02_soldadora | armado              |
