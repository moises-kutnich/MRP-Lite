# language: es
Característica: Proceso de planificación progresivo
  Realiza de forma progresiva todo el camino de planificacion desde la creación de los productos, talleres y equipos.
  Aquí solo se prueban los casos positivos, los errores iran por otra característica.

  Escenario: Planificación de un producto sobre un taller seleccionado con planificaciones previas
    Dado el producto con nombre "Soporte metálico mediano"
    Dado que existe el taller "ALFA"
    Cuando se solicita planificar el producto en el taller el día "01-01-2025"
    Entonces se espera el siguiente 200 con "Producto planificado con éxito"
    Y se generaron las siguientes planificaciones
      | inicio           | fin              | equipo        | tarea               |
      | 2025-01-01 01:20 | 2025-01-01 02:20 | A01_amoladora | cortar planchas     |
      | 2025-01-01 02:20 | 2025-01-01 02:40 | A01_amoladora | cortar perfiles     |
      | 2025-01-01 02:50 | 2025-01-01 03:20 | A02_soldadora | armado              |
