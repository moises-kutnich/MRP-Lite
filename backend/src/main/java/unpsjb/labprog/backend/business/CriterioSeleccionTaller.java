package unpsjb.labprog.backend.business;

import unpsjb.labprog.backend.model.Producto;
import unpsjb.labprog.backend.model.Taller;
import java.util.List;

public interface CriterioSeleccionTaller {
    Taller seleccionar(List<Taller> talleres, Producto producto);
}