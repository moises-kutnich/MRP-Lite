package unpsjb.labprog.backend.business;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}