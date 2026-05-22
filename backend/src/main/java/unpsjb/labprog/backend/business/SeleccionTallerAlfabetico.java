package unpsjb.labprog.backend.business;

import org.springframework.stereotype.Component;
import unpsjb.labprog.backend.model.Producto;
import unpsjb.labprog.backend.model.Taller;
import java.util.List;

@Component("alfabetico")
public class SeleccionTallerAlfabetico implements CriterioSeleccionTaller {

    @Override
    public Taller seleccionar(List<Taller> talleres, Producto producto) {
        return talleres.stream()
            .filter(taller -> producto.getTareas().stream()
                .allMatch(tarea -> buscarEquipoEnTaller(taller, tarea.getTipoEquipo()) != null))
            .sorted((t1, t2) -> t1.getCodigo().compareToIgnoreCase(t2.getCodigo()))
            .findFirst()
            .orElse(null);
    }

    private Object buscarEquipoEnTaller(Taller taller, unpsjb.labprog.backend.model.TipoEquipo tipo) {
        return taller.getEquipos().stream()
                .filter(e -> e.getTipo().getId().equals(tipo.getId()))
                .findFirst().orElse(null);
    }
}