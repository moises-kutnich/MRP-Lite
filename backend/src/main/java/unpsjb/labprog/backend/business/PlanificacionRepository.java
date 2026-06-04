package unpsjb.labprog.backend.business;

import org.springframework.data.repository.CrudRepository;
import unpsjb.labprog.backend.model.Planificacion;
import unpsjb.labprog.backend.model.Taller;
import java.util.List;

public interface PlanificacionRepository extends CrudRepository<Planificacion, Long> {
    List<Planificacion> findByTallerId(Long idTaller);
    long countByTaller(Taller taller);
}