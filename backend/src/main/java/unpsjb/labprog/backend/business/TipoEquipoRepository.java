package unpsjb.labprog.backend.business;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.model.TipoEquipo;
import java.util.Optional;

@Repository
public interface TipoEquipoRepository extends JpaRepository<TipoEquipo, Long> {
    Optional<TipoEquipo> findByNombre(String nombre);
}