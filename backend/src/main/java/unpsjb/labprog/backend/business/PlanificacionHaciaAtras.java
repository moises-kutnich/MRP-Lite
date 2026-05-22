package unpsjb.labprog.backend.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import unpsjb.labprog.backend.model.*;
import unpsjb.labprog.backend.business.PlanificacionRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component("backward")
public class PlanificacionHaciaAtras implements EstrategiaPlanificacion {

    @Autowired
    private PlanificacionRepository planificacionRepository;
    
    @Autowired
    private AsignadorColorService asignadorColorService;

    @Override
    public void generarPlanificacion(Pedido pedido, Taller taller, LocalDateTime fechaLimite) {
        LocalDateTime tiempoActual = fechaLimite;

        List<Tarea> tareasInvertidas = new ArrayList<>(pedido.getProducto().getTareas());
        Collections.reverse(tareasInvertidas);

        for (Tarea tarea : tareasInvertidas) {
            Equipo equipo = buscarEquipoEnTaller(taller, tarea.getTipoEquipo());
            if (equipo != null) {
                LocalDateTime finTarea = tiempoActual;
                LocalDateTime inicioTarea = finTarea.minusMinutes(tarea.getTiempo());

                Planificacion p = new Planificacion();
                p.setPedido(pedido);
                p.setTaller(taller);
                p.setEquipo(equipo);
                p.setNombreTarea(tarea.getNombreTarea());
                p.setInicio(inicioTarea);
                p.setFin(finTarea);
                p.setColor(asignadorColorService.determinarColor(pedido));

                planificacionRepository.save(p);
                
            }
        }
    }

    private Equipo buscarEquipoEnTaller(Taller taller, TipoEquipo tipo) {
        return taller.getEquipos().stream()
                .filter(e -> e.getTipo().getId().equals(tipo.getId()))
                .findFirst().orElse(null);
    }
}