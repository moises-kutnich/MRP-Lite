package unpsjb.labprog.backend.business;

import org.springframework.data.jpa.repository.JpaRepository;
import unpsjb.labprog.backend.model.*;
import java.util.Optional;
import java.util.List;

public interface PlanificacionRepository extends JpaRepository<Planificacion, Long> {
    Optional<Planificacion> findTopByEquipoOrderByFinDesc(Equipo equipo);
    
    List<Planificacion> findByTallerId(Long tallerId);
}