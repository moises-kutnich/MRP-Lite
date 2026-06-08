package unpsjb.labprog.backend.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import unpsjb.labprog.backend.model.*;

@Service
public class PlanificadorService {

    @Autowired
    private TallerRepository tallerRepository;

    @Autowired
    private PlanificacionRepository planificacionRepository;

    @Autowired
    @Qualifier("backward")
    private EstrategiaPlanificacion estrategiaPlanificacion;

    public Taller encontrarTallerCapaz(Producto producto) {
    Iterable<Taller> talleres = tallerRepository.findAll();

    for (Taller taller : talleres) {
        boolean esCapaz = producto.getTareas().stream().allMatch(tarea -> 
            buscarEquipoEnTaller(taller, tarea.getTipoEquipo()) != null
        );

        if (esCapaz) {
            return taller;
        }
    }
    return null;
}

    public void planificar(Pedido pedido, Taller taller, java.time.LocalDateTime limiteEntrega) {
        if (estrategiaPlanificacion != null) {
            estrategiaPlanificacion.generarPlanificacion(pedido, taller, limiteEntrega);
        }
    }

    public Equipo buscarEquipoEnTaller(Taller taller, TipoEquipo tipo) {
        if (taller == null || taller.getEquipos() == null || tipo == null) {
            return null;
        }
        return taller.getEquipos().stream()
                .filter(e -> e.getTipo() != null && e.getTipo().getId().equals(tipo.getId()))
                .findFirst().orElse(null);
    }
}