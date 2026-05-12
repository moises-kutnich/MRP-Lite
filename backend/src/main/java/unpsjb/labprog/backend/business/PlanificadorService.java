package unpsjb.labprog.backend.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unpsjb.labprog.backend.model.*;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PlanificadorService {

    @Autowired
    private PlanificacionRepository planificacionRepository;

    public void planificar(Pedido pedido, Taller taller, LocalDateTime fechaReferencia) {
        LocalDateTime tiempoActual = (fechaReferencia != null) ? fechaReferencia : LocalDateTime.now();

        for (Tarea tarea : pedido.getProducto().getTareas()) {
            Equipo equipo = buscarEquipoEnTaller(taller, tarea.getTipoEquipo());

            if (equipo != null) {
                LocalDateTime inicioTarea = buscarUltimoFin(equipo, tiempoActual);
                LocalDateTime finTarea = inicioTarea.plusMinutes(tarea.getTiempo());

                Planificacion p = new Planificacion();
                p.setPedido(pedido);
                p.setTaller(taller);
                p.setEquipo(equipo);
                p.setNombreTarea(tarea.getNombreTarea());
                p.setInicio(inicioTarea);
                p.setFin(finTarea);
                p.setColor(pedido.getId() != null && pedido.getId() % 2 == 0 ? "#dc3545" : "#007bff"); 

                planificacionRepository.save(p);
                
                tiempoActual = finTarea;
            }
        }
    }

    private LocalDateTime buscarUltimoFin(Equipo equipo, LocalDateTime base) {
        return planificacionRepository.findTopByEquipoOrderByFinDesc(equipo)
                .map(Planificacion::getFin)
                .filter(fin -> fin.isAfter(base))
                .orElse(base);
    }

    private Equipo buscarEquipoEnTaller(Taller taller, TipoEquipo tipo) {
        return taller.getEquipos().stream()
                .filter(e -> e.getTipo().getId().equals(tipo.getId()))
                .findFirst().orElse(null);
    }
}