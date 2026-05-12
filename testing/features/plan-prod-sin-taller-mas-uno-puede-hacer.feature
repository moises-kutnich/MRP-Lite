# language: es
Característica: Proceso de planificación progresivo
  Realiza de forma progresiva todo el camino de planificacion desde la creación de los productos, talleres y equipos.
  Aquí solo se prueban los casos positivos, los errores iran por otra característica.

  Escenario: Planificación de un producto sin indicar el taller, pero más de uno puede hacerlo
    Dado el producto con nombre "Andamio básico 2x2x4"
    Y el criterio de selección es alfabeticamente por código
    Cuando se solicita planificar el producto el día "02-01-2025"
    Entonces se espera el siguiente 200 con "Producto planificado con éxito"
    Y se generaron las siguientes planificaciones
      | inicio           | fin              | equipo        | tarea                   |
      | 2025-01-02 00:00 | 2025-01-02 00:05 | B01_amoladora | cortar caños            |
      | 2025-01-02 00:05 | 2025-01-02 00:15 | B02_taladro   | realizar perforaciones  |
      | 2025-01-02 00:15 | 2025-01-02 00:35 | B03_pistola   | aplicar capa protectora |
