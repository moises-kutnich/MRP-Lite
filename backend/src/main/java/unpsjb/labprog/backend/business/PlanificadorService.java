package unpsjb.labprog.backend.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import unpsjb.labprog.backend.model.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class PlanificadorService {

    private final TallerRepository tallerRepository;
    private final CriterioSeleccionTaller criterioSeleccionTaller;
    private final EstrategiaPlanificacion estrategiaPlanificacion;

    @Autowired
    public PlanificadorService(
            TallerRepository tallerRepository,
            @Qualifier("alfabetico") CriterioSeleccionTaller criterioSeleccionTaller,
            @Qualifier("backward") EstrategiaPlanificacion estrategiaPlanificacion) {
        this.tallerRepository = tallerRepository;
        this.criterioSeleccionTaller = criterioSeleccionTaller;
        this.estrategiaPlanificacion = estrategiaPlanificacion;
    }

    public void planificar(Pedido pedido, Taller taller, LocalDateTime fechaReferencia) {
        this.estrategiaPlanificacion.generarPlanificacion(pedido, taller, fechaReferencia);
    }

    public Taller encontrarTallerCapaz(Producto producto) {
        List<Taller> todosLosTalleres = StreamSupport
                .stream(tallerRepository.findAll().spliterator(), false)
                .toList();
        
        return criterioSeleccionTaller.seleccionar(todosLosTalleres, producto);
    }
}