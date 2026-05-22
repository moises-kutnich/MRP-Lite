package unpsjb.labprog.backend.business;

import unpsjb.labprog.backend.model.Pedido;
import unpsjb.labprog.backend.model.Taller;
import java.time.LocalDateTime;

public interface EstrategiaPlanificacion {
    void generarPlanificacion(Pedido pedido, Taller taller, LocalDateTime fechaReferencia);
}