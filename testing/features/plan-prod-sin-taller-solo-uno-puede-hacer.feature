# language: es
Característica: Proceso de planificación progresivo
  Realiza de forma progresiva todo el camino de planificacion desde la creación de los productos, talleres y equipos.
  Aquí solo se prueban los casos positivos, los errores iran por otra característica.

  Escenario: Planificación de un producto sin indicar el taller, pero solo uno puede hacerlo
    Dado el producto con nombre "Canasto de basura chico 1,5mts"
    Cuando se solicita planificar el producto el día "01-01-2025"
    Entonces se espera el siguiente 200 con "Producto planificado con éxito"
    Y se generaron las siguientes planificaciones
      | inicio           | fin              | equipo        | tarea               |
      | 2025-01-01 00:00 | 2025-01-01 00:30 | G01_amoladora | cortar perfiles     |
      | 2025-01-01 00:30 | 2025-01-01 00:40 | G01_amoladora | cortar malla        |
      | 2025-01-01 00:40 | 2025-01-01 00:55 | G02_soldadora | soldar canasto      |
      | 2025-01-01 00:55 | 2025-01-01 01:05 | G02_soldadora | unir pie            |
      | 2025-01-01 01:05 | 2025-01-01 02:05 | G04_pistola   | pintar antioxidante |
